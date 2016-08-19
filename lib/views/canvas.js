define([
  'jquery',
  'utils',
  'text!views/templates/image.component.html',
  'text!views/templates/text.component.html'
], function ($, utils, imageComponentTemplate, textComponentTemplate) {
  "use strict";
  var canvasElem, delegateItemClick;

  var init = function (rootView) {
    canvasElem = $('<div class="canvas" id="canvas"></div>');
    $(rootView).append(canvasElem);
    canvasElem.mousemove(function (e) {
      _moveElement(e);
    });
    canvasElem.mouseup(function () {
      _unregisterDraggableElement();
    });

    Object.defineProperty(this, 'onItemClick', {
      get: function () {
        return delegateItemClick;
      },
      set: function (newValue) {
        delegateItemClick = newValue;
      },
      enumerable: true,
      configurable: true
    });

    this.add = function (componentInfo) {
      if (canvasElem && componentInfo) {
        var component = _getComponent(componentInfo);
        canvasElem.append(component);
        component.css(
          {left: canvasElem.width() / 2 - component.width() / 2, top: canvasElem.height() / 2 - component.height() / 2}
        );
      }
    };

    this.clear = function () {
      if (canvasElem) {
        canvasElem.empty();
      }
    };

    function _getComponent(componentInfo) {
      var component;
      var componentId = '{type}-{timestamp}'.format({type: componentInfo.type, timestamp: Date.now()});
      if (componentInfo.type == 'image') {
        component = utils.renderTemplate(imageComponentTemplate, {
          id: componentId,
          imageUrl: componentInfo.url
        });
      } else {
        component = utils.renderTemplate(textComponentTemplate, {
          id: componentId,
          fontClass: componentInfo.fontClass
        });
      }

      var removeIcon = component.find('#remove-icon');
      removeIcon.click(function (event) {
        if (component.dragHandler) {
          component.dragHandler.destroy();
          component.dragHandler = null;
        }
        component.remove();
      });

      component.mousedown(function (event) {
        _initDrag(event, component);
        if (componentInfo.type == 'image') {
          return false;
        }
      });

      // Auto grow textarea, based on code from -
      // http://stackoverflow.com/questions/2948230/auto-expand-a-textarea-using-jquery
      if (componentInfo.type == 'text') {
        component.find('#text-area').keyup(function (e) {
          while ($(this).outerHeight() < this.scrollHeight +
          parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
            $(this).height($(this).height() + 1);
          }
        });
      }

      return component;
    }

    var draggableElement = null,
      XInsideElem = 0, YInsideElem = 0,
      relX = 0, relY = 0;

    function _initDrag(event, elem) {
      draggableElement = elem;
      XInsideElem = event.pageX - draggableElement.offset().left;
      YInsideElem = event.pageY - draggableElement.offset().top;
    }

    // Moves the element and also keeps it in bounds
    // TODO: This is messy, make it more reusable and DRY
    function _moveElement(event) {

      var parentX = canvasElem.offset().left;
      var parentY = canvasElem.offset().top;
      var parentWidth = canvasElem.width();
      var parentHeight = canvasElem.height();
      relX = event.pageX - parentX;
      relY = event.pageY - parentY;
      if (draggableElement !== null) {
        var posX = relX - XInsideElem;
        var posY = relY - YInsideElem;

        var elemWidth = draggableElement.width();
        var elemHeight = draggableElement.height();

        if (posX < 0) {
          posX = 0;
        }
        if (posX + elemWidth > parentWidth) {
          posX = parentWidth - elemWidth;
        }

        if (posY < 0) {
          posY = 0;
        }

        if (posY + elemHeight > parentHeight) {
          posY = parentHeight - elemHeight;
        }
        draggableElement.css({left: posX, top: posY});
      }
    }

    function _unregisterDraggableElement() {
      draggableElement = null;
    }

    return this;
  };

  return {
    render: init
  }
});