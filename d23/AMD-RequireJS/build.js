({
	baseUrl: 'js',

	paths: {
		// Libs
		'modernizr'    : 'libs/modernizr',
		'detectizr'    : 'libs/detectizr',
		'jquery'       : 'libs/jquery-2.1.4',
		'jquery.utils' : 'libs/jquery.utils',
		// Plugins
		'jquery.darkNight' : 'plugins/jquery.darkNight',
	},

	name: 'main',// r.js를 기준으로 main.js 를 찾아 가야 한다.

	out: 'bulid/bundle.js'// 어디에 저장할지.
})