'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PERCENT_GET_CSS_PROPERTY = 100;

  var PhotoCssClasses = {
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat',
    NONE: 'effects__preview--none'
  };

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var uploadPhotoCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var uploadFile = document.querySelector('#upload-file');

  var pinSlider = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
  var radioCheckedIndex;

  var imgUpload = imgUploadPreview.querySelector('img');

  var inputTextHashtags = imgUploadOverlay.querySelector('.text__hashtags');
  var inputTextDescription = imgUploadOverlay.querySelector('.text__description');

  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');

  inputTextDescription.textContent = '';

  var isInputNameInFocus = function () {
    return (inputTextHashtags === document.activeElement) || (inputTextDescription === document.activeElement);
  };

  var getWhoRadioChecked = function () {
    effectsRadio.forEach(function (item, i) {
      if (item.checked) {
        radioCheckedIndex = i;
      }
    });
    return radioCheckedIndex;
  };

  var getCssProperty = function (elem, property) {
    var result = window.getComputedStyle(elem, null).getPropertyValue(property);
    return (parseFloat(result) / PERCENT_GET_CSS_PROPERTY);
  };

  var getPinSliderResultIntro = function () {
    var pinSliderPageX = getCssProperty(pinSlider, 'left');
    return pinSliderPageX;
  };

  var getWhoAddClasses = function (addClass) {
    imgUploadEffectLevel.classList.remove('hidden');
    if (addClass === PhotoCssClasses.NONE) {
      imgUploadEffectLevel.classList.add('hidden');
    }
    imgUpload.classList.forEach(function (item) {
      if (!(item === addClass)) {
        imgUpload.classList.remove(item);
      }
    });
    imgUpload.classList.add(addClass);
  };

  var getPhotoCssEffect = function (pinSliderResult) {
    var whoRadioChecked = getWhoRadioChecked();
    switch (whoRadioChecked) {
      case 1:
        imgUpload.style.filter = 'grayscale(' + pinSliderResult + ')';
        getWhoAddClasses(PhotoCssClasses.CHROME);
        break;
      case 2:
        imgUpload.style.filter = 'sepia(' + pinSliderResult + ')';
        getWhoAddClasses(PhotoCssClasses.SEPIA);
        break;
      case 3:
        imgUpload.style.filter = 'invert(' + pinSliderResult * 100 + '%)';
        getWhoAddClasses(PhotoCssClasses.MARVIN);
        break;
      case 4:
        imgUpload.style.filter = 'blur(' + pinSliderResult * 3 + 'px)';
        getWhoAddClasses(PhotoCssClasses.PHOBOS);
        break;
      case 5:
        imgUpload.style.filter = 'brightness(' + ((pinSliderResult * 2) + 1) + ')';
        getWhoAddClasses(PhotoCssClasses.HEAT);
        break;
      default:
        imgUpload.style.filter = 'none';
        imgUploadEffectLevel.value = '';
        getWhoAddClasses(PhotoCssClasses.NONE);
    }
  };

  var getStartImgUploadOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');
    pinSlider.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    scaleControlValue.value = '100%';
    imgUpload.style.transform = 'scale(1)';
    getPhotoCssEffect(1);
  };

  var getImgUploadOverlay = function () {
    uploadFile.addEventListener('change', function () {
      var file = uploadFile.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          imgUpload.src = reader.result;
        });
        reader.readAsDataURL(file);
      }

      getStartImgUploadOverlay();
    });
  };


  var getCloseUploadPhoto = function () {
    uploadPhotoCancel.addEventListener('click', function () {
      imgUploadOverlay.classList.add('hidden');
      imgUploadOverlay.value = '';
    }
    );
    document.addEventListener('keydown', function (evt) {
      if ((evt.keyCode === window.preview.ESC_KEYCODE) && (!isInputNameInFocus())) {
        imgUploadOverlay.classList.add('hidden');
        imgUploadOverlay.value = '';
        pinSlider.style.left = '100%';
        effectLevelDepth.style.width = '100%';
        scaleControlValue.value = '100%';
        imgUpload.style.transform = 'scale(1)';
        effectsRadio[5].checked = true;
        getPhotoCssEffect(1);
      }
    });
  };

  var setUploadPhotoEscPress = function () {
    document.addEventListener('keydown', onUploadPhotoEscPress);
  };

  var onUploadPhotoEscPress = function (evt) {
    if ((evt.keyCode === window.preview.ESC_KEYCODE) && (!isInputNameInFocus())) {
      imgUploadOverlay.classList.add('hidden');
      imgUploadOverlay.value = '';
    }
    document.removeEventListener('keydown', onUploadPhotoEscPress);
  };

  setUploadPhotoEscPress();

  var setRadioListener = function (radioArr) {
    radioArr.addEventListener('click', function () {
      pinSlider.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      getPhotoCssEffect(1);
    });
  };

  var setRadioListenerResult = function () {
    effectsRadio.forEach(function (item) {
      setRadioListener(item);
    });
  };

  getImgUploadOverlay();
  getCloseUploadPhoto();
  getPinSliderResultIntro();
  getPhotoCssEffect();
  setRadioListenerResult();

  window.formPhotoEditing = {
    inputTextHashtags: inputTextHashtags,
    imgUpload: imgUpload,
    pinSlider: pinSlider,
    effectLevelLine: effectLevelLine,
    effectLevelDepth: effectLevelDepth,
    getPhotoCssEffect: getPhotoCssEffect,
    setRadioListenerResult: setRadioListenerResult,
    imgUploadOverlay: imgUploadOverlay,
    scaleControlValue: scaleControlValue
  };
})();
