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

// Array of days.
const weekday = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const month = ['January', 'Febuary', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];

const datestring = (myDate.getDate());

document.write("<span style='color:black; font-size: 20px; font-weight: bold';>" + weekday[myDay] + ', ' + month[myMonth] + ' ' + datestring + '</span>');

window.customElements.define('clock-time', Clock);
