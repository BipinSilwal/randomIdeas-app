class Modal {
  constructor() {
    this._modal = document.querySelector('#modal');
    this._modalBtn = document.querySelector('#modal-btn');
    this.addEventListeners();
  }

  // when calling class method inside addEventListener we need to use bind method.
  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this));
    window.addEventListener('click', this.closeOutside.bind(this));
    document.addEventListener('closemodal', () => this.close());
  }

  open() {
    this._modal.style.display = 'block';
  }
  close() {
    this._modal.style.display = 'none';
  }

  closeOutside(e) {
    if (e.target === modal) {
      this.close();
    }
  }
}

export default Modal;
