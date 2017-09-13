
export class DateService {

  /**
   * Returns today's date with format yyyy-MM-dd
   *
   * @return {string}
   */
  today() {
    let todayString;
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    todayString = yyyy + '-';

    if (mm < 10) {
      todayString += '0' + mm;
    } else {
      todayString += mm;
    }

    todayString += '-';

    if (dd < 10) {
      todayString += '0' + dd;
    } else {
      todayString += dd;
    }

    return todayString;
  }
}
