'use strict';

(function () {
  var flagNew = false;
  var allPhotos = [];
  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrIndex = function () {
    var indexArrNumbers = [];
    for (var i = 0; i < 10; i++) {
      indexArrNumbers[i] = i;
    }
    var randomIndexNumbers = [];
    for (var j = 0; j < 10; j++) {
      var randomIndex = getRandomInt(0, 10 - j - 1);
      randomIndexNumbers[j] = indexArrNumbers[randomIndex];
      indexArrNumbers.splice(randomIndex, 1);
    }

    return randomIndexNumbers;
  };

  var randomArrIndex;
  randomArrIndex = getRandomArrIndex();
  console.log(randomArrIndex);

  var getAllPhoto = function (response) {
    if (filterNew.classList.contains('img-filters__button--active')) {
      allPhotos = [];
      console.log('Произошло перестраивание НОВЫЕ');
      console.log(randomArrIndex);
      for (var j = 0; j < 10; j++) {
        userPhoto = window.data.userPhotoTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = response[randomArrIndex[j]].url;
        userPhoto.querySelector('.picture__likes').textContent = response[randomArrIndex[j]].likes;
        userPhoto.querySelector('.picture__comments').textContent = response[randomArrIndex[j]].comments.length;
        allPhotos.push(userPhoto);
      }
    }
    if (filterDiscussed.classList.contains('img-filters__button--active')) {
      allPhotos = [];
      console.log('Произошло перестраивание ОБСУЖДАЕМЫЕ');
      response.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      for (var k = 0; k < response.length; k++) {
        var userPhoto = window.data.userPhotoTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = response[k].url;
        userPhoto.querySelector('.picture__likes').textContent = response[k].likes;
        userPhoto.querySelector('.picture__comments').textContent = response[k].comments.length;
        allPhotos.push(userPhoto);
      }
    }
    if (filterPopular.classList.contains('img-filters__button--active')) {
      allPhotos = [];
      for (var i = 0; i < response.length; i++) {
        userPhoto = window.data.userPhotoTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = response[i].url;
        userPhoto.querySelector('.picture__likes').textContent = response[i].likes;
        userPhoto.querySelector('.picture__comments').textContent = response[i].comments.length;
        allPhotos.push(userPhoto);
      }
    }
    return allPhotos;
  };

  var getFragment = function (response) {
    var fragment = document.createDocumentFragment();
    getAllPhoto(response);
    for (var i = 0; i < allPhotos.length; i++) {
      fragment.appendChild(allPhotos[i]);
    }
    return fragment;
  };

  var getPhotos = function () {
    return allPhotos;
  };


  var getAllPhotoBuild = function (response) {
    var removeTegArr = window.data.userPhotoContainer.querySelectorAll('a');
    for (var i = 0; i < removeTegArr.length; i++) {
      window.data.userPhotoContainer.removeChild(removeTegArr[i]);
    }
    window.data.userPhotoContainer.appendChild(getFragment(response));
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.backend.send(getAllPhotoBuild);

  var getRebootTimeout = function (functionTimeout) {
    var lastTimeout;
    lastTimeout = window.setTimeout(function () {
      functionTimeout();
    }, 300);
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
      randomArrIndex = getRandomArrIndex();
      console.log('перестраивается при клике' + randomArrIndex);
    }
    window.allPictures.randomArrIndex = randomArrIndex;
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
    randomArrIndex: randomArrIndex
  };
})();
