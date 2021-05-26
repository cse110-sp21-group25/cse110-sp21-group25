/* global HTMLElement, customElements */

class JournalEntry extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/journal-entry/journal-entry.css">
  
            <div class="entry-container">
                <div class="entry-header">
                    <button class="entry-back-btn"><</button>
                    <h2 class="entry-title">My Eventful Sunday</h2>
                    <button class="entry-forward-btn">></button>
                </div>
                <div class="entry-tags-container">
                    <div class="tags">Imma tag</div>
                    <div class="search-icon">Search</div>
                </div>
                
                <div class="entry-body">
                  <div class="entry-body-header">
                    <span class="entry-date">Sunday, May 2</span>
                    <button class="entry-edit-btn">Edit</button>
                  </div>
                  <div class="entry-content">
                  </div>
                </div>
            </div>
           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.addEventListener('click', () => {
      const entryEditor = document.querySelector('entry-editor');
      const itemCreators = entryEditor.shadowRoot.querySelectorAll('entry-item-creator');

      entryEditor.style.visibility = 'visible';
      this.style.visibility = 'hidden';

      itemCreators.forEach(element => {
        if (element.shadowRoot.querySelector('.bullet-text').innerHTML !== '') {
          element.shadowRoot.querySelector('.entry-del-btn').style.visibility = 'visible';
        }
      });
    });
  }

  updateContent (content) {
    this.updateTitle(content.title);
    this.addItems(content.items);
  }

  addItem (content) {
    const newItem = document.createElement('bullet-item');

    newItem.img = content.symbol;
    newItem.text = content.text;

    this.shadowRoot.querySelector('.entry-content').appendChild(newItem);
  }

  addItems (itemList) {
    // console.log('Adding items');
    // console.log('Item List: ' + itemList);

    if (this.removeItems(this.shadowRoot.querySelector('.entry-content').children > 0)) {
      this.removeItems();
    }

    for (let i = 0; i < itemList.length; i++) {
      this.addItem(itemList[i]);
    }
  }

  removeItems () {
    const entryContent = this.shadowRoot.querySelector('.entry-content');

    while (entryContent.firstChild) {
      entryContent.removeChild(entryContent.firstChild);
    }
  }

  updateTitle (newTitle) {
    this.shadowRoot.querySelector('.entry-title').innerHTML = newTitle;
  }
}

customElements.define('journal-entry', JournalEntry);
