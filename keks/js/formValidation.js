'use strict';

(function () {
  var inputTextHashtags = window.formPhotoEditing.inputTextHashtags;

  var hashtagsErrorText = {
    fiveHashtags: 'Не более пяти хештегов',
    aloneLattice: 'Хеш-тег не может состоять только из одной решётки',
    space: 'Хэш-теги разделяются пробелами',
    newHashtagsLattice: 'Хэш-тег начинается с символа # (решётка)',
    maxLengthHashtags: 'Максимальная длина одного хэш-тега 20 символов',
    sameHashtags: 'Один и тот же хэш-тег не может быть использован дважды'
  };

  var checkLengthFiveHashtags = function (arr) {
    if (arr.length > 5) {
      return hashtagsErrorText.fiveHashtags;
    } else {
      return '';
    }
  };

  var checkAloneLattice = function (arr) {
    var checkAloneLatticeResult = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === '#') {
        checkAloneLatticeResult = hashtagsErrorText.aloneLattice;
        break;
      }
    }
    return checkAloneLatticeResult;
  };

  var checkNewHashtagsLattice = function (arr) {
    var checkNewHashtagsLatticeResult = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] !== '#') {
        checkNewHashtagsLatticeResult = hashtagsErrorText.newHashtagsLattice;
        break;
      }
    }
    return checkNewHashtagsLatticeResult;
  };

  var checkMaxLengthHashtags = function (arr) {
    var checkMaxLengthHashtagsResult = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > 20) {
        checkMaxLengthHashtagsResult = hashtagsErrorText.maxLengthHashtags;
        break;
      }
    }
    return checkMaxLengthHashtagsResult;
  };

  var checkSameHashtags = function (arr) {
    var checkSameHashtagsResult = '';
    var flag = false;
    for (var i = 0; i < arr.length; i++) {
      if (flag) {
        break;
      }
      for (var j = 0; j < arr.length; j++) {
        if ((arr[i].toUpperCase() === arr[j].toUpperCase()) && (i !== j)) {
          checkSameHashtagsResult = hashtagsErrorText.sameHashtags;
          flag = true;
          break;
        }
        checkSameHashtagsResult = '';
      }
    }
    return checkSameHashtagsResult;
  };

  var gethashtagsArrMistakes = function (arrHashtags) {
    var hashtagsArrMistakes = [
      checkLengthFiveHashtags(arrHashtags),
      checkAloneLattice(arrHashtags),
      checkNewHashtagsLattice(arrHashtags),
      checkMaxLengthHashtags(arrHashtags),
      checkSameHashtags(arrHashtags)
    ];
    return hashtagsArrMistakes;
  };

  var onHashtagInput = function () {
    var arr = inputTextHashtags.value.trim().split(' ');
    inputTextHashtags.setCustomValidity(gethashtagsArrMistakes(arr).join(''));
  };

  inputTextHashtags.addEventListener('change', onHashtagInput);
})();

