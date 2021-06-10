/** MoodIndicator Web Component */
class MoodIndicator extends HTMLElement {
  constructor () {
    super();
    this.showInfo = true;

    const template = document.createElement('template');
    template.innerHTML = `
    <link rel="stylesheet" href="./components/mood-indicator/mood-indicator.css">
    
    <div id="card">

      <div id="desc" class="neutral">
        How Are You Feeling Today?
      </div>

      <div id="icons">
        <img src="../imgs/sad-emo.png" class="bad" alt="bad">
        <img src="../imgs/meh-emo.png" class="meh" alt="meh">
        <img src="../imgs/great-emo.png" class="great" alt="great">
      </div>

    </div>
    
  `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback () {
    const card = this.shadowRoot.querySelector('#card > #icons');

    card.addEventListener('click', function (e) {
      if (e.target.getAttribute('alt') === 'bad') {
        document.querySelector('mood-ind').selectBad();
      } else if (e.target.getAttribute('alt') === 'meh') {
        document.querySelector('mood-ind').selectOkay();
      } else if (e.target.getAttribute('alt') === 'great') {
        document.querySelector('mood-ind').selectGreat();
      }
    });

    this.updateFace();
  }

  updateFace () {
    if (storage[viewedDate.year][viewedDate.month][viewedDate.day].mood !== undefined ||
      storage[viewedDate.year][viewedDate.month][viewedDate.day].mood !== 'EMPTY') {
      if (storage[viewedDate.year][viewedDate.month][viewedDate.day].mood === 'BAD') { this.selectBad(); }

      if (storage[viewedDate.year][viewedDate.month][viewedDate.day].mood === 'OKAY') { this.selectOkay(); }

      if (storage[viewedDate.year][viewedDate.month][viewedDate.day].mood === 'GREAT') { this.selectGreat(); }
    }
  }

  transDesc (text) {
    const desc = this.shadowRoot.querySelector('#card > #desc');

    desc.classList.add('fade');
    setTimeout(() => {
      desc.innerText = text;
      desc.classList.remove('fade');
    }, 150);
  }

  selectBad () {
    const desc = this.shadowRoot.querySelector('#card > #desc');
    storage[viewedDate.year][viewedDate.month][viewedDate.day].mood = 'BAD';
    saveStorage();

    this.transDesc('BAD');
    desc.style.backgroundColor = '#E74C3C';
    this.enlargeBad();
  }

  selectOkay () {
    const desc = this.shadowRoot.querySelector('#card > #desc');
    storage[viewedDate.year][viewedDate.month][viewedDate.day].mood = 'OKAY';
    saveStorage();

    this.transDesc('OKAY');
    desc.style.backgroundColor = '#CCCCCC';
    this.enlargeMeh();
  }

  selectGreat () {
    const desc = this.shadowRoot.querySelector('#card > #desc');
    storage[viewedDate.year][viewedDate.month][viewedDate.day].mood = 'GREAT';
    saveStorage();

    this.transDesc('GREAT');
    desc.style.backgroundColor = '#44EF89';
    this.enlargeGreat();
  }

  enlargeBad () {
    const badEmo = this.shadowRoot.querySelector('img.bad');
    const mehEmo = this.shadowRoot.querySelector('img.meh');
    const greatEmo = this.shadowRoot.querySelector('img.great');

    badEmo.style.transform = 'scale(1.5)';
    mehEmo.remove();
    greatEmo.remove();
  }

  enlargeMeh () {
    const badEmo = this.shadowRoot.querySelector('img.bad');
    const mehEmo = this.shadowRoot.querySelector('img.meh');
    const greatEmo = this.shadowRoot.querySelector('img.great');

    mehEmo.style.transform = 'scale(1.5)';
    badEmo.remove();
    greatEmo.remove();
  }

  enlargeGreat () {
    const badEmo = this.shadowRoot.querySelector('img.bad');
    const mehEmo = this.shadowRoot.querySelector('img.meh');
    const greatEmo = this.shadowRoot.querySelector('img.great');

    greatEmo.style.transform = 'scale(1.5)';
    badEmo.remove();
    mehEmo.remove();
  }
}

customElements.define('mood-ind', MoodIndicator);
