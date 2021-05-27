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
    this.initSymbols(symbols);
  }

  addSelection (content) {
    const container = document.createElement('div');
    const symbol = document.createElement('img');
    const name = document.createElement('span');

    container.classList.add('item-container');
    symbol.classList.add('bullet-img');
    name.classList.add('bullet-name');

    symbol.src = content.imgSrc;
    name.innerHTML = content.name;

    container.addEventListener('click', (event) => {
      const creators = document.querySelector('entry-editor').shadowRoot.querySelectorAll('entry-item-creator');
      const targetEle = this;

      creators.forEach(element => {
        if (element.shadowRoot.querySelector('dropdown-menu') === targetEle) {
          element.changeSym(event.currentTarget.querySelector('.bullet-img').src);
        }
      });
    });

    container.appendChild(symbol);
    container.appendChild(name);
    this.shadowRoot.querySelector('.bullet-selection-input').appendChild(container);
  }

  function () {
    console.log('hello');
  }

  initSymbols (symbols) {
    symbols.forEach(element => this.addSelection(element));
  }
}

/**
 * content = {imgSrc:"path", name: "tag name"}
 */

customElements.define('dropdown-menu', DropDownMenu);
