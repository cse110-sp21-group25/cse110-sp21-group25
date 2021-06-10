
let sample = localStorage.getItem('sample');
console.log(sample);
if (sample === null) {
  console.log('here');
  sample = [];
} else {
  sample = JSON.parse(sample);
}
console.log(sample);
class tagBujo extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
      <link rel="stylesheet" href="./components/tags/tags.css">
        <div class="tag">
          <span></span>
          <button id = 'deleter' class="deleter">&#10005</button>
        </div>
      `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('#deleter').addEventListener('click', function (event) {
      this.parentNode.remove();
      for (let i = 0; i < sample.length; i++) {
        if (sample[i].text === this.parentNode.id) {
          sample.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('sample', JSON.stringify(sample));
      console.log(sample);
    });
  }

  /**
 * Returns the tag value
 * @returns {tag}
 */
  get tag () {
    return this.getAttribute('tag');
  }

  /**
 * This functions sets the value of the tag fields:
 *
 * As a result our HTML element will contain the text and color specified in the tag passed
 *
 *
 * @param {tag} tag: tag object that has values text and color
 */
  set tag (tag) {
    const currTag = this.shadowRoot;
    const text = currTag.querySelector('span');
    const tagid = currTag.querySelector('div');
    tagid.setAttribute('id', tag.text);
    tagid.style.backgroundColor = tag.color;
    text.textContent = tag.text;
    this.setAttribute('id', tag.text);
    this.setAttribute('color', tag.color);
    this.style.margin = 1;
  }
}

window.customElements.define('tag-bujo', tagBujo);

class addHolder extends HTMLElement {
  constructor () {
    super();
    const template = document.createElement('template');
    // Linter won't let me add it otherwise
    template.innerHTML = `
      <link rel="stylesheet" href="./components/tags/add.css">
      <div class="row">
      <input id= "color-picker" type="color"  value="#C0C0C0"> 
      <input id="add-textfield" name="textfield" type="text" placeholder="Enter your tag">
      <button id = "add-tag" type = "submit">+</button>
      </div>
      `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('#add-tag').addEventListener('click', function (event) {
      console.log(this.parentNode.querySelector('#add-textfield').value);
      if (this.parentNode.querySelector('#add-textfield').value !== '') {
        const newTag = document.createElement('tag-bujo');

        newTag.tag = { text: this.parentNode.querySelector('#add-textfield').value, color: this.parentNode.querySelector('#color-picker').value };

        this.parentNode.appendChild(newTag);

        sample.push({ text: this.parentNode.querySelector('#add-textfield').value, color: this.parentNode.querySelector('#color-picker').value });
        this.parentNode.querySelector('#add-textfield').value = '';
        localStorage.setItem('sample', JSON.stringify(sample));
      }
    });

    this.shadowRoot.querySelector('#add-textfield').addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.parentNode.querySelector('#add-tag').click();
      }
    });

    //   document.body.appendChild(tagholder);
    //   const summon = document.querySelector('journal-entry').shadowRoot.getElementById('tag-holder');
    //   console.log(sample.length);
    window.setTimeout(() => {
      for (let i = 0; i < sample.length; i++) {
        console.log(i);
        const newTag = document.createElement('tag-bujo');
        newTag.tag = sample[i];
        this.parentNode.appendChild(newTag);
      }
    }, 500);
  }
}

window.customElements.define('add-holder', addHolder);

// document.querySelector('journal-entry').shadowRoot.querySelector('#add-tag').addEventListener('click', function (event) {
//   if (this.getRootNode().getElementById('add-textfield').value !== '') {
//     const newTag = document.createElement('tag-bujo');
//     newTag.tag = { text: document.querySelector('journal-entry').shadowRoot.querySelector('#add-textfield').value, color: document.querySelector('journal-entry').shadowRoot.querySelector('#color-picker').value };
//     const summon = document.querySelector('journal-entry').shadowRoot.getElementById('tag-holder');
//     summon.appendChild(newTag);
//     sample.push({ text: this.getRootNode().getElementById('add-textfield').value, color: this.getRootNode().getElementById('color-picker').value });
//     this.getRootNode().getElementById('add-textfield').value = '';
//     localStorage.setItem('sample', JSON.stringify(sample));
//     console.log(sample);
//   }
// });

// const input = document.querySelector('journal-entry').shadowRoot.getElementById('add-textfield');
// input.addEventListener('keyup', function (event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById('add-tag').click();
//   }
// });

//   document.body.appendChild(tagholder);
//   const summon = document.querySelector('journal-entry').shadowRoot.getElementById('tag-holder');
//   console.log(sample.length);
//   for (let i = 0; i < sample.length; i++) {
//     console.log(i);
//     const newTag = document.createElement('tag-bujo');
//     newTag.tag = sample[i];
//     summon.appendChild(newTag);
//   }
// }, 500);
