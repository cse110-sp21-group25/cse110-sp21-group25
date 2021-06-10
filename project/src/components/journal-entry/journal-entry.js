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
            element.addEventListener('contextmenu', (e) => {
              hasListener.push(element);
              e.preventDefault();
              menu.style.top = `${e.clientY}px`;
              menu.style.left = `${e.clientX}px`;
              menu.classList.add('show');
              outClick.style.display = 'block';

              element.classList.add('selected');
            });
          }
        });

        /**
             * One bug is that if you open the menu and select and option
             * You selecting another option will not update that bullet
             */
        optionList.addEventListener('change', (event) => {
          const bullets = document.querySelector('journal-entry').shadowRoot.querySelectorAll('article > ul > li');
          bullets.forEach((element) => {
            if (element.classList.contains('selected')) {
              element.className = event.target.value;
              element.classList.remove('selected');
            }
          });

          bullets.forEach(element => {
            if (element.classList.contains('selected')) {
              element.classList.remove('selected');
            }
          });

          document.querySelector('journal-entry').shadowRoot.querySelector('.menu').style.visibility = 'hidden';
          document.querySelector('journal-entry').saveEntry();
        });
      }
    }

    setTimeout(() => {
      detectChanges();
    }, 500);
  }

  /**
   * Gets called after the DOMContent gets loaded. For more information:
   * https://stackoverflow.com/questions/54857905/deferred-setattribute-call-in-custom-element-constructor-causes-dom-error-is-it
   */
  connectedCallback () {
    const backBtn = this.shadowRoot.querySelector('.entry-back-btn');
    const forwardBtn = this.shadowRoot.querySelector('.entry-forward-btn');
    this.setAttribute('date', (viewedDate.year + '-' + viewedDate.month + '-' + viewedDate.day));
    /**
     * Function that calls the debounce method to begin saving the entry to storage
     * Code adapted from https://www.freecodecamp.org/news/javascript-debounce-example/
     */
    this.processChange = this.debounce(() => this.saveEntry());

    // Eventlistener that will save the article after 500 ms of no inputs
    this.shadowRoot.querySelector('article').addEventListener('input', () => {
      this.processChange();
    });

    // Eventlistener that will save the entry-title after 500 ms of no inputs
    this.shadowRoot.querySelector('.entry-header').addEventListener('input', () => {
      this.processChange();
    });

    // Eventlistener that enables the back button to load the previous day's content (changes the viewedDate variable)
    backBtn.addEventListener('click', () => {
      updateViewedDate('Backward');
      this.setAttribute('date', (viewedDate.year + '-' + viewedDate.month + '-' + viewedDate.day));

      document.querySelector('goals-board').loadGoals();

      this.validateEntry();
      this.loadEntry();
    });

    // Eventlistener that enables the forward button to load the next day's content (changes the viewedDate variable)
    forwardBtn.addEventListener('click', () => {
      updateViewedDate('Forward');
      this.setAttribute('date', (viewedDate.year + '-' + viewedDate.month + '-' + viewedDate.day));

      document.querySelector('goals-board').loadGoals();

      this.validateEntry();
      this.loadEntry();
    });

    this.validateEntry();
    this.loadEntry();
  }

  /**
   * Checks to see if there is an object in the storage variable for this particular date
   * If not it creates it.
   */
  validateEntry () {
    if (!entryExists(viewedDate)) {
      const date = decodeDateInfoElement(this);
      createEntry(date);
    }
  }

  /**
   * Saves the current title, date, and content in the article element to localStorage.
   */
  saveEntry () {
    const date = decodeDateInfoElement(this);
    const entryTitle = this.shadowRoot.querySelector('.entry-title').innerText;
    const entryDate = this.shadowRoot.querySelector('.entry-date').innerText;
    const entryContent = this.shadowRoot.querySelector('article').innerHTML;
    const viewedStorage = storage[date.year][date.month][date.day];

    if (!entryExists(date)) {
      createEntry(date);
    }

    viewedStorage.title = entryTitle;
    viewedStorage.date = entryDate;
    viewedStorage.content = entryContent;

    saveStorage();
  }

  /**
   * Loads the data from storage to the journal-entry. It loads the title, date, and
   * content of the page. The content being any text or bullets.
   */
  loadEntry () {
    const date = decodeDateInfoElement(this);
    const entryTitle = this.shadowRoot.querySelector('.entry-title');
    const entryDate = this.shadowRoot.querySelector('.entry-date');
    const entryContent = this.shadowRoot.querySelector('article');
    const viewedStorage = storage[date.year][date.month][date.day];

    if (entryExists(date) && viewedStorage.title !== undefined) {
      entryTitle.innerHTML = viewedStorage.title;
      entryDate.innerHTML = viewedStorage.date;
      entryContent.innerHTML = viewedStorage.content;

      document.querySelector('mood-ind').updateFace();
    }
  }

  /**
 * Method delays the call of the func by timeout amount of ms
 * Code from https://www.freecodecamp.org/news/javascript-debounce-example/
 * @param {function} func - callback function that should be run after timeout
 * @param {number} timeout - number of ms to wait before running func
 * @returns a function that starts a timre to call func.
 */
  debounce (func, timeout = 500) {
    // Where the setTimeout is saved so that we can cancel the timer within timeout ms
    let timer;
    return (...args) => {
      // Resets the timer
      clearTimeout(timer);
      /**
       * Sets the timer to equal a timeout that will run after timeout ms.
       * Uses the rest parameter (...args) to save all of the arguments into an array
       * Passes those arguments into the callback function using apply
       */
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}

customElements.define('journal-entry', JournalEntry);
