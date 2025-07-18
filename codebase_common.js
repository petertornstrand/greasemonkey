/**
 * Set multiple attributes on element.
 */
Element.prototype.setAttributes = function(attrs) {
  for(var key in attrs) {
    this.setAttribute(key, attrs[key]);
  }
}

/**
 * Get project ID.
 */
const getProjectId = () => {
    const url = new URL(document.URL);
	return url.pathname.replace(/^\/+|\/+$/g, '').split('/')[1];
}

/**
 * Get ticket ID.
 */
const getTicketId = () => {
    const url = new URL(document.URL);
	return url.pathname.replace(/^\/+|\/+$/g, '').split('/')[3];
}