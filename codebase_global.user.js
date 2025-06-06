// ==UserScript==
// @name	    Codebase: Global improvements
// @namespace https://www.happiness.se
// @version	  1
// @grant	    none
// @match	    https://code.happiness.se/*
// @match	    https://happiness.codebasehq.com/*
// ==/UserScript==

// @todo Change the .site-header__organisation to instead display the company logo.

/**
 * Change header background color.
 */
function changeHeaderBackgroundColor() {
    addStyle(`
        .site-header { background-color: #150547; }
    `);
}

/**
 * Entry point for script.
 */
async function main() {
    changeHeaderBackgroundColor();
}

// Run it.
main();
