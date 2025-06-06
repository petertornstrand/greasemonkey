// ==UserScript==
// @name		Codebase: Ticket improvements
// @version	1
// @grant		none
// @match		https://code.happiness.se/projects/*/tickets/*
// @match		https://happiness.codebasehq.com/projects/*/tickets/*
// ==/UserScript==

// @todo Move .js-ticket-properties to container .right (remember to scope new CSS not to affect properties at the bottom of a ticket)
// @todo Move .ThreadMeta to container .right, after .js-ticket-properties
// @todo Move information from "Related milestone" box (.box box--sidebar) into .js-ticket-properties
// @todo Change box with info "This ticket can be viewed by anyone..." into an icon (lock open, locked closed)
//   display to the right of the ticket title or perhaps part of .js-ticket-properties
// @todo Move the ticket update avatar to the left of the update and make it bigger (48x48)
