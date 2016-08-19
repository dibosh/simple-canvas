require.config({
  paths: {
    "jquery": "vendor/jquery",
    "jqueryFormPlugin": "vendor/jquery.form",
    "text": "vendor/text"
  }
});

// Global definition for string.format method
if (!String.prototype.format) {
  String.prototype.format = function () {
    var str = this.toString();
    if (!arguments.length)
      return str;
    var args = typeof arguments[0],
      args = (("string" == args || "number" == args) ? arguments : arguments[0]);
    for (arg in args)
      str = str.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
    return str;
  }
}

var dependencies = [
  'jquery',
  'controllers/file.upload.controller',
  'controllers/image.list.controller',
  'controllers/canvas.controller',
  'controllers/text.options.controller'
];

var defaultCanvasState = {
  'elements': {
    'text': [],
    'image': []
  }
};

require(dependencies, function ($, FileUploadController, ImageListController, CanvasController, TextOptionsController) {
  "use strict";

  // File upload form
  var fileUploadFormParams = {
    parent: $('#form-holder'),
    delegateSuccess: _onFileUploadSuccess
  };
  var fileUpldCtrl = new FileUploadController(fileUploadFormParams);

  // Image list view
  var imageListViewParams = {
    parent: $('#image-list-holder'),
    onItemClick: onSelectImageItem
  };
  var imgListCtrl = new ImageListController(imageListViewParams);

  // Canvas
  var canvasParams = {
    parent: $('#canvas-holder')
  };
  var canvasCtrl = new CanvasController(canvasParams);

  // Text Options
  var textOptionsParams = {
    parent: $('#text-options-holder'),
    onItemClick: onSelectTextOption
  };
  var textOptnsCtrl = new TextOptionsController(textOptionsParams);

  function _onFileUploadSuccess(imageFileUrl) {
    // New image has been added, reload the listview
    imgListCtrl.load();
  }

  function onSelectImageItem(clickEvt, imageUrl) {
    canvasCtrl.addImage(imageUrl);
  }

  function onSelectTextOption(option) {
    canvasCtrl.addText(option.fontClass);
  }
});