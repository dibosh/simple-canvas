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
  'controllers/file.upload.controller',
  'views/image.listview',
  'views/canvas'
];

var defaultCanvasState = {
  'elements': {
    'text': [],
    'image': []
  }
};

require(dependencies, function ($, fileUploadController, imageListView) {
  "use strict";

  var canvas = $('#canvas');
  var canvasState = $.extend({}, defaultCanvasState);

  // File upload form
  var fileUploadFormParams = {
    parent: $('#form-holder'),
    delegateSuccess: _onFileUploadSuccess
  };
  fileUploadController.initialize(fileUploadFormParams);
  // Render the image list view
  var imageListViewParams = {
    parent: $('#image-list-holder'),
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