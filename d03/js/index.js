// 문서 내에서 루트 요소를 찾고자 한다.
var rootElement = document.documentElement;
// var head = rootElement.firstChild;  //상대적인 값을 잘 쓰지 않는다.다르게 나올수 있으니
// firstChild, lastChild 로 접근하는 것은 노드로 접근 하는 것.
// 요소로 접근하는 게 아니다. 그래서 상대적인 값은 거의 안쓴다. 
var dom0head = document.head; // HTML DOM v0
var dom1head = document.getElementsByTagName('head')[0]; // DOM v1 단축 표기 활용

// console.log('dom0head = ', dom0head);
// console.log('dom1head = ', dom1head);

var body = rootElement.lastChild;
// console.log(rootElement, head, body);

var app = document.getElementById('app');
// console.log(app);

/**
 * --------------------------------
 * 노드의 유형(Node Type)
 * ElementNode   - 1
 * AttributeNode - 2
 * TextNode      - 3
 * --------------------------------
 */

var app_firstChild = app.firstChild; // Node Type 노드의 유형?
// console.log(app_firstChild.nodeType); // 텍스트 노드의 유형 값은???3

/**
 * -----------------------------------------------------
 * 개발자가 CSS 디자이너에게 class 속성을 사용하지 말길 요구한 이유는?
 * 못 가져오는 것이 아니라, 가져오기 귀찮거나 방법을 모르는 것일 뿐.
 * -----------------------------------------------------
 */

// #app
// #app article
var articles = app.getElementsByTagName('article');
// console.log(articles);//[article.post, article.post, article.post, article]

var posts = app.getElementsByClassName('post'); // IE 9+ 그래서 개발자들이 class말고 id 붙여서 가지고 온다
// console.log(posts);//article.post, article.post, article.post]

// 원하는 대상(span.target)을 찾는 코드
var first_target  = posts[0].getElementsByClassName('target')[0];
var second_target = posts[1].getElementsByClassName('target')[0];

// 요소노드의 첫번째 자식노드(텍스트노드)의 노드 값을 출력
// console.log(first_target.firstChild.nodeValue);

// 1. 대상 선택( 선택자로 대상을 선택하고)
// 2. 대상 조작( 선언 구문 내에서 대상을 꾸밉니다.)
// 3. 언제? 조작을 할 것인가?
first_target.onmouseenter = function() {// 타겟에 마우스 진입시.   
	this.className = 'first-target';
};

first_target.onclick = function() {
		// 클릭이벤트 후 인라인 스타일을 동적으로 추가. 동적 추가는 js
	this.style.cssText = 'color:#468966; position:absolute; top:0; right:0; z-index:10000;';
		//  한줄로 만드는게 좋다. 반복된 호출을 줄이니깐
	// this.style.color    = '#468966';
	// this.style.position = 'absolute';
	// this.style.top      = '0px';
	// this.style.right    = '0px';
	// this.style.zIndex   = '10000';
};

second_target.onclick = function() {
	this.style.backgroundColor = '#FE4940';
	this.style.color = '#fff';
};