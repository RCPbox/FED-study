

define(
	['jquery.utils'], 
	function() {
		'use strict';
		// console.log( $ === jQuery);//true
		// console.log( !!$.cache);//true
		
		// jquery.darkNight.js 플러그인 코드 개발
		if (!$.fn.darkNight) {

			// Letter 초기 기본  옵션 객체.
			var letters = {
				'first' : 'DARK',
				'last' : 'NIGHT'
			};// 이걸 외부(사용자)에서 전달받으려면 options 필요.

			$.fn.darkNight = function(options) {
			
	// darkNight 스타일 추가 
	//jquery동적으로 요소만들어서 속성을 설정한 다음 문서의 요소에 붙여준다.
	//dom script 하는것.
				$('<link>',{//링크추가
					'id': 'dark-night',
					'rel':'stylesheet',
					'href':'js/plugins/jquery.darkNight.css'
				})
				.insertAfter('link:eq(0)');//eq필터식을 통해 지정.

				// 사용자 정의 옵션 오버라이딩. 초기값과 병합.
				letters = $.extend({}, letters, options);

				// darkNight 템플릿. 동적생성.
				var dark_night_template = [
						'<div id="box">',
							'<p id="flashlight">',
								'<span id="flash">'+letters.first+'</span>',
								'<span id="light">'+letters.last+'</span>',
							'</p>',
						'</div>'
				].join('');

				$(dark_night_template).prependTo('body');

				return this;
			// this는 jquery 인스턴스 객체.
			// console.log(this.jquery); //2.1.4

//체이닝해서 쓸려면 return this; 가 필요. 이걸 해야 나중에 이곳에 와서
//darkNight.addclass 이런걸 쓸수 있다고 했다.
			// jQuery 체이닝
			};
		}
	}
);