/* global HTMLElement, customElements */

class EntryEditor extends HTMLElement {
  constructor () {
    super();
    this._content = { title: '', date: '', items: [] };

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/entry-editor/entry-editor.css">
  
            <div class="editor-container">
              <div class="editor-title-container">
                <div>Title</div><div class="editor-title" contenteditable="true"></div>
              </div>
              <div class="editor-content-area">
                <entry-item-creator></entry-item-creator>
              </div>
              <button class="editor-add-btn">Add</button>
            </div>

           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('.editor-add-btn').addEventListener('click', () => {
      document.querySelector('entry-editor').style.visibility = 'hidden';
      document.querySelector('journal-entry').style.visibility = 'visible';

      const itemCreators = this.shadowRoot.querySelectorAll('entry-item-creator');

      itemCreators.forEach(element => {
        element.shadowRoot.querySelector('dropdown-menu').style.visibility = 'hidden';
        element.shadowRoot.querySelector('.entry-del-btn').style.visibility = 'hidden';
      });

      this.clearItems();
      this.updateContent();
      console.log(this._content);
      document.querySelector('journal-entry').updateContent(this._content);
    });
  }

  updateContent () {
    const title = this.shadowRoot.querySelector('.editor-title');
    const items = this.shadowRoot.querySelectorAll('entry-item-creator');

    if (title.innerHTML !== '') this._content.title = title.innerHTML;

    items.forEach(element => {
      const symbol = element.shadowRoot.querySelector('.symbol-display');
      const itemText = element.shadowRoot.querySelector('.bullet-text');

      if (itemText.innerHTML !== '') {
        this._content.items.push({ symbol: symbol.style.backgroundImage.substring(5, (symbol.style.backgroundImage.length - 2)), text: itemText.innerHTML });
      }
    });
  }

  clearItems () {
    const creatorArea = this.shadowRoot.querySelector('.editor-content-area');
    const itemCreators = this.shadowRoot.querySelectorAll('entry-item-creator');

    itemCreators.forEach(element => {
      if (element.shadowRoot.querySelector('.bullet-text').innerHTML === '' &&
      element !== creatorArea.lastChild) {
        creatorArea.removeChild(element);
      }
    });
    this._content.items = [];
  }
}

customElements.define('entry-editor', EntryEditor);

/**
 * { title: "", entries: [{src: "", text: ""},{src: "", text: ""}]}
 */
