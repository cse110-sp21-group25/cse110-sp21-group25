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
  }

  addBullet (content) {
    const newBull = document.createElement('bullet-item');

    newBull.img = content.img;
    newBull.text = content.text;

    this.shadowRoot.querySelector('.entry-content').appendChild(newBull);
  }

  addBullets (bulletList) {
    for (let i = 0; i < bulletList.length; i++) {
      this.addBullet(bulletList[i]);
    }
  }
}

customElements.define('journal-entry', JournalEntry);
