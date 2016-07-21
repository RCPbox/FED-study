/*! checkType.js */
// module.exports = function(data, type) {
// 	var clazz = ({}).toString.call(data).slice(8, -1);
// 	return clazz !== undefined && clazz !== null && clazz === type;
// 	console.log(clazz);
// };

module.exports = function(data) {
	var isString = ({}).toString,
		dataType = isString.call(data);
	switch( dataType ) {
		case "[object Null]": return 'null';
		break;
		case "[object Undefined]": return 'undefined';
		break;
		case "[object Number]": return 'number';
		break;
		case "[object String]": return 'string';
		break;
		case "[object Boolean]": return 'boolean';
		break;
		case "[object Function]": return 'function';
		break;
		case "[object Array]": return 'array';
		break;
		case "[object Object]": return 'object';
	}
}