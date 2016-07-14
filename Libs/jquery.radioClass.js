/*! jquery.radioClass.js */
;(function(global, $, undefined){
	'use strict';
	// jQuery 인스턴스 메소드인 radioClass가 정의되어 있는지 확인 후, 없다면 정의
	if ( !$.fn.radioClass ) {

		$.fn.radioClass = function(user_argument) {

			// 사용자 전달인자 유형 체크를 위한 변수 설정
			// $.type() 유틸리티 메소드 활용
			var _type = $.type(user_argument);

			// 전달인자 유효성 검사
			if ( _type !== 'string' && _type !== 'function' ) {
				throw console.error('라디오클래스를 적용할 클래스 속성 문자열이거나, 함수를 전달해야 합니다.');
			}

			// _type 값이 문자일 때
			if(_type === 'string'){
				this.addClass(user_argument).siblings('.'+user_argument).removeClass(user_argument);
				return this;
				//플러그인 내부에서 this는 제이쿼리인스턴스 객체이다.
			}
			// _type 값이 함수일 때
			else{
// 제이쿼리 플러그인의 경우 each()문을 통해서 개별아이템을 탐색할 수 있는 방법을 제공 한다. 
// 그래서 대부분 제이쿼리플러그인 코드를 까보면 제이쿼리 each에다가 this를 던진다.
// this는 수집되어있는 제이쿼리 인스턴스. 그안에 여러개의 대상요소가 있고 그걸 탐색한다.
// 그때 전달 받는 인자는 index, dom_el 이고 내부에 this는 DOM객체.
						//this는 제이쿼리 콜렉션.
				return $.each(this, function(index, dom_el) {
										// 유저가 전달한 함수user_argument를 실행시킬때 전달인자. 
										// 첫번째 index, 두번째 current className 받게 하려면
							//사용자가 나중에 함수를 전달해서 인자값을 받도록 처리하기 위해서는 함수를 실행할때 어떤형태로 실행? 컨텍스트를 바꿔주는 call
							//함수 객체가 가지고 있는 메서드 call, apply, bind 
							//전달받는 인자 형태가 개별이니 call 사용.
							//addClass사용할때 내부 this는 벗겨져있는 자신의 DOM 객체 였기 때문에 여기서도 context는 dom_el로 설정
							//each 문의 index, dom_el 통해서 탐색
							//전달된 함수에 call 을 해서 dom_el, index, dom_el.getAttribute('class') 전달
							//리턴된 문자열 값
					var result_className = user_argument.call(dom_el, index, dom_el.getAttribute('class'));

					// radioClass 본연의 일.
					// this 는 DOM객체.
					this.addClass(result_className)
						.siblings('.'+result_className)
						.removeClass(result_className);

					return this;
				});
			}// radioClass 가 하는 일은 한가지. 나를뺀 형제들에게서 해당 클래스를 제거하고 나한테만 주는게 일인데 그뿐만 아니라 다른일도 동시에 수행하고자 할때 radioClass 본연의 일이 아니라 다른일도 동시에 수행 할려면 함수를 전달 받는다. 확장법.

		}; // 플러그인 끝

	}

})(window, window.jQuery);