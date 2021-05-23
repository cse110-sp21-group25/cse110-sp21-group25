/* global HTMLElement, customElements */

class AppWrapper extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/app-wrapper/app-wrapper.css">
  
            <div class="app-wrapper">
              <div class="column left-column">
                <nav-bar></nav-bar>
              </div>
              <div class="column middle-column">
                <journal-entry></journal-entry>
                <entry-item-creator></entry-item-creator>
                <div class="middle-space"></div>
                <menu-symbols></menu-symbols>
              </div>
              <div class="column right-column">
                <!-- <h2>Clock</h2>  -->
                <clock-time></clock-time>

                <div id="goals">
                  <h2>Goals</h2>
                </div>

                <!-- <h2>Mood</h2> -->
                <mood-ind name="Mood Indicator"></mood-ind>

                <p>
                  "You miss 100% of the shots you dont't take" <br />
                  - Wayne Gretzky
                </p>
              </div>
            </div>
           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('app-wrapper', AppWrapper);
