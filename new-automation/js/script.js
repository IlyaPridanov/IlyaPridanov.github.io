// Подключение js-файлов с помощью rigger-а
// Vendor
// Modules
'use strict';

(function () {
  var headerNavBtn = document.querySelector('.header__button');
  var headerNav = document.querySelector('.header__nav');

  var getOpenNav = function getOpenNav(link) {
    link.addEventListener('click', function () {
      link.classList.toggle('header__button--active');
      headerNav.classList.toggle('header__nav--inactive');
    });
  };

  getOpenNav(headerNavBtn);
})();

'use strict';

(function () {
  var footerTopBtn = document.querySelector('.footer-top__btn');
  var formPopup = document.querySelector('.form-popup');
  var formPopupExit = document.querySelector('.form-popup__btn-exit');

  var getOpen = function getOpen() {
    formPopup.classList.remove('hidden');
  };

  var getClose = function getClose() {
    formPopup.classList.add('hidden');
  };

  footerTopBtn.addEventListener('click', function () {
    getOpen();
  });
  formPopupExit.addEventListener('click', function () {
    getClose();
  });
  formPopup.addEventListener('click', function (event) {
    if (event.target === this) {
      getClose();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      getClose();
    }
  });
})();

'use strict';

(function () {
  var URL_UPLOAD = 'https://httpbin.org/post';
  var NORMAL_STATUS = 200;

  var upload = function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    upload: upload
  };
})();

'use strict';

(function () {
  var formPopup = document.querySelector('.form-popup');
  var successPopup = document.querySelector('.success-popup');
  var form = document.querySelector('.form-popup form');
  var formBtn = document.querySelector('.form-popup .form-popup__btn');
  var textarea = document.querySelector('.form-popup textarea');
  var input = document.querySelectorAll('.form-popup input');

  var successForm = function successForm() {
    formPopup.classList.add('hidden');
    successPopup.classList.remove('hidden');
    setTimeout(function () {
      return successPopup.classList.add('hidden');
    }, 1000);
  };

  var errorForm = function errorForm() {
    alert('Беда!');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), successForm, errorForm);
  });
  formBtn.addEventListener('click', function () {
    if (!textarea.checkValidity()) {
      textarea.classList.add('invalid');
    }

    input.forEach(function (item) {
      if (!item.checkValidity()) {
        item.classList.add('invalid');
      }
    });
  });
  textarea.addEventListener('input', function () {
    if (!textarea.checkValidity()) {
      textarea.classList.add('invalid');
    } else {
      textarea.classList.remove('invalid');
    }
  });
  input.forEach(function (item) {
    item.addEventListener('input', function () {
      if (!this.checkValidity()) {
        this.classList.add('invalid');
      } else {
        this.classList.remove('invalid');
      }
    });
  });
})();