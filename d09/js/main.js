/*
var app = $('#app'),
	app_header = $('header', app),
	app_headline = $('h1', app_header);

// GET
var app_margin_top           = getStyle(app,'margin-top');
var app_header_padding       = getStyle(app_header, 'padding');
var app_headline_font_weight = getStyle(app_headline, 'font-weight');
var app_headline_font_size   = getStyle(app_headline, 'font-size');

// console.log(app_margin_top          );
// console.log(app_header_padding      );
// console.log(app_headline_font_weight);

// SET
// setStyle(app,'background', '#f06000');
// setStyle(app, 'margin-top', '100px');
// setStyle(app_headline, 'font-size', (parseInt(app_headline_font_size)+100)+'px');
css(app,'background', '#f06000');
css(app, 'margin-top', '100px');
css(app_headline, 'font-size', (parseInt(app_headline_font_size)+100)+'px');
css(app_headline, 'color', '#fff');
*/

//--------------------------------------------------------------------------

// IIFE
/*( function(global, _){
	'use strict';
	// 전역과 구분되는 지역

	// console.log(global === window);//true
	// console.log(_ === window.yamoo9);//true

	var body = _.$('body'),
		app = _.$('#app');

	_.css(app, 'background: red; color: white; height: 100vh;');
} )(window, yamoo9);*/

//--------------------------------------------------------------------------

/*
// 함수는 일급객체(First Class Object)
// 함수는 함수를 포함한 모든 데이터를 전달 받을 수 있다.
function outerFn(){
	// outerFn 스코프영역
	var outerFn_var = 'outerFn 변수';

	console.log('outerFn 안: ', outerFn_var);

	function innerFn() {// closure
		// innerFn 스코프영역
		// console.log(outerFn_var);
		console.log('innerFn 안: ', outerFn_var);
	}

	return innerFn;//함수에서 함수 반환.
}

// ousterFn() 함수는 innerFn()를 반환
// inf 변수에는 innerFn()가 참조됨.
var inf = outerFn();

// inf 함수를 실행하면 outerFn() 내부의 함수가 실행되는 것임.
inf();

// outerFn() 함수의 상위 영역에서는 outerFn_var 변수에 접근이 안됨.
// console.log('IIFE 안: ', outerFn_var);

// 기억할건 함수내부에서 뭔가를 돌려줬는데 그 돌려준걸 사용했다는 것.
// 돌려 받은 inf 는 안쪽의 innerFn()을 받은것 을 실행 한것. 
// 이때 실행될때 안쪽 영역은 바깥쪽을 참조 할 수 있지만, 바깥쪽에서 안쪽은 참조 안됨.
// 이것떔에 closure를 사용.

// 안쪽에 잠싸진 함수를 반환 했을때 그 함수를 밖에서 실행하게 되면 그 함수는 우리에게 감춰진 영역의 접근이 가능하다는 것. 이걸 기억.

// 자신의 부모가 실행되서 내가(함수가) 밖으로 나와 야지만 closure가 된다.

// 함수는 실행 완료 되면 지역변수, 데이터등 사라져야 되지만. 리턴된 함수를 실행 시키면 사라져야 할 애들을 기억(메모리)하고 있다는 것.
*/

//--------------------------------------------------------------------------

/*
function outCounter() {
	var count = 0;

	function counter() {//closure
		console.log(count++);
	}
	return counter;
}

var fn = outCounter();

fn();//0
fn();//1
fn();//2
*/

//--------------------------------------------------------------------------

( function(global, _){
	'use strict';
	
	var nav_links = _.$('nav a');

		// 유사배열에 함수를 넣을수 있다?
	// Closure 사용 예 ------------------------------------------
	for (var i = 0, l = nav_links.length; i < l; i++) {
		var item = nav_links[i];

		function s1(indx) {
			// s1 영역
			// indx(i)

			function s2() {
				// s2 영역
				console.log(indx);
				return false;
			}

			return s2; // s2 반환
		}

		var s2 = s1(i); // s2 반환

		item.onclick = s2;
	}
//클로저 함수는 상위스코프에 있는 숫자값을 메모리얼 하고 있기에 클릭할때 그 값을 보낼 수 있다.
//함수가 함수를 반환 할때 그 함수를 클로져라 하고, 클로져는 상위 스코프를 참조한다. 메모리 한다.


	// IIFE 패턴 사용 예 ------------------------------------------
	for(var i=0, l=nav_links.length; i<l; i++) {

		var item = nav_links[i];

		item.onclick = (function(idx){
			// 클릭하면 클로저 함수가 실행된다.
			return function() {
				console.log(idx);
				return false;
			}
		})(i);
	}
} )(window, yamoo9);

