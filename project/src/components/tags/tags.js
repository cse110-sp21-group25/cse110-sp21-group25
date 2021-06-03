
let sample = localStorage.getItem('sample');
console.log(sample);
if (sample === null) {
  console.log('here');
  sample = [];
} else {
  sample = JSON.parse(sample);
}
console.log(sample);
// const sample = [{ text: 'la', color: 'red' }, { text: 'li', color: 'red' }, { text: 'lu', color: 'yellow' }, { text: 'le', color: 'green' }, { text: 'lo', color: 'silver' }];

class tagBujo extends HTMLElement {
  constructor () {
    super();
    const template = document.querySelector('journal-entry').shadowRoot.createElement('template');

    template.innerHTML = `
      <link rel="stylesheet" href="./tags.css">
      <div class="tag">
      <span></span>
      <button id = deleter>&#10005</button>
      </div>
      `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('#deleter').addEventListener('click', function (event) {
      console.log(this.parentNode.id);
      const root = document.querySelector('journal-entry').shadowRoot.getElementById(this.parentNode.id);
      root.remove();
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

  // TODO: Load tags from a JSON, or whatever method we use to store entires, we should create an array of tags, and each one will have content and background color
  // TODO: Add x mark that will delete the tag from the entry when clicked

  get tag () {
    return this.getAttribute('tag');
  }

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
// Not able to work with JSON files yet, so I use an array
// document.addEventListener('DOMContentLoaded', () => {
//   const tagholder = document.createElement('span');
//   tagholder.id = 'tag-holder';

//   document.body.appendChild(tagholder);
//   const summon = document.getElementById('tag-holder');
//   for (const tag of sample) {
//     const newTag = document.createElement('tag-bujo');
//     newTag.tag = tag;
//     summon.appendChild(newTag);
//   }
// });

document.querySelector('journal-entry').shadowRoot.querySelector('#add-tag').addEventListener('click', function (event) {
  if (this.getRootNode().getElementById('add-textfield').value !== '') {
    const newTag = document.createElement('tag-bujo');
    newTag.tag = { text: document.querySelector('journal-entry').shadowRoot.querySelector('#add-textfield').value, color: document.querySelector('journal-entry').shadowRoot.querySelector('#color-picker').value };
    const summon = document.querySelector('journal-entry').shadowRoot.getElementById('tag-holder');
    summon.appendChild(newTag);
    sample.push({ text: this.getRootNode().getElementById('add-textfield').value, color: this.getRootNode().getElementById('color-picker').value });
    this.getRootNode().getElementById('add-textfield').value = '';
    localStorage.setItem('sample', JSON.stringify(sample));
    console.log(sample);
  }
});

const input = document.querySelector('journal-entry').shadowRoot.getElementById('add-textfield');
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('add-tag').click();
  }
});

// fetch('test.json')
//   .then(response => response.json())
//   .then(json => console.log(json));
window.setTimeout(() => {
  const tagholder = document.createElement('span');
  tagholder.id = 'tag-holder';

  document.body.appendChild(tagholder);
  const summon = document.querySelector('journal-entry').shadowRoot.getElementById('tag-holder');
  console.log(sample.length);
  for (let i = 0; i < sample.length; i++) {
    console.log(i);
    const newTag = document.createElement('tag-bujo');
    newTag.tag = sample[i];
    summon.appendChild(newTag);
  }
}, 500);
