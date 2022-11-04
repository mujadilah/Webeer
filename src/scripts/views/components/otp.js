class OTP extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div  class="modal-otp hide">
    <h3> Masukkan Kode OTP </h3>
    <p>Waktu tersisa <span class="count">5:00</span></p>
    <div class="otp">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        </div>
    </div>
    `;
  }
}
customElements.define('modal-otp', OTP);