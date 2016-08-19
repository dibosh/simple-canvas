define(['views/canvas'], function (canvasView) {
  "use strict";
  var renderedCanvas;

  function init(params) {
    renderedCanvas = canvasView.render(params.parent);

    this.addImage = function (imageUrl) {
      var componentInfo = {
        type: 'image',
        url: imageUrl
      };
      renderedCanvas.add(componentInfo);
    };
    return this;
  }


  return init;
});