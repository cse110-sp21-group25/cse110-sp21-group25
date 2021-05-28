/** MoodIndicator Web Component */
class MoodIndicator extends HTMLElement {
  constructor () {
    super();
    this.showInfo = true;

    const template = document.createElement('template');
    template.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./components/mood-indicator/mood-indicator.css">

    <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
    
    <div id="card">
          <div id="desc" class="neutral">
              How Are You Feeling Today?
          </div>
          <div id="icons">
            <i class="far fa-frown" data-emo="bad" data-description="bad">bad</i>
            <i class="far fa-meh" data-emo="okay" data-description="okay">ok</i>
            <i class="far fa-smile-beam" data-emo="great" data-description="great">great</i>
          </div>
          // <div id="goober" class="">
          // </div>
        </div>
        
      </div>
  `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const card = this.shadowRoot.querySelector('#card');
    const goober = this.shadowRoot.querySelector('#goober');
    const icons = this.shadowRoot.querySelectorAll('.far');
    const desc = this.shadowRoot.querySelector('#desc');

    const transDesc = (text) => {
      desc.classList.add('fade');
      setTimeout(() => {
        desc.innerText = text;
        desc.classList.remove('fade');
      }, 250);
    };

    card.addEventListener('click', function (e) {
      if (e.target.tagName === 'I') {
        goober.classList = '';
        desc.classList = '';
        goober.classList.add(e.target.getAttribute('data-emo'));
        icons.forEach((item, index) => {
          item.classList.remove('active');
        });
        e.target.classList.add('active');
        desc.classList = e.target.getAttribute('data-emo');
        transDesc(e.target.getAttribute('data-description'));
      }
    });
  }
}

window.customElements.define('mood-ind', MoodIndicator);
