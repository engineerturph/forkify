class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addSearchHandler(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    }); //submit tikayince ve entera basinca calisir
  }
}

export default new SearchView();
