define(['views/text.options.view'], function (textOptionsView) {
  "use strict";
  var renderedOptionsView, delegateOnOptionClick;

  function init(params) {
    delegateOnOptionClick = params.onItemClick;
    renderedOptionsView = textOptionsView.render(params.parent);

    renderedOptionsView.onTextOptionClick = function (selectedOption) {
      delegateOnOptionClick(selectedOption);
    };

    return this;
  }


  return init;
});