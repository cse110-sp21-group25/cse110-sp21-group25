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
          <th><li><img src="../imgs/task-incompl.svg">To Do</li></th>
          <th><img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-05-16.png">Scheduled</th>
          <th><img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-16.png">Cancelled</th>
        </tr>
        <tr>
          <th><img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-21-16.png">Complete</th>
          <th><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-circle-outline-16.png">Event</th>
          <th><img src="../imgs/notes.svg">Notes</th>
        </tr>
        <tr>
          <th><img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-06-16.png">Migrated</th>
          <th><img src="https://cdn2.iconfinder.com/data/icons/mini-icon-set-map-location/91/Location_05-16.png">Appointment</th>
          <th><img src="https://cdn1.iconfinder.com/data/icons/random-crafticons/48/misc-_eye_vision-16.png">Exploration</th>
        </tr>
        </table>
      </ul>
    </div>
        `;

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback () {
    const menuBtn = this.shadowRoot.querySelector('#toggle');

    menuBtn.addEventListener('click', () => {
      this.showMenu();
    });
  }

  /**
   * Gets the element with id 'menu' and toggles between the 'show' class.
   * This enables the menu icon at the bottom to show and hide the key
   * for the different types of bullets.
   */
  showMenu () {
    this.shadowRoot.getElementById('menu').classList.toggle('show');
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
