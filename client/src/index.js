import '@fortawesome/fontawesome-free/css/all.css';
import IdeaForm from './component/IdeaForm';
import IdeaList from './component/IdeaList';
import Modal from './component/Modal';
import './css/style.css';

const ideaList = new IdeaList();
const modal = new Modal();
const ideaForm = new IdeaForm();

ideaForm.render();
