/** MenuSymbols Web Component */
class MenuSymbols extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/menu-symbols/menu-symbols.css">

            <nav role="navigation">
            <div id="menuToggle">
                <!--
                A fake / hidden checkbox is used as click reciever,
                so you can use the :checked selector on it.
                -->
                <input type="checkbox" />
                
                <!--
                Some spans to act as a hamburger.
                
                They are acting like a real hamburger,
                not that McDonalds stuff.
                -->
                <span></span>
                <span></span>
                <span></span>
                
                
                <ul id="menu">
                <table>
                <tr>
                    <th><i class="fa fa-home"></i>Task Incomplete</th>
                    <th><i class="fa fa-search"></i>Task Complete</th>
                </tr>
                <tr>
                    <th><i class="fa fa-cloud"></i>Task Migrated</th>
                    <th><i class="fa fa-trash"></i>Task Scheduled</th>
                </tr>
                <tr>
                    <th><i class="fa fa-cloud"></i>Events</th>
                    <th><i class="fa fa-trash"></i>Priority</th>
                </tr>
                </table>
                </ul>
            </div>
            </nav>
        `;

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Gets the element with id 'menu' and toggles between the 'show; class.
   * This enables the menu icon at the bottom to show and hide the key
   * for the different types of bullets.
   */
  myFunction () {
    document.getElementById('menu').classList.toggle('show');
  }
}

customElements.define('menu-symbols', MenuSymbols);
