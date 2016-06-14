
(function(global, doc){
	'use strict';

	//헬퍼 함수.
	
	//컨텍스트 임의 지정.(함수,context)
	function proxy(fn, owner) {
// return 으로 넘겨서 바로실행하는게 아니라 대비하고있다가 실행 되게 한다.
		return function() {// closure
			fn.apply(owner, arguments);
		}
	}

	//전달할 타겟, 이벤트 타입 , 콜백함수
	function on(target, type, callback) {
		//전달인자가 함수인지 배열인지 확인.
		var data_type = callback.constructor;

		switch(data_type) {
			case Function:
				target['on'+type] = callback;
			break;

			case Array:
				target['on'+type] = function() {
					callback.forEach(function(fn) {// item이 함수.
						fn();// 개별적으로 실행.
					});
				};
			break;

			default:
				console.error('함수 또는 배열 데이터를 전달해주세요.');
		}
	}

	var clicked1 = function() {
		console.log(this, arguments, 'clicked document');
	};

	var clicked2 = function() {
		console.log(this, arguments,'clicked double document element');
	};

	/**
	 * --------------------------------
	 * 구형 이벤트 모델
	 * 다수의 핸들러(함수)를 연결하면...
	 * 마지막 핸들러만 처리 됨.
	 * --------------------------------
	 */

	// on(doc, 'click', clicked2); // 1개만 이벤트가 설정됨.

	// custom proxy() 사용시.
	// on(doc, 'click', [proxy(clicked1, window), proxy(clicked2, navigator)]); //배열형식으로 던지면 2개 이벤트가 설정됩니다.

	// native .bind() 사용시.
	// on(doc, 'click', [clicked1.bind(window), clicked2.bind(navigator)]);
// 결과적으로 배열 데이터를 받았을때 배열의 것들을 또다른 전체를 집합해주는 형태의 푸시를 밀어줘야 기억하고 있다가 나중에 실해줄꺼기 때문에.
// closure 사용. context의 값을 기억해서 계속사용.

	/**
	 * --------------------------------
	 * 진보 이벤트 모델
	 * 다수의 핸들러(함수)를 연결해도 모두 처리됨.
	 * addEventListener(type, fn, capture)     추가
	 * removeEventListener(type, fn, capture)  제거
	 * --------------------------------
	 */
//매번 설정할때마다 지워지던, 하나만 담을수 있었던 구형이벤트모델과 달리 신형 이벤트 모델은 여러개의 함수를 걸어줄수 있다. 신형 장점.
	var a = 0;

	// doc.addEventListener('click', function() {
	// 	console.log('click' + ++a);
	// });
	// doc.addEventListener('click', function() {
	// 	console.log('click' + ++a);
	// });
	// doc.addEventListener('click', function() {
	// 	console.log('click' + ++a);
	// });

//신형에 함수를 이름없이 바로 넣는 형식이면 별도의 식별할 수 있는 이름이 없으면 그게 다 등록된다는 것.
//구형은 이렇게 등록 해도 마지막 한개만 기억.
//신형이벤트 모델을 쓸때는 함수에서 쓰는게 좋다.


	/**
	 * --------------------------------
	 * MS IE 8- 비표준 진보 이벤트 모델
	 * 버블링만 지원.
	 * attachEvent(ontype, fn)   추가
	 * detachEvent(ontype, fn)   제거
	 * --------------------------------
	 */
	// doc.attachEvent('onclick', clicked1);
	// doc.detachEvent('onclick', clicked1);


//---------------------------------------------------------------

	// doc.onclick = function() {
	// 	// Custom 위에 헬퍼 함수로 만든것.
	// 	// proxy(clicked1, doc)();
	// 	// proxy(clicked2, doc.body)(doc, doc.head, doc.body);

	// 	// Native 
	// 	clicked1.bind(doc)();
	// 	clicked1.bind(doc.body)(doc, doc.head, doc.body);
	// };

	// var body = doc.body;

	// // 구형 이벤트 모델
	// global.onload = init;

	// function init() {
	// 	body.style.cssText = 'height: 100vh; background: #FC414B;';
	// }

	// // 신형 이벤트 모델 (W3C 표준)
	// // 이벤트 유형 (on을 제거합니다)
	// // 이벤트 핸들러 (이벤트 발생하면 실행)
	// // 이벤트 흐름 캐치 (true캡쳐링 | false버블링) 안쓰면 버블링 기본.
	// // .addEventListener(type, callback[, capture])
	// doc.addEventListener('click', removeAllStyles.bind(body), false);
								//함수 그냥 실행되면 this는 doc이 되니 bind로 body지정.
	// function removeAllStyles() {
	// 	// console.log(this);// this 는 body
	// 	this.style.cssText = '';// body의 스타일 제거.
	// }

})(window, window.document);