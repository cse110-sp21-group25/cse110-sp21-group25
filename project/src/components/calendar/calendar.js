/** Calendar Web Component */
class Calendar extends HTMLElement {
    constructor () {
      super();
  
      const template = document.createElement('template');
  
      template.innerHTML = `
        <link rel="stylesheet" href="./components/calendar/calendar.css">
  
        <div class="date-container">
          <span class="date-text"></span>
        </div>
      `;
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  
      
    }
  }
  
  window.customElements.define('calendar', Calendar);
  