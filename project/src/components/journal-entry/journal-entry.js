/** JournalEntry Web Component */
class JournalEntry extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/journal-entry/journal-entry.css">
  
            <div class="entry-container">
                <div class="entry-header">
                    <button class="entry-back-btn"><</button>
                    <h2 class="entry-title" contenteditable>My Eventful Sunday</h2>
                    <button class="entry-forward-btn">></button>
                </div>
                <div class="entry-tags-container">
                    <div class="tags">Imma tag</div>
                    <div class="search-icon">Search</div>
                </div>
                
                <div class="entry-body">
                  <div class="entry-body-header">
                    <span class="entry-date">Sunday, May 2</span>
                  </div>
                  <article contenteditable>
                    <ul class="bujo">
                      <li class="todo"><span>To do</span></li>
                      <li class="done"><span>Done</span></li>
                      <li class="event important"><span>Event (important)</span></li>
                      <li class="migrated"><span>Migrated</span></li>
                      <li class="scheduled"><span>Scheduled</span></li>
                      <li class="appointment deadline"><span>Appointment (deadline)</span></li>
                      <li class="in-progress"><span>In Progress</span></li>
                      <li class="cancelled"><span>Cancelled</span></li>
                      <li class="research"><span>Research</span></li>
                      <li class="note"><span>Note</span></li>
                    </ul>
                  </article>

                <select class="menu">
                  <option value="todo" id="todo" class="menu-item">To Do</option>
                  <option value="done" id="done" class="menu-item">Done</option>
                  <option value="event" id="event" class="menu-item">Event</option>
                  <option value="migrated" id="migrated" class="menu-item"">Migrated</option>
                  <option value="scheduled" id="scheduled" class="menu-item"">Scheduled</option>
                  <option value="appointment deadline" id="appointment deadline" class="menu-item"">Appointment Deadline</option>
                  <option value="in-progress" id="in-progress" class="menu-item"">In-Progress</option>
                  <option value="cancelled" id="cancelled" class="menu-item"">Cancelled</option>
                  <option value="research" id="research" class="menu-item"">Research</option>
                  <option value="note" id="note" class="menu-item"">Note</option>
                </select>
                <div class="out-click"></div>
                </div>
            </div>
           `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const menu = this.shadowRoot.querySelector('.menu');
    const outClick = this.shadowRoot.querySelector('.out-click');

    outClick.addEventListener('click', () => {
      menu.classList.remove('show');
      outClick.style.display = 'none';
    });

    this.shadowRoot.querySelectorAll('.menu > li').forEach((item) => {
      item.addEventListener('click', () => {
        const bullets = this.shadowRoot.querySelectorAll('article > ul > li');
        window.alert(item.getAttribute('id'));
        bullets.forEach(test);
        function test (element) {
          element.className = item.getAttribute('id');
        }
      });
    });

    // const menuList = this.shadowRoot.querySelector('.menu > li');
    const optionList = this.shadowRoot.querySelector('.menu');
    const hasListener = [];
    function detectChanges () {
      // Detecting innerHtml change
      const input = document.querySelector('journal-entry').shadowRoot.querySelector('article');

      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

      bulletFunctionality();
      const observer = new MutationObserver(bulletFunctionality);

      observer.observe(input, {
        childList: true,
        subtree: true
      });
      function bulletFunctionality () {
        // Create event listener for each new bullet created
        const bullets = document.querySelector('journal-entry').shadowRoot.querySelectorAll('article > ul > li');
        if (bullets.length === 0) {
          const newUL = document.createElement('ul');
          const newLI = document.createElement('li');
          newUL.classList.add('bujo');
          newLI.classList.add('migrated');

          newUL.appendChild(newLI);
          input.appendChild(newUL);
        }

        bullets.forEach((element) => {
          if (hasListener.indexOf(element) === -1) {
            hasListener.push(element);
            // Allow option list when right click
            element.addEventListener('contextmenu', e => {
              hasListener.push(element);
              e.preventDefault();
              console.log('right click');
              menu.style.top = `${e.clientY}px`;
              menu.style.left = `${e.clientX}px`;
              menu.classList.add('show');
              outClick.style.display = 'block';

              element.classList.add('selected');
              console.log(element);
            });
          }
        });

        /**
             * One bug is that if you open the menu and select and option
             * You selecting another option will not update that bullet
             */
        optionList.addEventListener('change', (event) => {
          const bullets = document.querySelector('journal-entry').shadowRoot.querySelectorAll('article > ul > li');
          bullets.forEach(element => {
            if (element.classList.contains('selected')) {
              console.log(element);
              element.className = event.target.value;
              element.classList.remove('selected');
            }
          });

          bullets.forEach(element => {
            if (element.classList.contains('selected')) {
              element.classList.remove('selected');
            }
          // menu.classList.remove('show');
          });
        });
      }
    }

    window.setTimeout(() => {
      detectChanges();
    }, 500);
  }
}

customElements.define('journal-entry', JournalEntry);
