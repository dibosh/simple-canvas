define(['jquery'], function ($) {
  "use strict";
  var listElement;
  var init = function (listElem) {
    listElement = listElem;

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
    return '<li><img src="' + imageUrl + '" class="img-thumbnail" /></li>';
  }

  return {
    bind: init
  }
});