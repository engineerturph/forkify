import View from './View.js';
import icons from 'url:../../img/icons.svg';

class previewView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succesfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    //Objecti olustururken constructori uygular sonra olusturur.
    super();
    this._addHandlerToggleWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerToggleWindow() {
    //function icindeki thisler eventlistenera bakar disindakilerse objecte bakar ondan sikinti cikmiyor
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    //Form olan bi element yukluon sonra onun datalarini alior
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); //2 li arrayler var ve onu cevirmek icin bi method var
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new previewView();
