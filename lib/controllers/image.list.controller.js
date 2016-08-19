define(['views/image.listview'], function (imageListView) {
  "use strict";
  var renderedImageListView, delegateOnItemClick;
  function init(params) {
    delegateOnItemClick = params.onItemClick;
    renderedImageListView = imageListView.render(params.parent, null);

    renderedImageListView.onImageItemClick = function (event, imageUrl) {
      delegateOnItemClick(event, imageUrl);
    };

    this.load = function () {
      $.ajax({
        url: "/images"
      }).done(function (data) {
        if (data.length > 0) {
          // Clean out previous nodes and help text
          renderedImageListView.clear();
        }
        $.each(data, function (index, imageUrl) {
          renderedImageListView.add(imageUrl);
        });
      });
    };

    this.load(); // Do the initial loading

    return this;
  }


  return init;
});