
// (function(global, $, undefined){
// 	'use strict';
// 	alert('dom content loaded')
// 	console.log(global.document.body);
// 	global.document.body.innerHTML='<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente tempore quos necessitatibus ipsa modi quam sit, soluta exercitationem iusto tenetur?</p>'
// })(window, window.jQuery);


// require[js 빼도 동작함]  앞에 배열은 의존 모듈. 
// 이 모듈이 불러 와진 다음에 콜백함수 실행.
require.config({
	baseUrl : 'js',

	paths:{//모듈에 대한 별칭을 지정.
		'modernizr': 'libs/modernizr',
		'detectizr': 'libs/detectizr',
		'jquery': 'libs/jquery-2.1.4'
	}
});

require([
	'modernizr',//별칭 사용.
	'detectizr',
	'jquery',
	], 
	function(Modernizr, Detectizr, $) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});

