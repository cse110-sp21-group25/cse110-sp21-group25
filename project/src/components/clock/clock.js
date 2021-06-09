/** Clock Web Component */
class Clock extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
      <link rel="stylesheet" href="./components/clock/clock.css">

      <div class="date-container">
        <span class="date-text"></span>
      </div>
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    /**
     * Creates new Date object that has today's date (MM/DD/YY).
     */
    const myDate = new Date();

    /**
     * Retrive the current day as an index.
     *
     *  i.e: 0 -> Sunday
     *       1 -> Monday
     *       ...
     */
    const currWeekDay = myDate.getDay();

    /**
     * Retrives the current month as an index.
     *
     *  i.e: 0 -> January
     *       1 -> February
     *       ...
     */
    const currMonth = myDate.getMonth();

    // Array of days using abbreviations.
    const abbDays = ['Sun', 'Mon', 'Tues',
      'Wed', 'Thurs', 'Fri', 'Sat'
    ];

    // Array of months using abbreviations.
    const abbMonths = ['Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct',
      'Nov', 'Dec'
    ];

    // Gets the current day's date (not MM/DD/YY, only gets DD)
    const todaysDate = (myDate.getDate());

    // Edits the span tag to display the current date.
    this.shadowRoot.querySelector('.date-text').innerHTML = `${abbDays[currWeekDay]}, ${abbMonths[currMonth]} ${todaysDate}`;
  }
}

window.customElements.define('clock-time', Clock);
