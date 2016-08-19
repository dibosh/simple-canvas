define(['jquery', 'controllers/file.upload.controller'], function ($, formUploadController) {
  "use strict";

  var formViewMarkup =
    '<form id="file-upload-form" role="form" method="post" enctype="multipart/form-data" action="/uploads">'
    + '<div class="form-group">'
    + '<label for="upload">Choose a file</label>'
    + '<input type="file" class="form-control" name="upload" id="upload">'
    + '</div>'
    + '<button type="submit" id="submit" class="btn btn-default">Upload</button>'
    + '<p class="text-success" style="display: none" id="success-alert"></p>'
    + '<p class="text-danger" style="display: none" id="failure-alert"></p>'
    + '</form>';
  var successAlert, failureAlert, formElem;
  var delegateUploadSuccess;


  var init = function (params) {
    formElem = $(formViewMarkup);
    delegateUploadSuccess = params.uploadSuccessCallback;
    $(params.parent).append(formElem);
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
    render: init
  }
});