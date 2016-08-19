define(['jquery'], function ($) {
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


  var init = function (rootView) {
    formElem = $(formViewMarkup);
    $(rootView).append(formElem);
    successAlert = formElem.find('#success-alert');
    failureAlert = formElem.find('#failure-alert');

    this.formElement = function () {
      return formElem;
    };

    this.showSuccess = function (response) {
      _showAlert(successAlert, 'File uploaded successfully.');
    };

    this.showFailure = function (response) {
      _showAlert(failureAlert, 'File upload failed. Please retry.');
    };

    function _showAlert(alertElem, message) {
      alertElem.html(message);
      alertElem.show();
      alertElem.delay(2000).fadeOut();
    }

    return this;
  };

  return {
    render: init
  }
});