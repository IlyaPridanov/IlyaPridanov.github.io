'use strict';

window.onload = function () {

  var body = document.querySelector('body');
  var openPopap = document.querySelector('.header__call-link');
  var closePopap = document.querySelector('.popap__close');
  var popap = document.querySelector('.popap');
  var name = document.querySelector('#popap-name');
  var tel = document.querySelector('#popap-tel');
  var textbox = document.querySelector('#textbox');
  var advantagesLink = document.querySelectorAll('.advantages__link');
  var footerCaptionLink = document.querySelectorAll('.footer-center__caption-block');
  var formTel = document.getElementById('form-tel');

  openPopap.addEventListener('click', function (e) {
    e.preventDefault();
    body.style.overflow = 'hidden';
    popap.classList.remove('hidden');
    name.focus();
  });

  popap.addEventListener('click', function (event) {
    if (event.target === this) {
      popap.classList.add('hidden');
      body.style.overflow = 'visible';
      name.blur();
    }
  });

  closePopap.addEventListener('click', function (e) {
    e.preventDefault();
    body.style.overflow = 'visible';
    name.blur();
    popap.classList.add('hidden');
  });

  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      name.blur();
      body.style.overflow = 'visible';
      popap.classList.add('hidden');
    }
  });

  var getLocalSave = function (input) {
    input.addEventListener('change', function () {
      // eslint-disable-next-line no-invalid-this
      localStorage.setItem(this.name, this.value);
    });
  };

  getLocalSave(name);
  getLocalSave(tel);
  getLocalSave(textbox);

  for (var i = 0; i < advantagesLink.length; i++) {
    advantagesLink[i].addEventListener('click', function (e) {
      e.preventDefault();
    });
  }

  for (var j = 0; j < footerCaptionLink.length; j++) {
    footerCaptionLink[j].addEventListener('click', function (e) {
      e.preventDefault();
      var parent = this.parentNode;
      var parentUse = parent.querySelector('use');
      parent.classList.toggle('active');
      if (parent.classList.contains('active')) {
        parentUse.setAttributeNS('http://www.w3.org/1999/xlink', "href", "#icon-plus");
      } else {
        parentUse.setAttributeNS('http://www.w3.org/1999/xlink', "href", "#icon-minus");
      }
      var parentList = parent.querySelectorAll('ul');
      for (var k = 0; k < parentList.length; k++) {
        parentList[k].classList.toggle('footer-center__list--mobile-hidden');
        parentList[k].classList.toggle('footer-center__list--mobile-visuallyhidden');
      }
    });
  }

  /*Добавляет маску*/


  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  var mask1 = IMask(tel, maskOptions);
  var mask2 = IMask(formTel, maskOptions);
};
