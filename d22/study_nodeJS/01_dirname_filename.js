/*
	Node.js는 서버사이드 플랫폼입니다.
	__dirname, __filename은 클라이언트 사이드 환경에서는 사용할 수 없습니다.
 */

console.log('전역에서 경로 출력:\n', __dirname+'\n', __filename);

/*------------------------------------------------------------------------*/


/*
	파일 경로 구분자는 운영체제마다 다릅니다.
	OSX     : '/'
	Windows : '\\'
 */

(function(){
			//rgExp.test(str) 정규표현식. darwin은 맥에서 리턴되는 값.
			//https://msdn.microsoft.com/ko-kr/library/a55e5s6b(v=vs.94).aspx
			//검색한 문자열에 패턴이 있는지 여부를 나타내는 boolean 값을 반환.
	var platform      = /darwin/.test(process.platform) ? 'osx' : 'windows',
		identifier    = identifier || platform === 'osx' ? '/' : '\\',

		full_dirname  = __dirname.split(identifier),// 배열화
		dirname       = full_dirname[full_dirname.length - 1],

		full_filename = __filename.split(identifier),// 배열화
		filename      = full_filename[full_filename.length - 1];

	console.log('플랫폼 : '+ platform +'\n',
				'식별자 : '+ identifier );
	console.log('--- 함수 구현 전 ---\n',
				'dir명 : ' + dirname + '\n',
				'file명 : '+ filename);

	// console.log('함수 구현 전:\n', dirname + '\n', filename);
})();

/*------------------------------------------------------------------------*/

// 재사용하기 위한 모듈 준비 단계.
(function(){

	function platform() {
		return /darwin/.test(process.platform) ? 'osx' : 'windows';
	}

	function isOSX() {
		return platform() === 'osx';
	}

	function isWindows() {
		return platform() === 'widnows';
	}

	function getDirname(dir_name, identifier) {
		dir_name   = dir_name || __dirname;
		identifier = identifier || isOSX() ? '/' : '\\';
		dir_name   = dir_name.split(identifier);
		return dir_name[dir_name.length - 1];
	}

	function getFilename(file_name, identifier) {
		return getDirname( (file_name || __filename), identifier);
	}

	var dirname  = getDirname(),
		filename = getFilename();

	console.log('함수 구현 후:\n', dirname + '\n', filename);

})();

