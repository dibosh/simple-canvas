define(['jquery', 'modules/file.upload.controller'], function ($, formUploadController) {
  "use strict";

  var successAlert, failureAlert;
  var delegateUploadSuccess;
  var init = function (formElem, onUploadSuccess) {
    delegateUploadSuccess = onUploadSuccess;
    successAlert = formElem.find('#success-alert');
    failureAlert = formElem.find('#failure-alert');
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

  function onSuccess(response) {
    _showAlert(successAlert, 'File uploaded successfully.');
    delegateUploadSuccess(response['file']);
  }

  function onFailure(response) {
    _showAlert(failureAlert, 'File upload failed. Please retry.');
  }

  return {
    bind: init
  }
});