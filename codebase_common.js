/**
 * Set multiple attributes on element.
 */
Element.prototype.setAttributes = function(attrs) {
  for(var key in attrs) {
    this.setAttribute(key, attrs[key]);
  }
}

/**
 * Add stylesheet to page.
 */
function addStyle(css) {
  'use strict';
  let head = document.getElementsByTagName('head')[0];
  if (head) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = css;
    head.appendChild(style);
    return style;
  }
  return null;
};
