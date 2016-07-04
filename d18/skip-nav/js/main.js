/*! main.js */
(function(global, $, undefined){
	'use strict';

	/**
	 * --------------------------------
	 * 문서 객체 참조
	 * --------------------------------
	 */
	var $skip_navigation = $('#skip-navigation');

	// var $skip_nav_links = $skip_navigation.find('a').wrapAll('<ul>').wrap('<li>');

	// $skip_nav_links.addClass('a11y-hidden focusable');

	var $skip_links = $skip_navigation
						.addClass('skip-content')
						.find('a').addClass('a11y-hidden focusable');

	$skip_links.on('click', function(e) {
		// 브라우저 기본 동작 차단.
		e.preventDefault();

		// 포커스가 이동해야 할 목적지?
		// e.target <a href="#header">
		var $target = $(e.target.getAttribute('href'));
		// -[div#header, context: document, selector: "#header"]
		//var $target = $(e.target).prop('href');
		// -file:///C:/Users/Cms/Desktop/GitHub/FED-study/d18/skip-nav/index.html#header
		//var $target = $(e.target).attr('href');
		// -#header
		// e.target.getAttribute('href'); // #header

		$target.attr('tabindex', -1).focus();
// 비 포커싱 요소에 포커싱을 주기위해서는 tabindex 값을 설정.
// 숫자 값을 주면 그 순서대로 탭이 이동하기 때문에 
// 값을 0으로 주면 포커싱을 줄 수 있다.
// -1을 주면 사용자는 탭을 할 수 없다. JS 로는 가능.
	});

// 예전 HTML DOM방식은 주소를 그대로 다 가져온다.
// 하지만 우리가 필요한건 href 값만 필요.
// 제이쿼리 attr() , prop() 두개가 있는데 이 차이점이 위에꺼랑 같다. 확인은 개별.
// XML DOM 방식인 getAttribute  ,  HTML DOM방식 

})(window, window.jQuery);

