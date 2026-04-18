// ==UserScript==
// @name        Codebase: Tickets improvements
// @namespace   https://www.happiness.se
// @require     https://raw.githubusercontent.com/petertornstrand/greasemonkey/refs/heads/main/codebase_common.js
// @version     13
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
      #sub-header h2 span { color: inherit; }
      #sub-header h2 { display: flex; gap: 8px; align-items: center; }
      .Thread__subject { display: none; }
      #sub-header h2 span.TicketId { display: inline-block; font-size: 75%; padding: 0 8px; border-radius: 4px; color: #fff; }
      #sub-header h2 span.TicketId:before, #sub-header h2 span.TicketTitle:before { content: ""; }
      .CopyButton { cursor: pointer; border: 0; width: 20px; height: 20px; background: url('data:image/svg+xml,<svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="%23555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path clip-rule="evenodd" d="M17.676 14.248a2.928 2.928 0 0 1-2.928 2.928h-7.32A2.928 2.928 0 0 1 4.5 14.248v-7.32A2.928 2.928 0 0 1 7.428 4h7.32a2.928 2.928 0 0 1 2.928 2.928v7.32Z"/><path d="M10.252 20h7.32a2.928 2.928 0 0 0 2.928-2.928v-7.32"/></g></svg>'); }
    `);

    // Get ticket status.
    const classList = document.querySelector('.js-ticket-property .TicketProperties__tag').classList;

    const url = new URL(document.URL);
    const path = url.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1)
    const header = document.querySelector('#sub-header h2');
    header.innerText = '';
    const element = document.querySelector('.Thread__subject');
    const text = element.innerText;

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

    header.appendChild(spanId);
    header.innerHTML += ' ';
    header.appendChild(spanTitle);
    header.innerHTML += ' ';
    header.appendChild(btnCopy);
}

function jumpToLastComment() {
  GM_addStyle(`
    .ThreadMeta__box.icon-current { cursor: pointer; }
    .col-branch { background-color: #ec6400; color: white; }
  `);

  const allComments = document.querySelectorAll('.Post.Post--full');
  const wrapper = document.querySelector('.ThreadMeta');
  const div = document.createElement('div');
  div.classList.add('ThreadMeta__box', 'ThreadMeta__box--comments', 'icon', 'icon-current');
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
    .col-branch { background-color: #ec6400; color: white; text-transform: lowercase; }
    .col-note { background-color: #38aa19; color: white; }
    .col-task { background-color: #fd0000; color: white; }
  `);
  const tags = document.querySelectorAll('.TagList .TagList__item span.js-tags-text');
  if (!tags) {
    return;
  }
  const wrapper = document.querySelector('.ThreadMeta');
  const div = document.createElement('div');
  div.classList.add('ThreadMeta__box', 'ThreadMeta__box--tags');
  tags.forEach(function (e) {
    let elem = e.cloneNode(true);
    elem.classList.add('icon');
    if (elem.innerText.match(/^branch:/g)) {
      elem.innerText = elem.innerText.replace(/^branch:/g, '');
      elem.classList.add('col-branch', 'icon-branch');
    }
    else if (elem.innerText.match(/^note:/g)) {
      elem.innerText = elem.innerText.replace(/^note:/g, '');
      elem.classList.add('col-note', 'icon-status_id');
    }
    else if (elem.innerText.match(/^task:/g)) {
      elem.innerText = elem.innerText.replace(/^task:/g, '');
      elem.innerText = elem.innerText.replace(/[\-\_]/g, ' ');
      elem.classList.add('col-task', 'icon-yes');
    }
    else {
      elem.innerText = elem.innerText.replace(/_/g, ' ');
      elem.classList.add('col-grey', 'icon-tags');
    }
    elem.classList.replace('js-tags-text', 'TicketProperties__tag');
    div.appendChild(elem);
  });
  wrapper.appendChild(div);
}

function addSubTicket() {
  const btn = document.querySelector('a[rel="new-blocking"]');
  const sidebar = document.querySelector('.right .sidebar__module:first-child');
  sidebar.appendChild(btn);
}

function markCommentsWithTasks() {
  GM_addStyle(`
    .Post--full.has-tasks { position: relative; }
    .Post--full.has-tasks::before { content: "⚠️"; position: absolute; top: 10px; left: -25px; }
    .Post--full.has-tasks .box--medium { border-color: #f4e6c8; }
    .Post--full.has-tasks .Post__header { background-color: #ffffcc; }
  `);
  const comments = document.querySelectorAll('.Post--full:has(li.todo)');
  if (!comments) {
    return;
  }
  comments.forEach(function (e) {
    e.classList.add('has-tasks');
  });
}

function moveTicketProperties() {
  GM_addStyle(`
  .TicketProperties.u-text-center { text-align: left; }
  .TicketProperties__column { float: none; width: auto; display: flex; }
  .TicketProperties--constrained .TicketProperties__column { padding: 0; }
  .TicketProperties__title { font-size: 100%; text-transform: none; flex: 1; }
  .TicketProperties__value, .TicketProperties__select { flex: 3; }
  .ThreadMeta { display: flex; gap: 10px; flex-direction: column; }
  .ThreadMeta__box--tags { display: flex; gap: 6px; }
  `);
  const properties = document.querySelector('.Thread__header');
  const sidebar = document.querySelector('.right');
  sidebar.prepend(properties);

  const milestone = document.querySelector('.related-milestone__heading > a');
  if (milestone) {
    const container = document.querySelector('ul.TicketProperties');
    const template = document.createElement('template');
    template.innerHTML = '<li class="TicketProperties__column"><h3 class="TicketProperties__title">Milestone</h3><p class="TicketProperties__value">' + milestone.outerHTML + '</p></li>';
    container.appendChild(template.content.firstElementChild);
    const box = milestone.parentElement.parentElement.parentElement.parentElement;
    box.parentElement.removeChild(box);
  }
}

/**
 * Entry point for script.
 */
async function main() {
  copyTicketReference();
  addSubTicket();
  jumpToLastComment();
  displayTagsInTop();
  markCommentsWithTasks();
  moveTicketProperties();
}

// Runt it.
main();
