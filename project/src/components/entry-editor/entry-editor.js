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
                <entry-item-creator itemID="item0" symbol="../imgs/task-incompl.svg"></entry-item-creator>
              </div>
              <button class="editor-add-btn">Add</button>
            </div>

           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    /**
     * Event Listener for the add button that adds all of the current entry-item-creators to the
     * journal-entry component. Along with that, it updates the title of journal-entry component.
     */
    this.shadowRoot.querySelector('.editor-add-btn').addEventListener('click', () => {
      /**
       * Switches the visibility of journal-entry and entry-editor so that journal-entry
       * is being displayed again and entry-editor is not.
       */
      document.querySelector('entry-editor').style.visibility = 'hidden';
      document.querySelector('journal-entry').style.visibility = 'visible';

      const itemCreators = this.shadowRoot.querySelectorAll('entry-item-creator');

      /**
       * Toggles the visibility of all of the dropdown menus and delete buttons so that they
       * are not present when the journal-entry is visible. Need to do this here because
       * otherwise they won't disappear. (This is because they are no longer inheritting
       * from their parent)
       */
      itemCreators.forEach(element => {
        element.shadowRoot.querySelector('dropdown-menu').style.visibility = 'hidden';
        element.shadowRoot.querySelector('.entry-del-btn').style.visibility = 'hidden';
      });

      /**
       * Removes all of the entry-item-creators except for the last one
       * The last one is used to create more entry-item-creators.
       * We removed all of the other ones so that when we open the editor again
       * it will not duplicate the entries
       */
      this.clearItems();
      /**
       * Updates the this._content variable before sending that data over to the
       * journal-entry component.
       */
      this.updateContent();
      /**
       * Sends this._content to the journal-entry to update that component.
       */
      document.querySelector('journal-entry').updateContent(this._content);
    });

    /**
     * Loads the data from journal-entry to entry-editor
     * Runs only when the entry-editor is created because we want the data
     * to be present in the entry-editor after loading data from storage.
     */
    this.getJournalData();
  }

  /**
   * Updates the entry-editor component by reading the data found in journal-entry
   * and adding the entry-item-creators along with changing the editor-title innerHTML
   * to reflect that.
   */
  getJournalData () {
    const title = document.querySelector('journal-entry').shadowRoot.querySelector('.entry-title');
    const items = document.querySelector('journal-entry').shadowRoot.querySelectorAll('bullet-items');

    this.shadowRoot.querySelector('.editor-title').innerHTML = title.innerHTML;

    /**
     * Creating the new entry-item-creators based on the bullet-items components found in journal-entry
     */
    items.forEach((element) => {
      const newCreator = document.createElement('entry-item-creator');
      const lastCreator = this.querySelector('.editor-content-area');

      /**
       * itemID has to be a string so to increment the index we are converting the number portion of the string
       * into an actual number and incrementing that and turning that back into a string by using the + operator.
       */
      newCreator.setAttribute('itemID', newCreator.itemID = 'item' + (parseInt(lastCreator.itemID.substr(4)) + 1).toString());
      newCreator.symbol = '../imgs/task-incompl.svg';

      document.querySelector('entry-editor').shadowRoot.querySelector('.editor-content-area').appendChild(newCreator);
    });
  }

  /**
   * Updates the this._content variable with all of the last information from the entry-item-creators and the editor-title div.
   * this._content is a JSON file that contains { title: '', date: '', items: [] }. Currently, the date isn't getting changed
   */
  updateContent () {
    const title = this.shadowRoot.querySelector('.editor-title');
    const items = this.shadowRoot.querySelectorAll('entry-item-creator');

    /**
     * If the editor-title div in the entry-editor is empty, keep the original title.
     */
    if (title.innerHTML !== '') {this._content.title = title.innerHTML;}

    /**
     * Encode the entry-item-creators content into a JSON
     */
    items.forEach(element => {
      const symbol = element.shadowRoot.querySelector('.symbol-display');
      const itemText = element.shadowRoot.querySelector('.bullet-text');

      /**
       * Only encode entry-item-creators that have text in them
       */
      if (itemText.innerHTML !== '') {
        /**
         * symbol.style.backgroundImage has format url(filepath) We don't want the url() part.
         * As such, we can use substring to get only the filepath
         */
        this._content.items.push({ symbol: symbol.style.backgroundImage.substring(5, (symbol.style.backgroundImage.length - 2)), text: itemText.innerHTML });
      }
    });
  }

  /**
   * Removes all of the entry-item-creators from the editor-content-area except
   * for the last entry-item-creator. This last entry-item-creator is used to
   * generate more entry-item-creators. Never delete the last entry-item-creator
   */
  clearItems () {
    const creatorArea = this.shadowRoot.querySelector('.editor-content-area');
    const itemCreators = this.shadowRoot.querySelectorAll('entry-item-creator');

    itemCreators.forEach(element => {
      if (element.shadowRoot.querySelector('.bullet-text').innerHTML === '' &&
      element !== creatorArea.children[creatorArea.children.length - 1]) {
        creatorArea.removeChild(element);
      }
    });
    this._content.items = [];
  }

  /**
   * Hides all of the dropdown menus except for the one found in the parameter selected
   * @param {dropdown-menu} selected - This is the dropdown-menu that should not be toggled.
   */
  hideDropDowns (selected) {
    const creators = this.shadowRoot.querySelectorAll('entry-item-creator');

    creators.forEach((element) => {
      if (element.shadowRoot.querySelector('dropdown-menu') !== selected) {
        element.shadowRoot.querySelector('dropdown-menu').style.visibility = 'hidden';
      }
    });
  }
}

customElements.define('entry-editor', EntryEditor);

/**
 * { title: "", entries: [{src: "", text: ""},{src: "", text: ""}]}
 */
