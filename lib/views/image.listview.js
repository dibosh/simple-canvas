define(['jquery', 'utils'], function ($, utils) {
  "use strict";
  var listElement, delegateItemClick;

  var init = function (rootView, onLoadComplete) {
    utils.renderTemplateFromFile('lib/views/templates/image.list.html', _onTemplateLoadComplete, null);

    function _onTemplateLoadComplete(element) {
      listElement = element;
      $(rootView).append(listElement);
      if (onLoadComplete) {
        onLoadComplete(listElement);
      }
    }

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

    // If accessed before onLoadComplete is invoked, it will return undefined
    this.listElement = function () {
      return listElement;
    };

    this.clear = function () {
      // Clean up every single node under the listview
      if (listElement) {
        listElement.empty();
      }
    };

    this.add = function (imageUrl) {
      if (listElement) {
        listElement.append(_getImageListItem(imageUrl));
      }
    };

    return this;
  };

  function _getImageListItem(imageUrl) {
    var imageItem = utils.renderTemplate('<li><img src="{imageUrl}" class="img-thumbnail" /></li>',
      {imageUrl: imageUrl});
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