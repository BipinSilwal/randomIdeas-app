import ideasApi from '../services/ideasApi';
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideasList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert('Please enter all field');
      return;
    }

    localStorage.setItem('username', this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // Add idea to server;
    const newIdea = await ideasApi.createIdeas(idea);

    // Add idea to list;
    this._ideasList.addIdeaToList(newIdea.data.data);

    console.log(idea);

    // clear field

    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();

    document.dispatchEvent(new Event('closemodal'));
  }

  render() {
    this._formModal.innerHTML = `
            
        <form id="idea-form">
        <div class="form-control">
            <label for="idea-text">Enter a username</label>
            <input type="text" name="username" id="username" value="${
              localStorage.getItem('username')
                ? localStorage.getItem('username')
                : ''
            }">
        </div>

        <div class="form-control">
            <label for="idea-text">Whats your idea?</label>
            <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag">
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>

        `;
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
