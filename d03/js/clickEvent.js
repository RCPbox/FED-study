/*! clickEvent.js © yamoo9.net, 2015 */
var html = document.documentElement; /* 찾아서 */

html.className = 'js'; /* 설정 한다. */

/**
 * --------------------------------
 * 문서 로드 이후 초기화 업무 수행
 * --------------------------------
 */
// 문서에서 #wallpaper를 찾는다.
// 변수(Variable) 선언
var wallpaper = document.getElementById('wallpaper');
// console.log(wallpaper);
// 
// 스타일을 설정한다. (화면 가득 이미지 채우기)
// wallpaper.style.height             = '100vh';
// wallpaper.style.backgroundImage    = 'url(images/wallpaper-01.jpg)';
// wallpaper.style.backgroundRepeat   = 'no-repeat';
// wallpaper.style.backgroundPosition = 'center top';
// wallpaper.style.backgroundSize     = 'cover';


// height: 100vh 는 ie9+ 쓸 수 있고..
// 창에서 화면 높이 정보 가져오기.
// window.innerHeight // IE 9+
// document.documentElement.clientHeight //크로스브라우징됨. 이거사용.
var viewportHeight = html.clientHeight;


// 사용자가 문서(document)를 클릭하면 뭔가를 수행.
// 사용자가 문서를 클릭하면 wallpaperInit 함수를 수행.
// document.onclick = wallpaperInit;

// 함수 실행
wallpaperInit();

// 월페이퍼 초기화
function wallpaperInit() {
	// console.log('document clicked');
	wallpaper.style.cssText = 'height: ' + viewportHeight + 'px; background: url(images/wallpaper-01.jpg) no-repeat center top; background-size: cover;';
	return false;
};

/**
 * --------------------------------
 * .controller 메뉴 제어
 * DOM Selector API - IE 8+
 * .querySelector()
 * .querySelectorAll()
 * --------------------------------
 */
// var controller = document.getElementsByClassName('controller')[0];
var controller = document.querySelector('.controller');
// console.log(controller);	/*셀렉터메서드 쓸때만 선택자사용*/

// var controller_btns = controller.getElementsByTagName('a');
// var controller_btns = controller.querySelectorAll('a');
var controller_btns = document.querySelectorAll('.controller [role]');
// console.log(controller_btns);

//첫번째 수집된 대상.
controller_btns[0].onclick = function() {
	// console.log(this.firstChild.nodeValue);

	// wallpaper의 배경이미지 값을 변경합니다.
	wallpaper.style.backgroundImage = 'url(images/wallpaper-01.jpg)';

	// 활성화(on)된 요소를 찾아서 활성화 클래스를 제거합니다.
	var activeEl = controller.querySelector('.on');
	activeEl.className = '';

	// 클릭된 버튼(a요소)에 활성화 클래스를 설정합니다.
	this.className = 'on';
	return false;
};
controller_btns[1].onclick = function() {
	// console.log(this.firstChild.nodeValue);
	wallpaper.style.backgroundImage ='url(images/wallpaper-02.jpg)';
	
	// var activeEl = controller.querySelector('.on');
	// activeEl.className='';
	controller.querySelector('.on').className ='';

	this.className ='on';
	return false;
};
controller_btns[2].onclick = function() {
	// console.log(this.firstChild.nodeValue);
	wallpaper.style.backgroundImage ='url(images/wallpaper-03.jpg)';
	
	var activeEl = controller.querySelector('.on');
	activeEl.className ='';

	this.className ='on';
	return false;
};
controller_btns[3].onclick = function() {
	// console.log(this.firstChild.nodeValue);
	wallpaper.style.backgroundImage ='url(images/wallpaper-04.jpg)';
	
	var activeEl = controller.querySelector('.on');
	activeEl.className ='';

	this.className ='on';
	return false;
};
controller_btns[4].onclick = function() {
	// console.log(this.firstChild.nodeValue);
	wallpaper.style.backgroundImage ='url(images/wallpaper-05.jpg)';
	
	var activeEl = controller.querySelector('.on');
	activeEl.className ='';

	this.className ='on';
	return false;
};


// 자바스크립트의 조건문
// if(), if ~ else, if else if ~ else
// switch ~ case, default, break


// 컵모양 정의
// var cupShape = 'polygon';

// // 만약 컵 모양을 확인
// if ( cupShape === 'polygon' ) {
// 	// 조건이 참이면 이 구문 수행
// 	console.log('컵 모양은 다각형입니다.');
// } else {
// 	// 조건이 거짓이면 이 구문 수행
// 	console.log('컵 모양은 '+ cupShape +'입니다.');
// }


// 사용자의 기기(Device)의 폭을 감지하여 구분하는 방법
// var device_width = document.documentElement.clientWidth;
// 중단점 설계
// 모바일
// 320px ~
// 태블릿
// 768px ~
// 데스크탑
// 1200px ~
// 와이드 TV
// 1900px ~

//css3 미디어쿼리 흉내낸것. 미디어쿼리 지원되지 않는 IE8 이하 브라우저는 이런 js 방식으로도 처리가 가능하다는 것.
//문제는 css3미디어쿼리보다 느리다. 계속 연산을 해야 하니깐. 미디어쿼리는 브라우저 자체에서 해결이 가능.
function checkKindOfDevice () { 
	var device_width = document.documentElement.clientWidth;
	// 장치의 폭을 확인 (조건 확인)
	if ( device_width < 768 ) {
		// console.log('사용자의 기기는 모바일입니다.');
		html.className += ' ' + 'mobile';
		// wallpaper.style.background = 'red';
	}
	if ( device_width >= 768 && device_width < 1200 ) {
		// console.log('사용자의 기기는 태블릿입니다.');
		html.className += ' ' + 'tablet';
		// wallpaper.style.background = 'blue';
	}
	if ( device_width >= 1200 && device_width < 1900 ) {
		// console.log('사용자의 기기는 데스크탑입니다.');
		html.className += ' ' + 'desktop';
		// wallpaper.style.background = 'lime';
	}
	if ( device_width >= 1900 ) {
		// console.log('사용자의 기기는 와이드 TV입니다.');
		html.className += ' ' + 'wide-tv';
		// wallpaper.style.background = 'yellow';
	}
}


window.onload = window.onresize = checkKindOfDevice;
// 로딩이 되었거나 리사이즈 되었을때 이 함수를 수행해라


// 사용자의 운영체제 감지
// 브라우저 스니핑
// 사용자가 쓰는 웹 브라우저는 무엇인가? (브라우저 식별자)
// 브라우저 정보 값을 가지고 있는 객체
// BOM
// 	window
// 	screen
// 	navigator
// 	location

// DOM
// 	#document


// 만약 사용자의 웹 브라우저가 열린 플랫폼이 궁금하다면?
var isUserPlatform = navigator.platform.toLowerCase();
//indexOf() 문자 값이 포함되어 있으면 0 이상 나오고, 숫자값 같다면 3, 값 없다면 -1
if(isUserPlatform.indexOf('mac') > -1) {
	html.className = 'mac';
}
if(isUserPlatform.indexOf('win') > -1) {
	html.className = 'win';
}

// 자바스크립트의 반복문
// while() 문
// do ~ while() 문
// for() 문
// for ~ in 문
// forEach() 문


