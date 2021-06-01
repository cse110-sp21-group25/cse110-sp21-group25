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

    const transDesc = (text) => {
      desc.classList.add('fade');
      setTimeout(() => {
        desc.innerText = text;
        desc.classList.remove('fade');
      }, 150);
    };

    const badEmo = this.shadowRoot.querySelector('img.bad');
    const mehEmo = this.shadowRoot.querySelector('img.meh');
    const greatEmo = this.shadowRoot.querySelector('img.great');

    function enlargeBad () {
      badEmo.style.transform = 'scale(1.5)';
      mehEmo.remove();
      greatEmo.remove();
    }
    function enlargeMeh () {
      mehEmo.style.transform = 'scale(1.5)';
      badEmo.remove();
      greatEmo.remove();
    }
    function enlargeGreat () {
      greatEmo.style.transform = 'scale(1.5)';
      badEmo.remove();
      mehEmo.remove();
    }

    const card = this.shadowRoot.querySelector('#card > #icons');
    const desc = this.shadowRoot.querySelector('#card > #desc');

    card.addEventListener('click', function (e) {
      if (e.target.getAttribute('alt') === 'bad') {
        transDesc('BAD');
        desc.style.backgroundColor = '#E74C3C';
        enlargeBad();
      } else if (e.target.getAttribute('alt') === 'meh') {
        transDesc('OKAY');
        desc.style.backgroundColor = '#CCCCCC';
        enlargeMeh();
      } else if (e.target.getAttribute('alt') === 'great') {
        transDesc('GREAT');
        desc.style.backgroundColor = '#44EF89';
        enlargeGreat();
      }
    });
  }
}

customElements.define('mood-ind', MoodIndicator);
