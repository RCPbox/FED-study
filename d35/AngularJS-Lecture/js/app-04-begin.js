
( function(global, angular, undefined){
	'use strict';
	// 모듈 정의.             //data-ng-app 의 이름과 같아야 바인딩이 된다.
	var angularRefApp = angular.module('angularRefApp', []); /*디펜던시는 없다. 라우터나 애니메이션등 앵귤러 다양한 모듈러 추가 가능.*/
	// console.log(angular.version.full);
	// console.log(app);
	
	//첫번째 모듈 컨트롤러 연결.
	//모듈 컨트롤러에서는 데이터바인딩에 대해서 준비하게 된다.
	angularRefApp.controller('h1Controller', function ($scope){
		// 이 콘트롤러에 대한 home 이라는 속성을 정의.
		// this.home='AngularJS Home';// 버전업이 되서 안되는듯?
		// console.log(this);// this는 해당 컨트롤러를 가리킴.
		$scope.home = 'AngularJS Home';
		// $scope 는 객체인데 controller 내부에 이부분을 지칭하게 된다. 
		// 이 안에서만 home을 그냥 쓸 수 있다.
	});

	// 최신방식으로 사용 하는 방식. 배열데이터 안에 의존하고자 하는 스코프를 담아서 처리 하는 방식.
	angularRefApp.controller('h2Controller',['$scope', function ($scope){
		$scope.directive=['https://docs.angularjs.org/api/ng/directive', 'Directive'];
	}]);

	angularRefApp.controller('directive_list_Controller',['$scope', function ($scope){
		$scope.ng_directives = {
					'app':{
						'href': 'https://docs.angularjs.org/api/ng/directive/ngApp',
						'content': 'ng-app'
					},
					'init': {
						'href': 'https://docs.angularjs.org/api/ng/directive/ngInit',
						'content': 'ng-init'
					},
					'repeat': {
						'href': 'https://docs.angularjs.org/api/ng/directive/ngRepeat',
						'content': 'ng-repeat'
					},
					'bind': {
						'href': 'https://docs.angularjs.org/api/ng/directive/ngBind',
						'content': 'ng-bind'
					},
					'class': {
						'href': 'https://docs.angularjs.org/api/ng/directive/ngClass',
						'content': 'ng-class'
					}
				};
	}]);

} )(window, window.angular);

// ng-controller 를 이용해서 컨트롤러 코드를 다 이쪾으로 뺏고 
// html 파일은 expression 과 Directives 만 가지고 앵귤러JS app 구현하는 기본 방법을 해봤다.
// html은 뷰템플릿이 되고 js는 모델데이터와 컨트롤바인딩을 해주게 된다.