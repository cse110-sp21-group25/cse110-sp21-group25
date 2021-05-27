/* global HTMLElement, customElements */

class EntryItemCreator extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
              <link rel="stylesheet" href="./components/entry-editor/entry-item-creator/entry-item-creator.css">
    
            <div class="bullet-creator-container">
                <div class="symbol-display">
                  <dropdown-menu></dropdown-menu>
                </div>
                <span class="bullet-text" contenteditable="true"></span>
                <button class="entry-del-btn">X</button>
            </div>

             `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.changeSym(this.getAttribute('symbol'));

    this.shadowRoot.querySelector('.symbol-display').addEventListener('click', (event) => {
      const dropdown = this.shadowRoot.querySelector('dropdown-menu');
      dropdown.style.visibility === 'hidden' ? dropdown.style.visibility = 'visible' : dropdown.style.visibility = 'hidden';
    });

    this.shadowRoot.querySelector('.bullet-text').addEventListener('input', (event) => {
      const delBtn = this.shadowRoot.querySelector('.entry-del-btn');
      const bullTxt = this.shadowRoot.querySelector('.bullet-text');

      if (bullTxt.innerHTML !== '') {
        delBtn.style.visibility = 'visible';
        const newCreator = document.createElement('entry-item-creator');
        newCreator.itemID = 'item' + (parseInt(this.itemID.substr(4)) + 1).toString();
        newCreator.symbol = '../imgs/task-incompl.svg';

        document.querySelector('entry-editor').shadowRoot.querySelector('.editor-content-area').appendChild(newCreator);
      }
    }, { once: true });

    this.shadowRoot.querySelector('.entry-del-btn').addEventListener('click', (event) => {
      const entryEditor = document.querySelector('entry-editor').shadowRoot;
      const creators = document.querySelector('entry-editor').shadowRoot.querySelectorAll('entry-item-creator');
      const targetID = this.getAttribute('itemID');

      creators.forEach(element => {
        if (element.getAttribute('itemID') === targetID) {
          entryEditor.querySelector('.editor-content-area').removeChild(element);
        }
      });
    });
  }

  get itemID () {
    return this.getAttribute('itemID');
  }

  set itemID (newID) {
    this.setAttribute('itemID', newID);
  }

  get symbol () {
    return this.getAttribute('symbol');
  }

  set symbol (newSym) {
    this.setAttribute('symbol', newSym);
    this.changeSym(newSym);
  }

  changeSym (path) {
    this.shadowRoot.querySelector('.symbol-display').style.backgroundImage = `url(${path})`;
  }
}

customElements.define('entry-item-creator', EntryItemCreator);
