
// hanwha 네임스페이스 객체의 model 속성(객체)에 모델을 생성하거나, 
// 모델 데이터를 추가, 또는 제거, 포함되었는지 확인, 
// 데이터를 가져오는 능력을 부여하는 방법을 공부해봤습니다.
(function(global){
	'use strict';

	// global.hanwha 객체가 없을 경우, 정의
	if (!global.hanwha) {
		Object.defineProperty(global, 'hanwha', { 'value': {} });
	}

	// global.hanwha.model 객체 정의
	Object.defineProperty(hanwha, 'model', {
		'value': (function() {

			// 감춰진 멤버
			var _database = {};

			// 반환된 객체는 클로저로 상위 스코프의 지역 변수를 참조할 수 있음.
			return {
				'DB': _database,
				'createModel': function(id, value) {
					//hanwha.model.createModel 멤버에서 바로 데이터를 등록할 수 있도록
					this.add(id, (value || []) );
				},
				'add': function(id, value) {
					if( typeof value !== 'object' ) { throw console.error('배열 또는 객체를 전달해야 합니다.') }
					if( value.constructor === Object ) {
						if (_database[id]) {
							_database[id].push(value);
						} else {
							_database[id] = [];
							_database[id].push(value);
						}
					} else {
						if (_database[id]) {
							_database[id] = _database[id].concat(value);
						} else {
							_database[id] = value;
						}
					}
				},
				'remove': function(id) {
					delete _database[id];
				},
				'contains': function(id) {
					return !!_database[id];
				},
				'get': function(id) {
					return this.DB[id];
				}
			};

		})()
	});

})(window);

// JS MVC 프레임워크중 벡본(뼈대) 이 있는데 _ 랑 jQuery 함께 사용.
// 각각의 컴포넌트마다 id를 설정하고 거기에 맞는 data , view , control 을 붙인다고 본다면 된다.