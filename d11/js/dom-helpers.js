
// 전역 영역(Global Scope)
// 변수를 명시적으로 선언하는 var 키워드
// 전역 변수는 어디에서나 접근/수정이 가능하다.
var dom = {}; // 오브젝트 리터럴(객체 값) 할당(대입)

/**
 * --------------------------------
 * 생성(Make, Create)
 * --------------------------------
 */
// 객체에 속성(Property, Attribute)을 설정(정의)
// 객체속성 중 함수 유형인 것을 특별하게 구분하여 메소드(Method)라 부른다.
dom.createEl = function(el_name) {
	// 함수의 연산 결과 값을 반환 :: return
	return document.createElement(el_name);//dom API에 있는 요소생성 방법.
};//함수값을 객체[dom]의 속성에 할당한 케이스.

dom.createText = function(text_content) {
	return document.createTextNode(text_content);
};
//객체의 멤버(속성)을 만들었다. 이들의 이름을 메소드라 한다.
//dom객체의 createEl메소드, dom객체의 createText메소드

//복습중. 
//영역이란 개념을 이젠 아니깐 dom이라는 네임스페이스 공간에
//속성으로 함수를 정의한것.

/**
 * --------------------------------
 * 조작(Manipulation)
 * - 삽입(Insertion)
 * --------------------------------
 */
dom.append = function(parent, child) {
	parent.appendChild(child);
};

// 전역공간이 아닌 dom 이란 객체에 포함된 멤버이기 때문에 함부로 충돌 되지 않는다.
// 그렇지만 누군가 값을 쉽게 바꿀수 있다.
// dom.append = 9; 하면 9출력.
// 그렇기에 캡슐화가 필요하다.

// js 일반객체형태로 라이브러리를 만들때 문제점 보았다.
// 별칭만 알고 별칭이 쉬우면 충돌날 확률이 크니깐.
