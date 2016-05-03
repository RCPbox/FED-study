( function(global){

	/**
	* ======================================================================
	 * 생성(Creating)
	 * ======================================================================
	 */
	// 요소노드 생성
	// var page = document.createElement('div'); // <div>

	// 생성한 요소에 속성 추가 set
	// attr(page, 'id', 'page');
	// attr(page, 'class', 'page');
	// attr(page, 'title', '페이지 요소');
	// attr(page, 'data-ui-element', true);
	// html5에서 data 접두사를 통해서 개발자가 원하는 임의의 속성을 만들수 있다.

	// get
	// console.log(attr(page, 'id'));
	// console.log(attr(page, 'class'));
	// console.log(attr(page, 'title'));
	// console.log(attr(page, 'data-ui-element')); 

	function createEl(elName) {
		validate(isString(elName), '문자열을 넣어주셔야 합니다.');
		return document.createElement(elName);
	}
	//document.createElement('div')
	// <div>​</div>​ 생성이 되지만 문서 어디에도 붙지 않는다. 문서 밖에 있는 상황
	// 요소 만들었으나 누구도 참조하고 있지 않은 상황 그래서 만드는 즉시 날라간다.
	// 만듬과 동시에 참조해야 한다.

	function createText(content) {// text content
		validate(isString(content), '문자열을 넣어주셔야 합니다.');
		return document.createTextNode(content);
	}

	/**
	* ======================================================================
	* 삽입(Inserting) 또는 이동(Moving)
	* ======================================================================
	*/
	// 삽입.
	function append(parent, child) {
		validate(isElement(parent) && (isElement(child) || isTextNode(child) ), '전달인자는 모두 DOM 요소노드여야 합니다.');
		parent.appendChild(child);
	//.appendChild()
	//- 부모페이지에 자식을 붙이는데 끝에 마지막 자식 요소 노드로 추가 하겠다.
	}

	// 부모의 첫번째 자식을 찾아 그 앞에 삽입한다.
	function prepend(parent, child) {
		validate(isElement(parent) && (isElement(child) || isTextNode(child) ), '전달인자는 모두 DOM 요소노드여야 합니다.');
		var firstEl = first(parent, '*');
		if (firstEl.length === 0) {// 요소가 하나도 없는경우.
			append(parent, child);
		} else {
			before(firstEl, child);
		}
	}

				//목표노드 , 삽입할노드[새로운노드]
	function before(target, insert) {
	//반드시 목표노드의 부모노드여야 한다.
		parent(target).insertBefore(insert, target);//두개의 인자. 첫번째 를 두번째에 붙여라.
								//삽입할노드, 목표노드
		return insert;
	}// 상대적으로 쓰면 목표노드.부모노드
	// 삽입할 노드를 던지고 타겟노드를 던지면 내부에서는 타겟노드의 부모에다가 insertBefore 하기 때문에 정상적으로 타겟노드앞에 삽입노드가 추가된다는 개념.
	// 결과적으로 타겟은 parent node 가 되어야 한다.

	function insertBefore(insert, target) {
		return before(target, insert);
	}


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
		context = context || document;
		//조건처리 유효성 검사.
		// validate(조건, 조건이 참이면 에러를 띄우는)
		validate( isString(selector), '첫번째 전달인자는 문자열이어야 합니다.' );
		validate( context && (isElement(context) || context === document), '두번째 전달인자는 DOM 객체(요소노드)이어야 합니다.' );
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

		var nodeList = context.querySelectorAll(selector),
			nodeList_length = nodeList.length;
		// if (nodeList.length === 1) {
		// 	return nodeList[0];
		// }
		// return nodeList;
		return nodeList_length === 1 ? nodeList[0] : nodeList;
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
		if (!childEl_len) { return childEl; }
		
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

	/** ------------------------------------------------
	 * first() - 전달된 요소노드의 첫번째 자손 요소 반환
	 * last()  - 전달된 요소노드의 마지막 자손 요소 반환
	 * -------------------------------------------------*/
	 function first(parent, selector) {
	 	// return $(selector, parent)[0];// 한개만 있다면 노드리스트가 아니라 노드를 반환하기에 index가 없어서 undefind가 뜬다.

	 	var firstEl = $(selector, parent);
	 	return firstEl.length > 0 ? firstEl[0] : firstEl;
	 }
	//부모 노드를 던지고 선택자 표현식
	function last(parent, selector) {
		var childs     = $(selector, parent),
			childs_len = childs.length;
		return childs_len > 0 ? childs[ childs_len - 1 ] : childs;
	}

	/**--------------------------------
	* prev()
	* 이전 형제 요소노드 반환
	* next()
	* 다음 형제 요소노드 반환
	* --------------------------------*/
	function prev(el) {
		// 유효성 검사
		validate(isElement(el), 'DOM 요소노드를 전달해야 합니다.');
		// IE 9+ 브라우저 신 기능 지원유무 확인 후 대상 반환
		if (el.previousElementSibling) { return el.previousElementSibling; }

		// IE 8- 브라우저에서 적용 가능한 크로스 브라우징 기능 구현
		do {
			el = el.previousSibling;
		} while (el && el.nodeType !== 1);//대상이 맞는지에 대해 파악하는걸로 반복순환.
		return el;
	}

	function next(el) {
		validate(isElement(el), 'DOM 요소노드를 전달해야 합니다.');
		if (el.nextElementSibling) { return el.nextElementSibling; }
		do { el = el.nextSibling; }
		while (el && el.nodeType !== 1);
		return el;
	}


	/**--------------------------------
	* parent(el, upper)   upper - 몇번째 부모인지 숫자
	* 전달된 요소노드 인자의 부모요소노드 를 반환
	* --------------------------------*/
	function parent(el, upper) {
		// upper 초기화 및 덮어쓰기
		upper = upper || 1;
		//유효성 검사
		validate(isElement(el), '첫번째 전달인자는 DOM 요소노드를 전달해야 합니다.');
		validate(isNumber(upper), '두번째 전달인자는 숫자를 전달해야 합니다.');
		//반복적으로 부모 요소노드를 찾음
		do{
			if ( el === null) { return null; }
			el = el.parentNode;
		} while (--upper);
		//찾은 요소 노드를 반환
		//요소노드가 아닐 경우, null 반환
		return el.nodeType === 1 ? el : null;
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
			var oldClasses = attr(el, 'class') || '';
			el.setAttribute( 'class', (oldClasses + ' ' + className).trim() );
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
	 		removeClass(el, className) :
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
		// validate(isString(prop), '두번째 인자는 문자여야 함.');

		if( isObject(prop) ) {
			each( prop, function(key, value) {
				el.setAttribute(key, value);
			} );
		} else if( !value && value !== '' ) {
			return el.getAttribute(prop);
		} else {
			el.setAttribute(prop, value);
		}
	}

	/** ----------------------------------------------------------------------
	 * getStyle(설정된 스타일 속성) 함수
	 * ----------------------------------------------------------------------*/
	/*
	function getStyle(el, prop) { // (문서객체 , 문서객체의 속성)
		if (window.getComputedStyle) {//함수 실행시마다 확인할 필요가 있을까?
			// W3C 표준 방식, IE 9+
			return window.getComputedStyle(el)[prop]; //계산된 스타일 값 가져오기
			//뒤에 []넣은건 외부에서 전달받은 property 값은 문자열. 
			//문자열 데이터로 들어오려면 변수처리가 되어야 하기 때문에[] 감싼다.
		} else {
			// MS전용 비표준 속성, IE 8-
			return el.currentStyle[prop];	//. = []
		}//el의 현재 활성화된 스타일의 property 값을 가져다 return 시켜달라.
	}
	*/
	var getStyle;// 불러온 다움에 나중에 호출 하는거라 호이스팅 문제 없음.
	if ( window.getComputedStyle ) {// js 로딩시 한번 검사.
		// W3C 표준 방식, IE 9+ 
		getStyle = function(el, prop) {// getStyle에 함수할당.
			// (문서객체 , 문서객체의 속성)
			return window.getComputedStyle(el)[prop];//. = []
		}				//계산된 스타일 값 가져오기
	} else {
		// MS전용 비표준 속성, IE 8-
		getStyle = function(el, prop) {// getStyle에 함수할당.
			return el.currentStyle[prop];//. = []
		}
	}

	/** --------------------------------
	 * setStyle(스타일 속성 설정) 함수
	 * ---------------------------------
	 */
	function setStyle(el, prop, value) {//value 설정할 값
		if ( prop.match(':') ) {
			el.style.cssText = prop;//직접 값을 입력하는 방식.
		} else {
			el.style[prop] = value;
		}
	}

	/**--------------------------------
	 * 하나의 이름으로 getStyle()/setStyle() 모두 사용.
	 * --------------------------------
	 */
	function css(el, prop, value) {
		// 유효성 검사
		validate( isElement(el), '첫번째 인자는 요소노드여야 함.' );
		validate( isString(prop), '두번째 인자는 문자여야 함.' );
		// SET
		if( value || prop.match(':') ) { setStyle(el, prop, value); }
		// GET
		else { return getStyle(el, prop); }
	}

	/**--------------------------------
	 * text() 함수. parent요소에 content 삽입.
	 * --------------------------------*/
	function text(parent, content) {
		var method = parent.textContent ? 'textContent' : 'innerText';
		parent[method] = content;
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

	/** ---------------------------------------------------------
	 * 브라우저 식별자로 대상을 구분하는 헬퍼함수.
	 * 넘기는 문자열을 비교해서 있으면 html 요소에 클래스 붙이는.
	 * ----------------------------------------------------------*/
	function checkUserAgent(device_name, class_name) {
		var userAgent = navigator.userAgent.toLowerCase(),
			html      = $('html');

		if ( userAgent.indexOf(device_name) > -1 ) {
			// var html_old_class = attr(html, 'class');
			// html.setAttribute('class', html_old_class + ' ' + device_name);
			addClass(html, class_name || device_name);
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
	// data 데이터형, type 문자열로 타입을 확인
	// ex)어떤 데이터를 받는데 object 냐 물어보면 true/false 가 나오는.
	function is(data, type) {

		validate(isString(type), '두번째 인자 값은 문자열을 사용해야 합니다.');

		switch( data.constructor ) {
			case Number:
				return type === 'number' || type === 'num';
			break;
			case String:
				return type === 'string' || type === 'str';
			break;
			case Boolean:
				return type === 'boolean' || type === 'boo';
			break;
			case Function:
				return type === 'function' || type === 'fnc';
			break;
			case Array:
				return type === 'array' || type === 'arr';
			break;
			case Object:
				return type === 'object' || type === 'obj';
		}
	}

	function isNumber(num) {
		return typeof num === 'number';
	}
	// function isNumber(num) { return is(num,'number'); }

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
	function isTextNode(txt) {
		return txt ? txt.nodeType === 3 : false;
	}
	function isNodeList(list) {
		return !!(list && list.length > 0 && list.item);
	}// 조건 a , b , c 가 묶어서 형변환. !! 는 boolean 으로 형태를 바꿈.
	//ex) !!(9) 는 0이 아니면 true 반환. 0이면 false.
	//원래값이 참/거짓 인지 알아보는 용도. Boolean 함수 대용으로 사용.


	/**--------------------------------
	 * validate() 입증, 확인. 
	 * 전달인자 [ 조건, 오류메시지 ] 
	 * 조건값이 true면 넘어가고 false 가 되면 Error 출력하게 되고 
	 * 함수를 멈추게 된다.
	 * --------------------------------*/
	function validate(condition, error_msg) {
		if ( condition === undefined || condition === null ) {
			condition = false;
		} else if( !condition && condition !== 0 && condition !== '' ) {
			throw new TypeError(error_msg);
			// console.error(error_msg)
			// return; // 함수 종료
		}
	}

	/** --------------------------------
	 * override()
	 * 객체 A에 객체 B의 멤버를 복제
	 * 동일한 멤버가 있을 경우 덮어씀(Override)
	 * --------------------------------*/
	function override(obj1, obj2) {
		for( var key in obj2 ) {
			obj1[key] = obj2[key];
		}
		return obj1;
	}

	/**--------------------------------
	 * makeArray()
	 * 유사배열을 배열로 변경하여 반환하는 함수
	 * --------------------------------
	 */
	function makeArray(like_arr_obj) {
		validate( like_arr_obj.length, '유사배열 또는 문자열을 인자로 설정해주세요.' );
		// return Array.prototype.slice.call(like_arr_obj);
		return [].slice.call(like_arr_obj);
	}
	/** https://github.com/RCPbox/FED-study/blob/master/d08/js/function-methods.js
	 * 자바스크립트 위임(Delegation)
	 * ---------------------------------------------
	 * 다른 객체(Array)의 멤버(push)를 위임해서 가져다
	 * 유사배열(arguments 또는 NodeList)에 사용할 수 있다. */


	/** --------------------------------
	 * each()
	 * --------------------------------
	 */
	//사용 예시
	//달라 함수 이용해서 노드 수집. makeArray 배열만들고. each문 사용해서 개별적으로 뭔가 css함수로 스타일을 지정.
	// each( makeArray( $('#app *') ), function(item, index) {
	// 	css( item, 'width: '+100*(index+2)+'px' );
	// } );

	// each 함수에 첫번째 데이타(array)를 전달. 두번째 콜백함수 받게된다.
	var each;

	if (Array.prototype.forEach) {//최신브라우저 인지 확인.
		each = function( data, fn ) {// ECMA5부터 배열의 forEach 등장. IE9+
			validate( isFunction(fn), '두번째 전달인자는 함수여야 합니다.' );
			if ( isArray(data) ) {
				data.forEach(fn);
			} else if (isObject(data)) {
				for ( var key in data ) {
					var value = data[key];
					fn.call(global.y9, key, value);
				}
			}
		};
	}else{
		each = function( data, fn) {
/*			validate( isArray(data), '첫번째 전달인자는 배열이어야 합니다.' );
			validate( isFunction(fn), '두번째 전달인자는 함수여야 합니다.' );
			for (var i = 0, l=data.length; i < l; i++) {
				var item = data[i],
					index = i;
	//이렇게 넘긴다는 규칙 정의. 네이티브forEach와 같게 보이기 위해서 이렇게 한것.
				fn.call(null, item, index, data);//fn콜백함수 전달인자에 넘기는 값.
			}		// null 이면 윈도우 가리킴.
		//fn 함수가 실행될때 this context는 window 되라. 첫번째 인자 item은 반복문이 수행될때 즉,함수가 수행되게 되면 배열을 던질껀데 그럼 배열의 총 갯수가 나오고 그만큼 카운팅 반복 할 것이고 , 각 원소에 접근한다. 그렇게 약속된 값을 전달 사용 한다.*/
			validate( isFunction(fn), '두번째 전달인자는 함수여야 합니다.' );
			if ( isArray(data) ) {
				for( var i=0, l=data.length; i<l; i++ ) {
					var item  = data[i],
						index = i;
					fn.call(null, item, index, data);
				}
			} else if (isObject(data)) {
				for( var key in data ){
						var value = data[key]; 
						fn.call(global.y9, key, value);
//객체경우 라이브러리 전달시켜서 그 내부에서 라이브러리 코드를 사용할 수 있게 한것.
//jquery 도 함수 내부에서 this는 항상 jQuery 인스턴스가 되게 된다.
//라이브러리 만드는 패턴.
//call은 전달된 함수의 인자값을 셋팅한다.
				}
			}
		};
	}

	// 외부에서 접근가능한 객체 설정
	global.y9 = global.yamoo9 ={
		// 생성(Creating)
		createEl         : createEl,
		createText       : createText,

		// 삽입(Inserting) 또는 이동(Moving)
		append           : append,
		prepend          : prepend,
		before           : before,
		insertBefore     : insertBefore,

		// 선택(Selecting) | 탐색(Traversing)
		$                : $,
		find             : find,
		children         : children,
		first            : first,
		last             : last,
		prev             : prev,
		next             : next,
		parent           : parent,

		// 조작(Manipulation)
		css              : css,
		attr             : attr,
		text             : text,
		hasClass         : hasClass,
		addClass         : addClass,
		removeClass      : removeClass,
		toggleClass      : toggleClass,
		radioClass       : radioClass,

		// 감지(Detection)
		checkCSS3Feature : checkCSS3Feature,
		checkUserAgent   : checkUserAgent,

		// 유틸리티(Utility)
		validate         : validate,
		isNumber         : isNumber,
		isString         : isString,
		isBoolean        : isBoolean,
		isFunction       : isFunction,
		isArray          : isArray,
		isObject         : isObject,
		isElement        : isElement,
		isTextNode       : isTextNode,
		isNodeList       : isNodeList,
		each             : each,
		makeArray        : makeArray,
		override         : override,
	};

} )(window);