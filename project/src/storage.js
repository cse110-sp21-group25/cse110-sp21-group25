let storage = localStorage.getItem('storage');

/**
 * Checks to see if the storage variable exists in localStorage. If does not, this if statement
 * creates the basic structure of the JSON storage. If the storage variable does exist, the if 
 * statement will parse the stringified JSON variable.
 */
if (storage === null) {
  // List of months for the month's key
  const months = ['JANUARY', 'FEBURARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  // Retrieving the current day's year, month, day of the month, and ISO week.
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth = months[currDate.getMonth()];
  const currDayOfMonth = currDate.getDate().toString();
  const currISOWeek = getWeek(currDate);
  storage = {};

  // Creates the basic structure for the storage (nested object literals)
  storage[currYear] = {};
  storage[currYear][currMonth] = {};
  storage[currYear][currMonth][currDayOfMonth] = {};
  storage[currYear][currMonth][currDayOfMonth][currISOWeek] = currISOWeek;

  // Saves the storage variable to localStorage
  saveStorage();
} else {
  // Converts storage from a JSON string to JSON object
  storage = JSON.parse(storage);
}

/**
     * Code adapted from https://www.epochconverter.com/weeknumbers
     * Determines what ISO week based on local time.
     * @returns ISO week based on local time.
     */
function getWeek (date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

/**
 * Function that saves the storage variable to localStorage
 */
function saveStorage() {
  localStorage.setItem('storage', JSON.stringify(storage));
}

console.log(storage);
