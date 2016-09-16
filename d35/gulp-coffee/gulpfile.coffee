gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
sourcemaps = require 'gulp-sourcemaps'

# 환경설정
config =
	'root': "www"
	'coffee':
		'src': "#{config.root}/coffee/**/*.coffee"
		'dest': "#{config.root}/js/"
		# 환경설정
		# http://coffeescript.org/#usage
		'options':
			bare: true
			map: true
			join: true
		'map': './maps'

# 기본 업무
gulp.task('default', ['coffee' , 'watch:coffee'], -> 
	console.log 'gulp start!!')

# 관찰 업무
gulp.task 'watch:coffee', ->
	gulp.watch([config.coffee.src] , ['coffee'])

# 커피 업무.
gulp.task( 'coffee' , -> 
	gulp.src(config.coffee.src)
	.pipe(sourcemaps.init())
	.pipe(coffee(config.coffee.options).on('error', gutil.log))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest(config.coffee.dest))
	)

