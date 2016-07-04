/*! main.js */
;(function(global, $, undefined){
	'use strict';

	var $page = $('#page'),
		// $post = $page.children('.post');
		$post = $('.post', $page);

	// $post.filter(':gt(0)').append('<a href="#">go to Top</a>');

	var s = $post.filter(function(index, el) {

		// jQuery
		var win_h       = $(window).height(),// 현재 보여지는 화면 높이값.
			$el         = $(el),
			el_offset_h = $el.offset().top + $el.outerHeight(true);
											// outerHeight(true) 마진까지 포함한 높이
		console.log($el.offset().top);
		if( win_h < el_offset_h ) {
			return true; 
		}

		// Native.
		// var win_h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		// 	el_offset_h = el.offsetTop + el.offsetHeight;
		// if ( el_offset_h > win_h ) { return true; }

		// if(index > 0) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	
	// margin 박스 밖은 offset 박스.
	}).append('<a href="#">go to Top</a>');

	console.log(s);

	// --------------------------------------------------------
						// 씨즐엔진 필터식 [grate then] .post:gt(0) - (0)보다 크다. 
						// <a>를 만들어서 .post 들중에 0번 이상에만 붙여라.
	// $('<a href="#">go to Top</a>').appendTo('.post:gt(0)'); //선택자 표현식.

})(window, window.jQuery);