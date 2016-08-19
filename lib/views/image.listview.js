define(['jquery'], function ($) {
  "use strict";
  var listElement, delegateItemClick;
  var imageListViewMarkup =
    '<ul class="list-unstyled" id="image-list">'
    + '<h5 class="help-block">'
    + '<small class="text-muted">Upload image files to make them available for adding in canvas</small>'
    + '</h5>'
    + '</ul>';

  var init = function (params) {
    listElement = $(imageListViewMarkup);
    $(params.parent).append(listElement);
    delegateItemClick = params.onItemClick;

    $.ajax({
      url: "/images"
    }).done(function (data) {
      if (data.length > 0) {
        // Clean out previous nodes and help text
        listElement.empty();
      }
      $.each(data, function (index, imageUrl) {
        listElement.append(_getImageListItem(imageUrl));
      });
    });
  };

  function _getImageListItem(imageUrl) {
    var imageItem = $('<li><img src="{0}" class="img-thumbnail" /></li>'.format(imageUrl));
    imageItem.click(function (event) {
      delegateItemClick(event, imageUrl);
    });
    return imageItem;
  }

  return {
    render: init
  }
});