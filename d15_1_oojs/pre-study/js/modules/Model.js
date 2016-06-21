function Model() {
	//외부에 공개되지 않은 멤버.
	var _database = [];

	Object.defineProperty(this, 'save', {
		'value': function(value) {
			_database.push(value);
		}
	});

	Object.defineProperty(this, 'database', {
		'get': function(){
			return _database;
		},
		// 'set': function(value) {
		// 	_database.push(value);
		// }
	});

}

