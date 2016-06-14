( function(global, D){
	'use strict';

	//컨텍스트 임의 지정.(함수,context)
	function proxy(fn, owner) {
// return 으로 넘겨서 바로실행하는게 아니라 대비하고있다가 실행 되게 한다.
		return function() {// closure
			fn.apply(owner, arguments);
		}
	}

	/**
	 * --------------------------------
	 * 아래 코드 선언보다 좋은 예
	 * 초기 실행 시, 브라우저 지원도에 따라
	 * 적합한 함수를 설정.
	 * 실행시 한번만 확인 해서 설정.
	 * --------------------------------
	 */
	var addEvent = (function(){
		if(global.addEventListener) {
			return function(el, type, fn, capture) {
				el.addEventListener( type, fn, (capture || false) );
			}
		} else if(global.attachEvent) {
			return function(el, type, fn) {
				el.attachEvent( 'on' + type, fn );
			};
		} else {
			return function(el, type, fn) {
				el['on'+type] = fn;
			};
		}
	})();

	var removeEvent = (function(){
		if(global.removeEventListener) {
			return function(el, type, fn, capture) {
				el.removeEventListener( type, fn, (capture || false) );
			}
		} else if(global.detachEvent) {
			return function(el, type, fn) {
				el.detachEvent( 'on' + type, fn );
			};
		} else {
			return function(el, type, fn) {
				el['on'+type] = null;
			};
		}
	})();
// 진보 이벤트 모델을 쓸 떄는 이벤트를 추가/삭제 할 때 함수 값을 던지는게 아니라
// 함수의 이름이 있거나 함수를 참조하는 변수를 설정해야 제거가 가능.
// 구형은 null 던지면 된다.

//정리
//진보이벤트 모델은 IE678 경우는 ms비표준을 지원하고 9부터는 표준을 지원한다.
//표준의 경우는 addEventListener(type, fn, capture) 추가 . 
//인자 3개 받는데 1. on 을 뺸 이벤트 타입.ex)'click' 
//2. function을 받을수 있는데 fn 경우 값 자체를 받을수 있지만 그럴경우 지울 수가 없게 된다.
//3. 표준은 capture 를 지원하지만 비표준은 지원하지 않는다.

	/**
	 * --------------------------------
	 * 위 코드 선언보다 안 좋은 예
	 * 매번 함수 실행 시, 조건 확인
	 * --------------------------------
	 */
	// function addEvent(el, type, callback, capture) {
	// 	if( el.addEventListener ) {
	// 		// W3C Standard
	// 		el.addEventListener( type, callback, (capture || false) )
	// 	} else if ( el.attachEvent ) {
	// 		// MS IE NonStandard
	// 		el.attachEvent( 'on' + type, callback );
	// 	} else {
	// 		el['on'+type] = callback;
	// 	}
	// }

	// function removeEvent(el, type, callback, capture) {
	// 	if( el.removeEventListener ) {
	// 		// W3C Standard
	// 		el.removeEventListener( type, callback, (capture || false) )
	// 	} else if ( el.detachEvent ) {
	// 		// MS IE NonStandard
	// 		el.detachEvent( 'on' + type, callback );
	// 	} else {
	// 		el['on'+type] = null;
	// 	}
	// }

	// dom.events 객체
	D.events = {
		'addEvent'    : addEvent,
		'removeEvent' : removeEvent,
		'proxy'       : proxy
	};

} )(window, (dom = window.dom || {}) );