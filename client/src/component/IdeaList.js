import ideasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaEl = document.querySelector('#idea-list');
    this._ideas = [];

    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async deleteIdea(ideaId) {
    try {
      const res = await ideasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert('You cannot delete this resource!');
    }
  }

  async getIdeas() {
    try {
      const res = await ideasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  _getTags(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    this._ideaEl.innerHTML = this._ideas
      .map((idea) => {
        console.log(idea.username);

        const tagClass = this._getTags(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return `
        <div class="card" data-id="${idea._id}">
          ${deleteBtn}
        <h3>${idea.text}</h3>
        <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
        <p>Posted on <span class="date">
            ${idea.date}  
        </span>
        <span class="author">${idea.username}</span>
        </p>
        </div>
        
        `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
