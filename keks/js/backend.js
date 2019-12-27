'use strict';

/* ОТПРАВКА ФОРМЫ*/

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  var NORMAL_STATUS = 200;

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  /* ЗАГРУЗКА ДАННЫХ*/

  var send = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.send();
  };

  window.backend = {
    send: send,
    upload: upload
  };

})();
