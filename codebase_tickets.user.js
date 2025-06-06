// ==UserScript==
// @name        Codebase: Tickets improvements
// @namespace   https://www.happiness.se
// @require     https://raw.githubusercontent.com/petertornstrand/greasemonkey/refs/heads/main/codebase_common.js
// @version     1
// @grant       none
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
    addStyle(`
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

/**
 * Change the size of the avatar and it's position.
 */
function avatarPositionSize() {
    addStyle(`
        .Post__header { position: relative; }
        .Post_avatar {
            float: none;
            width: 48px;
            height: 48px;
            position: absolute;
            top: 4px;
            left: -56px;
        }
        .Post_meta { margin-left: 0; }
    `);
}

function addSubTicket() {
    // This is not working, event listeners are lost when moving the element.
    const btn = document.querySelector('.js-related-tickets-relationships');
    const sidebar = document.querySelector('.right');
    sidebar.appendChild(btn);
}

/**
 * Entry point for script.
 */
async function main() {
    copyTicketReference();
    avatarPositionSize();
    //addSubTicket();
}

// Runt it.
main();
