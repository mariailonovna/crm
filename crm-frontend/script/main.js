(() => {
  document.addEventListener('DOMContentLoaded', () => {

    const addContactBtn = document.querySelectorAll('.client-modal__contact-btn');
    const addClientBtn = document.getElementById('addClientBtn');
    const cancelAddClientModal = document.getElementById('cancelAddClientModal');
    const addClientForm = document.getElementById('addClientForm');
    const closeModalsBtn = document.querySelectorAll('.client-modal__close');
    const editClientForm = document.getElementById('editClientForm');
    const editModalDeleteClient = document.getElementById('editModalDeleteClient');
    const addClientModal = document.getElementById('addClientModal');
    const editClientModal = document.getElementById('editClientModal');
    const searchClientsForm = document.getElementById('searchClients')

    if (window.location.hash.length > 0) {
      fadeIn(editClientModal);
      modalOpened();
      disabledFields(editClientModal);
      let oneClientInfo = getOneClientInfo(window.location.hash.substr(1))
      oneClientInfo.then((data) => {
        editClientModalForm(data.id, data.name, data.surname, data.lastName, data.contacts);
      });
    }

    // Вставка svg для кнопки, добавляемой через js
    const createContactSvg = () => {
      return (
        '<svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="add-contact-form__delete-icon"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#9873FF"/></svg>'
      )
    };

    // Вставка svg для кнопки закрытия
    const createCloseIcon = () => {
      return (
        '<svg width="17" height="17" viewbox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="client-modal__close-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>'
      )
    };

    // Иконки
    let iconArr = {
      vk: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="contact-tooltip__icon" aria-label="Страница Вконтакте"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></svg>',
      fb: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="contact-tooltip__icon" aria-label="Страница Facebook"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></svg>',
      email: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="contact-tooltip__icon" aria-label="Электронная почта"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/></svg>',
      phone: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="contact-tooltip__icon" aria-label="Номер телефона"><g><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>',
      other: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="contact-tooltip__icon" aria-label="Другой контакт"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/></svg>',
    }

    function renderContactIcon(type) {
      if (type === 'phone') {
        return iconArr.phone
      } else if (type === 'vk') {
        return iconArr.vk
      } else if (type === 'fb') {
        return iconArr.fb
      } else if (type === 'email') {
        return iconArr.email
      } else if (type === 'other') {
        return iconArr.other
      }
    };

    // Плавное появление
    function fadeIn(el) {
      el.style.opacity = 0;
      el.style.display = 'block';
      setTimeout(() => {
        el.style.opacity = 1;
      }, 10);
    };

    // Плавное скрытие
    function fadeOut(el) {
      el.style.opacity = 1;
      el.style.opacity = 0;
      setTimeout(() => {
        el.style.display = 'none';
      }, 300);
    };

    // Очистка полей формы
    function clearForm(form) {
      form.querySelectorAll('.client-modal__input').forEach((el) => {
        el.value = '';
        el.disabled = false
      });
      form.querySelectorAll('.client-modal__label-text').forEach((el) => {
        el.classList.remove('client-modal__label-text--active')
      });
      form.querySelectorAll('.add-contact-form').forEach((el) => {
        el.remove();
      });
      form.querySelector('.client-modal__contact-btn').style.display = 'flex';
      form.querySelector('.client-modal__second-block').classList.remove('client-modal__second-block--active');
    };

    // Убрать полосу прокрутки сбоку при открытом модальном окне
    function modalOpened() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      document.querySelectorAll('.client-modal').forEach(el => {
        el.style.paddingRight = paddingOffset
      })
      document.body.classList.add('hidden')
      document.body.style.paddingRight = paddingOffset
    };

    // Вернуть полосу прокрутки при закрытии модального окна
    function modalClosed() {
      document.querySelectorAll('.client-modal').forEach(el => {
        el.style.paddingRight = '0px'
      })
      document.body.classList.remove('hidden')
      document.body.style.paddingRight = '0px'
    };

    // Открытие модального окна "Добавить клиента"
    addClientBtn.addEventListener('click', () => {
      fadeIn(addClientModal);
      modalOpened();
    });

    // Закрытие модального окна по нажатию на крестик
    closeModalsBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        fadeOut(btn.parentElement.parentElement);
        modalClosed();
          setTimeout(() => {
            clearForm(btn.parentElement);
          }, 300);
        window.location.hash = ''
      });
    });

    // Закрытие модального окна "Добавить клиента"
    cancelAddClientModal.addEventListener('click', () => {
      fadeOut(addClientModal);
      modalClosed();
      setTimeout(() => {
        clearForm(addClientModal);
      }, 300);
      window.location.hash = ''
    });

    document.querySelectorAll('.client-modal__container').forEach(el => {
      el.addEventListener('click', e => {
        e._isClick = true
      })
    })

    // Закрытие модального окна по клику в любой области
    document.querySelectorAll('.client-modal').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e._isClick) return;
        fadeOut(el);
        modalClosed();
        setTimeout(() => {
          clearForm(el);
        }, 300);
        window.location.hash = ''
      });
    });

    // Закрытие модального окна по нажатию esc
    document.addEventListener('keydown', (e) => {
     if (e.code === 'Escape') {
       document.querySelectorAll('.client-modal').forEach(el => {
         if (el.style.display === 'block') {
          fadeOut(el);
          modalClosed();
          setTimeout(() => {
            clearForm(el);
          }, 300);
         };
       });
       window.location.hash = ''
     };
    });

    // Placeholder в инпутах
    document.querySelectorAll('.client-modal__input').forEach(el => {
      el.addEventListener('input', () => {
        if (el.value) {
          el.parentElement.querySelector('.client-modal__label-text').classList.add('client-modal__label-text--active')
        } else {
          el.parentElement.querySelector('.client-modal__label-text').classList.remove('client-modal__label-text--active')
        };
      });
    });

    // Создание форм добавления контактов
    function createAddContactForm(btn, opt = 'phone') {
      btn.parentElement.classList.add('client-modal__second-block--active');
      let addContactForm = document.createElement('div');
      let select = document.createElement('select');
      let option1 = document.createElement('option');
      let option2 = document.createElement('option');
      let option3 = document.createElement('option');
      let option4 = document.createElement('option');
      let option5 = document.createElement('option');
      let input = document.createElement('input');
      let deleteBtn = document.createElement('button');

      addContactForm.classList.add('add-contact-form');
      select.classList.add('add-contact-form__select');
      select.name = 'addContactSelect';
      option1.value = 'phone';
      // option1.selected = option1.value === opt ? true : false
      option1.innerHTML = 'Телефон';
      option2.value = 'additionalContact';
      option2.innerHTML = 'Доп. контакт';
      option2.selected = option2.value === opt ? true : false
      option3.value = 'email';
      option3.innerHTML = 'Email';
      option3.selected = option3.value === opt ? true : false
      option4.value = 'vk';
      option4.innerHTML = 'Vk';
      option4.selected = option4.value === opt ? true : false
      option5.value = 'facebook';
      option5.innerHTML = 'Facebook';
      option5.selected = option5.value === opt ? true : false
      input.classList.add('add-contact-form__input');
      input.classList.add('add-contact-form__input--empty');
      deleteBtn.classList.add('add-contact-form__delete-btn');
      deleteBtn.insertAdjacentHTML('afterbegin', createContactSvg());
      deleteBtn.type = 'button'
      deleteBtn.style.display = 'none'

      if (option1.value === opt) {
        var im = new Inputmask("+7 (999) 999-99-99", {showMaskOnHover: false});
        im.mask(input);
        option1.selected = true;
      };

      select.append(option1);
      select.append(option2);
      select.append(option3);
      select.append(option4);
      select.append(option5);
      addContactForm.append(select);
      addContactForm.append(input);
      addContactForm.append(deleteBtn);
      btn.parentElement.querySelector('.client-modal__contact-container').append(addContactForm)

      input.addEventListener('input', () => {
        if (input.value) {
          input.classList.remove('add-contact-form__input--empty');
          deleteBtn.style.display = 'flex'
        } else {
          input.classList.add('add-contact-form__input--empty');
          deleteBtn.style.display = 'none'
        };
      });


      deleteBtn.addEventListener('click', (e) => {
        e._isClick = true
        if (addContactForm.parentElement.parentElement.querySelectorAll('.add-contact-form').length === 10) {
          addContactForm.parentElement.parentElement.querySelector('.client-modal__contact-btn').style.display = 'flex'
        };
        if (addContactForm.parentElement.parentElement.querySelectorAll('.add-contact-form').length === 1) {
          addContactForm.parentElement.parentElement.classList.remove('client-modal__second-block--active');
        };
        addContactForm.remove();
      });

      select.addEventListener('change', () => {
        if (select.value === 'phone') {
          var im = new Inputmask("+7 (999) 999-99-99", {showMaskOnHover: false});
          im.mask(input);
        } else {
          if (input.inputmask) {
            input.inputmask.remove();
          }
        }
      })

      const choices = new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        position: 'bottom',
      });

      return {
        input, select, deleteBtn, addContactForm
      };
    };

    // Открытие формы добавления контактов по клику на кнопку
    addContactBtn.forEach((el) => {
      el.addEventListener('click', () => {
        el.parentElement.classList.add('client-modal__second-block--active');
        const contactForm = createAddContactForm(el)
        el.parentElement.querySelector('.client-modal__contact-container').append(contactForm.addContactForm)
        if (el.parentElement.querySelectorAll('.add-contact-form').length === 10) {
          el.style.display = 'none'
        }
      });
    });

    // Заполнение информации о клиенте
    function getClientInfoForm(formType) {
      const clientSurnameInput = formType.querySelector('.client-modal__input--surname');
      const clientNameInput = formType.querySelector('.client-modal__input--name');
      const clientMiddlenameInput = formType.querySelector('.client-modal__input--middlename');
      const clientModalError = formType.querySelector('.client-modal__error')
      const clientInputs = formType.querySelectorAll('.client-modal__input--required');

      let newClientContactsInputs = document.querySelectorAll('.add-contact-form');

      clientInputs.forEach((el) => {
        el.addEventListener('input', () => {
          el.classList.remove('error-field')
          clientModalError.textContent = ''
        });
      });

      let errorCnt = 0;

      let contactsArr = [];

      newClientContactsInputs.forEach((el) => {
        let selectValue = el.querySelector('select').value.trim();
        let inputValue = el.querySelector('.add-contact-form__input').value;

        if (!inputValue) {
          errorCnt++
          el.querySelector('.add-contact-form__input').classList.add('error-input')
          clientModalError.textContent = 'Ошибка: Каждый добавленный контакт должен быть полностью заполнен'
        } else {
          contactsArr.push({type: selectValue, value: inputValue})
        }

        el.querySelector('.add-contact-form__input').addEventListener('input', () => {
          el.querySelector('.add-contact-form__input').classList.remove('error-input');
          clientModalError.textContent = ''
        });
      });

      clientInputs.forEach((el) => {
        if (!el.value.trim()) {
          el.classList.add('error-field');
          errorCnt++
          clientModalError.textContent = 'Ошибка: Имя и фамилия обязательны для заполнения'
        }
      });

      let name = clientNameInput.value.trim();
      let surname = clientSurnameInput.value.trim();
      let lastname = clientMiddlenameInput.value.trim();
      let contacts = contactsArr

        return {
          name,
          surname,
          lastname,
          contacts,
          errorCnt
        }
    };

    // Загрузка данных клиента на сервер
    async function uploadData(name, surname, lastname, contacts) {
      const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          surname: surname,
          lastName: lastname,
          contacts: contacts,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    // Получение данных всех клиентов
    async function getClients() {
      const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
      });
      const data = await response.json();
      return data
    };

    // Получение данных одного клиента
    async function getOneClientInfo(id) {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data
    };

    // Внесение изменения в данные клиента на сервере
    async function patchClientInfo(id, name, surname, lastname, contacts) {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
          surname: surname,
          lastName: lastname,
          contacts: contacts,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Вывод данных клиентов в таблицу
    function renderClientsData() {
      // let clientsArr = getClients();
      let clientsArr;
      if (searchClientsForm.value) {
        clientsArr = searchingResult(searchClientsForm.value);
      } else {
        clientsArr = getClients();
      };
      clearTable();

      clientsArr.then((data) => {
        if (sortNameStatus === true) {
          data.sort((a, b) => {
            if ( a.surname + a.name + a.lastName < b.surname + b.name + b.lastName ) return -1;
            if ( a.surname + a.name + a.lastName < b.surname + b.name + b.lastName ) return 1;
          })
          document.querySelector('.table-head__sort--name').classList.remove('table-head__sort--active');
        } else if (sortNameStatus === false) {
          data.sort((a, b) => {
            if ( a.surname + a.name + a.lastName > b.surname + b.name + b.lastName ) return -1;
            if ( a.surname + a.name + a.lastName > b.surname + b.name + b.lastName ) return 1;
          })
          document.querySelector('.table-head__sort--name').classList.add('table-head__sort--active');
        } else if (sortIdStatus === true) {
          data.sort((a, b) => a.id - b.id);
          document.querySelector('.table-head__sort--id').classList.add('table-head__sort--active');
        } else if (sortIdStatus === false) {
          data.sort((a, b) => b.id - a.id);
          document.querySelector('.table-head__sort--id').classList.remove('table-head__sort--active');
        } else if (sortCreatedStatus === true) {
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          document.querySelector('.table-head__sort--created').classList.add('table-head__sort--active');
        } else if (sortCreatedStatus === false) {
          data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          document.querySelector('.table-head__sort--created').classList.remove('table-head__sort--active');
        } else if (sortUpdatedStatus === false) {
          data.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
          document.querySelector('.table-head__sort--updated').classList.remove('table-head__sort--active');
        } else if (sortUpdatedStatus === true) {
          data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          document.querySelector('.table-head__sort--updated').classList.add('table-head__sort--active');
        };

        for (const item of data) {
          document.querySelector('.table-body').append(createClientTable(item))
        };

        document.querySelector('.main__load-table').style.display = 'none'
      });
    };

    renderClientsData()

    // Добавление клиента
    addClientForm.addEventListener('submit', async e => {
      e.preventDefault();
      let formInfo = getClientInfoForm(addClientModal)
      if (formInfo.errorCnt > 0) {
        return
      };

      disabledFields(addClientForm);

      const data = await uploadData(formInfo.name, formInfo.surname, formInfo.lastname, formInfo.contacts);

      fadeOut(addClientModal);
      modalClosed();
      clearForm(addClientForm);
      renderClientsData();
    });

    // Неактивные инпуты при отправке информации на сервер
    function disabledFields(form) {
      form.querySelectorAll('input').forEach((el) => {
        el.disabled = 'disabled'
      });
    };

    // Создание полей таблицы
    function createClientTable(item) {

      let tr = document.createElement('tr');
      tr.classList.add('table-body__row')

      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      let td5 = document.createElement('td');
      let td6 = document.createElement('td');

      td1.classList.add('table-body__item', 'table-body__item--id');
      let spanId = document.createElement('span');
      spanId.classList.add('table-body__id');
      spanId.textContent = item.id
      td1.append(spanId)

      td2.classList.add('table-body__item', 'table-body__item--name');
      td2.textContent = `${item.surname.trim()} ${item.name.trim()} ${item.lastName.trim()}`;

      let date = new Date(item.createdAt);
      td3.classList.add('table-body__item', 'table-body__item--created');
      td3.textContent = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

      let dateMinutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
      let dateHours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`

      let createdSpanTime = document.createElement('span');
      createdSpanTime.classList.add('table-body__time');
      createdSpanTime.textContent = `${dateHours}:${dateMinutes}`;
      td3.append(createdSpanTime);

      let update = new Date(item.updatedAt);
      td4.classList.add('table-body__item', 'table-body__item--changed');
      td4.textContent = `${update.getDate()}.${update.getMonth() + 1}.${update.getFullYear()}`;
      let updateMinutes = update.getMinutes() > 9 ? update.getMinutes() : `0${update.getMinutes()}`
      let updateHours = update.getHours() > 9 ? update.getHours() : `0${update.getHours()}`

      let updatedSpanTime = document.createElement('span');
      updatedSpanTime.classList.add('table-body__time');
      updatedSpanTime.textContent = `${updateHours}:${updateMinutes}`;
      td4.append(updatedSpanTime);

      td5.classList.add('table-body__item', 'table-body__item--contacts');

      for (const contact of item.contacts) {
        let tooltip = document.createElement('span');
        tooltip.classList.add('contact-tooltip');
        let tooltipBtn = document.createElement('button');
        tooltipBtn.classList.add('contact-tooltip__btn');
        let tooltipFrame = document.createElement('span');
        tooltipFrame.classList.add('contact-tooltip__frame');
        let tooltipContent = document.createElement('span');
        tooltipContent.classList.add('contact-tooltip__content');
        let tooltipTextName = document.createElement('span');
        tooltipTextName.classList.add('contact-tooltip__txt');
        let tooltipText = document.createElement('a');
        tooltipText.classList.add('contact-tooltip__txt', 'contact-tooltip__txt--contact');

        let type = contact.type;
        tooltipText.textContent = contact.value;

        switch (type) {
          case 'phone':
            tooltipBtn.insertAdjacentHTML('afterbegin', renderContactIcon('phone'));
            tooltipTextName.textContent = `Телефон: `
            let contactValue = contact.value.split('');
            const removeIndexes = [2, 3, 7, 8, 12, 15];
            for (let i = removeIndexes.length -1; i >= 0; i--) {
              contactValue.splice(removeIndexes[i],1);
            }
            contactValue = contactValue.join('')
            tooltipText.href = `tel:${contactValue}`
            break;
          case 'email':
            tooltipBtn.insertAdjacentHTML('afterbegin', renderContactIcon('email'));
            tooltipTextName.textContent = `email: `
            tooltipText.href = contact.value.trim();
            break;
          case 'facebook':
            tooltipBtn.insertAdjacentHTML('afterbegin', renderContactIcon('fb'));
            tooltipTextName.textContent = `facebook: `
            tooltipText.href = contact.value.trim();
            break;
          case 'vk':
            tooltipBtn.insertAdjacentHTML('afterbegin', renderContactIcon('vk'));
            tooltipTextName.textContent = `vk: `
            tooltipText.href = contact.value.trim();
            break;
          default:
            tooltipBtn.insertAdjacentHTML('afterbegin', renderContactIcon('other'));
            break;
        }

        tooltipContent.append(tooltipTextName);
        tooltipContent.append(tooltipText);
        tooltipFrame.append(tooltipContent);
        tooltipBtn.append(tooltipFrame);
        tooltip.append(tooltipBtn)
        td5.append(tooltip)
      };

      td6.classList.add('table-body__item', 'table-body__item--edit');
      let editBtn = document.createElement('button');
      editBtn.classList.add('table-body__edit');
      editBtn.textContent = 'Изменить'
      let deleteBtn = document.createElement('button');
      deleteBtn.classList.add('table-body__delete');
      deleteBtn.textContent = 'Удалить';

      // Изменение клиентской информации
      editBtn.addEventListener('click', () => {
        fadeIn(editClientModal);
        modalOpened();
        disabledFields(editClientModal);
        let oneClientInfo = getOneClientInfo(item.id)
        oneClientInfo.then((data) => {
          editClientModalForm(data.id, data.name, data.surname, data.lastName, data.contacts);
          window.location.hash = `#${data.id}`
        });
      });

      // Удаление клиента кнопкой "удалить"
      deleteBtn.addEventListener('click', () => {
        submitClientDelete(item.id)
      });

      td6.append(editBtn);
      td6.append(deleteBtn);

      tr.append(td1)
      tr.append(td2)
      tr.append(td3)
      tr.append(td4)
      tr.append(td5)
      tr.append(td6)

      if (td5.childElementCount > 4) {
        for (let i = 4; i < td5.childElementCount; i++) {
          td5.children[i].style.display = 'none'
        };
        let moreBtn = document.createElement('button');
        moreBtn.classList.add('show-more-contacts');
        let qnt = td5.childElementCount - 4
        moreBtn.textContent = `+${qnt}`
        td5.append(moreBtn)

        moreBtn.addEventListener('click', () => {
          moreBtn.style.display = 'none'
          for (let i = 4; i < td5.childElementCount - 1; i++) {
            td5.children[i].style.display = 'inline'
          };
        });
      };
      return tr
    };

    // Удаление клиента с сервера
    async function deleteClientFromServer(id) {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
      });
    };

    // Подтверждение удаления клиента
    function submitClientDelete(id) {
      const modal = document.createElement('div');
      const modalContainer = document.createElement('div');
      const h2 = document.createElement('h2');
      const p = document.createElement('p');
      const btnDelete = document.createElement('button');
      const btnCancel = document.createElement('button');
      const modalClose = document.createElement('button');
      modalClose.classList.add('client-modal__close');
      modalClose.insertAdjacentHTML('afterbegin', createCloseIcon());
      modal.classList.add('client-modal', 'delete-client-modal');
      modalContainer.classList.add('client-modal__container', 'delete-client-modal__container');
      h2.classList.add('zero-indent', 'client-modal__head', 'delete-client-modal__head');
      p.classList.add('zero-indent', 'delete-client-modal__text');
      btnDelete.classList.add('btn-2', 'client-modal__submit');
      btnCancel.classList.add('client-modal__cancel');
      h2.textContent = 'Удалить клиента';
      p.textContent = 'Вы действительно хотите удалить данного клиента?';
      btnDelete.textContent = 'Удалить';
      btnCancel.textContent = 'Отмена';
      modalContainer.append(modalClose);
      modalContainer.append(h2);
      modalContainer.append(p);
      modalContainer.append(btnDelete);
      modalContainer.append(btnCancel);
      modal.append(modalContainer);
      document.body.append(modal);

      fadeIn(modal);
      modalOpened();

      btnDelete.addEventListener('click', async () => {
        const data = await deleteClientFromServer(id);
        fadeOut(modal);
        fadeOut(editClientModal);
        modalClosed();
        window.location.hash = ''
        renderClientsData();
        setTimeout(() => {
          modal.remove();
        }, 300);
      });

      modal.addEventListener('click', e => {
        if (!modalContainer.contains(e.target) || btnCancel.contains(e.target) || modalClose.contains(e.target)) {
          fadeOut(modal);
          modalClosed();
          window.location.hash = ''
          setTimeout(() => {
            modal.remove();
          }, 300);
          return
        };
      });
    };

    // Открытие формы изменения клиента с данными клиента
    function editClientModalForm(id, name, surname, lastname, contacts) {
      const clientSurnameInput = editClientModal.querySelector('.client-modal__input--surname');
      const clientNameInput = editClientModal.querySelector('.client-modal__input--name');
      const clientMiddlenameInput = editClientModal.querySelector('.client-modal__input--middlename');

      document.getElementById('editModalId').textContent = id;

      clientSurnameInput.value = surname;
      clientNameInput.value = name;
      clientMiddlenameInput.value = lastname;

      editClientModal.querySelectorAll('.client-modal__input').forEach(el => {
        if (el.value) {
          el.parentElement.querySelector('.client-modal__label-text').classList.add('client-modal__label-text--active')
        }
      })

      if (contacts.length === 10) {
        editClientModal.querySelector('.client-modal__contact-btn').style.display = 'none'
      };

      for (const contact of contacts) {
        let addedContact = createAddContactForm(document.querySelector('.client-modal__contact-btn--edit'), contact.type);
        addedContact.input.value = contact.value;
        addedContact.deleteBtn.style.display = 'flex';
        addedContact.input.classList.remove('add-contact-form__input--empty');
        editClientModal.querySelector('.client-modal__contact-container').append(addedContact.addContactForm)
      };

      editClientModal.querySelectorAll('input').forEach((el) => {
        el.disabled = false
      });

    };

    // Изменить данные о клиенте
    editClientForm.addEventListener('submit', async e => {
      e.preventDefault();
      let formInfo = getClientInfoForm(editClientModal);
      if (formInfo.errorCnt > 0) {
        return
      };

      disabledFields(editClientForm);

      const id = document.getElementById('editModalId').textContent
      const data = await patchClientInfo(id, formInfo.name, formInfo.surname, formInfo.lastname, formInfo.contacts)

      fadeOut(editClientModal);
      modalClosed();
      clearForm(editClientForm);
      renderClientsData();
      window.location.hash = ''
    });

    // Удаление клиента в форме редактирования данных
    editModalDeleteClient.addEventListener('click', () => {
      const id = document.getElementById('editModalId').textContent;
      submitClientDelete(id)
    });

    // Поиск
    let searchTimer;

    // Получение результатов поиска
    async function searchingResult(searchRequest) {
      const response = await fetch(`http://localhost:3000/api/clients?search=${searchRequest}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data
    };

    // Функция отрисовки результатов поиска
    function showSearchResult(searchRequest) {
      let showSearchResult = searchingResult(searchRequest);

      showSearchResult.then((data) => {
        for (const item of data) {
          document.querySelector('.table-body').append(createClientTable(item))
        };
      });
    };

    // Выыод результатов поиска через 300мс при введении данных в поисковую строку
    searchClientsForm.addEventListener('input', e => {
      const searchRequest = e.target.value;
      clearTimeout(searchTimer);

      searchTimer = setTimeout(() => {
        clearTable();
        showSearchResult(searchRequest);
      }, 300);
    });


    // Очистка таблицы
    function clearTable() {
      const tableBody = document.querySelector('.table-body')
      tableBody.querySelectorAll('tr').forEach((el) => {
        el.remove();
      });
    };

    // Сортировка
    let sortNameStatus;
    let sortIdStatus = true;
    let sortCreatedStatus;
    let sortUpdatedStatus;

    // Сортировка по id
    document.getElementById('sortById').addEventListener('click', () => {
      clearTable();
      let sortByIdArr;

      if (searchClientsForm.value) {
        sortByIdArr = searchingResult(searchClientsForm.value);
      } else {
        sortByIdArr = getClients();
      };

      sortByIdArr.then((data) => {
        if (sortIdStatus === false) {
          data.sort((a, b) => a.id - b.id);
          document.querySelector('.table-head__sort--id').classList.add('table-head__sort--active');
          sortIdStatus = true
        } else {
          data.sort((a, b) => b.id - a.id);
          document.querySelector('.table-head__sort--id').classList.remove('table-head__sort--active');
          sortIdStatus = false
        };

        for (const item of data) {
          document.querySelector('.table-body').append(createClientTable(item))
        };

      });

      sortNameStatus = undefined;
      sortCreatedStatus = undefined;
      sortUpdatedStatus = undefined;
    });

    // Сортировка по имени
    document.getElementById('sortByName').addEventListener('click', () => {
      clearTable();
      let sortByNameArr;

      if (searchClientsForm.value) {
        sortByNameArr = searchingResult(searchClientsForm.value);
      } else {
        sortByNameArr = getClients();
      };

      sortByNameArr.then((data) => {
        if (sortNameStatus === true) {
          data.sort((a, b) => {
            if ( a.surname + a.name + a.lastName > b.surname + b.name + b.lastName ) return -1;
            if ( a.surname + a.name + a.lastName > b.surname + b.name + b.lastName ) return 1;
          })
          document.querySelector('.table-head__sort--name').classList.add('table-head__sort--active');
          sortNameStatus = false
        } else {
          data.sort((a, b) => {
            if ( a.surname + a.name + a.lastName < b.surname + b.name + b.lastName ) return -1;
            if ( a.surname + a.name + a.lastName < b.surname + b.name + b.lastName ) return 1;
          })
          document.querySelector('.table-head__sort--name').classList.remove('table-head__sort--active');
          sortNameStatus = true
        };

        for (const item of data) {
          document.querySelector('.table-body').append(createClientTable(item))
        };

      });

      sortIdStatus = undefined;
      sortCreatedStatus = undefined;
      sortUpdatedStatus = undefined;
    });

    // Сортировка по дате создания
    document.getElementById('sortByCreatedDate').addEventListener('click', () => {
      clearTable();
      let sortByCreatedArr;

      if (searchClientsForm.value) {
        sortByCreatedArr = searchingResult(searchClientsForm.value);
      } else {
        sortByCreatedArr = getClients();
      };

      sortByCreatedArr.then((data) => {
        if (sortCreatedStatus === false) {
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          document.querySelector('.table-head__sort--created').classList.add('table-head__sort--active');
          sortCreatedStatus = true
        } else {
          data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          document.querySelector('.table-head__sort--created').classList.remove('table-head__sort--active');
          sortCreatedStatus = false
        };

        for (const item of data) {
          document.querySelector('.table-body').append(createClientTable(item))
        };

      });

      sortIdStatus = undefined;
      sortNameStatus = undefined;
      sortUpdatedStatus = undefined;
    });

    // Сортировка по дате изменения
    document.getElementById('sortByLastUpdate').addEventListener('click', () => {
      clearTable();
      let sortByUpdateArr;

      if (searchClientsForm.value) {
        sortByUpdateArr = searchingResult(searchClientsForm.value);
      } else {
        sortByUpdateArr = getClients();
      };

      sortByUpdateArr.then((data) => {
        if (sortUpdatedStatus === false) {
          data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          document.querySelector('.table-head__sort--updated').classList.add('table-head__sort--active');
          sortUpdatedStatus = true
        } else {
          data.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
          document.querySelector('.table-head__sort--updated').classList.remove('table-head__sort--active');
          sortUpdatedStatus = false
        };

        for (const item of data) {
          document.querySelector('.table-body').append(createClientTable(item))
        };
      });

      sortIdStatus = undefined;
      sortCreatedStatus = undefined;
      sortNameStatus = undefined;
    });
  })
})()
