(function(global, $, undefined){
	'use strict';
// 앞에서는 jQuery 팩토리함수$() 안에 DOM객체 나 함수를 넣었는데 
// 문자열을 넣게 되면 jQuery는 내부에 시즐엔진을 사용해서 문서의 대상을 찾아오게 된다. 
// 그래서 우리가 알고 있는 선택자를 사용 할 수 있다.
	var $page_headline = $('#page h1');

	// 클래스 추가.
	$page_headline.addClass('on');

	global.intervalID = setInterval(function() {// 반복
		$page_headline.toggleClass('on');//클래스 줬다 뻇다.
	}, 500);

	global.setTimeout(function() {
		clearInterval(global.intervalID);// 위에 반복 함수 삭제.
	}, 3000);

	// global.setTimeout(function() {
	// 	$page_headline.removeClass('on'); // 클래스 제거.
	// }, 1000); // 1초뒤에 실행

	// var toggle_limit_count = 3;

	// 3회 클릭한 경우, 더 이상 작동하지 않음.
	$page_headline.on('click', (function(){

		// 클로저 함수가 참조하는 상위 영역의 지역 변수
		var toggle_limit_count = 3;

		// 클로저 함수 반환
		return function() {
			console.log(toggle_limit_count);
			if ( $page_headline.hasClass('on') ) {
				$page_headline.removeClass('on');
			}
			if (toggle_limit_count-- > 0) {
				$page_headline.toggleClass('off');
			}
		}

	})());

})(window, window.jQuery);
//사용된 함수 확인.