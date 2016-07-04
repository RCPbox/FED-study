/*! main.js */
(function(global, $, undefined){
	'use strict';

	var $gnb       = $('#gnb'),
		$gnb_links = $('a', $gnb);

	$gnb_links
		.wrapAll('<ul>').wrap('<li>') // 태그를 넣어야 한다.
			.parents('ul').unwrap().wrap('<nav id="gnb">')
				.find('a').wrapInner('<span>');

// parents('ul') 부모들을 가져오는데 필터링해서 선택.
})(window, window.jQuery);

