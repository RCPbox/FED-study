/**
 * ----------------------------------------------------------------------
 * 대상을 손쉽게 선택할 수 있는 선택자 헬퍼 함수
 * $함수 : CSS 선택자를 활용하여 문서 객체를 선택하는데 도움을 주는 함수
 * @param  {[string]} selector [CSS 선택자 표현식]
 * @return {[Node|NodeList]}   [문서객체, 객체집합을 반환]
 * --------------------------------------------------------------------*/
function $(selector) {
	//함수 내부 지역 변수 nodeList에 document.querySelectorAll() 방법을 사용하여
	//전달받은 인자(매개변수) selector에 해당되는 DOM 객체를 찾아서 참조한다.
	//그리고 수집된 대상(노드리스트)의 개수를 파악하여 nodeList_length 변수에 참조합니다.
	var nodeList = document.querySelectorAll(selector),
		nodeList_length = nodeList.length;

	// 만약 nodeList_length 변수가 참조하고 있는 값이 1이라면...
	if (nodeList_length === 1) {
		// 수집된 nodeList의 첫번째 인덱스에 해당되는 요소를 반환합니다.
		return nodeList[0];
	}

	// 위 조건이 거짓이라면 수집된 nodeList를 그대로 반환합니다.
	return nodeList;
}

/**
 * ----------------------------------------------------------------------
 * getStyle(설정된 스타일 속성) 함수
 * ----------------------------------------------------------------------
 */
function getStyle(el, prop) { // (문서객체 , 문서객체의 속성)
	if (window.getComputedStyle) {
		return window.getComputedStyle(el)[prop]; //계산된 스타일 값 가져오기
	} else {
		return el.currentStyle[prop];
	}
}


/**
 * --------------------------------
 * CSS3 신기능을 검수하는 헬퍼함수
 * --------------------------------
 */
function checkCSS3Feature (feature) {
	//DOM에 접근 하는것은 비용이 많이 든다. 느려진다. 
	//반복 사용하는 것은 변수를 선언 캐시해서 사용.
		var html = $('html'),
			body = $('body'),
			html_old_class = html.getAttribute('class');
	if ( feature in body.style ) {
		// 조건이 참이면 실행되는 결과
		html.setAttribute('class', html_old_class + ' ' + feature);
	} else {
		// 조건이 거짓이면 실행되는 결과
		html.setAttribute('class', html_old_class + ' ' + 'no-'+feature);
	}
}