'use strict';

(function () {
  var userPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var userPhotoContainer = document.querySelector('.pictures');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.data = {
    userPhotoTemplate: userPhotoTemplate,
    userPhotoContainer: userPhotoContainer
  };

})();
