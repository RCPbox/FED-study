/*! style.css */

function Util(name) {
	this.name = name;
}

Util.fn = Util.prototype;

Util.fn.getName = function() {
	return this.name;
};