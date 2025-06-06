// ==UserScript==
// @name	Codebase: Global improvements
// @namespace https://www.happiness.se
// @version	1
// @grant	none
// @match	https://code.happiness.se/*
// @match	https://happiness.codebasehq.com/*
// ==/UserScript==

// @todo Change the header background color to #150547 (same as DeployHQ)
// @todo Change the .site-header__organisation to instead display the company logo.
// @todo Move common functions to this file, mainly "Element.prototyp.setAttributes"
//   and "addStyle" functions. Add @require to files using these functions.
// @todo Add @namespace to all files

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

/**
 * Set multiple attributes on element.
 */
Element.prototype.setAttributes = function(attrs) {
  for(var key in attrs) {
    this.setAttribute(key, attrs[key]);
  }
}

/**
 * Entry point for script.
 */
async function main() {
  // Code goes here...
}

// Run it.
main();
