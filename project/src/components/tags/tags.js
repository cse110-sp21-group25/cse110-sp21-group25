class TagBujo extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
      <link rel='stylesheet' href='./components/tags/tags.css'>
      <div class='tag-container'>
      <div class='tags'></div>
       <button class='show-tag-creator-btn'>+</button>
       </div>
      `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('.show-tag-creator-btn').addEventListener('click', (e) => {
      this.showTagCreator(e);
    });
    this.loadTags();
  }

  deleteTag (e) {
    const tagsContainer = this.shadowRoot.querySelector('.tags');

    tagsContainer.removeChild(e.currentTarget.parentNode);
    this.saveTags();
  }

  showTagEditor (e) {
    const parentContainer = this.shadowRoot.querySelector('.tag-container');
    const showTagCreatorBtn = this.shadowRoot.querySelector('.show-tag-creator-btn');

    const tagCreator = parentContainer.querySelector('.tag-creator');

    if (tagCreator !== null) {
      parentContainer.removeChild(tagCreator);
    }

    showTagCreatorBtn.style.visibility = 'hidden';
    const tag = e.currentTarget;

    const editorContainer = document.createElement('div');
    editorContainer.classList.add('tag-editor');

    let colorText = document.createElement('span');
    colorText.classList.add('tag-editor-color-text');
    colorText.innerHTML = 'Tag Color:';

    let colorPicker = document.createElement('input');

    colorPicker.classList.add('tag-color-picker');
    colorPicker.type = 'color';
    colorPicker.value = tag.getAttribute('tagColor');

    let tagName = document.createElement('span');
    tagName.classList.add('tag-creator-tag-name');
    tagName.innerHTML = 'Tag Name:';

    let textbox = document.createElement('input');

    textbox.classList.add('tag-editor-textbox');
    textbox.type = 'text';
    textbox.placeholder = 'Enter your tag';
    textbox.value = tag.querySelector('.tag-text').innerHTML;

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('tag-editor-confirm-btn');
    confirmBtn.innerHTML = '✓';

    confirmBtn.addEventListener('click', () => {
      tag.querySelector('.tag-text').innerHTML = textbox.value;
      tag.style.backgroundColor = colorPicker.value;
      tag.setAttribute('tagColor', colorPicker.value);
      parentContainer.removeChild(editorContainer);
      showTagCreatorBtn.style.visibility = 'visible';

      this.saveTags();
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('tag-editor-cancel-btn');
    cancelBtn.innerHTML = 'X';

    cancelBtn.addEventListener('click', () => {
      parentContainer.removeChild(editorContainer);
      showTagCreatorBtn.style.visibility = 'visible';
    });

    editorContainer.append(colorText);
    editorContainer.append(colorPicker);
    editorContainer.append(tagName);
    editorContainer.append(textbox);
    editorContainer.append(confirmBtn);
    editorContainer.append(cancelBtn);
    parentContainer.append(editorContainer);
  }

  addTag (e) {
    const parentContainer = this.shadowRoot.querySelector('.tag-container');
    const tagsContainer = this.shadowRoot.querySelector('.tags');
    const text = parentContainer.querySelector('.tag-textbox').value.trim();
    const tagColor = parentContainer.querySelector('.tag-color-picker').value;

    if (text !== '') {
      const newTag = document.createElement('div');
      newTag.classList.add('tag');
      newTag.style.backgroundColor = tagColor;
      newTag.setAttribute('tagColor', tagColor);

      newTag.addEventListener('dblclick', (e) => {
        this.showTagEditor(e);
      });

      const tagText = document.createElement('span');
      tagText.classList.add('tag-text');
      tagText.innerHTML = text;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('tag-delete-btn');
      deleteBtn.innerHTML = 'x';
      deleteBtn.style.visibility = 'hidden';
      deleteBtn.addEventListener('click', (e) => {
        this.deleteTag(e);
      });

      newTag.appendChild(tagText);
      newTag.append(deleteBtn);

      newTag.addEventListener('mouseover', (e) => {
        const deleteBtn = e.currentTarget.querySelector('.tag-delete-btn');

        deleteBtn.style.visibility = 'visible';
      });
      newTag.addEventListener('mouseout', (e) => {
        const deleteBtn = e.currentTarget.querySelector('.tag-delete-btn');
        deleteBtn.style.visibility = 'hidden';
      });

      tagsContainer.appendChild(newTag);
      this.saveTags();
    }
  }

  closeCreator (e) {
    const parentContainer = this.shadowRoot.querySelector('.tag-container');
    const showTagCreatorBtn = this.shadowRoot.querySelector('.show-tag-creator-btn');
    const creator = parentContainer.querySelector('.tag-creator');

    parentContainer.removeChild(creator);
    showTagCreatorBtn.style.visibility = 'visible';
  }

  showTagCreator () {
    const parentContainer = this.shadowRoot.querySelector('.tag-container');
    const showTagCreatorBtn = this.shadowRoot.querySelector('.show-tag-creator-btn');

    showTagCreatorBtn.style.visibility = 'hidden';
    const container = document.createElement('div');
    container.classList.add('tag-creator');

    let colorText = document.createElement('span');
    colorText.classList.add('tag-creator-color-text');
    colorText.innerHTML = 'Tag Color:';

    let colorPicker = document.createElement('input');

    colorPicker.classList.add('tag-color-picker');
    colorPicker.type = 'color';
    colorPicker.value = '#C0C0C0';

    let tagName = document.createElement('span');
    tagName.classList.add('tag-creator-tag-name');
    tagName.innerHTML = 'Tag Name:';

    let textbox = document.createElement('input');

    textbox.classList.add('tag-textbox');
    textbox.name = 'textbox';
    textbox.type = 'text';
    textbox.placeholder = 'Enter your tag';

    const addBtn = document.createElement('button');
    addBtn.classList.add('add-tag-btn');
    addBtn.innerHTML = '+';
    addBtn.addEventListener('click', (e) => {
      this.addTag(e);
    });

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-editor-btn');
    closeBtn.innerHTML = 'X';
    closeBtn.addEventListener('click', () => {
      this.closeCreator();
    });

    container.appendChild(colorText);
    container.appendChild(colorPicker);
    container.appendChild(tagName);
    container.appendChild(textbox);
    container.appendChild(addBtn);
    container.appendChild(closeBtn);
    parentContainer.appendChild(container);
  }

  saveTags () {
    const tagsContainer = this.shadowRoot.querySelector('.tags');
    const tags = tagsContainer.querySelectorAll('.tag');
    const arrToPush = [];

    tags.forEach((element) => {
      arrToPush.push({ text: element.innerText, tagColor: element.getAttribute('tagColor') });
    });

    storage[viewedDate.year][viewedDate.month][viewedDate.day].tags = arrToPush;
    saveStorage();
  }

  loadTags () {
    const tagsContainer = this.shadowRoot.querySelector('.tags');
    const tagList = storage[viewedDate.year][viewedDate.month][viewedDate.day].tags;
    this.deleteTags();

    tagList.forEach((element) => {
      const newTag = document.createElement('div');
      newTag.classList.add('tag');
      newTag.style.backgroundColor = element.tagColor;
      newTag.setAttribute('tagColor', element.tagColor);

      newTag.addEventListener('dblclick', (e) => {
        if( this.shadowRoot.querySelector('.tag-container').querySelectorAll('.tag-editor').length !== 0 )
          this.closeEditor();
        this.showTagEditor(e);
      });

      const tagText = document.createElement('span');
      tagText.classList.add('tag-text');
      tagText.innerHTML = element.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('tag-delete-btn');
      deleteBtn.innerHTML = 'x';
      deleteBtn.style.visibility = 'hidden';
      deleteBtn.addEventListener('click', (e) => {
        this.deleteTag(e);
      });

      newTag.appendChild(tagText);
      newTag.append(deleteBtn);

      newTag.addEventListener('mouseover', (e) => {
        const deleteBtn = e.currentTarget.querySelector('.tag-delete-btn');

        deleteBtn.style.visibility = 'visible';
      });
      newTag.addEventListener('mouseout', (e) => {
        const deleteBtn = e.currentTarget.querySelector('.tag-delete-btn');
        deleteBtn.style.visibility = 'hidden';
      });

      tagsContainer.appendChild(newTag);
    });
  }

  deleteTags () {
    const tagList = this.shadowRoot.querySelector('.tags').querySelectorAll('div');

    tagList.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

  closeEditor () {
    const parentContainer = this.shadowRoot.querySelector('.tag-container');
    const showTagCreatorBtn = this.shadowRoot.querySelector('.show-tag-creator-btn');
    const creator = parentContainer.querySelector('.tag-editor');

    parentContainer.removeChild(creator);
    showTagCreatorBtn.style.visibility = 'visible';
  }
}

window.customElements.define('tag-bujo', TagBujo);
