
class EntryEditor extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML =
        `
        <link rel="stylesheet" href="./components/journal-entry/journal-entry.css">


        
    `;

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('entry-editor', EntryEditor);
