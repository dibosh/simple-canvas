define(['jquery'], function ($) {
  "use strict";

  function renderTemplateFromFile(filePath, completeCallback, params) {
    $.get(filePath, function (content) {
      completeCallback(renderTemplate(content, params));
    });
  }

  function renderTemplate(template, params) {
    return $(params ? template.format(params) : template);
  }

  return {
    renderTemplate: renderTemplate,
    renderTemplateFromFile: renderTemplateFromFile
  };
});