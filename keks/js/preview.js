'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var ESC_KEYCODE = 27;

  var bigPictureDiv = document.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureDiv.querySelector('img');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsNow = document.querySelector('.comments-now');

  var SOCIAL_COMMENTS_VISUAL = 5;

  commentsLoader.classList.remove('visually-hidden');
  socialCommentCount.classList.remove('visually-hidden');

  var oneSocialComments = function (response) {
    var oneSocialCommentsString = '';
    for (var i = 0; (i < response.comments.length) && (i < SOCIAL_COMMENTS_VISUAL); i++) {
      if (SOCIAL_COMMENTS_VISUAL >= response.comments.length) {
        commentsLoader.classList.add('hidden');
      }
      oneSocialCommentsString += '<li class="social__comment"><img class="social__picture" src="' + response.comments[i].avatar + '" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + response.comments[i].message + '</p></li>';
    }
    return oneSocialCommentsString;
  };
  var socialComments = function (response) {
    var socialCommentsAll = '';
    socialCommentsAll = oneSocialComments(response);
    return socialCommentsAll;
  };

  var getBigPicture = function (response) {
    console.log('Кликается картнка с адресом ' + response.url);
    bigPicture.querySelector('.big-picture__img').setAttribute('src', response.url);
    bigPicture.querySelector('.likes-count').textContent = response.likes;
    bigPicture.querySelector('.comments-count').textContent = response.comments.length;

    bigPicture.querySelector('.social__comments').innerHTML = socialComments(response);
    if (SOCIAL_COMMENTS_VISUAL < response.comments.length) {
      commentsNow.textContent = SOCIAL_COMMENTS_VISUAL;
    } else {
      commentsNow.textContent = response.comments.length;
    }
    commentsLoader.addEventListener('click', function () {
      SOCIAL_COMMENTS_VISUAL += 5;
      bigPicture.querySelector('.social__comments').innerHTML = socialComments(response);
      if (SOCIAL_COMMENTS_VISUAL < response.comments.length) {
        commentsNow.textContent = SOCIAL_COMMENTS_VISUAL;
      } else {
        commentsNow.textContent = response.comments.length;
      }
    });
    bigPicture.querySelector('.social__caption').textContent = response.description;
    window.preview.closeBigPictures();
  };

  var closeBigPictures = function () {
    bigPictureCancel.addEventListener(
        'click', function () {
          SOCIAL_COMMENTS_VISUAL = 5;
          bigPicture.classList.add('hidden');
        }
    );
    var onBigPictureEscListener = function () {
      document.addEventListener('keydown', bigPictureEscListener);
    };
    var bigPictureEscListener = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        SOCIAL_COMMENTS_VISUAL = 5;
        bigPicture.classList.add('hidden');
      }
      document.removeEventListener('keydown', bigPictureEscListener);
    };
    onBigPictureEscListener();
  };

  var getClickMinPictures = function (responseIndex) {
    return function () {
      SOCIAL_COMMENTS_VISUAL = 5;
      commentsLoader.classList.remove('hidden');
      getBigPicture(responseIndex);
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = responseIndex.url;
    };
  };

  var flagNew = window.allPictures.flagNew;

  var openBigPictures = function (response) {
    window.allPictures.getAllPhotoBuild(response);
    var allPhotos = [];
    /*allPhotos = window.allPictures.getAllPhoto(response);*/
    allPhotos = window.data.userPhotoContainer.querySelectorAll('a');
    if (flagNew) {
      console.log(window.allPictures.randomArrIndex);
      for (var p = 0; p < allPhotos.length; p++) {
        allPhotos[p].addEventListener('click', getClickMinPictures(response[window.allPictures.randomArrIndex[p]]));
      }
    }
    if (!flagNew) {
      for (var k = 0; k < allPhotos.length; k++) {
        allPhotos[k].addEventListener('click', getClickMinPictures(response[k]));
      }
    }
  };

  window.backend.send(openBigPictures);

  window.allPictures.filterPopular.addEventListener('click', function () {
    flagNew = false;
    window.backend.send(openBigPictures);
  });
  window.allPictures.filterNew.addEventListener('click', function () {
    flagNew = true;
    console.log(window.allPictures.randomArrIndex);
    window.backend.send(openBigPictures);
  });
  window.allPictures.filterDiscussed.addEventListener('click', function () {
    flagNew = false;
    window.backend.send(openBigPictures);
  });

  window.preview = {
    getBigPicture: getBigPicture,
    bigPicture: bigPicture,
    closeBigPictures: closeBigPictures,
    openBigPictures: openBigPictures
  };

  closeBigPictures();
})();
