// ==UserScript==
// @name		Codebase: Projects improvements
// @namespace	https://www.happiness.se
// @require 	https://raw.githubusercontent.com/petertornstrand/greasemonkey/refs/heads/main/codebase_common.js
// @version		1
// @grant		none
// @match		https://code.happiness.se/projects/*/*
// @match		https://happiness.codebasehq.com/projects/*/*
// ==/UserScript==

/**
 * Add full-text search to project.
 */
function projectSearch() {
	addStyle(`
		.site-header > .container { display: flex; flex-direction: row; }
		.site-header__left { margin-left: 0; margin-right: auto; }
		.site-header__right { margin-left: auto; margin-right: 0; }
		.site-header__center { display: flex; align-items: end; }
		.site-header__search-input { width: 300px; padding: 8px 26px 6px 8px; }
		.site-header__search form { position: relative; }
		.site-header__search form:after {
			content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="%23000" fill-rule="evenodd" d="M33.277 28.932A15.928 15.928 0 0 0 36 20c0-8.837-7.163-16-16-16S4 11.163 4 20c0 8.838 7.163 16 16 16 4.805 0 9.114-2.116 12.047-5.469l9.612 9.613a1.06 1.06 0 1 1-1.5 1.502l-7.494-7.495a1 1 0 0 0-1.414 1.415l7.494 7.494a3.056 3.056 0 0 0 4.328 0 3.06 3.06 0 0 0 0-4.33l-9.796-9.797Zm-1.445-1.445A13.936 13.936 0 0 0 34 20c0-7.732-6.267-14-14-14-7.732 0-14 6.269-14 14 0 7.733 6.267 14 14 14 4.253 0 8.062-1.895 10.629-4.886l-2.242-2.242a1 1 0 1 1 1.414-1.415l2.03 2.031Zm-6.408.915A9.947 9.947 0 0 1 19.999 30c-5.522 0-10-4.477-10-10a1 1 0 1 0-2 0c0 6.627 5.373 12 12 12 2.342 0 4.588-.674 6.512-1.919a1 1 0 1 0-1.087-1.679Z" clip-rule="evenodd"/></svg>');
			position: absolute;
			width: 16px;
			height: 16px;
			top: 7px;
			right: 6px;
		}
		.hidden { display: none; }
	`);
	
	// Get project name.
	const projectName = document.querySelector('.site-header__title');
	
	// Get the left header element.
	const headerLeft = document.querySelector('.site-header__left');
	
	// Add container for search form.
	const headerCenter = document.createElement('div');
	headerCenter.classList.add('site-header__center');
	headerLeft.after(headerCenter);
	
	// Move the search form to new container.
	const search = document.querySelector('.site-header__search');
	headerCenter.append(search);
	
	// Change placeholder text of the search input.
	const input = document.querySelector('#q');
	input.setAttribute('placeholder', 'Search ' + projectName.getAttribute('title') + '...');
	
	// Add hidden project input to search form.
	const url = new URL(document.URL);
	const projectId = url.pathname.split('/')[2]
	const projectInput = document.createElement('input');
	projectInput.setAttributes({'type': 'hidden', 'name': 'projects[]', 'value': projectId});
	const form = search.querySelector('form');
	form.append(projectInput);
	
	// Hide search button in header toolbar.
	const searchButton = document.querySelector('a[data-tooltip="Search"]');
	searchButton.parentElement.classList.add('hidden');
}

/**
 * Entry point for script.
 */
async function main() {
	projectSearch();
}

// Run it.
main();



