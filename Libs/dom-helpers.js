/**
 * ----------------------------------------------------------------------
 * 대상을 손쉽게 선택할 수 있는 선택자 헬퍼 함수
 * $함수 : CSS 선택자를 활용하여 문서 객체를 선택하는데 도움을 주는 함수
 * @param  {[string]} selector [CSS 선택자 표현식]
 * @return {[Node|NodeList]}   [문서객체, 객체집합을 반환]
 * --------------------------------------------------------------------*/

/**
 * ======================================================================
 * 선택(Selecting) | 탐색(Traversing)
 * ======================================================================
 */

// $버전 1.
// function $(selector) {
// 	//함수 내부 지역 변수 nodeList에 document.querySelectorAll() 방법을 사용하여
// 	//전달받은 인자(매개변수) selector에 해당되는 DOM 객체를 찾아서 참조한다.
// 	//그리고 수집된 대상(노드리스트)의 개수를 파악하여 nodeList_length 변수에 참조합니다.
// 	var nodeList = document.querySelectorAll(selector),
// 		nodeList_length = nodeList.length;

// 	// 만약 nodeList_length 변수가 참조하고 있는 값이 1이라면...
// 	if (nodeList_length === 1) {
// 		// 수집된 nodeList의 첫번째 인덱스에 해당되는 요소를 반환합니다.
// 		return nodeList[0];
// 	}

// 	// 위 조건이 거짓이라면 수집된 nodeList를 그대로 반환합니다.
// 	return nodeList;
// }


// $버전 2
/** ----------------------------------------------------------------------
 * $() 함수
 * 대상을 손쉽게 선택할 수 있는 선택자 헬퍼 함수
 * $(선택자, domElement)
 * find()children() 함수 없이도 직접 $함수에 context를 던질수 있게 개량 했다.
 * ----------------------------------------------------------------------
 */
function $(selector, context) {
	//조건처리 유효성 검사.
	// validate(조건, 조건이 참이면 에러를 띄우는)
	validate( isString(selector), '첫번째 전달인자는 문자열이어야 합니다.' );
	validate( context && isElement(context), '두번째 전달인자는 DOM 객체(요소노드)이어야 합니다.' );
	// 첫번째 인자(argument): 문자열
	// if ( !isString(selector) ) { 
	// 	// throw new TypeError('message');
	// 	console.error('첫번째 전달인자는 문자열이어야 합니다.');
	// 	return; // 함수 종료
	// }

	// // 두번째 인자: DOM 객체(요소노드, 1, nodeName)
	// if ( context && !isElement(context) ) {
	// 	console.error('두번째 전달인자는 DOM 객체(요소노드)이어야 합니다.');
	// 	return;
	// }

	var nodeList = (context || document).querySelectorAll(selector);
	// if (nodeList.length === 1) {
	// 	return nodeList[0];
	// }
	// return nodeList;
	return nodeList.length === 1 ? nodeList[0] : nodeList;
}

/**--------------------------------
 * find() 함수 - 전체를 다 뒤져서 찾아서 선택.
 * 전달된 첫번쨰 인자(부모 요소노드) 에서
 * 자손(css선택자)child 요소노드를 찾는 함수. 
 * --------------------------------*/
function find( parentEl, childSelector ) {
	var children = parentEl.querySelectorAll(childSelector),
		children_len = children.length;
// 조건문이 3개이상이면 switch case 문을 사용 하는게 성능상 좋다.
	if (children_len === 0) {
		return null;
	} else if(children_len === 1){
		return children[0];
	}else{
		return children;
	}
}

// function findAll(list, childSelector) {
// 	validate( isElement(list) || isNodeList(list), 'DOM 요소노드 또는 노드리스트여야만 합니다.' );
// 	if (isElement(list)) {
// 		return list;
// 	} else {
// 		var listSet = [];
// 		for(var i=list.length; i<-1;i++) {
// 			listSet.add(find(list[i], childSelector));
// 		}
// 		return listSet;
// 	}
// }


/** --------------------------------
 * children() 함수 - 직접적인 자식만 선택 ">"
 * children(parentEl, childrenSelector)
 * --------------------------------*/
function children(parentEl, childrenSelector) {
	var childEl     = find(parentEl, childrenSelector),//모두 수집.
		childEl_len = childEl ? childEl.length : null,
		els         = []; // 배열

//childEl 없다면 null을 넘겨 부정의 부정을 해서 return childEl 넘김
//그래서 노드 한개가 반환. 그게 아니면 노드 리스트가 반환.
	if (!childEl) { return childEl; }
	
	while(childEl_len--) {
		var el = childEl[childEl_len];
		if (parentEl === el.parentNode) {
			// 조건이 참일 경우, 배열에 원소 수집(Collection)
			els.push(el);//직계 자식 여러개일수 있으니 배열에 담는다.
		}
	}
	return els.length === 0 ? null : els.length === 1 ? els[0] : els;
	//조건식 2개 사용.
}



/**
 * ======================================================================
 * 조작(Manipulation)
 * ======================================================================
 */
/**----------------------------------------------------------------------
 * hasClass() 함수 // true, false
 * hasClass(el, 'on');	이 요소el 의 class 에 on 이 있나?
 * --------------------------------------------------------------------*/
function hasClass(el, className) {
	validate( isElement(el), '첫번째 전달인자는 DOM 요소노드여야만 합니다.');
	validate( isString(className), '두번째 전달인자 값은 문자여야 합니다.');
//클래스 값(문자열)을 가져와서 구분해야한다.
//split(' ') 공백으로 구분 하면 클래스 이름으로 배열을 만든다.
	// var classList = el.getAttribute('class');
	var classList = attr(el, 'class');
	classList = (classList || '').split(' ');//classList덮어씀.
//null 경우도 있으니 빈문자열로 처리하면 나눌게 없으니 아무값도 안만든다.

	for(var i=classList.length-1; i>-1; i--) {
		if ( classList[i] === className ) {
			return true;
		}
	}
	return false;
}


/** ----------------------------------------------------------------------
 * addClass() 함수
 * addClass(el, className)
 * ---------------------------------------------------------------------*/
function addClass(el, className) {
	validate(isElement(el), '첫번째 전달인자는 DOM요소노드 여야만 합니다.')
	validate(isString(className), '두번쨰 전달인자 값은 문자여야 합니다.')

	if ( !hasClass(el, className) ) {//있는지 확인
		var oldClasses = el.getAttribute('class') || '';
		el.setAttribute( 'class', (oldClasses +' ' +className).trim() );
	}//.trim() 양쪽 빈 공간을 잘라냄. ECMA5 크로스브라우징 안됨.
}


/**----------------------------------------------------------------------
 * removeClass() 함수
 * removeClass(el, className)
 * ----------------------------------------------------------------------*/
function removeClass(el, className) {
 	validate( isElement(el), '첫번째 전달인자는 DOM 요소노드여야만 합니다.' );
 	validate( isString(className), '두번째 전달인자 값은 문자여야만 합니다.' );
 
 	if ( hasClass(el, className) ) {
 		var changeValue = attr(el, 'class').replace(className, '').trim();
 		attr(el, 'class', changeValue);
 	}
 }

/**----------------------------------------------------------------------
 * toggleClass() 함수
 * toggleClass(el, className)
 * ---------------------------------------------------------------------*/
function toggleClass(el, className) {
	hasClass(el, className) ? 
		removeClass(el,className) : 
		addClass(el, className);
}


/**
 * ----------------------------------------------------------------------
 * radioClass() 함수
 * radioClass(el, className)  
 * 해당요소의 형재들로부터 className을 제거하고 자기자신에게 붙이는 것.
 * el 부모의 형제들을 찾아서 형제들중에 on이 있으면 제거 시키고 나한테만 붙이는것.
 * ----------------------------------------------------------------------*/
function radioClass(el, className) {
	var parent = el.parentNode,
		target = children(parent, '.'+className);
	if (target) {
		removeClass(target, className);
	}
	addClass(el, className);
}

/** ----------------------------------------------------------------------
 * attr() - getAttribute|setAttribute
 * attr(el, key)        // GET
 * attr(el, key, value) // SET
 * ------------------------------------------------------------------- */
function attr(el, prop, value) {
	validate(isElement(el), '첫번째 인자는 요소노드여야 함.');
	validate(isString(prop), '두번째 인자는 문자여야 함.');
	if (!value) {
		return el.getAttribute(prop);
	}else{
		el.setAttribute(prop, value);
	}
}


/** ----------------------------------------------------------------------
 * getStyle(설정된 스타일 속성) 함수
 * ----------------------------------------------------------------------*/
function getStyle(el, prop) { // (문서객체 , 문서객체의 속성)
	if (window.getComputedStyle) {
		return window.getComputedStyle(el)[prop]; //계산된 스타일 값 가져오기
	} else {
		return el.currentStyle[prop];	//. = []
	}
}


/**
 * ======================================================================
 * 유틸리티(Utility)
 * ======================================================================
 */

/**--------------------------------
 * CSS3 신기능을 검수하는 헬퍼함수
 * --------------------------------*/
function checkCSS3Feature (feature) {
	//DOM에 접근 하는것은 비용이 많이 든다. 느려진다. 
	//반복 사용하는 것은 변수를 선언 캐시해서 사용.
		var html = $('html'),
			body = $('body'),
			// html_old_class = html.getAttribute('class');
			html_old_class = attr(html,'class');
	if ( feature in body.style ) {
		// 조건이 참이면 실행되는 결과
		// html.setAttribute('class', html_old_class + ' ' + feature);
		// attr(html,'class', html_old_class + ' ' + feature);
		addClass(html, feature);
	} else {
		// 조건이 거짓이면 실행되는 결과
		// html.setAttribute('class', html_old_class + ' ' + 'no-'+feature);
		// attr(html,'class', html_old_class + ' ' + 'no-'+feature);
		addClass(html, 'no-'+feature);
	}
}

/** ----------------------------------------------------------------------
 * 브라우저 식별자로 대상을 구분하는 헬퍼함수
 * ----------------------------------------------------------------------*/

function checkUserAgent(device_name/*, class_name*/) {
	var userAgent = navigator.userAgent.toLowerCase(),
		html      = $('html');

	if ( userAgent.indexOf(device_name) > -1 ) {
		var html_old_class = attr(html, 'class');
		// html.setAttribute('class', html_old_class + ' ' + device_name);
		addClass(html, /*class_name ||*/ device_name);
	}
}

/**--------------------------------
 * 유효성 검사 헬퍼 함수 - true/false 리턴
 * isNumber()
 * isString()
 * isBoolean()
 * isFunction()
 * isArray()
 * isObject()
 * --------------------------------*/
function isNumber(num) {
	return typeof num === 'number';
}
function isString(str) {
	return typeof str === 'string';
}
function isBoolean(boo) {
	return typeof boo === 'boolean';
}
function isFunction(fnc) {
	return typeof fnc === 'function';
}
function isArray(arr) {
	return !isObject(arr);
}
function isObject(obj) {
	return typeof obj === 'object' && !obj.push;
}								//배열 속성으로 확인.


/**--------------------------------
 * isElement() 헬퍼 함수
 * isNodeList() 헬퍼 함수
 * 요소노드인지, 노드리스트인지 파악하는 함수
 * --------------------------------*/
function isElement(el) {
	return el ? el.nodeType === 1 : false;
// 노드의 유형(Node Type)
// ElementNode - 1  , AttributeNode - 2  , TextNode - 3
}
function isNodeList(list) {
	return !!(list && list.length > 0 && list.item);
}// 조건 a , b , c 가 묶어서 형변환. !! 는 boolean 으로 형태를 바꿈.
//ex) !!(9) 는 0이 아니면 true 반환. 0이면 false.
//원래값이 참/거짓 인지 알아보는 용도. Boolean 함수 대용으로 사용.


/**--------------------------------
 * validate() 입증, 확인. 
 * 전달인자 [ 조건, 오류메시지 ]
 * --------------------------------*/
function validate(condition, error_msg) {
	if(typeof condition !== 'undefined' && !condition) {
		throw new TypeError(error_msg);
		// console.error(error_msg)
		// return; // 함수 종료
	}
}


