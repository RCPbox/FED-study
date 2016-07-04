/*! main.js */
(function(global, $, undefined){
	'use strict';

	/**
	 * --------------------------------
	 * Dimensions
	 * --------------------------------
	 */
	var $box = $('.box');
	// jQuery 이벤트
	// [추가] on, bind, live, delegate   
	// 이벤트 위임되는애들 live, delegate ; 안되는애 bind ; on은 만능 1.7 이상.
	// [제거] off, unbind, die, undelegate
	$box.bind('click', function(){
		$(this).innerWidth(function(index, width){
			var change_value = width * 2;
			if (change_value > 600) {
				change_value = 600;
				$(this).unbind('click'); // 이벤트 제거
			}
			console.log('clicked'); // 이벤트 제거 유무 확인
			
			return change_value; // widht 값 전달.
		});
	});
	// box 마다 이벤트 따로 적용됨.

	/**
	 * --------------------------------
	 * Manipulation, Insertion Outside
	 * --------------------------------
	 */
	var $beforeBox = $('<div id="box-before">before box</div>');

	// 생성한 jQuery 객체 요소.insertBefore(jQuery 객체 요소);
	$beforeBox.insertBefore('.box'); // 형재 요소로 .box 앞에 추가.

	// 생성한 jQuery 객체 요소.insertAfter(jQuery 객체 요소);
	$('<div id="box-after">after box</div>').insertAfter($box); 
									// 형재 요소로 .box 뒤에 추가.

	// jQuery 객체 요소.before(생성한 jQuery 객체 요소);
	// 형재 요소로 .box 앞에 추가.
	$box.before('<p class="before-box">Lorem ipsum dolor.</p>');
	// jQuery 객체 요소.after(생성한 jQuery 객체 요소);
	// 형재 요소로 .box 뒤에 추가.
	$box.after('<p class="after-box">dolor Lorem ipsum.</p>');

	/**
	 * --------------------------------
	 * Native Javascript Methods
	 * --------------------------------
	 */
	var head = document.querySelector('head'),
		first_scrit = head.querySelectorAll('script').item(0);

	// DOM API, insertBefore
	// var d_link = document.createElement('link');
	// d_link.setAttribute('rel', 'stylesheet');
	// d_link.setAttribute('href', 'css/temp.css');
	// first_scrit.parentNode.insertBefore(d_link, first_scrit);
								//형재 요소로 first_script 앞에 추가

	// DOM API, insertAdjacentHTML()
	// element.insertAdjacentHTML(position, text);
	// 'beforebegin' - element 앞에 ,
	// 'afterbegin'  - element 안에 가장 첫번째 child ,
	// 'beforeend'   - element 안에 가장 마지막 child ,
	// 'afterend'    - element 뒤에
	// first_scrit.insertAdjacentHTML('afterend', '<link rel="stylesheet" href="css/temp.css" />');

	function append(target, last) {// 자식으로 마지막에
		target.insertAdjacentHTML('beforeend', last);
	}
	function appendTo(lastChild, targetParent) {// 자식으로 마지막에
		append(targetParent, lastChild);
	}
	function prepend(target, first) {// 자식으로 첫번째
		target.insertAdjacentHTML('afterbegin', first);
	}
	function prependTo(firstChild, targetParent) {// 자식으로 첫번째
		prepend(targetParent, firstChild);
	}

	function insertBefore(prev, target) {// target의 형제로 앞에 추가.
		target.insertAdjacentHTML('beforebegin', prev);
	}
	function before(targetParent, prevSibling) {// target의 형제로 앞에 추가.
		insertBefore(prevSibling, targetParent)
	}
	function insertAfter(target, next) {// target의 형제로 뒤에 추가.
		target.insertAdjacentHTML('afterend', next);
	}
	function after(targetParent, nextSibling) {// target의 형제로 뒤에 추가.
		insertAfter(nextSibling, targetParent)
	}

	append(head, '<link rel="stylesheet" href="css/temp.css" />');

	/**
	 * --------------------------------
	 * Manipulation, Insertion Inside
	 * --------------------------------
	 */
	// prepend, prependTo
	$('.before-box').prepend('<span class="inside-before-box">inside</span>');// 자식으로 첫번째.
	$('<em class="before-emphasis">emphasis</em>').prependTo('body');// 자식으로 첫번째.

	// append, appendTo
	$('.after-box').append('<span class="inside-after-box">inside</span>');//자식으로 마지막
	$('<em class="after-emphasis">emphasis</em>').appendTo('body');//자식으로 마지막.

})(window, window.jQuery);

