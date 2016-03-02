
var gnb = $('#gnb'),
	gnb_d1_links = $( '#gnb .lv-1 > li > a' );

var count = 0;

// while(count < 10) { 무한반복에 빠지지 않게 조건.
	// console.log(count); // 0
	// count = count + 1;
	// count += 1;
	// ++count; // 선증가는 1 ,후증가는 0
// }

/** --------------------------------
 * 자바스크립트 반복문: while문  
 * -------------------------------- */

// gnb_d1_links[0].onfocus = function () {
// 	console.log(this.textContent);// 노드값 출력 IE9+
// }

var k = 0,
	l = gnb_d1_links.length;//1뎁스 a 갯수
	//gnb_d1_links.length - 1; 마지막요소.
while (k < l) {
	// gnb_d1_links[k].onfocus = gnbD1Action;
	gnb_d1_links[k].onfocus = gnbD1Focus;//포커스가 가면.
	// gnb_d1_links[k].onBlur = gnbD1Blur;

	k++;//무한루프 방지용
}

// function gnbD1Action(){
// 	console.log(this.textContent);
// }

function gnbD1Focus() {
	// this.className = 'on';
	// this.setAttribute('class', 'on');
	collapseMenu();
	var parent = this.parentNode; //부모에게 접근
	parent.classList.add('on');
};
// function gnbD1Blur() {
// 	// this.className = '';
// 	// this.setAttribute('class', '');
// 	this.classList.remove('on'); //최신방식
// };

/**--------------------------------
 * 선증가(감소) vs 후증가(감소)
 * --------------------------------*/
// --------------------------------/
// 선 감소 사례
// var l = gnb_d1_links.length;

// while(--l >= 0) {//43210
// 	gnb_d1_links[l].onfocus = gnbD1Action;
// }			//43210

// --------------------------------/
// 후 감소 사례
// var l = gnb_d1_links.length;

// while(l-- > 0) {//54321
// 	gnb_d1_links[l].onfocus = gnbD1Action;
// }			//43210

var gnb_d1_lis = $('#gnb .lv-1 > li'),
	gnb_d1_lis_len = gnb_d1_lis.length;

while(gnb_d1_lis_len--) {//54321 조건문 안에 0이 들어오면 거짓이라서 실행 되지 않는다.
	//li 에 마우스가 빠져나오면 on을 제거 하는 이벤트 연결.
	gnb_d1_lis[gnb_d1_lis_len].onmouseleave = collapseMenu;
}				//43210

document.onclick = collapseMenu;//사용자가 문서 클릭했을때 on제거 이벤트.

function collapseMenu() {
// on을 붙이기 전에 on이 붙은것을 찾아서 지우고 붙여야 한다.
// on은 한개만 있어야 하니깐.
	var target = $('#gnb .on');//gnb에서 on을 찾기] on은 하나 뿐이니깐
	if (target.nodeName) {
//nodeName이 있다는건 element 라는 것.nodeType을 사용 할 수도있다. 조건체크.
		target.classList.remove('on');
	}
};

