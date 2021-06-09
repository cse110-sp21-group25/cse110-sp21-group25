let storage = localStorage.getItem('storage');
let viewedDate = decodeDateInfo(setCurrentDate());

/**
 * Checks to see if the storage variable exists in localStorage. If does not, this if statement
 * creates the basic structure of the JSON storage. If the storage variable does exist, the if
 * statement will parse the stringified JSON variable.
 */
if (storage === null) {
  storage = {};
  const dateJSON = decodeDateInfo(setCurrentDate());
  createEntry(dateJSON);
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
function saveStorage () {
  console.log('Saving!');
  localStorage.setItem('storage', JSON.stringify(storage));
  console.log(storage);
}

/**
 * Method that sets the given element's date attribute to today's date.
 */
function setCurrentDate () {
  const months = ['JANUARY', 'FEBURARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  const dateObj = new Date();
  const dateStr = dateObj.getFullYear() + '-' + months[dateObj.getMonth()] + '-' + dateObj.getDate();

  return dateStr;
}

/* eslint-disable */

/**
 * Method returns an object literal that contains the year, month, and day as strings
 * @param {HTML_element} element - element to get the date from
 */
function decodeDateInfoElement (element) {
  const date = element.getAttribute('date');
  const dateArr = (date.split('-'));

  return { year: dateArr[0], month: dateArr[1], day: dateArr[2] };
}

/* eslint-enable */

/**
 * Method returns an object literal that contains the year, month, and day as strings
 */
function decodeDateInfo (dateStr) {
  const dateArr = (dateStr.split('-'));

  return { year: dateArr[0], month: dateArr[1], day: dateArr[2] };
}

/**
 * Function that creates the specified entry in the storage variable. It creates empty nested
 * JSON objects and adds the ISOWeek to the entry.
 * @param {date_string} date - date formated as follows {year: year, month: month, day: day}
 */
function createEntry (date) {
  // Array of days using abbreviations.
  const abbDays = ['Sun', 'Mon', 'Tues',
    'Wed', 'Thurs', 'Fri', 'Sat'
  ];

  // Array of months using abbreviations.
  const abbMonths = ['Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct',
    'Nov', 'Dec'
  ];
  const dateObj = new Date(Date.parse(date.year + ' ' + date.month + ' ' + date.day));
  console.log('Creating Entry');

  // Storage is a nested object using dynamic key values not a nested array
  if (!Object.hasOwnProperty.call(storage, date.year)) {
    console.log('From year!');
    storage[date.year] = {};
    storage[date.year][date.month] = {};
    storage[date.year].ISOWEEKS = {};
    storage[date.year].ISOWEEKS[getWeek(dateObj)] = [];
    storage[date.year][date.month][date.day] = {};
    storage[date.year][date.month][date.day].WEEK = getWeek(dateObj);
    storage[date.year][date.month][date.day].date = abbDays[dateObj.getDay()] + ', ' + abbMonths[dateObj.getMonth()] + ' ' + dateObj.getDate();
    storage[date.year][date.month][date.day].title = 'Title';
    storage[date.year][date.month][date.day].content = '<ul class="bujo"></ul>';
  } else if (!Object.hasOwnProperty.call(storage[date.year], date.month)) {
    console.log('From month!');
    storage[date.year][date.month] = {};
    storage[date.year].ISOWEEKS = {};
    storage[date.year].ISOWEEKS[getWeek(dateObj)] = [];
    storage[date.year][date.month][date.day] = {};
    storage[date.year][date.month][date.day].WEEK = getWeek(dateObj);
    storage[date.year][date.month][date.day].date = abbDays[dateObj.getDay()] + ', ' + abbMonths[dateObj.getMonth()] + ' ' + dateObj.getDate();
    storage[date.year][date.month][date.day].title = 'Title';
    storage[date.year][date.month][date.day].content = '<ul class="bujo"></ul>';
  } else if (!Object.hasOwnProperty.call(storage[date.year][date.month], date.day)) {
    console.log('From day!');
    storage[date.year][date.month][date.day] = {};
    storage[date.year][date.month][date.day].WEEK = getWeek(dateObj);
    storage[date.year][date.month][date.day].date = abbDays[dateObj.getDay()] + ', ' + abbMonths[dateObj.getMonth()] + ' ' + dateObj.getDate();
    storage[date.year][date.month][date.day].title = 'Title';
    storage[date.year][date.month][date.day].content = '<ul class="bujo"></ul>';
  }

  saveStorage();
}

/* eslint-disable */

/**
 * Checks to see if the storage variable has this day stored already or not
 * @param {date_string} date - date formated as follows {year: year, month: month, day: day}
 * @returns true/false depending on if the day exists in the storage object (true if it does, false otherwise)
 */
function entryExists (date) {
  if (!Object.hasOwnProperty.call(storage, date.year) ||
  !Object.hasOwnProperty.call(storage[date.year], date.month) ||
  !Object.hasOwnProperty.call(storage[date.year][date.month], date.day)) {
    return false;
  }

  return true;
}



/**
 * Updates the viewedDate variable to either be forward one day or back one day
 * @param {string} dir - Forward or Backward : Determines whether we are adding a day or going back a day
 */
function updateViewedDate (dir) {
  const months = ['JANUARY', 'FEBURARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const dateObj = new Date();
  const viewedDateObj = new Date(Date.parse(viewedDate.year + ' ' + viewedDate.month + ' ' + viewedDate.day));
  const dateInMS = viewedDateObj.getTime();
  const timeOffset = viewedDateObj.getTimezoneOffset() * 60000;
  const dayOffSet = 86400000;
  const localTime = dateInMS + timeOffset;

  // Sets the time either forward a day or backward a day in local time.
  if (dir === 'Forward') {
    dateObj.setTime(localTime + dayOffSet);
  } else if (dir === 'Backward') {
    dateObj.setTime(localTime - dayOffSet);
  }

  const dateStr = dateObj.getFullYear() + '-' + months[dateObj.getMonth()] + '-' + dateObj.getDate();
  viewedDate = decodeDateInfo(dateStr);
}

/* eslint-enable */

console.log(storage);
