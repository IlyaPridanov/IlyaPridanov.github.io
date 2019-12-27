'use strict';

(function () {
  var NUMBER_OF_RANDOM_PHOTOS = 10;
  var REBOOT_TIMEOUT = 300;

  var flagNew = false;
  var allPhotos = [];
  var userPhotoContainer = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');
  var userPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrIndex = function () {
    var indexArrNumbers = [];
    for (var i = 0; i < NUMBER_OF_RANDOM_PHOTOS; i++) {
      indexArrNumbers[i] = i;
    }
    var randomIndexNumbers = [];
    for (var j = 0; j < NUMBER_OF_RANDOM_PHOTOS; j++) {
      var randomIndex = getRandomInt(0, NUMBER_OF_RANDOM_PHOTOS - j - 1);
      randomIndexNumbers[j] = indexArrNumbers[randomIndex];
      indexArrNumbers.splice(randomIndex, 1);
    }

    return randomIndexNumbers;
  };

  var randomArrIndexes;
  randomArrIndexes = getRandomArrIndex();

  var getAllPhotoFilterNew = function (response, userPhoto) {
    allPhotos = [];
    for (var j = 0; j < NUMBER_OF_RANDOM_PHOTOS; j++) {
      userPhoto = userPhotoTemplate.cloneNode(true);
      userPhoto.querySelector('.picture__img').src = response[randomArrIndexes[j]].url;
      userPhoto.querySelector('.picture__likes').textContent = response[randomArrIndexes[j]].likes;
      userPhoto.querySelector('.picture__comments').textContent = response[randomArrIndexes[j]].comments.length;
      allPhotos.push(userPhoto);
    }
  };

  var getAllPhotoFilterDiscussed = function (response, userPhoto) {
    allPhotos = [];
    response.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    response.forEach(function (item) {
      userPhoto = userPhotoTemplate.cloneNode(true);
      userPhoto.querySelector('.picture__img').src = item.url;
      userPhoto.querySelector('.picture__likes').textContent = item.likes;
      userPhoto.querySelector('.picture__comments').textContent = item.comments.length;
      allPhotos.push(userPhoto);
    });
  };

  var getAllPhotoFilterPopular = function (response, userPhoto) {
    allPhotos = [];
    response.forEach(function (item) {
      userPhoto = userPhotoTemplate.cloneNode(true);
      userPhoto.querySelector('.picture__img').src = item.url;
      userPhoto.querySelector('.picture__likes').textContent = item.likes;
      userPhoto.querySelector('.picture__comments').textContent = item.comments.length;
      allPhotos.push(userPhoto);
    });
  };

  var getAllPhoto = function (response) {
    var userPhoto;
    if (filterNew.classList.contains('img-filters__button--active')) {
      getAllPhotoFilterNew(response, userPhoto);
    }
    if (filterDiscussed.classList.contains('img-filters__button--active')) {
      getAllPhotoFilterDiscussed(response, userPhoto);
    }
    if (filterPopular.classList.contains('img-filters__button--active')) {
      getAllPhotoFilterPopular(response, userPhoto);
    }
    return allPhotos;
  };

  var getFragment = function (response) {
    var fragment = document.createDocumentFragment();
    getAllPhoto(response);
    allPhotos.forEach(function (item) {
      fragment.appendChild(item);
    });
    return fragment;
  };

  var getPhotos = function () {
    return allPhotos;
  };


  var getAllPhotoBuild = function (response) {
    var removeTegArrs = userPhotoContainer.querySelectorAll('a');
    removeTegArrs.forEach(function (item) {
      userPhotoContainer.removeChild(item);
    });
    userPhotoContainer.appendChild(getFragment(response));
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.backend.send(getAllPhotoBuild);

  var getRebootTimeout = function (functionTimeout) {
    var lastTimeout;
    lastTimeout = window.setTimeout(function () {
      functionTimeout();
    }, REBOOT_TIMEOUT);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
  };

  filterPopular.addEventListener('click', function () {
    flagNew = false;
    filterPopular.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    getRebootTimeout(window.backend.send(getAllPhotoBuild));
  });
  filterNew.addEventListener('click', function () {
    flagNew = true;
    if (flagNew) {
      randomArrIndexes = getRandomArrIndex();
    }
    window.allPictures.randomArrIndexes = randomArrIndexes;
    filterNew.classList.add('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    getRebootTimeout(window.backend.send(getAllPhotoBuild));
  });
  filterDiscussed.addEventListener('click', function () {
    flagNew = false;
    filterDiscussed.classList.add('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    getRebootTimeout(window.backend.send(getAllPhotoBuild));
  });

  window.allPictures = {
    getAllPhotoBuild: getAllPhotoBuild,
    getAllPhoto: getAllPhoto,
    getPhotos: getPhotos,
    filterPopular: filterPopular,
    filterNew: filterNew,
    filterDiscussed: filterDiscussed,
    flagNew: flagNew,
    randomArrIndexes: randomArrIndexes,
    userPhotoContainer: userPhotoContainer,
    socialCommentCount: socialCommentCount,
    commentsLoader: commentsLoader
  };
})();
