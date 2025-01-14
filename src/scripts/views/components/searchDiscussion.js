class SearchDiscussion extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form class="d-flex mb-2" id="form-searchDiscussion">
        <input class="form-control" id="searchDiscussion" type="search" placeholder="Search by title" aria-label="Search">
        <button class="btn btn-dark ms-1" type="submit">Search</button>
      </form>
    `;
  }
}
customElements.define('search-discussion', SearchDiscussion);
