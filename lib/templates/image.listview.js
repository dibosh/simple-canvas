define(['jquery'], function ($) {
  "use strict";
  var listElement, delegateItemClick;
  var init = function (listElem, onItemClick) {
    listElement = listElem;
    delegateItemClick = onItemClick;

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
    var imageItem = $('<li><img src="' + imageUrl + '" class="img-thumbnail" /></li>');
    imageItem.click(function (event) {
      delegateItemClick(event, imageUrl);
    });
    return imageItem;
  }

  return {
    bind: init
  }
});