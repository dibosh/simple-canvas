define(['jquery', 'utils'], function ($, utils) {
  "use strict";

  var successAlert, failureAlert, formElem;

  var init = function (rootView, onLoadComplete) {
    utils.renderTemplateFromFile('lib/views/templates/file.upload.view.html', _onTemplateLoadComplete, null);

    function _onTemplateLoadComplete(element) {
      formElem = element;
      $(rootView).append(formElem);
      successAlert = formElem.find('#success-alert');
      failureAlert = formElem.find('#failure-alert');
      if (onLoadComplete) {
        onLoadComplete(formElem);
      }
    }

    // If accessed before onLoadComplete is invoked, it will return undefined
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
      if (alertElem) {
        alertElem.html(message);
        alertElem.show();
        alertElem.delay(2000).fadeOut();
      }
    }

    return this;
  };

  return {
    render: init
  }
});