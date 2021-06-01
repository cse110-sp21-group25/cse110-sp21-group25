
const sample = ['la', 'li', 'lu', 'le', 'lol'];
class tagBujo extends HTMLElement {
  constructor () {
    super();
    const template = document.createElement('template');

    template.innerHTML = `
    <style>
      .tag {

        border-color: none;
        color: black;
        padding-top: 0.125%;
        padding-right: 0.25%;
        padding-bottom: 0.125%;
        padding-left: 1%;
      
        text-align: center;
        text-decoration: none;
        display: inline-block;
  
        font-size: 16px;
        

        background-color: silver;
      }
      
        
      button {

        border: none;
        color: black;
 
        border-radius: 10%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 75%;
        cursor: pointer;
        background-color: silver;
      }
      
      button:hover{
        background-color: gray;
      }

      button:focus{
          backroung-color: red;
      }
      </style>

      <div class="tag">
      <span></span>
      
      <button id = deleter onclick='console.log(this.class);this.parentNode.remove();'>&#10005</button>
      </div>
      `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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

    tagid.setAttribute('id', tag[0]);

    text.textContent = tag;
  }
}

window.customElements.define('tag-bujo', tagBujo);
// Not able to work with JSON files yet, so I use an array
document.addEventListener('DOMContentLoaded', () => {
  const tagholder = document.createElement('span');
  tagholder.id = 'tag-holder';
  document.body.appendChild(tagholder);
  for (const tag of sample) {
    const summon = document.getElementById('tag-holder');
    const newTag = document.createElement('tag-bujo');
    newTag.tag = tag;
    summon.appendChild(newTag);
  }
});

// Enter key listneer
const input = document.getElementById('add-textfield');
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('add-tag').click();
  }
});
