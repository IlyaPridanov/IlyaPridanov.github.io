'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAGS = 20;

  var inputTextHashtags = window.formPhotoEditing.inputTextHashtags;

  var HashtagsErrorText = {
    FIVE_HASHTAGS: 'Не более пяти хештегов',
    ALONE_LATTICE: 'Хеш-тег не может состоять только из одной решётки',
    SPACE: 'Хэш-теги разделяются пробелами',
    NEW_HASHTAGS_LATTICE: 'Хэш-тег начинается с символа # (решётка)',
    MAX_LENGTH_HASHTAGS: 'Максимальная длина одного хэш-тега 20 символов',
    SAME_HASHTAGS: 'Один и тот же хэш-тег не может быть использован дважды'
  };

  var checkLengthFiveHashtags = function (arr) {
    if (arr.length > MAX_HASHTAGS) {
      return HashtagsErrorText.FIVE_HASHTAGS;
    }
    return '';
  };

  var checkAloneLattice = function (arr) {
    var checkAloneLatticeResult = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === '#') {
        checkAloneLatticeResult = HashtagsErrorText.ALONE_LATTICE;
        break;
      }
    }
    return checkAloneLatticeResult;
  };

  var checkSpaceHashtags = function (arr) {
    var checkSpaceHashtagsResult = '';
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if ((arr[i][j] === '#') && (!(j === 0))) {
          checkSpaceHashtagsResult = HashtagsErrorText.SPACE;
          break;
        }
      }
    }
    return checkSpaceHashtagsResult;
  };

  var checkNewHashtagsLattice = function (arr) {
    var checkNewHashtagsLatticeResult = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] !== '#') {
        checkNewHashtagsLatticeResult = HashtagsErrorText.NEW_HASHTAGS_LATTICE;
        break;
      }
    }
    return checkNewHashtagsLatticeResult;
  };

  var checkMaxLengthHashtags = function (arr) {
    var checkMaxLengthHashtagsResult = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > MAX_LENGTH_HASHTAGS) {
        checkMaxLengthHashtagsResult = HashtagsErrorText.MAX_LENGTH_HASHTAGS;
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
          checkSameHashtagsResult = HashtagsErrorText.SAME_HASHTAGS;
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
      checkSpaceHashtags(arrHashtags),
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

