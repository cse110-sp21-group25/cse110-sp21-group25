/* global HTMLElement, customElements */

class DropDownMenu extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/entry-editor/dropdown-menu/dropdown-menu.css">
    
            <div class="bullet-selection-input"></div>

             `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    /**
     * Array of all of the different symbols with their name.
     */
    const symbols = [
      { imgSrc: '../imgs/task-incompl.svg', name: 'Task Incomplete' },
      { imgSrc: '../imgs/task-compl.svg', name: 'Task Complete' },
      { imgSrc: '../imgs/task-migrated.svg', name: 'Task Migrated' },
      { imgSrc: '../imgs/task-scheduled.svg', name: 'Task Scheduled' },
      { imgSrc: '../imgs/event.svg', name: 'Event' },
      { imgSrc: '../imgs/priority.svg', name: 'Priority' },
      { imgSrc: '../imgs/inspiration.svg', name: 'Inspiration' },
      { imgSrc: '../imgs/notes.svg', name: 'Notes' },
      { imgSrc: '../imgs/exploration.svg', name: 'Exploration' }
    ];
    /**
     * Loads the symbols into the dropdown-menu
     */
    this.initSymbols(symbols);
  }

  /**
   * Helper function that generates a single option in the dropdown menu.
   * The HTML structure is as follows:
   * <div class="item-container">
   *  <img src="img filepath" class="bullet-img">
   *  <span class="bullet-name">(content.name)<span>
   * </div>
   * This is then appended to the bullet-selection-input div.
   * The item-container also has an event listener to update the symbol-display div
   * found in the entry-item-creator to that of the selection.
   * @param {JSON} content - { imgSrc: 'filepath', name: 'what the symbol represents' }
   */
  addSelection (content) {
    const container = document.createElement('div');
    const symbol = document.createElement('img');
    const name = document.createElement('span');

    container.classList.add('item-container');
    symbol.classList.add('bullet-img');
    name.classList.add('bullet-name');

    symbol.src = content.imgSrc;
    name.innerHTML = content.name;

    /**
     * Event listener is added to the container so that selecting one of the options updates
     * the symbol-display div (found in entry-item-creator) to display the selected symbol.
     */
    container.addEventListener('click', (event) => {
      const creators = document.querySelector('entry-editor').shadowRoot.querySelectorAll('entry-item-creator');
      const targetEle = this;

      creators.forEach((element) => {
        if (element.shadowRoot.querySelector('dropdown-menu') === targetEle) {
          element.changeSym(event.currentTarget.querySelector('.bullet-img').src);
        }
      });
    });

    container.appendChild(symbol);
    container.appendChild(name);
    this.shadowRoot.querySelector('.bullet-selection-input').appendChild(container);
  }

  /**
   * Takes in a list of JSON objects with the format { imgSrc: 'filepath', name: 'what the symbol represents' }
   * and adds them to the bullet-selection-input div.
   * @param {JSON Array} symbols - array of all the symbols (bullets) to be added to the dropdown
   */
  initSymbols (symbols) {
    symbols.forEach((element) => this.addSelection(element));
  }
}

customElements.define('dropdown-menu', DropDownMenu);
