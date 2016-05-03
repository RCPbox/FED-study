(function(global, $){
	'use strict';

// 오디오 지원 유무 파악 해서 조건문처리 해야 하지만.. 된다고 보고 한다.
	// console.log( $.hasClass( $.$('html'), 'audio') );
	// console.log( !!Modernizr.audio );

	var body      = $.$('body'),
		audioFile = $.createEl('audio');// audio 동적 생성을 하다.

	$.append(body, audioFile);

	$.attr( audioFile, {
		'src'      : 'media/hypnotik.mp3',
		'type'     : 'audio/mpeg',
		'controls' : true,
		'autoplay' : true,
	});

	// $.attr( audioFile, 'src', 'media/hypnotik.mp3' );
	// $.attr( audioFile, 'type', 'audio/mpeg' );
	// $.attr( audioFile, 'controls', true );
	// $.attr( audioFile, 'autoplay', true );
	// $.attr( audioFile, 'muted', true );

//원래는 서버에서 다운받아서 준비하고 있다가 재생이 가능한 순간부터 플레이.
//bind 통해서 context를 audioFil로 바꿈. this = audioFile
//bind 는 이벤트에 넣을때 실행하지않고 컨텍스트 바꿀때 사용.
	audioFile.oncanplay = playAudio.bind(audioFile);
	// document.onclick = pauseAudio.bind(audioFile);

	document.onkeydown = function(event) {
		var key = event.keyCode || event.which;//크로스브라우징.
		// 27 === ESC
		if ( key === 27 ) {
			pauseAudio.call(audioFile);// call은 즉시 실행 되므로 정지 된다.
		}
	};

	function playAudio() {
		this.play();// this = audioFile
	}

	function pauseAudio() {
		this.pause();
	}

	function stopAudio() {
		this.pause();
		this.currentTime = 0;
	}

})(window, window.y9);
