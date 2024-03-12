/**
 * Compute months difference between two dates (mm/yyyy). Include both start and end date
 * @param {*} startDate
 * @param {*} endDate
 * @returns
 */
export function computeMonthsDiff(startDate, endDate) {
  const [startMonth, startYear] = startDate.split("/");
  const [endMonth, endYear] = endDate.split("/");
  let currentDate = new Date(startYear, startMonth - 1, 1); // Months are 0-indexed in JavaScript Date
  const endDateObj = new Date(endYear, endMonth - 1, 1);
  let months = 0;
  while (currentDate <= endDateObj) {
    months++;
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return months;
}

export function calculateUniqueWorkMonths(periods) {
  const uniqueMonths = new Set();

  periods.forEach((period) => {
    const [startMonth, startYear] = period?.startDate.split("/");
    const [endMonth, endYear] = period?.endDate.split("/");
    let currentDate = new Date(startYear, startMonth - 1, 1); // Months are 0-indexed in JavaScript Date

    const endDate = new Date(endYear, endMonth - 1, 1);

    while (currentDate <= endDate) {
      // Add the month/year string to the Set
      uniqueMonths.add(
        currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1)
      );
      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  });

  // The size of the Set represents the total number of unique months worked
  return uniqueMonths.size;
}

/**
 * Convert to months to String format (Yrs and months)
 * @param {*} totalMonths
 * @returns
 */
export function convertMonthsToString(totalMonths) {
  // Calculate the years and remaining months
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Create and return the formatted string
  return `${years} Yrs and ${months} months`;
}
