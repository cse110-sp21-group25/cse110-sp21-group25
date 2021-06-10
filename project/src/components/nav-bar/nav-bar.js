/** NavBar Web Component */
class navBar extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <link rel="stylesheet" href="./components/nav-bar/nav-bar.css">

             <!-- Everything is stored in the navbar -->
                <navbar>
                    <!-- This is the Cujo area in red -->
                    <div class="header">
                        <img src="../imgs/marinatedcuyitos.png" class="logo">
                        <div class="header-text">
                            CuJo
                        </div>
                        <img src="../imgs/eye.svg" class="focus-btn">
                    </div>
                    <!---------------------------------->

                    <!-- This is the Index area in orange -->
                    <div class="index-container">
                        <div class="index-text">
                        Index
                        </div>
                    </div>
                    <!---------------------------------->

                    <!-- This is the rest of the tabs -->

                    <!-- Wraps the arrow img and tab text for formatting -->
                    <div class="navbar-tab yearly">
                        <img src="../imgs/chevron-right.svg" class="navbar-tab-arrow">
                        <div class="navbar-tab-text">
                            Yearly
                        </div>
                    </div>
                    <!------------------------------------------------------>
                    <!-- Container for the yearly options (Appended to using JS) -->
                    <div class="navbar-tab-item-container yearly-item-container"></div>
                    <!------------------------------------------------------------->

                    <!-- The rest of this section is a repeat of the yearly section -->
                    <div class="navbar-tab monthly">
                        <img src="../imgs/chevron-right.svg" class="navbar-tab-arrow">
                        <div class="navbar-tab-text">
                            Monthly
                        </div>
                    </div>
                    <div class="navbar-tab-item-container monthly-item-container">
                    </div>
                    <div class="navbar-tab daily">
                        <img src="../imgs/chevron-right.svg" class="navbar-tab-arrow">
                        <div class="navbar-tab-text">
                            Daily
                        </div>
                    </div>
                    <div class="navbar-tab-item-container daily-item-container">
                    </div>
                    <!--------------------------------------------------------------->

                    <!-- Empty space div for keeping the format-->
                    <div class="navbar-empty-space"></div>
                    <!------------------------------------------->

                    <!-- Container with the settings and information icons-->
                    <div class="navbar-symbols-container">
                        <a href="https://www.google.com/" target="_blank" class="navbar-info"><img src="../imgs/help-icon.svg" class="navbar-info-icon"></a>
                        <a href="https://www.google.com/" target="_blank" class="navbar-settings"><img src="../imgs/cog-solid.svg" class="navbar-settings-icon"></a>
                    </div>
                    <!------------------------------------------------------>
                </navbar>
         `;
    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // The DOM needs to be loaded before attempting to use querySelectors.
    const yearlyDrop = this.shadowRoot.querySelector('.yearly');
    const monthlyDrop = this.shadowRoot.querySelector('.monthly');
    const dailyDrop = this.shadowRoot.querySelector('.daily');
    const focusIcon = this.shadowRoot.querySelector('.focus-btn');

    let focusToggle = false;

    // Toggle the image on the focus button.
    focusIcon.addEventListener('click', () => {
      if (focusToggle) {
        focusIcon.src = '../imgs/eye-slash-solid.svg';
      } else {
        focusIcon.src = '../imgs/eye.svg';
      }

      focusToggle = !focusToggle;
    });

    // Adds the options under the year tab on click
    yearlyDrop.addEventListener('click', () => this.generateYearlyDates());

    // Adds the options under the month tab on click
    monthlyDrop.addEventListener('click', () => this.generateMonthlyDates());

    // Adds the options under the daily tab on click
    dailyDrop.addEventListener('click', () => this.generateDailyDates());
  }

  // Removes the highlight from the individual tabs
  removeHighlight () {
    const yearlyDrop = this.shadowRoot.querySelector('.yearly');
    const monthlyDrop = this.shadowRoot.querySelector('.monthly');
    const dailyDrop = this.shadowRoot.querySelector('.daily');

    yearlyDrop.classList.remove('navbar-tab-highlighted');
    monthlyDrop.classList.remove('navbar-tab-highlighted');
    dailyDrop.classList.remove('navbar-tab-highlighted');
  }

  // Adds the options under the year tab
  generateYearlyDates () {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    let currYearOffset = -2;

    const yearlyDrop = this.shadowRoot.querySelector('.yearly');
    const tabContainer = this.shadowRoot.querySelector('.yearly-item-container');
    const childLength = tabContainer.children.length;

    // Removes the highlights from all of the tabs
    this.removeHighlight();

    this.closeContainers();

    // Checks to see if the tab is already expanded or not.
    if (childLength === 0) {
      this.closeContainers();
      // Highlights the currently selected tab.
      yearlyDrop.classList.add('navbar-tab-highlighted');

      let dateStr;

      // Add the options to the flex box to align the items.
      for (let i = 0; i < 5; i++) {
        dateStr = parseInt(viewedDate.year) + currYearOffset + '-' + months[0] + '-1';
        const newContainer = document.createElement('div');
        const newArrow = document.createElement('img');
        const newSpan = document.createElement('span');

        newContainer.classList.add('navbar-tab-lvl2');
        newArrow.classList.add('navbar-tab-arrow');
        newSpan.classList.add('navbar-tab-item');

        newArrow.src = '../imgs/chevron-right.svg';
        newSpan.innerHTML = parseInt(viewedDate.year) + currYearOffset;
        newContainer.setAttribute('date', dateStr);

        newContainer.addEventListener('click', () => {
          viewedDate = decodeDateInfo(newContainer.getAttribute('date'));
          document.querySelector('journal-entry').setAttribute('date', (viewedDate.year + '-' + viewedDate.month + '-' + viewedDate.day));
          document.querySelector('journal-entry').validateEntry();
          document.querySelector('journal-entry').loadEntry();
        });

        newContainer.appendChild(newArrow);
        newContainer.appendChild(newSpan);
        tabContainer.appendChild(newContainer);

        currYearOffset++;
      }

      yearlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-down-solid.svg';
    }
  }

  // Adds the options under the month tab
  generateMonthlyDates () {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const monthlyDrop = this.shadowRoot.querySelector('.monthly');
    const tabContainer = this.shadowRoot.querySelector('.monthly-item-container');
    const childLength = tabContainer.children.length;

    // Removes the highlights from all of the tabs
    this.removeHighlight();

    this.closeContainers();

    // Checks to see if the tab is already expanded or not.
    if (childLength === 0) {
      this.closeContainers();
      // Highlights the currently selected tab.
      monthlyDrop.classList.add('navbar-tab-highlighted');

      let dateStr;

      // Add the options to the flex box to align the items.
      for (let i = 0; i < 12; i++) {
        dateStr = viewedDate.year + '-' + months[i] + '-1';
        const newContainer = document.createElement('div');
        const newArrow = document.createElement('img');
        const newSpan = document.createElement('span');

        newContainer.classList.add('navbar-tab-lvl2');
        newArrow.classList.add('navbar-tab-arrow');
        newSpan.classList.add('navbar-tab-item');

        newArrow.src = '../imgs/chevron-right.svg';
        newSpan.innerHTML = this.capitalizeFirstLetter(months[i].toLowerCase());
        newContainer.setAttribute('date', dateStr);

        newContainer.addEventListener('click', () => {
          viewedDate = decodeDateInfo(newContainer.getAttribute('date'));
          document.querySelector('journal-entry').setAttribute('date', (viewedDate.year + '-' + viewedDate.month + '-' + viewedDate.day));
          document.querySelector('journal-entry').validateEntry();
          document.querySelector('journal-entry').loadEntry();
        });

        newContainer.appendChild(newArrow);
        newContainer.appendChild(newSpan);
        tabContainer.appendChild(newContainer);
      }

      monthlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-down-solid.svg';
    }
  }

  generateDailyDates () {
    const dailyDrop = this.shadowRoot.querySelector('.daily');
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const dateObj = new Date();
    const viewedDateObj = new Date(Date.parse(viewedDate.year + ' ' + viewedDate.month + ' ' + viewedDate.day));
    const dateInMS = viewedDateObj.getTime();
    const timeZoneOffset = viewedDateObj.getTimezoneOffset() * 60000;
    const dayOffSet = 86400000;
    let currOffset = dayOffSet * (-3);
    const localTime = dateInMS + timeZoneOffset;
    const tabContainer = this.shadowRoot.querySelector('.daily-item-container');
    const childLength = tabContainer.children.length;

    // Removes the highlights from all of the tabs
    this.removeHighlight();

    let dateStr;

    this.closeContainers();

    // Checks to see if the tab is already expanded or not.
    if (childLength === 0) {
      this.closeContainers();
      // Highlights the currently selected tab.
      dailyDrop.classList.add('navbar-tab-highlighted');

      // Add the options to the flex box to align the items.
      for (let i = 0; i < 7; i++) {
        dateObj.setTime(localTime + currOffset);
        dateStr = dateObj.getFullYear() + '-' + months[dateObj.getMonth()] + '-' + dateObj.getDate();
        const newContainer = document.createElement('div');
        const newArrow = document.createElement('img');
        const newSpan = document.createElement('span');

        newContainer.classList.add('navbar-tab-lvl2');
        newArrow.classList.add('navbar-tab-arrow');
        newSpan.classList.add('navbar-tab-item');

        newArrow.src = '../imgs/chevron-right.svg';
        newSpan.innerHTML = this.capitalizeFirstLetter(months[dateObj.getMonth()].toLowerCase()) + ' ' + dateObj.getDate() + ' ' + dateObj.getFullYear();
        newContainer.setAttribute('date', dateStr);

        newContainer.addEventListener('click', () => {
          viewedDate = decodeDateInfo(newContainer.getAttribute('date'));
          document.querySelector('journal-entry').setAttribute('date', (viewedDate.year + '-' + viewedDate.month + '-' + viewedDate.day));
          document.querySelector('journal-entry').validateEntry();
          document.querySelector('journal-entry').loadEntry();
        });

        newContainer.appendChild(newArrow);
        newContainer.appendChild(newSpan);
        tabContainer.appendChild(newContainer);

        currOffset += dayOffSet;
      }

      dailyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-down-solid.svg';
    }
  }

  // From https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
  capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  closeContainers () {
    const dailyDrop = this.shadowRoot.querySelector('.daily');
    const monthlyDrop = this.shadowRoot.querySelector('.monthly');
    const yearlyDrop = this.shadowRoot.querySelector('.yearly');

    const yearlyContainer = this.shadowRoot.querySelector('.yearly-item-container');
    const monthlyContainer = this.shadowRoot.querySelector('.monthly-item-container');
    const dailyContainer = this.shadowRoot.querySelector('.daily-item-container');

    while (yearlyContainer.firstChild !== null ||
      monthlyContainer.firstChild !== null ||
      dailyContainer.firstChild !== null
    ) {
      // Removes the options if the tab is already expanded
      if (yearlyContainer.firstChild !== null) { yearlyContainer.removeChild(yearlyContainer.lastChild); }

      if (monthlyContainer.firstChild !== null) { monthlyContainer.removeChild(monthlyContainer.lastChild); }

      if (dailyContainer.firstChild !== null) { dailyContainer.removeChild(dailyContainer.lastChild); }
    }

    dailyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-right.svg';
    monthlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-right.svg';
    yearlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-right.svg';
  }
}

customElements.define('nav-bar', navBar);
