import { Toast } from 'bootstrap/dist/js/bootstrap.bundle';
import User from '../../data/loginSource';

const Register = {
  async render() {
    return `
    <modal-otp></modal-otp>
         <div id="container-register">
          <div class ="card">
          <img class="lazyload" src="./asset/hero-login.png">
            <form id="form-login">
            <p>Kamu sudah memiliki akun? <span> <a href="#/login">Login Now</a> </span> </p>
              <div class="mb-4">
                <input type="text" class="form-control" id="Username" placeholder="Enter your username" required>
              </div>
              <div class="mb-4">
                <input type="email" class="form-control" id="emailUser" placeholder="Enter your email" required>
              </div>
              <div class="mb-4 password-container">
                <input type="password" class="form-control" id="pwdUser" placeholder="Enter your password" required>
                    <div class="pwdProgress hide">
                            <p class="textProgress"></p>
                    </div>
              </div>
              
            <p>Mendaftar sebagai</p>
            <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="role-user" >
            <option value="1">Programmer</option>
            <option value="2">Company</option>
            </select>
            <button type="submit" class="btn btn-primary mb-3" id="submit">Register</button>
            </form>
          </div>
          </div>
         <message-container></message-container>
          `;
  },
  async afterRender() {
    // const progress = document.querySelector('.pwdProgress');

    const getPwd = document.querySelector('#pwdUser');
    // const messageText = document.querySelector('.message-text');
    // getPwd.addEventListener('input', () => {
    //   const valuePwd = getPwd.value;
    //   if (valuePwd.length <= 0) {
    //     progress.classList.add('hide');
    //   } else if (valuePwd.length > 0 && valuePwd.length <= 6) {
    //     progress.classList.remove('hide');
    //     progressText.innerHTML = 'Weak';
    //     progress.style.background = 'red';
    //     progress.style.width = '30%';
    //   } else if (valuePwd.length >= 7 && valuePwd.length <= 12) {
    //     progress.classList.remove('hide');
    //     progressText.innerHTML = 'Medium';
    //     progress.style.background = 'orange';
    //     progress.style.width = '60%';
    //   } else {
    //     progress.classList.remove('hide');
    //     progressText.innerHTML = 'Strong';
    //     progress.style.background = 'green';
    //     progress.style.width = '100%';
    //   }
    // });

    // Submit Register
    const form = document.querySelector('#form-login');
    const Username = document.querySelector('#Username');
    const email = document.querySelector('#emailUser');
    const selected = document.getElementById('role-user');
    const messageText = document.querySelector('.toast-body');
    const messageTitle = document.querySelector('.toast-title');
    const messageContainer = document.getElementById('liveToast');
    const message = new Toast(messageContainer);
    const submitButton = document.querySelector('#submit');
    form.addEventListener('submit', async (event) => {
      const registerContainer = document.querySelector('#container-register');
      registerContainer.classList.add('cursor-progress');
      event.preventDefault();
      const { text } = selected.options[selected.selectedIndex];
      submitButton.setAttribute('disabled', '');
      const data = await User.Register({
        username: Username.value,
        email: email.value,
        password: getPwd.value,
        role: text,
      });
      if (data.error) {
        console.log(data.error);
        registerContainer.classList.remove('cursor-progress');
        messageText.classList.remove('text-bg-success');
        messageTitle.classList.remove('text-success');
        messageText.classList.add('text-bg-warning');
        messageTitle.classList.add('text-warning');
        messageText.innerHTML = data.error;
        messageTitle.innerHTML = 'WARNING';
        message.show();
        submitButton.removeAttribute('disabled');
      } else {
        console.log(data);
        messageText.classList.remove('text-bg-warning');
        messageTitle.classList.remove('text-warning');
        messageText.classList.add('text-bg-success');
        messageTitle.classList.add('text-success');
        messageText.innerHTML = 'Selamat registrasi anda berhasil, silahkan verifikasi';
        messageTitle.innerHTML = 'SUCCESS';
        message.show();
        localStorage.setItem('email', JSON.stringify(data.email));
        localStorage.setItem('idUser', JSON.stringify(data.idUser));
        setTimeout(() => document.location = '#/verification', 1500);
        // window.location.reload();
      }
    });
    // const modal = document.querySelector('.modal-otp');

    // form.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   SendEmail();
    //   modal.classList.toggle('hide');
    //   const minute = 5;
    //   let time = minute * 60;
    //   const count = document.querySelector('.count');
    //   let timer;
    //   clearInterval(timer);
    //   timer = setInterval(Countdown, 1000);

    //   function Countdown() {
    //     const minutes = Math.floor(time / 60);
    //     let seconds = time % 60;

    //     seconds = seconds < 10 ? `0${seconds}` : seconds;

    //     count.innerHTML = `${minutes}:${seconds}`;
    //     time--;
    //   }

    //   console.log(modal);
    // });

    // const inputs = document.querySelectorAll('.otp input');

    // inputs.forEach((input, index) => {
    //   input.dataset.index = index;
    //   input.addEventListener('paste', handleOnPasteOtp);
    //   input.addEventListener('keyup', handleOtp);
    // });

    // function handleOnPasteOtp(e) {
    //   const data = e.clipboardData.getData('text');
    //   const value = data.split('');

    //   if (value.length === inputs.length) {
    //     inputs.forEach((input, index) => (input.value = value[index]));
    //     submit();
    //   }
    // }

    // function handleOtp(e) {
    //   const input = e.target;
    //   const { value } = input;
    //   input.value = '';
    //   input.value = value ? value[0] : '';

    //   const fieldIndex = input.dataset.index;
    //   if (value.length > 0 && fieldIndex < inputs.length - 1) {
    //     input.nextElementSibling.focus();
    //   }

    //   if (e.key === 'Backspace' && fieldIndex > 0) {
    //     input.perviousElementSibling.focus();
    //   }

    //   if (fieldIndex == inputs.length - 1) {
    //     submit();
    //   }
    // }

    // function submit() {
    //   let otp = '';
    //   inputs.forEach((input) => {
    //     otp += input.value;
    //     input.disabled = true;
    //     input.classList.add('disable');
    //   });
    //   if (otp === data) {
    //     message.classList.add('success');
    //     messageText.innerHTML = 'Sukses';
    //     const intervalModal = setInterval(() => {
    //       modal.classList.toggle('hide');
    //     }, 3000);
    //     setTimeout(() => {
    //       clearInterval(intervalModal);
    //       modal.classList.add('hide');
    //       message.classList.toggle('success');
    //     }, 1000);
    //   } else {
    //     alert('salah');
    //   }
    // }
  },
};

export default Register;