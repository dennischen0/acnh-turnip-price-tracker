import DailyEntryModel from "./dailyEntryModel"

class WeeklyEntryModel {
  constructor() {
    this.buyPrice = 0;
    this.monday = new DailyEntryModel();
    this.tuesday = new DailyEntryModel();
    this.wednesday = new DailyEntryModel();
    this.thursday = new DailyEntryModel();
    this.friday = new DailyEntryModel();
    this.saturday = new DailyEntryModel();
  }


  setBuyPrice(buyPrice) {
    this.buyPrice = buyPrice;
  }

  setMonday(monday) {
    this.monday = monday;
  }

  setTuesday(tuesday) {
    this.tuesday = tuesday;
  }

  setWednesday(wednesday) {
    this.wednesday = wednesday;
  }

  setThursday(thursday) {
    this.thursday = thursday;
  }

  setFriday(friday) {
    this.friday = friday;
  }

  setSaturday(saturday) {
    this.saturday = saturday;
  }

  toJSON() {
    return {
      buyPrice: this.buyPrice,
      monday: {
        AM: this.monday.AM,
        PM: this.monday.PM
      },
      tuesday: {
        AM: this.tuesday.AM,
        PM: this.tuesday.PM
      },
      wednesday: {
        AM: this.wednesday.AM,
        PM: this.wednesday.PM
      },
      thursday: {
        AM: this.thursday.AM,
        PM: this.thursday.PM
      },
      friday: {
        AM: this.friday.AM,
        PM: this.friday.PM
      },
      saturday: {
        AM: this.saturday.AM,
        PM: this.saturday.PM
      }
    }
  }

  toPriceArray() {
    //why cant we use instance methods here?
    // console.log(this.monday.toPriceArray());
    this.monday.setAM(1)
    return [
      this.monday.AM,
      this.monday.PM,
      this.tuesday.AM,
      this.tuesday.PM,
      this.wednesday.AM,
      this.wednesday.PM,
      this.thursday.AM,
      this.thursday.PM,
      this.friday.AM,
      this.friday.PM,
      this.saturday.AM,
      this.saturday.PM
    ]
  }
}

export default WeeklyEntryModel;
