/** Calendar Web Component */
class Calendar extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
    <link rel="stylesheet" href="./components/calendar/calendar.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.7.0/main.min.css"/>
        <div id='calendar'>

        </div>
      `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.querySelector('my-calendar').shadowRoot.querySelector('#calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });
  calendar.render();
});

window.customElements.define('my-calendar', Calendar);
