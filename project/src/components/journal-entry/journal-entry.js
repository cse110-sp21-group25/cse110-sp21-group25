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

    /**
     * This a query selector that hides the current journal-entry element while toggling the
     * visibility of the entry-editor element. This makes the transition from journal-entry to
     * entry-editor look more seamless.
     */
    this.shadowRoot.querySelector('.entry-edit-btn').addEventListener('click', () => {
      const entryEditor = document.querySelector('entry-editor');
      const itemCreators = entryEditor.shadowRoot.querySelectorAll('entry-item-creator');

      /**
       * Toggling the visibility of entry-editor and the journal-entry
       */
      entryEditor.style.visibility = 'visible';
      this.style.visibility = 'hidden';

      /**
       * Toggles all of the the delete buttons for the entry-item-creators that contain text to be visible
       * This is done so that the last entry-item-creator that generates the other entry-item-creators
       * doesn't have the delete button showing.
       */
      itemCreators.forEach((element) => {
        if (element.shadowRoot.querySelector('.bullet-text').innerHTML !== '') {
          element.shadowRoot.querySelector('.entry-del-btn').style.visibility = 'visible';
        }
      });
    });
  }

  /**
   * Receives the new content from the entry-editor and calls the methods updateTitle and addItems to
   * update the innerHTML of the div.entry-header and to display the items in div.entry-content
   * @param {JSON} content - { title: 'title of entry', date: 'entry's date', items: [array of JSON objs] }
   */
  updateContent (content) {
    this.updateTitle(content.title);
    this.addItems(content.items);
  }

  /**
   * Takes an array of entries and adds all of them to the entry-content div
   * @param {array of JSON objs} itemList - Array with all of the entries content stored as a JSON
   * JSON's format: { symbol: 'path to img', text: 'Bullet's text' }
   */
  addItems (itemList) {
    if (this.removeItems(this.shadowRoot.querySelector('.entry-content').children > 0)) {
      this.removeItems();
    }

    for (let i = 0; i < itemList.length; i++) {
      this.addItem(itemList[i]);
    }
  }

  /**
   * Creates a new bullet-item component and sets the img src and innerHTML
   * of the span to be that of the parameters.
   * @param {JSON} content - { symbol: 'path to img', text: 'Bullet's text' }
   */
  addItem (content) {
    const newItem = document.createElement('bullet-item');

    newItem.img = content.symbol;
    newItem.text = content.text;

    this.shadowRoot.querySelector('.entry-content').appendChild(newItem);
  }

  /**
   * Removes all of the items in div.entry-content. This is done so that when
   * updating the journal-entry element the previous items are not still present
   * after updating. Essentially deletes everything in the entry-content div.
   */
  removeItems () {
    const entryContent = this.shadowRoot.querySelector('.entry-content');

    while (entryContent.firstChild) {
      entryContent.removeChild(entryContent.firstChild);
    }
  }

  /**
   * Sets the entry-title div's innerHTML to equal the value of newTitle
   * @param {string} newTitle - Title of the entry
   */
  updateTitle (newTitle) {
    this.shadowRoot.querySelector('.entry-title').innerHTML = newTitle;
  }
}

customElements.define('journal-entry', JournalEntry);
