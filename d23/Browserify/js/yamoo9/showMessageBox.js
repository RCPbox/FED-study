var module_name = 'showMessageBox';
// CommonJS, AMD, 웹 브라우저 글로벌 객체로 jQuery 플러그인 생성하는 방법.
(function (factory) {// factory에 펑션이 들어오는데
    if (typeof define === 'function' && define.amd) {
        // AMD 환경
        define(module_name, [], factory);
        // define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS 환경
        module.exports = factory;
        // module.exports = factory(require('jquery'));
    } else {
        // 웹 브라우저 전역객체
        window[module_name] = factory;
        // factory(jQuery);
    }
}(function (msg) {// msg를 받는 함수. factory 가 들어 갔을때
	// 플러그인 코드
	console.log('show message box');
}));