define(['jquery', 'modules/file.upload.controller'], function ($, formUploadController) {
  "use strict";

  var formElem = $('form');
  var successAlert = $('#success-alert');
  var failureAlert = $('#failure-alert');

  var init = function () {
    formUploadController.controller(formElem, validateSubmit, null, onSuccess, onFailure);
  };

  function validateSubmit(inputs) {
    return inputs[0]['value'] !== '';
  }

  function _showAlert(alertElem, message) {
    alertElem.html(message);
    alertElem.show();
    alertElem.delay(2000).fadeOut();
  }

  function onSuccess(responseText) {
    console.log(responseText);
    _showAlert(successAlert, 'File uploaded successfully.');
  }

  function onFailure(responseText) {
    console.log(responseText);
    _showAlert(failureAlert, 'File upload failed. Please retry.');
  }

  return {
    bind: init
  }
});