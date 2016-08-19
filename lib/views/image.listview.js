define(['jquery'], function ($) {
  "use strict";
  var listElement, delegateItemClick;
  var imageListViewMarkup =
    '<ul class="list-unstyled" id="image-list">'
    + '<h5 class="help-block">'
    + '<small class="text-muted">Upload image files to make them available for adding in canvas</small>'
    + '</h5>'
    + '</ul>';

  var init = function (rootView) {
    listElement = $(imageListViewMarkup);
    $(rootView).append(listElement);
    Object.defineProperty(this, 'onImageItemClick', {
      get: function () {
        return delegateItemClick;
      },
      set: function (newValue) {
        delegateItemClick = newValue;
      },
      enumerable: true,
      configurable: true
    });

    this.listElement = function () {
      return listElement;
    };

    this.clear = function () {
      // Clean up every single node under the listview
      listElement.empty();
    };

    this.add = function (imageUrl) {
      listElement.append(_getImageListItem(imageUrl));
    };

    return this;
  };

  function _getImageListItem(imageUrl) {
    var imageItem = $('<li><img src="{0}" class="img-thumbnail" /></li>'.format(imageUrl));
    imageItem.click(function (event) {
      if (delegateItemClick) {
        delegateItemClick(event, imageUrl);
      }
    });
    return imageItem;
  }

  return {
    render: init
  }
});