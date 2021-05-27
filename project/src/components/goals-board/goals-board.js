/* global HTMLElement, Event */

/** Goals Board Web Component */
class goalsBoard extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
                <link rel="stylesheet" href="./components/goals-board/goals-board.css">
                <meta name="viewport" content="width=device-width, initial-scale=1">
  
                <!-- Container for the entire component (orange bg, flexbox set to column) -->
                <div class="goals-board-container">
                  <!-- Container for the buttons on top (red bg, flexbox set to row) -->
                  <div class="goals-button-container">
                      <input type="button" class="goalBtn weeklyBtn" value="Weekly">
                      <input type="button" class="goalBtn monthlyBtn" value="Monthly">
                  </div>
                  <!-- Container for all of the goals (flexbox set to column) -->
                  <div class="goals-checklist">
                  </div>
                </div>
             `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Selecting html elements from the shadowRoot
    const checkList = this.shadowRoot.querySelector('.goals-checklist');
    const weeklyBtn = this.shadowRoot.querySelector('.weeklyBtn');
    const monthlyBtn = this.shadowRoot.querySelector('.monthlyBtn');

    // Dummy weekly and monthly goals initialization
    const weeklyGoals = [{ text: 'Update Skeleton', checked: true, parent: checkList }, { text: 'Buy groceries', checked: false, parent: checkList }];
    const monthlyGoals = [{ text: 'Order lightbulbs', checked: true, parent: checkList }, { text: 'Finish project', checked: false, parent: checkList }];

    /**
       * Adds 1 goal to the goals-checklist div.
       * @param {JSON} content - JSON that contains 3 properties (check below for more info)
       * content's JSON format
       * - text: the goal's message
       * - checked: determines if checkbox should be checked
       * - parent (constant) - direct link to goals-checklist div
       *
       * @example
       * // addGoals({ text: 'Update Skeleton', checked: true, parent: checkList });
       */
    function addGoal (content) {
      // Create all of the html elements
      const newContainer = document.createElement('div');
      const newInput = document.createElement('input');
      const newLabel = document.createElement('label');

      // Add the correct classes, set the attributes for the checkbox and place the description
      // in the label.
      newContainer.classList.add('checkbox-container');
      newLabel.classList.add('checkbox-desc');
      newInput.type = 'checkbox';
      newInput.checked = content.checked;
      newLabel.innerHTML = content.text;

      // Append the checkbox and label into the new container and append the container to the
      // goals-checklist div.
      newContainer.appendChild(newInput);
      newContainer.appendChild(newLabel);
      content.parent.appendChild(newContainer);
    }

    /**
       * Adds all the goals found in the goalList parameter into the goals-checklist div
       * @param {JSON[]} goalList - array of JSON elements
       * JSON format
       * - text: the goal's message
       * - checked: determines if checkbox should be checked
       * - parent (constant) - direct link to goals-checklist div
       *
       * @example
       * // addGoals([{ text: 'Update Skeleton', checked: true, parent: checkList }, { text: 'Buy groceries', checked: false, parent: checkList }]);
       */
    function addGoals (goalList) {
      for (let i = 0; i < goalList.length; i++) {
        addGoal(goalList[i]);
      }
    }

    /**
       * Removes all the current goals being displayed in the goals-checkList div
       * @param {<div>} checkList - link to the goals-checklist div
       */
    function removeGoals (checkList) {
      // Loops through all of the goals in checkList and removes them all
      while (checkList.children.length > 0) {
        checkList.removeChild(checkList.children[0]);
      }
    }

    /**
       * Untoggles the color change in the weekly and monthly buttons by removing the class 'selected'
       */
    function unSelect () {
      weeklyBtn.classList.remove('selected');
      monthlyBtn.classList.remove('selected');
    }

    /**
       * EventListener for the weekly button to toggle colors and update the goals-checklist div to feature
       * all of the weekly goals.
       */
    weeklyBtn.addEventListener('click', () => {
      unSelect();
      weeklyBtn.classList.add('selected');
      removeGoals(checkList);
      addGoals(weeklyGoals);
    });

    /**
       * EventListener for the monthly button to toggle colors and update the goals-checklist div to feature
       * all of the monthly goals.
       */
    monthlyBtn.addEventListener('click', () => {
      unSelect();
      monthlyBtn.classList.add('selected');
      removeGoals(checkList);
      addGoals(monthlyGoals);
    });

    // Sets the the weekly goals to be the default value on load by simulating click on weeklyBtn
    const defaultState = new Event('click');
    weeklyBtn.dispatchEvent(defaultState);
  }
}

window.customElements.define('goals-board', goalsBoard);
