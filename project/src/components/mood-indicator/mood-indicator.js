/* global HTMLElement, $ */

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="./components/mood-indicator/mood-indicator.css">
  
  <div class="mood-ind">
    <div id="app-cover">
    <h1>What's your mood today?</h1>
    <div id="app">
        <div class="mood" id="mood-bad">
        <div class="face">
            <div class="eyes-cover">
            <div class="eye"></div>
            <div class="eye"></div>
            </div>
            <div class="mouth"></div>
        </div>
        <div class="mood-name"> <span>bad</span></div>
        </div>
        
        <div class="mood" id="mood-okay">
        <div class="face">
            <div class="eyes-cover">
            <div class="eye"></div>
            <div class="eye"></div>
            </div>
            <div class="mouth"></div>
        </div>
        <div class="mood-name"><span>okay</span></div>
        </div>
        
    <div class="mood" id="mood-great">
        <div class="face">
            <div class="eyes-cover">
            <div class="eye"></div>
            <div class="eye"></div>
            </div>
            <div class="mouth"></div>
        </div>
        <div class="mood-name"><span>great</span></div>
        </div>
    </div>
  </div>
`;

class MoodIndicator extends HTMLElement {
  constructor () {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
  }

  // Toggle animation function for the mood emojis
  function () {
    let sToggle = 1; let si; let i = 0; let count = 0; let mood; const moods = ['bad', 'okay', 'great'];

    function startAnimation () {
      si = setInterval(function () {
        mood = moods[i];
        $('#mood-' + mood).toggleClass('active');

        if ((count % 2) !== 0) {
          ++i;
          if (count === 5) {
            count = -1;
            i = 0;
          }
        }
        ++count;
      }, 1500);
    }

    startAnimation();

    $('#play-pause').on('click', function () {
      if (sToggle) {
        sToggle = 0;
        clearInterval(si);
      } else {
        sToggle = 1;
        startAnimation();
      }
    });

    $('#clear').on('click', function () {
      clearInterval(si);
      $('#play-pause, #clear').addClass('disabled');
      $('.active').removeClass('active');
      $('#play-pause').off('click');
      $('#clear').off('click');
    });
  }
}

window.customElements.define('mood-ind', MoodIndicator);
