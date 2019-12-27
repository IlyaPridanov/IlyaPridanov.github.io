'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAX_COMMENTS = 5;

  var socialCommentsVisual = MAX_COMMENTS;

  var bigPicture = document.querySelector('.big-picture');

  var bigPictureBlock = bigPicture.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureBlock.querySelector('img');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var commentsLoader = window.allPictures.commentsLoader;
  var socialCommentCount = window.allPictures.socialCommentCount;
  var quantityСommentsNow = bigPicture.querySelector('.comments-now');

  commentsLoader.classList.remove('visually-hidden');
  socialCommentCount.classList.remove('visually-hidden');

  var getOneBlockSocialComments = function (response) {
    var oneSocialCommentsString = '';
    response.comments.forEach(function (item, i) {
      if (i < socialCommentsVisual) {
        if (socialCommentsVisual >= response.comments.length) {
          commentsLoader.classList.add('hidden');
        }
        oneSocialCommentsString += '<li class="social__comment"><img class="social__picture" src="' + item.avatar + '" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + item.message + '</p></li>';
      }
    });
    return oneSocialCommentsString;
  };
  var getSocialComments = function (response) {
    var socialCommentsAll = '';
    socialCommentsAll = getOneBlockSocialComments(response);
    return socialCommentsAll;
  };

  var commentCondition = function (response) {
    bigPicture.querySelector('.social__comments').innerHTML = getSocialComments(response);
    if (socialCommentsVisual < response.comments.length) {
      quantityСommentsNow.textContent = socialCommentsVisual;
    } else {
      quantityСommentsNow.textContent = response.comments.length;
    }
  };

  var getBigPicture = function (response) {
    bigPicture.querySelector('.big-picture__img').setAttribute('src', response.url);
    bigPicture.querySelector('.likes-count').textContent = response.likes;
    bigPicture.querySelector('.comments-count').textContent = response.comments.length;

    commentCondition(response);
    commentsLoader.addEventListener('click', function () {
      socialCommentsVisual += 5;
      commentCondition(response);
    });
    bigPicture.querySelector('.social__caption').textContent = response.description;
    window.preview.closeBigPictures();
  };

  var closeBigPictures = function () {
    bigPictureCancel.addEventListener('click', function () {
      socialCommentsVisual = MAX_COMMENTS;
      bigPicture.classList.add('hidden');
    }
    );
    var setBigPictureEscListener = function () {
      document.addEventListener('keydown', onBigPictureEscListener);
    };
    var onBigPictureEscListener = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        socialCommentsVisual = MAX_COMMENTS;
        bigPicture.classList.add('hidden');
      }
      document.removeEventListener('keydown', onBigPictureEscListener);
    };
    setBigPictureEscListener();
  };

  var getClickMinPictures = function (responseIndex) {
    return function () {
      socialCommentsVisual = MAX_COMMENTS;
      commentsLoader.classList.remove('hidden');
      getBigPicture(responseIndex);
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = responseIndex.url;
    };
  };

  var flagNew = window.allPictures.flagNew;

  var openBigPictures = function (response) {
    window.allPictures.getAllPhotoBuild(response);
    var allPhotos = window.allPictures.userPhotoContainer.querySelectorAll('a');
    allPhotos.forEach(function (item, i) {
      item.addEventListener('click', getClickMinPictures(flagNew ? response[window.allPictures.randomArrIndexes[i]] : response[i]));
    });
  };

  window.backend.send(openBigPictures);

  var getAllPicturesNewFlag = function (flag) {
    return function () {
      flagNew = flag;
      window.backend.send(openBigPictures);
    };
  };

  window.allPictures.filterPopular.addEventListener('click', getAllPicturesNewFlag(false));
  window.allPictures.filterNew.addEventListener('click', getAllPicturesNewFlag(true));
  window.allPictures.filterDiscussed.addEventListener('click', getAllPicturesNewFlag(false));

  closeBigPictures();

  window.preview = {
    getBigPicture: getBigPicture,
    bigPicture: bigPicture,
    closeBigPictures: closeBigPictures,
    openBigPictures: openBigPictures,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
