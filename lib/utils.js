define(['jquery'], function ($) {
  "use strict";

  function renderTemplate(template, params) {
    return $(params ? template.format(params) : template);
  }

  return {
    renderTemplate: renderTemplate
  };
});