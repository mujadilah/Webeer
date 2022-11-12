const { default: User } = require('../../data/loginSource');
const { createNavbarTemplateAfterLogin, createNavbarTemplateBeforeLogin } = require('../templates/template-creator');

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const getTokenStorage = localStorage.getItem('token');
    if (getTokenStorage === null) {
      this.innerHTML += createNavbarTemplateBeforeLogin();
    } else {
      this.innerHTML += createNavbarTemplateAfterLogin();
      const logout = document.querySelector('#logout');
      logout.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await User.Logout();
        if (response.error) {
          console.log(response.error);
        } else {
          document.location = '#/';
          window.location.reload();
        }
      });
    }
  }
}

customElements.define('app-bar', AppBar);
