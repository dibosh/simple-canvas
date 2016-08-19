define(['jqueryFormPlugin', 'views/file.upload.view'], function (__, fileUploadView) {
  "use strict";
  var renderedFormView, delegateSuccessCallback;
  var init = function (params) {
    delegateSuccessCallback = params.delegateSuccess;
    renderedFormView = fileUploadView.render(params.parent, onViewLoad);
  };

  function onViewLoad(viewElem) {
    renderedFormView.formElement().ajaxForm({
      dataType: 'json',
      // Indicating whether the form should be cleared if the submit is successful
      resetForm: true,
      beforeSubmit: validateSubmit,
      success: onSuccessCallback,
      error: onFailureCallback
    });
  }

  function onSuccessCallback(response) {
    renderedFormView.showSuccess(response);
    delegateSuccessCallback(response['file']);
  }

  function onFailureCallback(response) {
    console.log(response); // Just to debug
    renderedFormView.showFailure(response);
  }

  function validateSubmit(inputs) {
    return inputs[0]['value'] !== '';
  }

  return {
    initialize: init
  }
});