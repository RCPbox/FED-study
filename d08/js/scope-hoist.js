
/** --------------------------------
 * Scope, Hoist
 * 영역, 끌어올리다.
 *
 * 호이스트란?
 * function , var 키워드를 가진 문장이 영역 최상단으로 끌어올려지는 것을 말한다.
 *
 * debugger
 * 중단점(개발도구 Breakpoint)
 * 가급적 도구에서 사용할 것.
 * 코드 내에 삽입하지 말 것.
 * --------------------------------*/

// 전역(Global Scope)
// 변수, 함수 선언

// fn1(); // hoist 현상으로 오류 발생. 변수만 끌어올려졌기 때문. undefind.
// 값이 대입되는 구문에 와야지 그 변수에 함수가 담긴다.

// fn2(); // 아래 있는 function fn2() {}는 hoist 되기에 정상적으로 수행된다.

// 함수 표현식(Function Expression)
var fn1 = function() { console.log('this is fn1 function.'); };

// fn1(); // 정상 수행된다.

// 함수 선언식(Function Declaration)
function fn2() {
	console.log('this is fn2 function.');
}


/** --------------------------------
 * Scope 
 * Global vs Local
 * -------------------------------- */

// 전역 공간 - window 
// 웹브라우저 환경에서만 전역공간(Global)이 window. nodeJS는 window란게 없음.
var memory = '김치찌개';

localScope();

function localScope() {
	// 지역 공간 - 함수 내부

	// var memory; // 지역 변수 memory는 호이스트 된 상태에서는 undefined.

	if (memory)  { // 지역 변수 memory는 undefined이기에 if 조건문은 실행되지 않음.
		var memory = '된장찌개';
	}

	console.log(memory + '_in');  // 지역 변수 memory 값 출력 undefined

	function inLocalScope() {
		// 지역 내부의 지역 공간 - 함수 내부의 함수 공간
		// 거슬러 올라가느라 느려지니 뎁스가 깊어지지 않는게 좋다.
	}

}
console.log(memory); // 전역 변수 '김치찌개' 출력.

