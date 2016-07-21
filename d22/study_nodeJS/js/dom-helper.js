/*! style.css  */

(function(global, dom){
	'use strict';

	var doc = global.document;

	dom.id = function(name) {
		return doc.getElementById(name);
	};

})( window, (domHelper || {}) );