require.config({
  paths: {
    "jquery": "vendor/jquery",
    "jqueryFormPlugin": "vendor/jquery.form"
  }
});

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

var dependencies = [
  'jquery',
  'views/file.upload.view',
  'views/image.listview',
  'views/canvas'
];

var defaultCanvasState = {
  'elements': {
    'text': [],
    'image': []
  }
};

require(dependencies, function ($, fileUploadView, imageListView) {
  "use strict";

  var imageList = $('#image-list');
  var fileUploadForm = $('#file-upload-form');
  var canvas = $('#canvas');
  var canvasState = $.extend({}, defaultCanvasState);

  // Render the upload form
  var fileUploadFormParams = {
    parent: $('#form-holder'),
    uploadSuccessCallback: _onFileUploadSuccess
  };
  fileUploadView.render(fileUploadFormParams);
  // Render the image list view
  var imageListViewParams = {
    parent: $('#image-component-panel'),
    onItemClick: onSelectImageItem
  };
  imageListView.render(imageListViewParams);

  function _onFileUploadSuccess(imageFileUrl) {
    // New image has been added, rebind the listview
    imageListView.render(imageList, onSelectImageItem);
  }

  function onSelectImageItem(clickEvt, imageUrl) {
  }
});