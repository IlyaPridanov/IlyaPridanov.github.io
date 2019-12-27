'use strict';

(function () {
  var setPinSliderHandler = function () {
    window.formPhotoEditing.pinSlider.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX
        };

        var rect = window.formPhotoEditing.effectLevelLine.getBoundingClientRect();
        var coord = shift.x - rect.left;
        var coordEnd = rect.width;
        var scaleCoord = Math.round((100 / coordEnd) * coord);

        if ((shift.x > rect.left) && (shift.x < rect.right)) {
          window.formPhotoEditing.pinSlider.style.left = scaleCoord + '%';

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

  var getSliderResult = function () {
    window.formPhotoEditing.setRadioListenerResult();
    setPinSliderHandler();
  };

  getSliderResult();

})();

