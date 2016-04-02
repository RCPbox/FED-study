
// var counter = 0;

// setInterval(function() {
// 	var result = counter++ % 5;
// 	console.log(result);
// }, 500);


// document.onclick = function () {
// 	this.onclick = null; //한번만 발생하는 이벤트.
// 	console.log(this);
// }
// 제이쿼리도 oneEvent 가 있다. 한번 작동하고 더이상 작동하지 않는

// function callme() {
// 	console.info('fefefe');
// 	console.warn('ddddd');
// }

// function me() {
// 	console.log(this+' fnc_in');
// }

//객체의 멤버로서 함수가 사용되면 this는 객체를 가리킨다.
// document.onclick = me; //()안붙여야 클릭할때 실행. 
// 여기서this는 document

// document.onclick = me();//클릭전에 실행해서 window.me() 나 마찬가지.
// 여기서 this 는 window.

// var ten = { 'me':me };
// ten.me();// this는 자신이 누구의 멤버로 소속되서 실행되는가. 어느 context에서 실행되는가 그때마다 달라질 수 밖에 없다.

