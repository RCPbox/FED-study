
// (function(global, $, undefined){
// 	'use strict';
// 	alert('dom content loaded')
// 	console.log(global.document.body);
// 	global.document.body.innerHTML='<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente tempore quos necessitatibus ipsa modi quam sit, soluta exercitationem iusto tenetur?</p>'
// })(window, window.jQuery);


// 환경 설정.
require.config({
	//baseUrl을 등록하면 경로와 확장자가 빠지게 된다.
	'baseUrl' : 'js/libs',

	'paths':{//모듈에 대한 별칭을 지정.
		// Libs
		'modernizr': 'modernizr',
		'detectizr': 'detectizr',
		'jquery': 'jquery-2.1.4',
		'jquery.utils': 'jquery.utils',
		// Plugins
		'jquery.darkNight': '../plugins/jquery.darkNight'
	},

	'shim':{
		'detectizr':{
			//dependency
			'deps':['modernizr']
		},
		'jquery.utils':{
			'deps':['jquery']
		},
		'jquery.darkNight':{
			'deps':['jquery.utils']
		}
	}
//이렇게 명시적으로 등록해두면 하나만 호출해도 단계적으로 호출해준다.
});


// require[js 빼도 동작함]  앞에 배열은 의존 모듈. 
// 이 모듈이 불러 와진 다음에 콜백함수 실행.
// require() 호출
require([
	// 'modernizr',// 의존 모듈 별칭으로 받고
	// 'detectizr',// 등록된 호출 순서대로 불러온다.
	// 'jquery',
	// 'jquery.utils',
	'jquery.darkNight'
	], 
	function(/*Modernizr, Detectizr, $*/) {
	// 의존 모듈을 활용해서 코드 작성.
	// console.log($);// jQuery 호출 확인.
	// console.log($ === jQuery);
	// console.log($.fn.darkNight);
	$().darkNight({'first' : 'hahah','last':'꽈과광~~~'});

});

