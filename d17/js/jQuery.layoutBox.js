/*! jquery.layoutBox.js */
(function(global, $, undefined){
	'use strict';

	// 사용자가 아무것도~~~~ 전달하지 않았을 때
	// 사용되는 기본 옵션 설정입니다.

	var box_obj_default = {
		'box'        : '<div>',
		'position'   : 'absolute',
		'left'       : 0,
		'top'        : 0,
		'width'      : 100,
		'height'     : 100,
		'background' : '#0f0f0f',
		'color'      : '#fff',
		'html'       : '<span>Box</span>',
	};

	$.layoutBox = function($container, box_obj) {

		// 객체의 속성을 덮어쓰기 $.extend() 사용.
		var settings = $.extend(box_obj_default, box_obj);

		console.log(settings);

		// $box 요소 생성.
		// 생성과 동시에 뭘 붙이고자 할때 자주 사용.
		var $box = $( settings.box, {
									'class': 'box',
									'css': {
											'position'   : settings.position,
											'left'       : settings.left + 'px',
											'top'        : settings.top + 'px',
											'width'      : settings.width + 'px',
											'height'     : settings.height + 'px',
											'background' : settings.background,
											'color'      : settings.color,
											},
									'html': settings.html
									} ).appendTo($container);
	};

})(window, window.jQuery);

// 박스를 스타일링 함과 동시에 원하는 위치에 배치할수 있는 함수를 만든것.