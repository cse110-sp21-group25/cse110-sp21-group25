/* global HTMLElement */

class Clock extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

const myDate = new Date();
const myDay = myDate.getDay();
const myMonth = myDate.getMonth();

// // get hour value.
// let hours = myDate.getHours();
// const ampm = hours >= 12 ? 'PM' : 'AM';
// hours = hours % 12;
// hours = hours || 12;
// let minutes = myDate.getMinutes();
// minutes = minutes < 10 ? '0' + minutes : minutes;
// const myTime = hours + ' ' + ' : ' + minutes + ampm;
// document.write(myTime);
// document.write('<br/>');

// Array of days.
const weekday = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const month = ['January', 'Febuary', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];

const d = new Date();

const datestring = (d.getDate());

document.write(weekday[myDay] + ', ' + month[myMonth] + ' ' + datestring);

window.customElements.define('clock-time', Clock);
