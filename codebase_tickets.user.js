// ==UserScript==
// @name       Codebase: Tickets improvements
// @namespace  https://www.happiness.se
// @require    https://raw.githubusercontent.com/petertornstrand/greasemonkey/refs/heads/main/codebase_common.js
// @version    1
// @grant      none
// @match      https://code.happiness.se/projects/*/tickets/*
// @match      https://happiness.codebasehq.com/projects/*/tickets/*
// ==/UserScript==

// @todo Move code from codebase_copy_ticket_reference.user.js into this file.
// @todo Move .js-ticket-properties to container .right (remember to scope new CSS not to affect properties
//   at the bottom of a ticket). The properties list should be "sticky".
// @todo Move .ThreadMeta to container .right, after .js-ticket-properties
// @todo Move information from "Related milestone" box (.box box--sidebar) into .js-ticket-properties
// @todo Change box with info "This ticket can be viewed by anyone..." into an icon (lock open, locked closed)
//   display to the right of the ticket title or perhaps part of .js-ticket-properties
// @todo Move the ticket update avatar to the left of the update and make it bigger (48x48)
// @todo Add the "Related ticket" functionality to the sidebar. If there are no related tickets just display
//   the button "Mark a ticket as blocking this ticket" but change the text to "Add sub-ticket".

/**
 * Entry point for script.
 */
async function main() {
  // Code goes here...
}

// Runt it.
main();
