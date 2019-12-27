'use strict';

(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  var scaleControlValue = window.formPhotoEditing.scaleControlValue;
  var imgUpload = window.formPhotoEditing.imgUpload;

  var setScaleControlListener = function () {
    scaleControlValue.value = '100%';
    scaleControlSmaller.addEventListener('click', function () {
      if (parseFloat(scaleControlValue.value) > 25) {
        scaleControlValue.value = String(parseFloat(scaleControlValue.value) - 25) + '%';
        imgUpload.style.transform = 'scale(' + (parseFloat(scaleControlValue.value) / 100) + ')';
      }
    });
    scaleControlBigger.addEventListener('click', function () {
      if (parseFloat(scaleControlValue.value) < 100) {
        scaleControlValue.value = String(parseFloat(scaleControlValue.value) + 25) + '%';
        imgUpload.style.transform = 'scale(' + (parseFloat(scaleControlValue.value) / 100) + ')';
      }
    });
  };

  setScaleControlListener();
})();

