// ==UserScript==
// @name        Codebase: Tickets improvements
// @namespace   https://www.happiness.se
// @require     https://raw.githubusercontent.com/petertornstrand/greasemonkey/refs/heads/main/codebase_common.js
// @version     6
// @grant       GM_addStyle
// @match       https://code.happiness.se/projects/*/tickets/*
// @match       https://happiness.codebasehq.com/projects/*/tickets/*
// ==/UserScript==

// @todo Move .js-ticket-properties to container .right (remember to scope new CSS not to affect properties
//   at the bottom of a ticket). The properties list should be "sticky".
// @todo Move .ThreadMeta to container .right, after .js-ticket-properties
// @todo Move information from "Related milestone" box (.box box--sidebar) into .js-ticket-properties
// @todo Change box with info "This ticket can be viewed by anyone..." into an icon (lock open, locked closed)
//   display to the right of the ticket title or perhaps part of .js-ticket-properties
// @todo Add the "Related ticket" functionality to the sidebar. If there are no related tickets just display
//   the button "Mark a ticket as blocking this ticket" but change the text to "Add sub-ticket".

/**
 * Add a copy ticket reference button to the right of the ticket title.
 */
function copyTicketReference() {
    GM_addStyle(`
        .Thread__subject { display: flex; gap: 8px; align-items: center; }
        .Thread__subject .TicketId { display: inline-block; font-size: 75%; padding: 0 8px; border-radius: 4px; }
        .CopyButton { cursor: pointer; border: 0; width: 20px; height: 20px; background: url('data:image/svg+xml,<svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="%23555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path clip-rule="evenodd" d="M17.676 14.248a2.928 2.928 0 0 1-2.928 2.928h-7.32A2.928 2.928 0 0 1 4.5 14.248v-7.32A2.928 2.928 0 0 1 7.428 4h7.32a2.928 2.928 0 0 1 2.928 2.928v7.32Z"/><path d="M10.252 20h7.32a2.928 2.928 0 0 0 2.928-2.928v-7.32"/></g></svg>'); }
    `);

    // Get ticket status.
    const classList = document.querySelector('.js-ticket-property .TicketProperties__tag').classList;

    const url = new URL(document.URL);
    const path = url.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1)
    const element = document.querySelector('.Thread__subject');
    const text = element.innerText;
    element.innerText = '';

    const spanTitle = document.createElement('span');
    spanTitle.classList.add("TicketTitle");
    spanTitle.innerText = text;

    const spanId = document.createElement('span');
    spanId.classList.add("TicketId");
    spanId.classList.add(classList[classList.length - 1]);
    spanId.innerText = '#' + id;

    const btnCopy = document.createElement('button');
    btnCopy.classList.add('CopyButton');
    btnCopy.setAttribute('title', 'Copy ticket reference');
    btnCopy.addEventListener('click', function (e) {
    	navigator.clipboard.writeText(`#${id} ${text}`);
    });

    element.appendChild(spanId);
    element.innerHTML += ' ';
    element.appendChild(spanTitle);
    element.innerHTML += ' ';
    element.appendChild(btnCopy);
}

function jumpToLastComment() {
  GM_addStyle(`
    .ThreadMeta { display: flex; gap: 8px; align-items: left; }
    .ThreadMeta__box.icon-current { cursor: pointer; }
  `);

  const allComments = document.querySelectorAll('.Post.Post--full');
  const wrapper = document.querySelector('.ThreadMeta');
  const div = document.createElement('div');
  div.classList.add('ThreadMeta__box', 'icon', 'icon-current');
  const link = document.createElement('a');
  link.innerText = 'Goto last comment (' + allComments.length + ' comments)';
  link.addEventListener('click', function (e) {
    const lastComment = document.querySelector('.Post.Post--full:last-of-type');
    document.getElementById(lastComment.id).scrollIntoView();
  });
  div.appendChild(link);
  wrapper.appendChild(div);
}

function displayTagsInTop() {
  GM_addStyle(`
    .ThreadMeta { display: flex; gap: 8px; align-items: left; }
    .col-branch { background-color: #ec6400; color: white; text-transform: lowercase; }
  `);
  const tags = document.querySelectorAll('.TagList .TagList__item span.js-tags-text');
  const wrapper = document.querySelector('.ThreadMeta');
  const div = document.createElement('div');
  div.classList.add('ThreadMeta__box', 'icon', 'icon-tags');
  tags.forEach(function (e) {
    let elem = e.cloneNode(true);
    if (elem.innerText.match(/^branch:/g)) {
      console.log(elem.innerText);
      elem.innerText = elem.innerText.replace(/^branch:/g, '');
      elem.classList.add('col-branch', 'icon', 'icon-branch');
    }
    else {
      elem.classList.add('col-grey');
    }
    elem.classList.replace('js-tags-text', 'TicketProperties__tag');
    div.appendChild(elem);
  });
  wrapper.appendChild(div);
}

function addSubTicket() {
  const parent = document.querySelector('.js-related-tickets-relationships');
  const btn = parent.querySelector('a');
  const sidebar = document.querySelector('.right .sidebar__module:first-child');
  parent.removeChild(btn);
  sidebar.appendChild(btn);
}

/**
 * Entry point for script.
 */
async function main() {
  copyTicketReference();
  addSubTicket();
  jumpToLastComment();
  displayTagsInTop();
}

// Runt it.
main();
