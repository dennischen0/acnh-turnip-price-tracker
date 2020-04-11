import React, { useRef, useCallback, useEffect } from "react";
import { arrayOf, number } from "prop-types";
import Chart from "chart.js";
import zip from "lodash.zip";
import merge from "lodash.merge";
import { Box } from "@material-ui/core";
import { useDebounce } from "react-use";
import { useTranslation } from "react-i18next";

//fuck this shit
// import {
//   possiblePatterns,
//   patternReducer,
//   averageReducer,
//   minWeekReducer,
// } from "../utils/patterns";

Chart.defaults.global.defaultFontFamily = "FinkHeavy";

const randfloat = (arr, min, max, basePrice, cb = (v) => v) => {
  arr.push(
    [min, max]
      .map((v) => Math.trunc(v * basePrice + 0.99999))
      .map(cb)
      .map((v, i) => (i ? v + 1 : v - 1))
  );
};

const pattern0 = (basePrice) => {
  const probabilities = [];
  const current = [];

  for (let decPhaseLen1 = 2; decPhaseLen1 <= 3; decPhaseLen1++) {
    const decPhaseLen2 = 5 - decPhaseLen1;
    for (let hiPhaseLen1 = 0; hiPhaseLen1 <= 6; hiPhaseLen1++) {
      const hiPhaseLen2and3 = 7 - hiPhaseLen1;
      for (let hiPhaseLen3 = 0; hiPhaseLen3 < hiPhaseLen2and3; hiPhaseLen3++) {
        // high phase 1
        for (let i = 0; i < hiPhaseLen1; i++) {
          randfloat(current, 0.9, 1.4, basePrice);
        }
        // decreasing phase 1
        for (let i = 0; i < decPhaseLen1; i++) {
          randfloat(
            current,
            0.6 - 0.04 * i - 0.06 * i,
            0.8 - 0.04 * i,
            basePrice
          );
        }
        // high phase 2
        for (let i = 0; i < hiPhaseLen2and3 - hiPhaseLen3; i++) {
          randfloat(current, 0.9, 1.4, basePrice);
        }

        // decreasing phase 2
        for (let i = 0; i < decPhaseLen2; i++) {
          randfloat(
            current,
            0.6 - 0.04 * i - 0.06 * i,
            0.8 - 0.04 * i,
            basePrice
          );
        }

        // high phase 3
        for (let i = 0; i < hiPhaseLen3; i++) {
          randfloat(current, 0.9, 1.4, basePrice);
        }

        // commit probability
        probabilities.push([...current]);
        current.length = 0;
      }
    }
  }

  return probabilities;
};

const pattern1 = (basePrice) => {
  const probabilities = [];
  const current = [];

  for (let peakStart = 3; peakStart <= 9; peakStart++) {
    let work = 2;
    for (; work < peakStart; work++) {
      randfloat(
        current,
        0.85 - 0.03 * (work - 2) - 0.02 * (work - 2),
        0.9 - 0.03 * (work - 2),
        basePrice
      );
    }

    randfloat(current, 0.9, 1.4, basePrice);
    randfloat(current, 1.4, 2.0, basePrice);
    randfloat(current, 2.0, 6.0, basePrice);
    randfloat(current, 1.4, 2.0, basePrice);
    randfloat(current, 0.9, 1.4, basePrice);

    work += 5;
    for (; work < 14; work++) {
      randfloat(current, 0.4, 0.9, basePrice);
    }

    // commit probability
    probabilities.push([...current]);
    current.length = 0;
  }

  return probabilities;
};

const pattern2 = (basePrice) => {
  const current = [];

  let work = 2;
  for (; work < 14; work++) {
    randfloat(
      current,
      0.9 - 0.05 - 0.03 * (work - 2) - 0.02 * (work - 2),
      0.9 - 0.03 * (work - 2),
      basePrice
    );
  }

  return [current];
};

const pattern3 = (basePrice) => {
  const probabilities = [];
  const current = [];

  for (let peakStart = 0; peakStart <= 9; peakStart++) {
    let work = 2;
    for (; work < peakStart; work++) {
      randfloat(
        current,
        0.4 - 0.03 * (work - 2) - 0.02 * (work - 2),
        0.9 - 0.03 * (work - 2),
        basePrice
      );
    }
    randfloat(current, 0.9, 1.4, basePrice);
    randfloat(current, 0.9, 1.4, basePrice);
    randfloat(current, 1.4, 2.0, basePrice, (v) => v - 1);
    randfloat(current, 1.4, 2.0, basePrice);
    randfloat(current, 1.4, 2.0, basePrice, (v) => v - 1);

    work += 5;
    for (let i = work; work < 14; work++) {
      randfloat(
        current,
        0.4 - 0.03 * (work - i) - 0.02 * (work - i),
        0.9 - 0.03 * (work - i),
        basePrice
      );
    }

    probabilities.push([...current]);
    current.length = 0;
  }

  return probabilities;
};

const explodeBasePrices = (fn) => {
  return Array.from({ length: 21 }, (v, i) => i + 90).reduce(
    (prev, basePrice) => [...prev, ...fn(basePrice)],
    []
  );
};

const filterByPattern = (filters) => (pattern) =>
  pattern.every(([min, max], i) =>
    filters[i + 1] ? min <= filters[i + 1] && max >= filters[i + 1] : true
  );

const possiblePatterns = (filters) => {
  const patterns = Array.from({ length: 4 }, (v, i) => i);
  const fns = [pattern0, pattern1, pattern2, pattern3];
  const result = [];

  patterns.forEach((fn) => {
    let posibilities;
    const basePrice = filters[0];
    if (!basePrice || basePrice < 90 || basePrice > 110) {
      posibilities = explodeBasePrices(fns[fn]);
    } else {
      posibilities = fns[fn](filters[0]);
    }
    const filtered = posibilities.filter(filterByPattern(filters));
    result.push(filtered);
  });

  return result;
};

// Take all patternsOptions and make them single [min, max] values.
const minMaxReducer = (prev, current) => {
  return prev.map(([min, max], i) => {
    const [newMin, newMax] = current[i];
    return [min > newMin ? newMin : min, max < newMax ? newMax : max];
  });
};

const averageReducer = (prev, current) => {
  return prev.map(([avg, count, flag], i) => {
    const [min, max] = current[i];
    if (!flag) return [(avg + count + min + max) / 4, 4, true];
    return [(avg * count + min + max) / (count + 2), count + 2, true];
  });
};

// This reducer will get all-week minimum.
const maxReducer = ([a], [b]) => [Math.max(a, b)];
const minWeekReducer = (prev, current, i) => {
  const [a] = current.reduce(maxReducer);
  const [b] = i === 1 ? prev.reduce(maxReducer) : prev;
  return [Math.min(a, b)];
};

const patternReducer = (patternsCategories, reducer = minMaxReducer) => {
  const allPatterns = patternsCategories.reduce(
    (acc, current) => [...acc, ...current],
    []
  );
  if (allPatterns.length === 0) return [];
  if (allPatterns.length === 1)
    return [allPatterns[0], allPatterns[0]].reduce(reducer);
  return allPatterns.reduce(reducer);
};



const createGenerteData = (t) => (filter) => {
  let patterns = possiblePatterns(filter);
  const patternCount = patterns.reduce((acc, cur) => acc + cur.length, 0);
  if (patternCount === 0) patterns = possiblePatterns([0, ...filter.slice(1)]);
  const minMaxPattern = patternReducer(patterns);
  const minMaxData = zip(...minMaxPattern);
  const avgPattern = patternReducer(patterns, averageReducer);
  const avgData = zip(...avgPattern);
  const [minWeekValue] = patternReducer(patterns, minWeekReducer);

  return [
    {
      label: t("Buy Price"),
      data: new Array(12).fill(filter[0] || null),
      fill: true,
      backgroundColor: "transparent",
      borderColor: "#7B6C53",
      pointRadius: 0,
      pointHoverRadius: 0,
      borderDash: [5, 15],
    },
    {
      label: t("Guaranteed Min"),
      data: new Array(12).fill(minWeekValue || null),
      fill: true,
      backgroundColor: "transparent",
      borderColor: "#007D75",
      pointRadius: 0,
      pointHoverRadius: 0,
      borderDash: [3, 6],
    },
    {
      label: t("Daily Price"),
      data: Array.from({ length: 12 }, (v, i) => filter[i + 1] || null),
      fill: false,
      backgroundColor: "#EF8341",
      borderColor: "#EF8341",
    },
    {
      label: t("Average"),
      data: avgData[0] ? avgData[0].map(Math.trunc) : new Array(12).fill(null),
      backgroundColor: "#F0E16F",
      borderColor: "#F0E16F",
      pointRadius: 0,
      fill: false,
    },
    {
      label: t("Maximum"),
      data: minMaxData[1] || new Array(12).fill(null),
      backgroundColor: "#A5D5A5",
      borderColor: "#A5D5A5",
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: 3,
    },
    {
      label: t("Minimum"),
      data: minMaxData[0] || new Array(12).fill(null),
      backgroundColor: "#88C9A1",
      borderColor: "#88C9A1",
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: 3,
    },
  ];
};

const createGetLabels = (t) => () => {
  return t("Mon Tue Wed Thu Fri Sat")
    .split(" ")
    .reduce(
      (acc, day) => [...acc, `${day} ${t("AM")}`, `${day} ${t("PM")}`],
      []
    );
};

const chartOptions = {
  maintainAspectRatio: false,
  showLines: true,
  tooltips: {
    intersect: false,
    mode: "index",
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 300,
        },
      },
    ],
  },
  elements: {
    line: {
      cubicInterpolationMode: "monotone",
    },
  },
};

const ChartComponent = ({ filter }) => {
  const canvas = useRef();
  const chart = useRef();
  const { t } = useTranslation();
  const generateData = useCallback(createGenerteData(t), [t]);
  const getLabels = useCallback(createGetLabels(t), [t]);

  // onMount effect
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    chart.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: generateData(filter),
        labels: getLabels(),
      },
      options: chartOptions,
    });
  }, []);

  // Language labels chart effect
  useEffect(() => {
    if (!chart.current) return;
    // this is necessary, or else labels won't change language until reload
    const newLabels = getLabels();
    merge(chart.current.data.labels, newLabels);
    chart.current.update();
  }, [getLabels]);

  // Filters / Data effect
  useDebounce(
    () => {
      if (!chart.current) return;
      // regerates chart in the new
      const newData = generateData(filter, t);
      merge(chart.current.data.datasets, newData);
      chart.current.update();
    },
    500,
    [filter, generateData]
  );

  return (
    <Box p={2} mt={2} borderRadius={16} bgcolor="bkgs.chart">
      <canvas ref={canvas} width={600} height={400} />
    </Box>
  );
};

ChartComponent.propTypes = {
  filter: arrayOf(number).isRequired,
};

export default ChartComponent;
