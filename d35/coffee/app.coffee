# coffeeScript Singleline comments  해석되지 않음.

#JS 데이터 유형
#숫자, 문자 ,불린, 함수 , 배열, 객체
# 숫자
current_year = 2015

# 문자
happy_message = "올 #{current_year}한해는 모두 행복"

# 변수 = if 조건 then 사실일때 else 거짓일때 [3항식]
see_year_is_2015 =
	if current_year is 2015 then true else false

# boolean , if  
singersong_writer = happy_message if see_year_is_2015
# === [is] 
singersong_writer = happy_message if current_year is 2015
# !== [isnt]
singersong_writer = happy_message if current_year isnt 2015
# 변수 = if 조건 then 사실일때 else 거짓일때 [3항식]
singersong_writer = if current_year isnt 2015 then happy_message else 

# 처리 결과가 앞에 오고 뒤에 조건문이 올수 있다. 영어권


# 전달인자 없는 함수
display_message = 
	-> happy_message
# 커피스크립트 결과물은 함수표현식이 나온다. 함수선언식은 나오지 않는다.
# 커피스크립트는 함수를 저의할때 상단에 정의하는게 좋다. 호이스팅 되기 때문에.

# 전달인자 없는 함수 실행
display_message()
do display_message

# 전달인자 있는 함수
display_happy_message = 
	# 초기값 설정 가능. ECMA6 도입.
	(message='안녕하세요')-> message
	# 리턴이 없는 거라면 마지막에 return 키워드만 넣으면 된다.

see_year = 2015

display_happy_message(see_year)

###
 jQuery + cofeescript
###

document.ready = ->
	$this.addClass('body-l')

body = document.body

$(body).ready( ->
	# body 변수가 있으면
	# if body?
	# 	$mix = @addClass('body-l')
	# 	return
	if body? and html?
		@addClass('body-l')
	else
		@removeClass('body-l')
	
	)


# 배열
favorit_num = [1,2,3,4,5]
bitlist = [
	1, 0, 1
	0, 0, 1
	1, 1, 0
]
# yanl언어 방식 콤마구분 없이 사용.
my_hobby= [
		football
		reading
		book
]

# 객체
singers = {Jagger: "Rock", Elvis: "Roll"}
friend = {
	jan:
		name: jan
		jender: man
	kai:
		name: kai
		jender: man
	lia:
		name: lia
		jender: woman

}	# 중첩 사용 편함.
kids =
	brother:
		name: "Max"
		age:  11
	sister:
		name: "Ida"
		age:  9


# 반복문......

# switch
score = 44
# 대입할 변수가 있어야 즉시실행코드로 변환.
grade = switch score
	when score <= 100 
	 message('A+')
	when score <= 90 then message('A') # 한줄로 쓸때 then
	when score <= 80 then message('B+') # 한줄로 쓸때 then
	when score <= 70 then message('B')
	when score <= 60 then message('C+')
	when score <= 50 then message('C')
	else message('F')

# for
tab_menu_handle = jQuerytabs.find(a)

show_tab = (target)->
	for handle in tab_menu_handle
		$(handle).click()

css_maps={
	'color': 'tan'
	'background-color': 'snow'
	'font-size': '14px'
	'font-weight': 100
}
assign_style = (prop)->
	element= document.body
	element.style(prop)
	return

# -----------사이트 예제-----------------------
# Overview
# Assignment:  적용  var , ; 없다.
number   = 42
opposite = true

# Conditions:  조건문 키워드 앞의 구문이 실행구문
# 방법1
number = -42 if opposite
# 방법2
if opposite
	number = -42
# 방법3
if opposite then number = -42

number = -20 if !test
number = -20 if not test
number = -20 unless test
	

# Functions:
square = (x) -> x * x
# cube:   (x) -> x * square(x)

double = (m) -> m * m
triple = (m) -> double(m) * m


# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square(x)

# Splats: 인자가 몇개 나올지 모를때 뒤에 ... 사스랑 비슷.
race = (winner, runners...) ->
  print( winner, runners )

click_object = (arg1, arg2, args...) ->
	console.log( arg1, arg2 )
# arguments 가 call을 통해서 slice 메서드를 가져다 쓰는


# Existence:
# exist test 는 존재하는지 여부를 확인하는거였는데
# elvis 가 존재하면 경고창 띄움.
alert "I knew it!" if elvis?

# Array comprehensions:
# 즉시실행 리턴이 cubes에게
cubes = (math.cube(num) for num in list)
# cubes = math.cube(num) 자체가 실행구문이 되버림.
cubes = math.cube(num) for num in list


# js로 많이 쓰는 구문이 있는데
# window.jQuery(global,$)
((global, $)-> 
	'use strict'
	return
)(window, window.jQuery)

# 포인트는 () 내부에 함수를 던지는데 뒤쪾에 인자를 전달하고 ()안에서 인자를 받을수 있다. 이렇게 하면 즉시실행 함수 내부에 스코프를 만들 수 있다.



# String Interpolation, Block Strings, and Block Comments
# http://coffeescript.org/#strings
author = "Wittgenstein"
quote  = "A picture is a fact. -- #{ author }"

sentence = "#{ 22 / 7 } is a decent approximation of π"

# 여러줄 사용할 수 있다.
mobyDick = "Call me Ishmael. 
	Some years ago --
  never mind how long precisely -- having little
  or no money in my purse, and nothing particular
  to interest me on shore, I thought I would sail
  about a little and see the watery part of the
  world..."

# 뉴라인 코드가 들어온다.
html = """
       <strong>
         cup of 
         coffeescript
       </strong>
       """

###
주석
SkinnyMochaHalfCaffScript Compiler v1.0
Released under the MIT License
###


# Lexical Scoping and Variable Safety
# 지역변수 만들고 변수를 보존하는 방법
outer = 1 #전역변수 상위스코프
changeNumbers = ->
	inner = -1	# 함수 안에 있는 밖에 없는 지역변수
	outer = 10
inner = changeNumbers()


# If, Else, Unless, and Conditional Assignment
mood = greatlyImproved if singing

if happy and knowsIt
  clapsHands()
  chaChaCha()
else
  showIt()

date = if friday then sue else jill


# Splats...
gold = silver = rest = "unknown"

awardMedals = (first, second, others...) ->
  gold   = first
  silver = second
  rest   = others

contenders = [
  "Michael Phelps"
  "Liu Xiang"
  "Yao Ming"
  "Allyson Felix"
  "Shawn Johnson"
  "Roman Sebrle"
  "Guo Jingjing"
  "Tyson Gay"
  "Asafa Powell"
  "Usain Bolt"
]
# 함수를 실행하는것.
awardMedals contenders...

alert "Gold: " + gold
alert "Silver: " + silver
alert "The Field: " + rest


# Loops and Comprehensions
# 기본적 each문
# Eat lunch.
eat food for food in ['toast', 'cheese', 'wine']

# Fine five course dining.
courses = ['greens', 'caviar', 'truffles', 'roast', 'cake']
# 메뉴 함수를 실행하는데 (i + 1, dish) 던지는것. 그리고 for문 내에서 dish 와 i 를 받아서 courses안의 것들을 출력
menu i + 1, dish for dish, i in courses

# Health conscious meal.
foods = ['broccoli', 'spinach', 'chocolate']
# eat food for food in foods when food isnt 'chocolate'
eat(food) for food in foods when food isnt 'chocolate'