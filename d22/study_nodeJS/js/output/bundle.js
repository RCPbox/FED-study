/*! style.css  */

(function(global, dom){
	'use strict';

	var doc = global.document;

	dom.id = function(name) {
		return doc.getElementById(name);
	};

})( window, (domHelper || {}) );

/*! style.css */

function Util(name) {
	this.name = name;
}

Util.fn = Util.prototype;

Util.fn.getName = function() {
	return this.name;
};

/*! style.css  */

var GemStore = {
	'name': 'angularJS App',
	'product_year': 2012
};

