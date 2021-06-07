/** Calendar Web Component */
class Calendar extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');

    template.innerHTML =
    `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.7.0/main.css"/>
      <link rel="stylesheet" href="./components/calendar/calendar.css">
        
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
    aspectratio: 1,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    eventColor: '#126e82',
    events: [
      {
        title: 'Testing',
        start: '2021-06-03T09:00:00'
      },
      {
        title: 'Calendar',
        start: '2021-06-03T12:00:00'
      },
      {
        title: 'Fix repo',
        start: '2021-06-03T15:00:00'
      },
      {
        title: 'Work on project',
        start: '2021-06-07',
        end: '2021-06-09',
        color: '#a3e0e8'
      },
      {
        groupId: 'TM',
        title: 'Team meeting',
        start: '2021-06-09T18:00:00'
      },
      {
        groupId: 'TM',
        title: 'Team meeting',
        start: '2021-06-16T18:00:00'
      },
      {
        title: 'Cabo Vacation',
        start: '2021-06-21',
        end: '2021-06-26',
        color: '#a3e0e8' // override!
      },
      {
        title: 'Birthday Party',
        start: '2021-06-13T07:00:00'
      },
      {
        title: 'Friend Wedding',
        start: '2021-06-26T01:00:00'
      },
      {
        title: 'Zoom meeting',
        url: 'http://zoom.com/',
        start: '2021-06-28'
      }
    ]
  });

  calendar.render();
});

window.customElements.define('my-calendar', Calendar);
