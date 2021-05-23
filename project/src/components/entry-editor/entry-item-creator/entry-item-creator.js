/* global HTMLElement, customElements */

class EntryItemCreator extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
              <link rel="stylesheet" href="./components/entry-editor/entry-item-creator/entry-item-creator.css">
    
            <div class="bullet-creator-container">
                <div class="bullet-type-dropdown"></div>
                <div class="bullet-text" contenteditable="true"></div>
                <button class="entry-del-btn">X</button>
            </div>

             `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('entry-item-creator', EntryItemCreator);
