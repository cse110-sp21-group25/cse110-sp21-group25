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

    const symbols = [{ imgSrc: '../imgs/chevron-down-solid.svg', name: 'shenron down' }, { imgSrc: '../imgs/cog-solid.svg', name: 'gear' }];
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

      // document.querySelector('app-wrapper')
      //   .query('entry-item-creator')
      //   .changeSym(event.currentTarget.querySelector('.bullet-img').src);
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
