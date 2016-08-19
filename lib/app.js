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
  'controllers/image.list.controller',
  'views/canvas'
];

var defaultCanvasState = {
  'elements': {
    'text': [],
    'image': []
  }
};

require(dependencies, function ($, fileUploadController, imageListController) {
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
  var imgListCtrl = imageListController.initialize(imageListViewParams);

  function _onFileUploadSuccess(imageFileUrl) {
    // New image has been added, reload the listview
    imgListCtrl.load();
  }

  function onSelectImageItem(clickEvt, imageUrl) {
  }
});