
/**
 * --------------------------------
 * Function Object Methods
 * function() {}
 * new Function()
 * Function.prototype.call
 * Function.prototype.apply
 * Function.prototype.bind
 * --------------------------------
 */

function fn() {
	console.log(this);
}

var obj = {};
obj.m = fn;
// obj.m();//this는 obj 자신을 가리킨다.
//이렇게 객체의 멤버로 주더라도 this를 원하는 대상으로 설정할 수 있게 해주는것이 call 과 apply.

// document.power = obj.m;
//obj.m은 함수이고 이 함수를 power 에 담았다. power에는 함수가 담겨 있다.
// document.power(); // this 는 document.
//이처럼 함수는 누구나 쓸 수 있다. 그래서 다른언어는 oop 라고 하는데 JS는 object rink order object 다른 오브젝트에 있는 기능을 링크. 전통적인 class 기반의 상속과는 좀 다르다. 

// document.onclick = obj.m;

//obj.m 은 함수인데 이걸 실행할때 context를 바꾸고 싶다면
//obj.m.call(document);// document

//Function 이란 생성자에는 prototype 이란게 있고 그안에 call 이 있나?
// !!Function.prototype.call  //true

// call을 상속 받았기 때문에 모든 함수는 call 메소드를 가지고 있다.
// call 첫번째 인자가 context 설정. 너의 주인은 누구냐.

// 모든 function 객체의 원류격에 해당하는 prototype 이 가지고 있는 멤버는
// 얘로 부터 만들어진 모든 인스턴스는 다 그 능력을 가질 수 있다.

// 그러면 우리는 함수를 쓰면서 call , apply , bind 를 쓸 수 있다.
// call 역할은 context 를 임의로 지정하는 역할을 한다.

// obj.m.call(document);// document
// obj.m.call(document.head);// head

// 정리 obj 가 객체가 소유한 m 이란 프라퍼티는 전역의 fn함수를 참조하고 있다. 결과적으로 obj.m은 함수이다.
// 함수가 가지고 있는 기본적인 메소드중에 call 이 있다. 모든 함수가 가지고 있다.
// call을 사용하면 첫번째 전달인자에 context를 지정할 수 있다. 그럼 우리가 특정 일을 하면서 context를 바꿔서 처리할 수 있게 된다.

/**--------------------------------------------------------------------*/

// 뭘 던질지 모를때. 던지는 값들 각각 데이터형이 다르다. 
// 만약 숫자,문자,논리 라면 순서가 어떻든 상관없다. 
// 던졌을때 형만 가지고 체크해서 거기에 맞는 데이터를 넣어줄 수 있다. 
// 그래서 반드시 함수에 전달인자가 없는 함수도 있을수 있다.
// 기억할점은 함수내에는 반드시 arguments 가 만들어 지는데 
// arguments 는 전달된 인자들에 대한 집합. 즉 배열과 유사한 형태의 유사배열.
function showTime() {
	// arguments

	console.log(arguments);

	arguments[0] = true;// 설정이 가능함.

	console.log('arguments.push??? => ', !!arguments.push);//배열인지 확인. false

	var i = 0, l = arguments.length;
	for(; i<l; i++) {
		console.log(arguments[i]);
	}

	// console.log(who, when, where, how, what);
}

// showTime(4, 3, '해와달');

/**--------------------------------------------------------------------*/

/**
 * 자바스크립트 위임(Delegation)
 * ---------------------------------------------
 * 다른 객체(Array)의 멤버(push)를 위임해서 가져다
 * 유사배열(arguments 또는 NodeList)에 사용할 수 있다.
 */

//배열이 아닌것을 받아서 배열로 만드는 함수.
function makeArray(pseudo_arr) {//가짜_arr
	// 유효성 검사
	// if ( pseudo_arr.length === undefined ) { return; }
	if ( !pseudo_arr.length && pseudo_arr.length !== 0 ) {
		return console.error('유사 배열 또는 문자열을 인자로 전달해야 합니다.');
	}
	// Array.prototype 객체의 slice() 메소드를 빌려(위임) 사용함.
	// slice() 메소드는 함수이기 때문에 .call() 메소드를 사용할 수 있어
	// 실행 컨텍스트를 다른 대상으로 교체할 수 있기에 가능한 처리.
	// return Array.prototype.slice.call(pseudo_arr);

	// [] 배열 인스턴스는 Array.prototype의 능력을 모두 가지고 있기에
	// Array.prototype 대신 []을 사용하여도 됨. Array prototype 은 결국 인스턴스를 가리킨다.
	return [].slice.call(pseudo_arr);//배열처럼 쓰기 위해서 배열화 시킴.
}
// array의 모든 능력은 prototype에 있다. slice 도 있다. 이걸 이용하면 배열화 할수있다.
// 결과적으로 Array.prototype.slice 는 Array prototype 이 가지고있는 slice 이기 때문에 배열만 사용할 수 있다.
//그런데 결과적으로 slice는 함수다. 함수는 call, bind, apply 쓸수 있다고 했다.
//call 첫번째 인자로 this 객체를 바꿀수 있다. 
//그럼 얘는 원래 배열만 받아서 할수 있는데 배열 대신 다른 선택지를 적용해 준다.
//그럼 배열 처럼 쓸수 있게 바꾼다.

// 배열화 하기 위해서 array 라는 생성자에 연결되어있는 prototype 객체가 가지고 있는
// 멤버중에 slice 라는 기능을 빌려와서 쓴다는것.
// 그렇게 되면 배열이 아닌것을 배열화 할 수 있다.

// makeArray는 문자열도 가능하다.
// string 에도 length 가 있기에 단어가 배열화 된다. 그래서 유사배열이나 문자열 모두 처리 된다.

/**--------------------------------------------------------------------*/

// 객체 복제 및 덮어쓰기 헬퍼 함수. obj1 복사될것. obj2 복사 할거.
function override(obj1, obj2) {
	for (var key in obj2) {
		obj1[key] = obj2[key];
	}
	return obj1;
}

// bind 는 연결 시킨다는 의미. (fn 함수, owner 는 this로 쓰고 싶은 객체.)
function bind(fn, owner) {
	return function() {
		fn.apply(owner, arguments);// fn함수의 this 객체를 owner 객체로 설정 해줘 라는 역할.
	}
}// 함수에서 함수를 리턴하는것은 네이티브bine 함수 따라하기 위해서.


// draw() 함수
function draw(user, callback) {
	//privity 숨겨진 변수.
	var id = Math.round(Math.random() * 10);//반올림. 지역변수 캡슐화.

	// 함수 기본값 설정 객체.
	var defaults = {
		'where' : '화실',
		'how'   : '핸드 드로잉으로',
		'who'   : '나'
	};

	// 설정 객체 config 정의.
	var config = (user && user.constructor === Object) ?
					override(defaults, user) : defaults; 
					// 초기화 객체에 전달값 덮어쓰기.

	// 문장 작성
	var sentence = config.who +'은(는) ' + config.where + '에서 ' + config.how + ' 그림을 그립니다.';

	if ( config.finished && config.finished.constructor === Function) {
		config.finished();
	}

	if (callback && typeof callback === 'function') {
		// callback(); // this === window

		callback.call(config, sentence, id); // this === config
							// 콜백에 넘길 데이터.
		callback.apply(config, [sentence, id]); // this === config
	}

	return sentence;
}

var user_settings = {
	'where'    : '화장실',
	// 'how'      : '물 묻혀서 손으로',
	// 'who'      : '당신',
	// 'finished' : function() {
	// 	console.log(this, '\n\n모든 일을 완료하였습니다.'); //객체내의 함수라 this는 객체를 가리킴.
	// }
}


// draw() 함수에 객체 리터럴 사용자 정의 설정 전달
draw(user_settings, function(sentence, id) {
	console.log(this, sentence);
	sentence += '♥';
	console.log(sentence, id);
});



