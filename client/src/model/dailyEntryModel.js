class DailyEntryModel {
  AM = 0;
  PM = 0;

  setAM(AM) {
    this.AM = AM;
  }

  setPM(PM) {
    this.PM = PM
  }

  toPriceArray() {
    return [this.AM, this.PM];
  }
}

export default DailyEntryModel;