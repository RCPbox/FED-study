/**
 * --------------------------------
 * JS Legacy Event
 *
 * Interface Events
 * - window.onload
 * - window.onresize
 * - window.onscroll 스크롤하면 이벤트 감지하기 시작. 
 * 		특정순간을 지나게 되면 조건문을 사용해서 UI 컨트롤.
 *
 * --------------------------------
 */

// 즉시 실행하는 함수 (스코프 함수)
// 캡슐화 (다른 코드와 충돌 방지)
( function(global, $){
	'use strict';

	// global 객체 이벤트 연결
	global.onload = uiInit;

	/**
	 * --------------------------------
	 * UI 초기화 시에 수행되는 함수.
	 */
	function uiInit() {
		//전역을 통해서 공유하기 위해서 참조시켜두고 사용.
		// 전역 body 변수에 <body> 요소 참조
		global.body = $.$('body');

		//동적으로 콘텐츠를 추가하는 함수 실행.
		dynamicAddContents();

		// 이벤트 연결
		this.onscroll = checkEventScroll;
		//문서에 암것도 없기에 동작 안하니 추가해 보자.dynamicAddContents
		this.onkeydown = keyDownFn;
		this.onkeypress = keyDownFn;
		this.onkeyup = keyUpFn;

		// 이벤트에 연결된 함수 실행
		this.onscroll();
	}

	/**
	 * --------------------------------
	 * 이벤트 핸들러 (함수 모음)
	 */
	function checkEventScroll() {
		// console.log(this === global);// true
		// console.log(this === window);// true

		// 스크롤된 높이 값 출력
		// window.pageYOffset(scrollY) , IE: document.scrollTop | d4표 참조.
					// 크로스 브라우징 위해 설정
		var scrollY = this.scrollY || global.body.scrollTop;
		// console.log(scrollY);
		var scroll_info = $.$('.show-scroll-info');
		$.text( scroll_info, scrollY );

		actionProgressBar.call(global, scrollY);
		//call 을 통해서 this 는 global로 전달하고 scrollY 를 전달하면 매번 가져오는게 아니라 한번 가져온 값을 재사용
	}

	function actionProgressBar(currentScrollY) {
		// 허용 가능한 스크롤 높이 = 문서전체의 총 높이 - 현재 창 화면 높이
		// 진행률 = 현재 스크롤 높이 / 허용 가능한 스크롤 높이 x 100
		var availableScrollHeight = global.body.offsetHeight - global.innerHeight,
			percent = Math.round( currentScrollY / availableScrollHeight * 100 ) + '%';

		$.css( $.$('#scrolled-progress-bar'), 'width', percent );
	}

	function dynamicAddContents() {
		// <body> 요소에 동적으로 콘텐츠를 만들어 붙인다.

		// ----------------------------------------------------
		// <div id="app"> 요소 생성
		var app  = $.createEl('div');

		$.attr( app, 'id', 'app' );// <div id="app"> 속성추가.
		$.prepend( global.body, app );

		// ----------------------------------------------------
		// <header> 요소 생성
		var header = $.createEl('header');

		$.prepend( app, header );

		// ----------------------------------------------------
		// <h1> 요소, 텍스트 노드 생성 생성
		var header_h1     = $.createEl('h1'),
			header_h1_txt = $.createText('hi everyone!! :-)');

		$.prepend( header_h1, header_h1_txt );
		$.append( header, header_h1 );

		// <span class="show-scroll-info">
		var scroll_info = $.createEl('span');
		$.addClass( scroll_info, 'show-scroll-info' );

		$.append( global.body, scroll_info );

		// <span id="scrolled-progress-bar">
		var scrolled_progress = $.createEl('span');

		$.attr( scrolled_progress, 'id', 'scrolled-progress-bar' );
		$.prepend( global.body, scrolled_progress );

	}

	function keyDownFn(event) {
		console.log(
			'[['+ event.type + ']] ', event.keyCode,
			' ─ [[shiftKey]] ', event.shiftKey,// shift 키가 눌렸는지 확인.
			' ─ [[altKey]] ', event.altKey// alt 키가 눌렸는지 확인.
		);
	}

	function keyUpFn(event) {
		console.log(
			'[['+ event.type + ']] ', event.keyCode,
			' ─ [[shiftKey]] ', event.shiftKey,
			' ─ [[altKey]] ', event.altKey
		);
	}
	//이벤트 핸들러 함수는 첫번째 인자로 event 객체를 전달 받는다. 그 event 객체를 통해서 사용자가 어떤 event를 발동시켰는지 정보를 얻을수 있다. 
} )(window, window.yamoo9);