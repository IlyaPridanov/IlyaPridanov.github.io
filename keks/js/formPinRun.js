'use strict';

(function () {
  var setPinSliderHandler = function () {
    window.formPhotoEditing.pinSlayder.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX
        };

        var coord = shift.x - window.formPhotoEditing.window.formPhotoEditing.rect.left;
        var coordEnd = window.formPhotoEditing.window.formPhotoEditing.rect.width;
        var scaleCoord = Math.round((100 / coordEnd) * coord);

        if ((shift.x > window.formPhotoEditing.window.formPhotoEditing.rect.left) && (shift.x < window.formPhotoEditing.window.formPhotoEditing.rect.right)) {
          window.formPhotoEditing.pinSlayder.style.left = scaleCoord + '%';

          window.formPhotoEditing.effectLevelDepth.style.width = scaleCoord + '%';
        }

        window.formPhotoEditing.getPhotoCssEffect(scaleCoord / 100);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  };

  var slayderResult = function () {
    window.formPhotoEditing.setRadioListenerResult();
    setPinSliderHandler();
  };

  slayderResult();

})();
