'use strict';

window.onload = function () {

  var menu = document.querySelector('.nav__list--nav-page');
  var menuOpenBtn = document.querySelector('.nav__btn');
  var btnSlider = document.querySelectorAll('.btn');
  var serviceBlock = document.querySelectorAll('.service-block');
  var upSliderLink = document.querySelectorAll('.up-slider__link');
  var partnersItem = document.querySelectorAll('.partners__item');
  var partnersImg = document.querySelectorAll('.partners__img');
  var tel = document.querySelector('#tel');
  var name = document.querySelector('#name');
  var mail = document.querySelector('#mail');
  var speach = document.querySelector('#speach');

  menuOpenBtn.addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.toggle('nav__hidden');
  });

  for (var i = 0; i < btnSlider.length; i++) {
    btnSlider[i].addEventListener('click', function (e) {
      e.preventDefault();
      for (var j = 0; j < btnSlider.length; j++) {
        btnSlider[j].classList.remove('btn--active');
      }
      for (var k = 0; k < upSliderLink.length; k++) {
        upSliderLink[k].classList.remove('up-slider__link--active');
        if (this.getAttribute("aria-label") === upSliderLink[k].getAttribute("aria-label")) {
          upSliderLink[k].classList.add('up-slider__link--active');
        }
      }
      for (k = 0; k < partnersImg.length; k++) {
        partnersImg[k].classList.remove('partners__img--active');
        partnersItem[k].classList.remove('partners__item--active');
        if (this.getAttribute("aria-label") === "ava") {
          partnersItem[0].classList.remove('partners__item--tablet-no-active');
          partnersItem[partnersItem.length - 1].classList.add('partners__item--tablet-no-active');
        }
        if (this.getAttribute("aria-label") === "teplodomenerg") {
          partnersItem[partnersItem.length - 1].classList.remove('partners__item--tablet-no-active');
          partnersItem[0].classList.add('partners__item--tablet-no-active');
        }
        if (this.getAttribute("aria-label") === partnersImg[k].getAttribute("aria-label")) {
          partnersImg[k].classList.add('partners__img--active');
          partnersItem[k].classList.add('partners__item--active');
        }
      }
      this.classList.add('btn--active');
    });
  }

  for (i = 0; i < serviceBlock.length; i++) {
    serviceBlock[i].addEventListener('click', function () {
      if (this.classList.contains('service-block--active')) {
        this.classList.remove('service-block--active');
      } else {
        for (var j = 0; j < serviceBlock.length; j++) {
          serviceBlock[j].classList.remove('service-block--active');
        }
        this.classList.add('service-block--active');
      }
    });
  }

  var getLocalSave = function (input) {
    input.addEventListener('change', function () {
      // eslint-disable-next-line no-invalid-this
      localStorage.setItem(this.name, this.value);
    });
  };

  getLocalSave(name);
  getLocalSave(tel);
  getLocalSave(mail);
  getLocalSave(speach);

  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  var mask1 = IMask(tel, maskOptions);
};
