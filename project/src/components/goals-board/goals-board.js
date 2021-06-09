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
                  <!-- Container for the button buttons (calendar view and edit) -->
                  <div class="goals-board-footer">
                    <div class="goals-board-footer-edit">
                      <button type="button" class="cancel-btn">Cancel</button>
                      <button type="button" class="apply-btn">Apply</button>
                    </div>
                    <div class="goals-board-footer-default">
                      <img src="../imgs/icon-edit.svg" height="30px" width="30px" class="edit-btn"/>
                      <img src="../imgs/icon-calendar.svg" height="30px" width="30px" class="calendar-btn"/>
                    </div>
                  </div>
                </div>
             `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Gets called after the web component is loaded in
   * Mainly adds event listeners
   */
  connectedCallback () {
    // Selecting html elements from the shadowRoot
    const checkList = this.shadowRoot.querySelector('.goals-checklist');
    const weeklyBtn = this.shadowRoot.querySelector('.weeklyBtn');
    const monthlyBtn = this.shadowRoot.querySelector('.monthlyBtn');
    const editBtn = this.shadowRoot.querySelector('.edit-btn');
    const applyChangesBtn = this.shadowRoot.querySelector('.apply-btn');
    const cancelChangesBtn = this.shadowRoot.querySelector('.cancel-btn');
    const editFooter = this.shadowRoot.querySelector('.goals-board-footer-edit');

    // The 2 footers are overlapping so we want the edit one to be hidden by default
    editFooter.style.visibility = 'hidden';

    /**
       * EventListener for the weekly button to toggle colors and update the goals-checklist div to feature
       * all of the weekly goals.
       */
    weeklyBtn.addEventListener('click', () => {
      if (editFooter.style.visibility === 'visible') {
        this.toggleFooterVisibility(true);
      }
      this.unSelect();
      weeklyBtn.classList.add('selected');
      this.removeGoals(checkList);
      this.loadGoals();
    });

    /**
       * EventListener for the monthly button to toggle colors and update the goals-checklist div to feature
       * all of the monthly goals.
       */
    monthlyBtn.addEventListener('click', () => {
      if (editFooter.style.visibility === 'visible') {
        this.toggleFooterVisibility(true);
      }
      this.unSelect();
      monthlyBtn.classList.add('selected');
      this.removeGoals(checkList);
      this.loadGoals();
    });

    // Sets the goals board to edit mode
    editBtn.addEventListener('click', () => {
      this.toggleFooterVisibility();
      this.toggleDelBtns();
      this.shadowRoot.querySelector('.goals-checklist').lastChild.style.visibility = 'visible';
      this.saveGoals();
    });

    // Sets the goals board back to default without updating the content
    cancelChangesBtn.addEventListener('click', () => {
      this.toggleFooterVisibility();
      this.toggleDelBtns();
      this.shadowRoot.querySelector('.goals-checklist').lastChild.style.visibility = 'hidden';
      this.loadGoals();
    });

    // Sets the goals board back to default while updating the content
    applyChangesBtn.addEventListener('click', () => {
      this.toggleFooterVisibility();
      this.toggleDelBtns();
      this.shadowRoot.querySelector('.goals-checklist').lastChild.style.visibility = 'hidden';
      this.saveGoals();
      this.loadGoals();
    });

    // Sets the the weekly goals to be the default value on load by simulating click on weeklyBtn
    const defaultState = new Event('click');
    weeklyBtn.dispatchEvent(defaultState);

    this.loadGoals();
  }

  /**
   * Switches between the edit mode buttons and the display mode buttons
   * If editSwitch is true than the edit footer will be hidden and the default footer will display
   * @param {boolean} editSwitch - is the edit menu open when the weekly/monthly button is pressed
   */
  toggleFooterVisibility (editSwitch = false) {
    const editFooter = this.shadowRoot.querySelector('.goals-board-footer-edit');
    const defaultFooter = this.shadowRoot.querySelector('.goals-board-footer-default');

    // Toggles between the editFooter and the defaultFooter
    if (editFooter.style.visibility === 'hidden') {
      editFooter.style.visibility = 'visible';
      defaultFooter.style.visibility = 'hidden';
    } else {
      editFooter.style.visibility = 'hidden';
      defaultFooter.style.visibility = 'visible';
    }

    // Selecting the weekly or monthly button while the edit footer is
    // visible will hide the edit footer and display the default footer
    if (editSwitch) {
      editFooter.style.visibility = 'hidden';
      defaultFooter.style.visibility = 'visible';
    }
  }

  /**
   * Toggles the visibility of the delete buttons for each goal
   */
  toggleDelBtns () {
    const delBtns = this.shadowRoot.querySelectorAll('.checkbox-container > button');

    delBtns.forEach((element) => {
      element.style.visibility = element.style.visibility === 'visible' ? 'hidden' : 'visible';
    });
  }

  /**
   * Untoggles the color change in the weekly and monthly buttons by removing the class 'selected'
   */
  unSelect () {
    this.shadowRoot.querySelector('.monthlyBtn').classList.remove('selected');
    this.shadowRoot.querySelector('.weeklyBtn').classList.remove('selected');
  }

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
  addGoal (content) {
    // Create all of the html elements
    const newContainer = document.createElement('div');
    const newDelBtn = document.createElement('button');
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    const checkListContainer = this.shadowRoot.querySelector('.goals-checklist');

    // Add the correct classes, set the attributes for the checkbox and place the description
    // in the label. On top of that, it creates a delete btn.
    newContainer.classList.add('checkbox-container');
    newDelBtn.type = 'button';
    newDelBtn.innerHTML = 'X';
    newDelBtn.style.visibility = 'hidden';
    newLabel.classList.add('checkbox-desc');
    newInput.type = 'checkbox';
    newInput.checked = content.checked;
    newLabel.innerHTML = content.text;

    // Event listener that deletes the goal it is a part of
    newDelBtn.addEventListener('click', () => {
      checkListContainer.removeChild(newDelBtn.parentElement);
    });

    // Event listener that deletes the goal it is a part of
    newInput.addEventListener('click', () => {
      this.saveGoals();
    });

    // Append the checkbox and label into the new container and append the container to the
    // goals-checklist div. It also appends the delete button first.
    newContainer.appendChild(newDelBtn);
    newContainer.appendChild(newInput);
    newContainer.appendChild(newLabel);
    checkListContainer.appendChild(newContainer);
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
  addGoals (goalList) {
    const checkList = this.shadowRoot.querySelector('.goals-checklist');
    checkList.innerHTML = '';

    for (let i = 0; i < goalList.length; i++) {
      this.addGoal(goalList[i]);
    }

    // Creates goal container that can be edited and makes it hidden by default
    this.createEditableGoal();
    this.shadowRoot.querySelector('.goals-checklist').lastChild.style.visibility = 'hidden';
  }

  /**
   * Removes all the current goals being displayed in the goals-checkList div
   * @param {div} checkList - link to the goals-checklist div
   */
  removeGoals (checkList) {
    // Loops through all of the goals in checkList and removes them all
    while (checkList.children.length > 0) {
      checkList.removeChild(checkList.children[0]);
    }
  }

  /**
   * Creates the last element in the goals-board when the edit mode is turned on.
   * This is the element with the white background to type in and disabled delete button.
   */
  createEditableGoal () {
    // Create all of the html elements
    const newContainer = document.createElement('div');
    const newDelBtn = document.createElement('button');
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    const checkList = this.shadowRoot.querySelector('.goals-checklist');

    // Add the correct classes, set the attributes for the checkbox and place the description
    // in the label. On top of that, it creates a delete btn.
    newContainer.classList.add('checkbox-container');
    newDelBtn.type = 'button';
    newDelBtn.innerHTML = 'X';
    newDelBtn.disabled = true;
    newLabel.classList.add('checkbox-desc');
    newLabel.classList.add('editable');
    newLabel.contentEditable = true;
    newInput.type = 'checkbox';

    // Event listenr creates another editable goal when the current editable goal is written to
    newLabel.addEventListener('input', () => {
      if (newLabel.innerHTML !== '' && checkList.lastChild === newLabel.parentElement) {
        this.createEditableGoal();
      }
      newDelBtn.disabled = false;
    });

    // Event listener that deletes the goal it is a part of
    newDelBtn.addEventListener('click', () => {
      checkList.removeChild(newDelBtn.parentElement);
    });

    // Append the checkbox and label into the new container and append the container to the
    // goals-checklist div. It also appends the delete button first.
    newContainer.appendChild(newDelBtn);
    newContainer.appendChild(newInput);
    newContainer.appendChild(newLabel);
    checkList.appendChild(newContainer);
  }

  /**
   * Method that saves all of the weekly or monthly goals depending on which one is currently selected
   */
  saveGoals () {
    const checkList = this.shadowRoot.querySelector('.goals-checklist').querySelectorAll('.checkbox-container');
    const isoWeek = storage[viewedDate.year][viewedDate.month][viewedDate.day].WEEK;
    const currGoals = [];

    // Ensures that the array we are saving to exists in the storage variable
    if (storage[viewedDate.year].ISOWEEKS[isoWeek] === undefined) {
      storage[viewedDate.year].ISOWEEKS[isoWeek] = [];
    }

    // Ensures that the array we are saving to exists in the storage variable
    if (storage[viewedDate.year][viewedDate.month].GOALS === undefined) {
      storage[viewedDate.year][viewedDate.month].GOALS = [];
    }

    // Iterates through all of the elements and saves them to the storage variable
    checkList.forEach((element) => {
      const desc = element.querySelector('.checkbox-desc').innerHTML;
      const isChecked = element.querySelector('input').checked;

      if (element.querySelector('.checkbox-desc').innerHTML !== '') {
        currGoals.push({ text: desc, checked: isChecked });
        if (this.shadowRoot.querySelector('.selected').value === 'Weekly') {
          storage[viewedDate.year].ISOWEEKS[isoWeek] = currGoals;
        } else {
          storage[viewedDate.year][viewedDate.month].GOALS = currGoals;
        }
      }
    });

    saveStorage();
  }

  /**
   * Loads timing
   */
  loadGoals () {
    console.log('Loading goals');
    let weeklyGoals = [];
    let monthlyGoals = [];
    if (!entryExists(viewedDate)) {
      createEntry(viewedDate);
    }
    const isoWeek = storage[viewedDate.year][viewedDate.month][viewedDate.day].WEEK;

    if (storage[viewedDate.year].ISOWEEKS[isoWeek] !== undefined) {
      weeklyGoals = storage[viewedDate.year].ISOWEEKS[isoWeek];
    }

    if (storage[viewedDate.year].ISOWEEKS[isoWeek] !== undefined) {
      monthlyGoals = storage[viewedDate.year][viewedDate.month].GOALS;
    }

    if (this.shadowRoot.querySelector('.selected').value === 'Weekly') {
      this.addGoals(weeklyGoals);
    } else {
      this.addGoals(monthlyGoals);
    }
  }
}

window.customElements.define('goals-board', goalsBoard);
