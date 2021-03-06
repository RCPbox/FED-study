/**
 * ---------------------------------------------------
 * 사용자 정의 객체 (다른 언어에서는 클래스(Class))
 * ---------------------------------------------------
 */

/**
 * 잠자는 아이 (객체)
 * --------------------------------
 */

// sleepingBaby 사용자 정의 객체를 정의
var sleepingBaby = new Object();

// 시작: 객체마다 개별적으로 수행되는 초기 실행 과정 ------------------
sleepingBaby.type = 'Baby';
sleepingBaby.self = sleepingBaby;// 업데이트 대비 초기화.
// 끝: 객체마다 개별적으로 수행되는 초기 실행 과정 -------------------


// 시작: 객체가 공통적으로 가지게 되는 공통 멤버(속성) 정의 ------------
sleepingBaby.current_state = 'sleep'; // 'awake'
// sleepingBaby.current_sleep_state = true; // false

sleepingBaby.isSleep = function() {
	return this.current_state === 'sleep';
};
sleepingBaby.awake = function() {
	this.current_state = 'awake';
};
sleepingBaby.sleep = function() {
	this.current_state = 'sleep';
};
sleepingBaby.cry = function() {
	this.current_state = 'Oops! '+ this.type +' is crying';
};
sleepingBaby.currentStatus = function() {						// 객체가 소유하고있는 멤버 재활용.
	return 'My '+ this.type +' is ' + this.current_state + '. ' + (this.isSleep() ? 'I\'m Happy. :-)' : 'I\'m Sad. :-(');
};
// sleepingBaby.updateFromCopyObj  수동적 업데이트 함수. 그래서 prototype을 쓰는 구나로 이해.
sleepingBaby.update = function(copy_obj) {
	this.self = copyObjectProperties(this, copy_obj, false);
};
// 끝: 객체가 공통적으로 가지게 되는 공통 멤버(속성) 정의 ------------

// 객체내에서 수행하는 멤버. 즉 함수가 실행될때 context 는 객체. 그래서 this는 객체를 가리키게된다.
// 객체내부에서 멤버인 메서드를 사용할때 this 는 객체 자신을 가리킨다.

/**
 * --------------------------------
 * 능력 복제
 * 복사/붙여넣기 ---> ?
 * 복사/붙여넣기 모듈화(재사용) ---> ?!!
 */

/**
 * 객체의 능력(속성)을 복제하는 헬퍼 함수
 * copyObjectProperties(객체1, 객체2, 모든 속성 복사 설정);
 * 객체2의 능력을 객체1에 복제
 */
function copyObjectProperties(assign_obj, target_obj, is_copy_all) {
	// assign_obj <---- (복사) ---- target_obj
	var prop;// forin 문 안 변수 호이스트 

	// 모든 능력을 복사할 것인가?
	// 아니면 없는 능력만 복사할 것인가?
	// 설정 옵션 초기 실행시, 처리
	is_copy_all = (typeof is_copy_all === 'undefined' || is_copy_all === true) ? true : false;
//is_copy_all 이 undefined 면 typeof 했을때 "undefined" 나옴.

	if (is_copy_all) {
		// 모든 속성을 복사
		for (prop in target_obj) {
			assign_obj[prop] = target_obj[prop];
		}
	} else {
		// 없는 속성만 복사
		// target_obj의 모든 능력을 assign_obj에 복사
		for (prop in target_obj) {
			// assign_obj가 이미 해당 능력을 가지고 있다면?
			// target_obj의 능력을 복사하고 싶지 않다.
			if ( !assign_obj[prop] ) {
				// console.log(prop, target_obj[prop]);
				assign_obj[prop] = target_obj[prop];
			}
		}
	}

	// 모든 능력 복사가 끝나면 적용 객체를 반환
	return assign_obj;
}



/**
 * 잠자는 강아지 (객체)
 * --------------------------------
 */

// // sleepingDog 사용자 정의 객체를 정의
// var sleepingDog = new Object();

// // sleepingDog 사용자 정의 객체의 멤버 구현
// sleepingDog.current_state = 'sleep'; // 'awake'
// // sleepingDog.current_sleep_state = true; // false
// sleepingDog.isSleep = function() {
// 	return this.current_state === 'sleep';
// };
// sleepingDog.awake = function() {
// 	this.current_state = 'awake';
// };
// sleepingDog.sleep = function() {
// 	this.current_state = 'sleep';
// };
// sleepingDog.cry = function() {
// 	this.current_state = 'Oops! Dog is crying.';
// };

var sleepingDog = {};
// 시작: 객체마다 개별적으로 수행되는 초기 실행 과정 ------------
sleepingDog.type = 'Dog';
sleepingDog.self = sleepingDog;
// 끝: 객체마다 개별적으로 수행되는 초기 실행 과정 --------------

// console.log(sleepingDog);

// 다른 객체의 멤버를 복사해서 새로운 객체에 할당
// sleepingDog.isSleep = sleepingBaby.isSleep;

// copyObjectProperties 헬퍼 함수를 사용하여
// 다른 객체의 멤버를 복사해서 새로운 객체에 할당

// sleepingBaby의 능력 복제(상속과 유사해보이나, 상속과는 다름)
// false 를 전달할 경우, 모든 능력을 그대로 복제하지 않고 존재하지 않는 능력만 복제
sleepingDog = copyObjectProperties(sleepingDog, sleepingBaby, false);
// console.log(sleepingDog);


/**
 * 잠자는 고양이 (객체)
 * --------------------------------
 */

// // sleepingCat 사용자 정의 객체를 정의
// var sleepingCat = new Object();

// // sleepingCat 사용자 정의 객체의 멤버 구현
// sleepingCat.current_state = 'sleep'; // 'awake'
// // sleepingCat.current_sleep_state = true; // false
// sleepingCat.isSleep = function() {
// 	return this.current_state === 'sleep';
// };
// sleepingCat.awake = function() {
// 	this.current_state = 'awake';
// };
// sleepingCat.sleep = function() {
// 	this.current_state = 'sleep';
// };
// sleepingCat.cry = function() {
// 	this.current_state = 'Oops! Cat is crying.';
// };

var sleepingCat = {};
// 시작: 객체마다 개별적으로 수행되는 초기 실행 과정 ------------
sleepingCat.type = 'Cat';
sleepingCat.self = sleepingCat;
// 끝: 객체마다 개별적으로 수행되는 초기 실행 과정 --------------

// sleepingBaby의 능력 복제(상속과 유사해보이나, 상속과는 다름)
// false 를 전달할 경우, 모든 능력을 그대로 복제하지 않고 존재하지 않는 능력만 복제
sleepingCat = copyObjectProperties(sleepingCat, sleepingDog, false);
// console.log(sleepingCat);


// 단점은 업데이트가 안된다는것.
// ex) sleepingBaby에 런타임 중에 새로운 능력을 추가 했다. 그런데 다른애들은 복사 하지 않았기 때문에 쓸 수 없다.
// 일일이 복사를 해야 한다.