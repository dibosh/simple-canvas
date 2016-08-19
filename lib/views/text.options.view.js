define(['jquery', 'utils'], function ($, utils) {
  "use strict";
  var delegateItemClick;

  var init = function (rootView) {
    var options = [
      {
        title: 'H1',
        fontClass: 'font-h1'
      },
      {
        title: 'H2',
        fontClass: 'font-h2'
      },
      {
        title: 'H3',
        fontClass: 'font-h3'
      },
      {
        title: 'H4',
        fontClass: 'font-h4'
      },
      {
        title: 'Normal Text',
        fontClass: 'font-normal'
      }
    ];

    $.each(options, function (index, option) {
      var optionButton = $('<button class="btn btn-default text-option-button">{title}</button>'.format(option));
      optionButton.click(function () {
        delegateItemClick(option);
      });
      rootView.append(optionButton);
    });

    Object.defineProperty(this, 'onTextOptionClick', {
      get: function () {
        return delegateItemClick;
      },
      set: function (newValue) {
        delegateItemClick = newValue;
      },
      enumerable: true,
      configurable: true
    });

    return this;
  };

  return {
    render: init
  }
});