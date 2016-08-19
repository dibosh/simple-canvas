define([
  'jquery',
  'utils',
  'text!views/templates/image.component.html'
], function ($, utils, imageComponentTemplate) {
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
        canvasElem.append(_getComponent(componentInfo));
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
        return false;
      });

      return component;
    }

    var draggableElement = null,
      XInsideElem = 0, YInsideElem = 0,
      relX = 0, relY = 0;

    function _initDrag(event, elem) {
      draggableElement = elem;
      XInsideElem = event.pageX - draggableElement.offset().left;
      YInsideElem = event.pageY - draggableElement.offset().top;
      console.log(XInsideElem, YInsideElem);
      console.log(canvasElem.offset().left, canvasElem.offset().top);
      console.log(event.pageX, event.pageY);
    }

    function _moveElement(event) {
      relX = event.pageX - canvasElem.offset().left;
      relY = event.pageY - canvasElem.offset().top;
      if (draggableElement !== null) {
        draggableElement.css({left: relX - XInsideElem, top: relY - YInsideElem});
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