import React, { useRef, useCallback, useEffect } from "react";
import { arrayOf, number } from "prop-types";
import Chart from "chart.js";
import zip from "lodash.zip";
import merge from "lodash.merge";
import { Box } from "@material-ui/core";
import { useDebounce } from "react-use";
import { useTranslation } from "react-i18next";
import {
  possiblePatterns,
  patternReducer,
  averageReducer,
  minWeekReducer,
} from "../utils/patterns";

Chart.defaults.global.defaultFontFamily = "FinkHeavy";

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
    y: {
      gridLines: {
        display: false,
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 300,
      },
    },
  },
  elements: {
    line: {
      cubicInterpolationMode: "monotone",
    },
  },
};

const getArray = (weeklyPrices) => {
  var result = ['buyPrice' in weeklyPrices ? weeklyPrices.buyPrice : 0 ];
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
    day = day.toLowerCase();
    if(!(day in weeklyPrices)) {
      return result;
    }
    result = result.concat(weeklyPrices[day].AM);
    result = result.concat(weeklyPrices[day].PM);
    return result;
  })
  return result;
}

const ChartComponent = ({ prices }) => {
  let filters = getArray(prices)
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
        datasets: generateData(filters),
        labels: getLabels(),
      },
      options: chartOptions,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const newData = generateData(filters, t);
      merge(chart.current.data.datasets, newData);
      chart.current.update();
    },
    500,
    [filters, generateData]
  );

  // Fix for mobile tooltip
  const tooltipTimeout = useRef();
  const onTouchEnd = useCallback(() => {
    clearTimeout(tooltipTimeout.current);
    tooltipTimeout.current = setTimeout(() => {
      if (!chart.current) return;
      chart.current.options.tooltips.enabled = false;
      chart.current.update();
    }, 3000);
  }, []);
  const onTouchStart = useCallback(() => {
    if (!chart.current) return;
    chart.current.options.tooltips.enabled = true;
    chart.current.update();
  }, []);
  // Clear timeout if unmount
  useEffect(() => {
    return () => {
      clearTimeout(tooltipTimeout.current);
    };
  }, []);

  return (
    <Box
      p={[0.5, 1, 2]}
      mt={2}
      borderRadius={16}
      bgcolor="bkgs.chart"
      width={1}
      height={400}
    >
      <canvas
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
        unselectable={"on"}
        ref={canvas}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      />
    </Box>
  );
};

ChartComponent.propTypes = {
  filters: arrayOf(number).isRequired,
};

export default ChartComponent;