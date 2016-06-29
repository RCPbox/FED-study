/*! main.js */
(function(global, $, undefined){
	'use strict';

	console.log($ === jQuery);

	global.doc = $(document);
	global.body = $(document.body)
// console.log(body);

	jQuery(document.querySelector('#page'));

})(window, window.jQuery);

