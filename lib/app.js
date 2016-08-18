require.config({
  paths: {
    "jquery": "vendor/jquery",
    "jqueryFormPlugin": "vendor/jquery.form"
  }
});

require(['jquery', 'templates/file.upload.view'], function ($, fileUploadView) {
  "use strict";
  console.log('jquery version:', $.fn.jquery);

  fileUploadView.bind();
});