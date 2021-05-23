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
  }
}

customElements.define('dropdown-menu', DropDownMenu);
