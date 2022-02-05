import icons from 'url:../../img/icons.svg';
//# hala calismior
export default class View {
  _data;
  update(data) {
    //updates TextandAttribute
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup); //createRange node olusturur contextualfragment ise DocumentFragment(parensiz olarak istedigimiz document) olusturur
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //boyle degistirince (sadece ilki varsa) ana buyuk elementleri de degistiyor o yuzden textsiz elementleri degistirmemek lazim
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    }); //.isEqualNode nodelar aynimi diye bakior.
  }
  /** Bunlar function aciklamalari ve vscode otomatik algiliyor.
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner = function () {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  renderError(message = this._errorMsg) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>
          ${message}
        </p>
      </div>
          `;
    this;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
