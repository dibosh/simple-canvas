require.config({
  paths: {
    "jquery": "vendor/jquery",
    "jqueryFormPlugin": "vendor/jquery.form"
  }
});

var dependencies = [
  'jquery',
  'templates/file.upload.view',
  'templates/image.listview'
];

require(dependencies, function ($, fileUploadView, imageListView) {
  "use strict";

  var imageList = $('#image-list');

  // Bind the form for custom view related updates
  fileUploadView.bind($('#file-upload-form'), _onFileUploadSuccess);
  // Bind the image list view
  imageListView.bind(imageList);

  function _onFileUploadSuccess(imageFileUrl) {
    // New image has been added, rebind the listview
    imageListView.bind(imageList);
  }
});