
;(function(global, $, undefined){
	'use strict';

	var body_alias = 'body-is-context';

	// .addclass()에 문자열을 적용하는 예
	// var $body = $('body').addClass( 'index-page' );                           // 단일 클래스 설정
	// var $body = $('body').addClass( 'index-page bodyis bodiids' );            // 멀티 클래스 설정
	var $body = $('body').addClass( body_alias || 'index-page bodyis bodiids' ); // 조건 처리 후 설정
// 팩토리 함수에서 jQuery인스턴스객체를 반환 받아 .addClass 인스턴스 메서드 실행

	// console.log($body); // jQuery(body)


	// .addClass()에 함수를 적용하는 예 (특정 조건을 확인한 후, 클래스 속성을 추가할 경우)
	$body
		// class 속성 추가에 특화된 메소드 .addClass()
		.addClass(function(index, current_classname) {
			var addclass = '';

			// 조건이 맞으면 추가하고자 하는 클래스를 설정
			if( current_classname.indexOf('main') > -1 ) {
				addclass = 'intro';
			}

			return addclass; // 반환된 문자열이 클래스 속성 값으로 추가
		})
		// .hasClass('main') // Boolean 반환. 체이닝을 쓸꺼라면 무슨값을 반환할지 생각.
		
		// 다른 속성 추가에 사용되는 메소드 .attr()
		// .attr(key) key만 있으면 get 역할, .attr(key, value) 둘다 있으면 set 역할.
		.attr('data-context', 'body')
		
		// .removeClass() // 클래스 전부 제거.
		// .removeClass('main') // main 만 제거.
		.removeClass(function(index, current_classname) {
			var removeclass = '';
			if( current_classname.indexOf('main') > -1) {
				removeclass = 'main';
			}
			return removeclass;
		})

})(window, window.jQuery);
