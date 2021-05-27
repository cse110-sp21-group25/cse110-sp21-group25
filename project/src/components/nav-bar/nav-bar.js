
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
    let yearlyToggle = false;
    let monthlyToggle = false;
    let dailyToggle = false;

    // Removes the highlight from the individual tabs
    function removeHighlight () {
      yearlyDrop.classList.remove('navbar-tab-highlighted');
      monthlyDrop.classList.remove('navbar-tab-highlighted');
      dailyDrop.classList.remove('navbar-tab-highlighted');
    }

    // Toggle the image on the focus button.
    focusIcon.addEventListener('click', () => {
      if (focusToggle) {
        focusIcon.src = '../imgs/eye-slash-solid.svg';
      } else {
        focusIcon.src = '../imgs/eye.svg';
      }

      focusToggle = !focusToggle;
    });

    // Adds the options under the year tab
    yearlyDrop.addEventListener('click', () => {
      const tabContainer = this.shadowRoot.querySelector('.yearly-item-container');
      const childLength = tabContainer.children.length;

      // Removes the highlights from all of the tabs
      removeHighlight();

      if (yearlyToggle) {
        yearlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-right.svg';
      } else {
        yearlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-down-solid.svg';
      }

      yearlyToggle = !yearlyToggle;

      // Checks to see if the tab is already expanded or not.
      if (childLength > 0) {
        // Removes the options if the tab is already expanded
        while (tabContainer.firstChild !== null) {
          tabContainer.removeChild(tabContainer.lastChild);
        }
      } else {
        // Highlights the currently selected tab.
        yearlyDrop.classList.add('navbar-tab-highlighted');

        // Add the options to the flex box to align the items.
        for (let i = 0; i < 5; i++) {
          const newContainer = document.createElement('div');
          const newArrow = document.createElement('img');
          const newAnchor = document.createElement('a');

          newContainer.classList.add('navbar-tab-lvl2');
          newArrow.classList.add('navbar-tab-arrow');
          newAnchor.classList.add('navbar-tab-item');

          newArrow.src = '../imgs/chevron-right.svg';
          newAnchor.href = 'https://www.google.com/';
          newAnchor.target = '_blank';
          newAnchor.innerHTML = 'Option ' + (i + 1);

          newContainer.appendChild(newArrow);
          newContainer.appendChild(newAnchor);
          tabContainer.appendChild(newContainer);
        }
      }
    });

    // Adds the options under the month tab
    monthlyDrop.addEventListener('click', () => {
      const tabContainer = this.shadowRoot.querySelector('.monthly-item-container');
      const childLength = tabContainer.children.length;

      // Removes the highlights from all of the tabs
      removeHighlight();

      if (monthlyToggle) {
        monthlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-right.svg';
      } else {
        monthlyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-down-solid.svg';
      }

      monthlyToggle = !monthlyToggle;

      // Checks to see if the tab is already expanded or not.
      if (childLength > 0) {
        while (tabContainer.firstChild !== null) {
          // Removes the options if the tab is already expanded
          tabContainer.removeChild(tabContainer.lastChild);
        }
      } else {
        // Highlights the currently selected tab.
        monthlyDrop.classList.add('navbar-tab-highlighted');

        // Add the options to the flex box to align the items.
        for (let i = 0; i < 5; i++) {
          const newContainer = document.createElement('div');
          const newArrow = document.createElement('img');
          const newAnchor = document.createElement('a');

          newContainer.classList.add('navbar-tab-lvl2');
          newArrow.classList.add('navbar-tab-arrow');
          newAnchor.classList.add('navbar-tab-item');

          newArrow.src = '../imgs/chevron-right.svg';
          newAnchor.href = 'https://www.google.com/';
          newAnchor.target = '_blank';
          newAnchor.innerHTML = 'Option ' + (i + 1);

          newContainer.appendChild(newArrow);
          newContainer.appendChild(newAnchor);
          tabContainer.appendChild(newContainer);
        }
      }
    });

    // Adds the options under the daily tab
    dailyDrop.addEventListener('click', () => {
      const tabContainer = this.shadowRoot.querySelector('.daily-item-container');
      const childLength = tabContainer.children.length;

      // Removes the highlights from all of the tabs
      removeHighlight();

      if (dailyToggle) {
        dailyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-right.svg';
      } else {
        dailyDrop.querySelector('.navbar-tab-arrow').src = '../imgs/chevron-down-solid.svg';
      }

      dailyToggle = !dailyToggle;

      // Checks to see if the tab is already expanded or not.
      if (childLength > 0) {
        // Removes the options if the tab is already expanded
        while (tabContainer.firstChild !== null) {
          tabContainer.removeChild(tabContainer.lastChild);
        }
      } else {
        // Highlights the currently selected tab.
        dailyDrop.classList.add('navbar-tab-highlighted');

        // Add the options to the flex box to align the items.
        for (let i = 0; i < 5; i++) {
          const newContainer = document.createElement('div');
          const newArrow = document.createElement('img');
          const newAnchor = document.createElement('a');

          newContainer.classList.add('navbar-tab-lvl2');
          newArrow.classList.add('navbar-tab-arrow');
          newAnchor.classList.add('navbar-tab-item');

          newArrow.src = '../imgs/chevron-right.svg';
          newAnchor.href = 'https://www.google.com/';
          newAnchor.target = '_blank';
          newAnchor.innerHTML = 'Option ' + (i + 1);

          newContainer.appendChild(newArrow);
          newContainer.appendChild(newAnchor);
          tabContainer.appendChild(newContainer);
        }
      }
    });
  }
}

customElements.define('nav-bar', navBar);
