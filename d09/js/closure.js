// 전역

var counter = ( function(global){
	'use strict';
	// 지역
	var _count = 0;// 관례적으로 내부용 감춰진 변수로 쓸때 _ 붙임.

	return {	// closure 객체
			'increment': function() {
				_count++;
			}, 
			'decrement': function() {
				_count--;
			}, 
			'double': function() {
				_count *= _count;
			}, 
			'get': function() {
				console.log(_count);
			}
		};// 객체의 멤버가 공통의 변수를 참조해서 그것을 응용.

} )(window);

// 이런 방식이 모듈 만드는 패턴?
// 스코프 내에서 뭔가 변수나 함수 같은걸 만들어 정의 한 다음에 내보내고 싶은 멤버만 내보내는 것.
// 내보내지 않은 모듈은 내부에서 사용 되지만 외부에 굳이 필요가 없거나 공개하고 싶지 않은것들 그런것들은 지역변수
