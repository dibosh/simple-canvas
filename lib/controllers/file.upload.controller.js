define(['jqueryFormPlugin'], function () {
  "use strict";

  var init = function (formElem, onSubmitCallback, onUploadProgressCallback, onSuccessCallback, onFailureCallback) {
    formElem.ajaxForm({
      dataType: 'json',
      // Indicating whether the form should be cleared if the submit is successful
      resetForm: true,
      beforeSubmit: onSubmitCallback,
      uploadProgress: onUploadProgressCallback,
      success: onSuccessCallback,
      error: onFailureCallback
    });
  };

  return {
    controller: init
  }
});