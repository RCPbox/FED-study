
// Javascript Module Pattern
// IIFE :: 즉시 실행 함수
// (function(){}())
// +function(){}()
// -function(){}()
// !function(){}()
// ~function(){}()

// 전역: Global Scope
// 전역 변수 dom에 즉시 실행함수가 반환하는 클로저 객체를 참조
var dom = (function(){
	// 지역: Local Scope

	// 외부에서 접근이 불가능한 비공개 멤버(Private Member)
	function createEl(el_name) {
		return document.createElement(el_name);
	}

	// 외부에서 접근이 가능한 공개 멤버(Public Member)
	// GET 방식 사용법: dom.html(document.body);
	// SET 방식 사용법: dom.html(document.body, '<div>hey</div>');
	function html(target, html_code) {//target에 바로 html_code를 넣는다.
		// GET
		if ( !html_code ) {
			return target.innerHTML;//target 안의 코드를 가져온다.
		}
		// SET
		else {
			target.innerHTML = html_code;
		}
	}

	// 반환되는 객체 또는 함수는 클로저(Closure)
	return {
		'html': html
	}

})();
// 실행 이후라 할지라도 상위컨텐츠에 있는 메모리에다 변수 또는 함수를 기억해 둘 수 있다.
// JS 모듈 패턴중 하나. IIFE(즉시실행함수)를 사용한 클로저 반환. 
// 클로저는 상위스코프에 있는 숨겨진 멤버에 접근할 수 있다. 를 기억.
