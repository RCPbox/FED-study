#compass 플러그인 호출
require 'compass/import-once/activate'
# Require any additional compass plugins here.

#Sass 라이브러리 호출
# require 'bourbon'

# 윈도우 유저 오류 CP949 오류방지
Encoding.default_external = "UTF-8"

# Set this to the root of your project when deployed:
#프로젝트 경로 설정
http_path = "/"
css_dir = "css" 
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "fonts" # 필요하다면 폰트 디렉토리도 만든다.

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded
# 컴파일되는 css output style 설정.

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
# 상대경로

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false
# 컴파일시 해석 코드 주석 제거 설정.


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

