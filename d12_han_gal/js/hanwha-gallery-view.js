( function(global, model){
	'use strict';

	// 모델 데이터를 콘솔에 출력
	// console.log(model);
	
	// 모델 데이터 탐색 예시 코드
/*	for (var i = 0, l = model.length; i < l; i++) {
		var model_item = model[i];// 객체접근

		//특정원소 출력
		if (i === 3) {
			for( var key in model_item ){
				console.log('key : '+ key);
				console.log('value : '+ model_item[key]);
			}
		}
	}*/

	// 모델을 탐색한걸 순환해서 템플릿 코드를 만들고 붙여야 한다.
	// 가지고있는 데이터(model)을 붙이기 위한 템플릿 필요.
	// 먼저 어떻게 구조화 될지를 만들어본다. 
	// ul.hw-gallery-container>li.hw-gallery-item>img+h3.headline+p.summary

	// View를 붙이고자하는 요소 찾아....
	var gallery = document.querySelector('#hanwha-gallery');

	// wrapper, hw-gallery 클래스 모듈을 설정한다.
	gallery.setAttribute('class', 'wrapper hw-gallery');

	// 템플릿을 구현하는 함수 실행, 모델을 전달
	gallery.innerHTML = makeTemplateCode(model);



	/**
	 * 정해진 텍스트의 길이 이상되는 코드는 잘라버리고, 마지막에 ...을 붙여주는 함수
	 * @param  {String} text        텍스트
	 * @param  {Number} slice_count 자르고자 하는 단어 개수
	 * @return {String} 잘라버린 텍스트...
	 */
	function textElipsis(text, slice_count) {
		//초기값 설정.
		slice_count = slice_count || 5;
		
		var convert_text = text.split(' ');//문자를 공백을 통해 구분 해서 배열로 변환.
		if ( convert_text.length <= slice_count ) {
								//배열의 일부분을 잘라서 리턴 slice(시작, 종료)
			convert_text = convert_text.slice(0, slice_count).join(' ');
		} else {	//리턴된 배열을 join( ' ') 띄어쓰기로 조인. 배열을 문자열로 리턴
			convert_text = convert_text.slice(0, slice_count).join(' ') + '...';
		}
		return  convert_text;
	}

	/**
	 * 템플릿 코드를 완성하여 반환하는 함수
	 * @param  {Array}  모델(model) 데이터
	 * @return {String} 모델을 토대로 완성된 HTML 템플릿 코드 문자열
	 */
	function makeTemplateCode(model) {
		// 템플릿 코드를 접합할 초기 변수 template_code 선언
		var template_code = '';

		// 모델 데이터 반복 순환 처리하여 템플릿 코드 작성
		model.forEach(function(item, index) {
			template_code += '<li class="hw-gallery-item">';
			template_code += 	'<a href="'+ item.href +'">';
			template_code += 		'<img src="'+item.image+'" alt="">';
			template_code += 		'<h3 class="headline">'+textElipsis(item.headline, 10)+'</h3>';
			template_code += 		'<p class="summary">'+ textElipsis(item.summary, 14) +'</p>';
			template_code += 	'</a>';
			template_code += '</li>';
		});

		// 작성된 템플릿 코드 template_code의 앞/뒤에 <ul>, </ul> 문자열을 추가하여 반환
		return '<ul class="hw-gallery-container">'+template_code+'</ul>';
	}

// 	gallery.innerHTML = makePagenation(model) + gallery.innerHTML;

// 	/**
// 	 * 모델 데이터의 개수를 화면에 표시할 카운트로 나눈 결과를 토대로 페이지네이션 컴포넌트를 작성하는 함수.
// 	 * @param  {Array} model              모델데이터
// 	 * @param  {Number} display_item_count 화면에 표시할 아이템의 개수
// 	 * @return {String}                    동적으로 작성된 HTML 코드
// 	 */
// 	function makeTemplateCode(model, display_item_count) {
// 		// display_item_count의 초기 설정
// 		display_item_count = display_item_count || 3;

// 		// 필요한 정보를 토대로 make_count 값을 구성
// 		var total = model.length,
// 			make_count = Math.ceil(total/display_item_count);
// // 16/3 = 5.333..  15개만 출력 한개는 안나오게 된다. 그래서 올림함수(ceil)가 필요.

// 		// 만들어야 하는 페이지네이션 아이템 반복 처리
// 		for (var i = 0, page_nation_code=''; i < make_count; i++) {
// 			page_nation_code = '<a href role="button" aria-lable="'+(i+1)+'번째 슬라이드"></a>';
// 		}

// 		return '<div class="hw-gallery-pagenation">'+page_nation_code+'</div>';
// 	}
} )(window, window.hanwha_model);