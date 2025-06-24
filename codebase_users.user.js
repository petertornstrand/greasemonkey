// ==UserScript==
// @name       Codebase: Users improvements
// @namespace  https://www.happiness.se
// @require    https://raw.githubusercontent.com/petertornstrand/greasemonkey/refs/heads/main/codebase_common.js
// @version    2
// @grant      none
// @match      https://code.happiness.se/users/*
// @match      https://happiness.codebasehq.com/users/*
// ==/UserScript==

// @todo Add a summary on the users/<X> page of all the tickets user has worked on today grouped
//   by project for easy copy and paste into Harvest.

/**
 * Get tickets worked on today.
 */
function getTickets() {
  const updates = document.querySelectorAll('ul.events:first-of-type li.ticket_update');
  let tickets = [];
  let id, client, subject, client_id = '';
  let obj = {};
  
  updates.forEach(function (elem) {
    id = elem.querySelector('p.event b.id').innerText.trim().substring(1);
    client_id = elem.querySelector('p.event span.project a').getAttribute('href');
    client_id = client_id.substring(client_id.lastIndexOf('/') + 1);
    client = elem.querySelector('p.event span.project a').innerText.trim();
    subject = elem.querySelector('p.event > a').innerText.trim();
    
    obj = {
      id: id,
      clientId: client_id,
      client: client,
      subject: subject,
    };
    
    
    if (!tickets.find((elem) => elem.id == obj.id)) {
      tickets.push(obj);
    }
  });
 
  
  return tickets;
}

/**
 * Add list to page.
 */
function listTicketsPerClient(tickets) {
	const clients = [...new Set(tickets.map(item => item.clientId))];
  clients.forEach(function (client) {
    var results = tickets.filter(obj => {
  		return obj.clientId === client
		});
    
    var h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(results[0].client));
    
    var ul = document.createElement('ul');
    
    results.forEach(function (elem) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode('#' + elem.id + ' ' + elem.subject));
      ul.appendChild(li);
    });
    
    var container = document.createElement('div');
    var wrapper = document.querySelector('div.activity');
    container.appendChild(h2);
    container.appendChild(ul);
    wrapper.prepend(container);
  });
}

/**
 * Entry point for script.
 */
async function main() {
  const tickets = getTickets();
  listTicketsPerClient(tickets);
}

// Runt it.
main();

