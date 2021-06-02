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
           <th><img src="../imgs/task-incompl.svg">Task Incomplete</th>
           <th><img src="../imgs/task-scheduled.svg">Task Scheduled</th>
           <th><img src="../imgs/inspiration.svg">Inspiration</th>
        </tr>
        <tr>
           <th><img src="../imgs/task-compl.svg">Task Complete</th>
           <th><img src="../imgs/event.svg">Event</th>
           <th><img src="../imgs/notes.svg">Notes</th>
        </tr>
        <tr>
           <th><img src="../imgs/task-migrated.svg">Task Migrated</th>
           <th><img src="../imgs/priority.svg">Priority</th>
           <th><img src="../imgs/exploration.svg">Exploration</th>
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

  myFunction () {
    document.getElementById('menu').classList.toggle('show');
  }
}

customElements.define('menu-symbols', MenuSymbols);
