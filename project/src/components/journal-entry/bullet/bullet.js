/* global HTMLElement, customElements */

class Bullet extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/journal-entry/bullet/bullet.css">
  
            <div class="bullet-container">
              <img src="" class="bullet-img" width="16px" height="16px"><span class="bullet-text"></span>
            </div>
           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get img () {
    return this.shadowRoot.querySelector('.bullet-img').src;
  }

  set img (newImg) {
    this.shadowRoot.querySelector('.bullet-img').src = newImg;
  }

  get text () {
    return this.shadowRoot.querySelector('.bullet-text').innerHTML;
  }

  set text (newText) {
    this.shadowRoot.querySelector('.bullet-text').innerHTML = newText;
  }
}

customElements.define('bullet-item', Bullet);
