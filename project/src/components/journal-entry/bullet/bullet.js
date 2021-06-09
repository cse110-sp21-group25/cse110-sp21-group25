/* global HTMLElement, customElements */

class Bullet extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/journal-entry/bullet/bullet.css">
  
            <div class="bullet-container">
              <img src="" class="bullet-img" width="20px" height="20px"><span class="bullet-text"></span>
            </div>
           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Getter for the .bullet-image src
   */
  get img () {
    return this.shadowRoot.querySelector('.bullet-img').src;
  }

  /**
   * Setter for the .bullet-image src
   */
  set img (newImg) {
    this.shadowRoot.querySelector('.bullet-img').src = newImg;
  }

  /**
   * Getter for the .bullet-text innerHTML
   */
  get text () {
    return this.shadowRoot.querySelector('.bullet-text').innerHTML;
  }

  /**
   * Setter for the .bullet-text innerHTML
   */
  set text (newText) {
    this.shadowRoot.querySelector('.bullet-text').innerHTML = newText;
  }
}

customElements.define('bullet-item', Bullet);
