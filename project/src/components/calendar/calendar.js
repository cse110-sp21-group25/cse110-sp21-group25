/** Calendar Web Component */
class Calendar extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');

    template.innerHTML =
    `
    <link rel="stylesheet" href="./components/calendar/calendar.css">
    <!--Comments -->
    

    <div class="row">
      <div class="col-md-12">
          <div id="calendar"></div>
      </div>
    </div>

  </div>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.7.0/main.css"/>
        <div id='calendar'></div>
        <div class="container">

      `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.querySelector('my-calendar').shadowRoot.querySelector('#calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    footerToolbar: {
      right: 'addEventButton'
    },
    customButtons: {
      addEventButton: {
        text: 'add event...',
        click: function () {
          const dateStr = prompt('Enter a date in YYYY-MM-DD format');
          const date = new Date(dateStr + 'T00:00:00'); // will be in local time

          if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
              title: 'dynamic event',
              start: date,
              allDay: true
            });
            alert('Great. Now, update your database...');
          } else {
            alert('Invalid date.');
          }
        }
      }
    }

  });

  calendar.render();
});

window.customElements.define('my-calendar', Calendar);
