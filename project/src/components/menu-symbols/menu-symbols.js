/** MenuSymbols Web Component */
class MenuSymbols extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
    <link rel="stylesheet" href="./components/menu-symbols/menu-symbols.css">

    <div class="q-mark">
      <img src="../imgs/question-mark.svg" id="toggle">
    </div>
    
    <div class="toggle-menu">
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
        `;

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  /**
   * Gets the element with id 'menu' and toggles between the 'show' class.
   * This enables the menu icon at the bottom to show and hide the key
   * for the different types of bullets.
   */
  showMenu () {
    document.getElementById('menu').classList.toggle('show');
    const menuButton = this.shadowRoot.querySelector('.q-mark > img');
    const menuDesc = this.shadowRoot.querySelector('#menu');

    function enlargeButton () {
      menuButton.style.width = '45px';
      menuButton.style.height = '45px';
    }

    function smallerButton () {
      menuButton.style.width = '35px';
      menuButton.style.height = '35px';
    }

    menuButton.addEventListener('click', () => {
      if (menuDesc.style.display === '') {
        menuDesc.style.display = 'block';
        enlargeButton();
      } else {
        menuDesc.style.display = '';
        smallerButton();
      }
    });
  }
}

customElements.define('menu-symbols', MenuSymbols);
