/* global HTMLElement, customElements */

class EntryEditor extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/entry-editor/entry-editor.css">
  
            <div class="editor-container">
              <div class="editor-title"></div>
              <div class="editor-content-area"></div>
            </div>

           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get content () {

  }

  set content (content) {

  }
}

customElements.define('entry-editor', EntryEditor);

/**
 * { title: "", entries: [{src: "", text: ""},{src: "", text: ""}]}
 */
