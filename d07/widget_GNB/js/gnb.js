/**================================
 * Javascript MVC 디자인 패턴
 * --------------------------------
 * Model      - 구조(Data)
 * View       - 표현(Template)
 * Controller - 동작(Behavior)
 * --------------------------------
 * 각 계층은 독립적으로 서로 의존하지 않고,
 * 분리되도록 설계(Design)되어야 한다.
 * ================================*/

/** ================================
 * [M]odel
 * --------------------------------
 * 구조화된 View 템플릿에 적용되는 Data
 * HTML, XML, JSON ... 사용.
 * AJAX - 비동기 통신
 */

/** ================================
 * [V]iew
 * --------------------------------
 * 뷰 타겟(View Target) 설정
 * CSS 선택자를 활용하여 문서 객체 참조
 */
var gnb               = $('#gnb'), // Selecting
	// gnb_expand_handle = find(gnb,'.expand-handle'), // Traversing 탐색
	gnb_links         = $('a', gnb),
	gnb_expand_handle = $('.expand-handle', gnb);//개량된 $함수 사용.


/** ================================
 * [C]ontroller
 * --------------------------------
 * 뷰 타겟에 이벤트 연결
 * <li> ⇒ MOUSE 이벤트 연결
 * <a>  ⇒ KEYBOARD 이벤트 연결
 *
 * 이벤트 핸들러(함수) 정의
 * expandMenu()
 * collapseMenu()
 */

// var gnb_expand_handle_len = gnb_expand_handle.length;

// while( gnb_expand_handle_len-- ) {
// var handle = gnb_expand_handle[gnb_expand_handle_len];
// 	console.log(handle);
// }

for( var i=0, l=gnb_expand_handle.length, handle, parentEl; i<l; i++ ) {
// for (var i = gnb_expand_handle.length, handle; i >= 0; i--) {
	// gnb_expand_handle의 개별 아이템 참조 변수
	handle = gnb_expand_handle[i];
	parentEl = parent(handle);

	// 각 핸들에 키보드(포커스) 이벤트 연결 → 함수(핸들러)
	handle.onfocus = expandMenu;

	// 마지막 handle 요소 내부 마지막 <a>에 키보드(블러) 이벤트 연결 → 함수(핸들러)
	if( i === l-1 ) {
		last(parentEl, 'a').onblur = collapseMenu;
	}

	// 핸들의 부모(<li>)에 마우스 이벤트 연결 → 함수(핸들러)
	parentEl.onmouseenter = expandMenu;
	parentEl.onmouseleave = collapseMenu;
}

/**
 * --------------------------------
 * 이벤트 핸들러(함수)
 * --------------------------------*/

// 메뉴 펼침 함수
function expandMenu() {
	// this.parentNode.className='on';//예전 방식
	// this.parentNode.setAttribute('class', 'on');//좀더 진보
	// this.parentNode.classList.add('on');//최신
	// addClass(this.parentNode,'on');//dom-helpers

	var _this = this.nodeName.toLowerCase();
	if ( _this === 'a' ) {
		radioClass(parent(this), 'on');
	}else{
		radioClass(this, 'on');
	}
}

// 메뉴 접힘 함수
function collapseMenu() {
	// var i=0, l=gnb_expand_handle.length, parent;
	// for(; i<l; i+=1) {
	// 	parent = gnb_expand_handle[i].parentNode;
	// 	if( hasClass(parent, 'on') ) {
	// 		removeClass(parent, 'on');
	// 	}
	// }

	removeClass( $('.on', gnb), 'on' );
}
