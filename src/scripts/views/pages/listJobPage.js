import { Toast } from 'bootstrap/dist/js/bootstrap.bundle';
import User from '../../data/loginSource';
import '../components/userProfile';
import JobSource from '../../data/jobSource';
import { createCardJobCompany, createFormEditJob } from '../templates/template-creator';

const listJobPage = {
  async render() {
    return `
    <div class="container-company"></div>
    <message-container></message-container>
        `;
  },
  async afterRender() {
    const messageText = document.querySelector('.toast-body');
    const messageTitle = document.querySelector('.toast-title');
    const messageContainer = document.getElementById('liveToast');
    const message = new Toast(messageContainer);
    const user = await User.getUser();
    console.log(user);
    const itemJob = await JobSource.getCompanyJob();
    itemJob.data.data.forEach((job) => {
      document.querySelector('.container-company').innerHTML += createCardJobCompany(job);
    });
    const btnDelete = document.querySelectorAll('#delete-job');
    for (let i = 0; i < btnDelete.length; i++) {
      btnDelete[i].addEventListener('click', (event) => {
        event.preventDefault();
        console.log(btnDelete[i].value);
        const btnConfirmDelete = document.querySelector('#delete-this-job');
        btnConfirmDelete.addEventListener('click', async (event) => {
          event.preventDefault();
          const data = await JobSource.DeleteJob(btnDelete[i].value);
          if (data.error) {
            messageText.classList.remove('text-bg-success');
            messageTitle.classList.remove('text-success');
            messageText.classList.add('text-bg-warning');
            messageTitle.classList.add('text-warning');
            messageText.innerHTML = data.error;
            messageTitle.innerHTML = 'WARNING';
            message.show();
          } else {
            messageText.classList.remove('text-bg-warning');
            messageTitle.classList.remove('text-warning');
            messageText.classList.add('text-bg-success');
            messageTitle.classList.add('text-success');
            messageText.innerHTML = data.message;
            messageTitle.innerHTML = 'SUCCESS';
            message.show();

            setTimeout(() => document.location = '#/list', 1000);
          }
        });
      });
    }
    const btnEdit = document.querySelectorAll('#edit-job');
    const containerEdit = document.querySelector('#container-edit');
    console.log(btnEdit);
    for (let i = 0; i < btnDelete.length; i++) {
      btnEdit[i].addEventListener('click', async (event) => {
        event.preventDefault();
        const data = await JobSource.getJobsDetail(btnDelete[i].value);
        containerEdit.innerHTML = createFormEditJob(data.data.data);
        const formEdit = document.querySelector('#form-edit-job');
        const level = document.querySelector('#level-job');
        const time = document.querySelector('#time-job');
        const place = document.querySelector('#place-job');
        const editJobButton = document.querySelector('#editJobButton');
        formEdit.addEventListener('submit', async (event) => {
          event.preventDefault();
          const getLevel = level.value;
          const getTime = time.value;
          const getPlace = place.value;
          const inputCompany = document.querySelector('#company-job');
          const inputProfession = document.querySelector('#profession-job');
          const inputAddress = document.querySelector('#address-job');
          const inputDescriptionCompany = document.querySelector('#description-job');
          const inputDescriptionProfession = document.querySelector('#descriptionProfession-job');
          const inputSalary = document.querySelector('#salary-job');
          const inputSalary2 = document.querySelector('#salary-job2');
          const inputLink = document.querySelector('#link-job');
          const inputQualification = document.querySelector('#qualification-job');
          if (inputCompany.value === ''
           || inputProfession.value === ''
           || inputAddress.value === ''
           || inputDescriptionCompany.value === ''
           || inputDescriptionProfession.value === ''
           || inputSalary.value === ''
           || inputSalary2.value === ''
           || inputLink.value === 'https://'
           || inputQualification.value === ''
          ) {
            if (inputCompany.value === '') {
              messageText.innerHTML = 'Company name can\'t null';
              inputCompany.focus();
            } else if (inputProfession.value === '') {
              messageText.innerHTML = 'Job position can\'t null';
              inputProfession.focus();
            } else if (inputAddress.value === '') {
              messageText.innerHTML = 'Company\'s address can\'t null';
              inputAddress.focus();
            } else if (inputDescriptionCompany.value === '') {
              messageText.innerHTML = 'Company description can\'t null';
              inputDescriptionCompany.focus();
            } else if (inputDescriptionProfession.value === '') {
              messageText.innerHTML = 'Job description can\'t null';
              inputDescriptionProfession.focus();
            } else if (inputSalary.value === '') {
              messageText.innerHTML = 'Range salary can\'t null';
              inputSalary.focus();
            } else if (inputSalary2.value === '') {
              messageText.innerHTML = 'Range salary can\'t null';
              inputSalary2.focus();
            } else if (inputQualification.value === '') {
              messageText.innerHTML = 'Qualification can\'t null';
              inputQualification.focus();
            } else if (inputLink.value === 'https://') {
              messageText.innerHTML = 'Company links can\'t null';
              inputLink.focus();
            }
            messageText.classList.remove('text-bg-success');
            messageTitle.classList.remove('text-success');
            messageText.classList.add('text-bg-warning');
            messageTitle.classList.add('text-warning');
            messageTitle.innerHTML = 'SUCCESS';
            message.show();
          } else {
            editJobButton.setAttribute('disabled', '');
            const dataEdit = await JobSource.EditJob(btnDelete[i].value, {
              company: inputCompany.value,
              profession: inputProfession.value,
              address: inputAddress.value,
              descriptionCompany: inputDescriptionCompany.value,
              descriptionProfession: inputDescriptionProfession.value,
              level: getLevel,
              salary: inputSalary.value,
              salary2: inputSalary2.value,
              timeWork: getTime,
              workplace: getPlace,
              link: inputLink.value,
              qualification: inputQualification.value,
              image: document.querySelector('#image-job').files[0],
            });
            if (dataEdit.error) {
              editJobButton.removeAttribute('disabled');
              messageText.classList.remove('text-bg-success');
              messageTitle.classList.remove('text-success');
              messageText.classList.add('text-bg-warning');
              messageTitle.classList.add('text-warning');
              messageText.innerHTML = dataEdit.error;
              messageTitle.innerHTML = 'WARNING';
              message.show();
            } else {
              console.log(dataEdit.data.message);
              messageText.classList.remove('text-bg-warning');
              messageTitle.classList.remove('text-warning');
              messageText.classList.add('text-bg-success');
              messageTitle.classList.add('text-success');
              messageText.innerHTML = dataEdit.data.message;
              messageTitle.innerHTML = 'SUCCESS';
              message.show();
              setTimeout(() => document.location.reload(), 1000);
            }
          }
        });
      });
    }
  },
};

export default listJobPage;