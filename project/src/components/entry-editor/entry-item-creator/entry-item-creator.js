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

    /**
     * This changes the symbol-display div to start with the incomplete task bullet by default.
     */
    this.changeSym(this.getAttribute('symbol'));

    /**
     * This event listener is used to toggle the visibility of the dropdown menu when clicking
     * on the symbol display div
     */
    this.shadowRoot.querySelector('.symbol-display').addEventListener('click', (event) => {
      /**
       * First we call the toggleDropDowns method from entry-editor to hide dropdown menus
       * that were previously visible.
       */
      const dropdown = this.shadowRoot.querySelector('dropdown-menu');
      document.querySelector('entry-editor').hideDropDowns(dropdown);

      dropdown.style.visibility === 'hidden' ? dropdown.style.visibility = 'visible' : dropdown.style.visibility = 'hidden';
    });

    /**
     * This event listener is used to generate another entry-item-creator if this is the latest
     * entry-item-creator in the list. It changes to see if the innerHTML contains no text. If
     * it does not contain any text in the innerHTML of bullet-text then it generates the new
     * entry-item-creator. If a user were to erase all the text from an entry-item-creator and
     * attempted to trigger this event again. For some reason, the innerHTML is not considered
     * empty even if you remove all of the text in the innerHTML of bullet-text.
     */
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

    /**
     * This event listener triggers when the entry-del-btn of this entry-item-creator is clicked. It removes the
     * entire entry-item-creator from the parent, div.editor-content-area located in entry-editor. It does this
     * by selecting all of the entry-item-creators in div.editor-content-area and finds this entry-item-creator
     * and removes it from div.editor-content-area.
     */
    this.shadowRoot.querySelector('.entry-del-btn').addEventListener('click', (event) => {
      const entryEditor = document.querySelector('entry-editor').shadowRoot;
      const creators = document.querySelector('entry-editor').shadowRoot.querySelectorAll('entry-item-creator');
      const targetID = this.getAttribute('itemID');

      creators.forEach((element) => {
        if (element.getAttribute('itemID') === targetID) {
          entryEditor.querySelector('.editor-content-area').removeChild(element);
        }
      });
    });
  }

  /**
   * Getter for itemID
   */
  get itemID () {
    return this.getAttribute('itemID');
  }

  /**
   * Setter for itemID
   */
  set itemID (newID) {
    this.setAttribute('itemID', newID);
  }

  /**
   * Getter for symbol
   */
  get symbol () {
    return this.getAttribute('symbol');
  }

  /**
   * Setter for symbol
   * It also updates the img displayed by div.symbol-display
   */
  set symbol (newSym) {
    this.setAttribute('symbol', newSym);
    this.changeSym(newSym);
  }

  /**
   * Helper function that is used to change the background-image property of
   * div.symbol-display to whatever the img in the path value is.
   * @param {string} path - path from index.html to the img
   */
  changeSym (path) {
    this.shadowRoot.querySelector('.symbol-display').style.backgroundImage = `url(${path})`;
  }
}

customElements.define('entry-item-creator', EntryItemCreator);
