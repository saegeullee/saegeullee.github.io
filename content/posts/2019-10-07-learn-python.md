---
title: python 기본 문법
date: "2019-10-07T18:46:37.121Z"
template: "post"
draft: false
slug: "/category/python/python-basic-grammer/"
category: "python"
tags:
  - "python"
description: "python 기본 문법"
socialImage: "/media/image-2.jpg"
---

> **[위코드](http://wecode.co.kr/)** 교육자료를 바탕으로 정리한 내용입니다.

#Math Expression

###정수 나누기
나누기의 값이 정수로 떨어지지 않는 경우 반내림하여 정수의 값만 리턴한다. 
```python
num1 = 7 
num2 = 2 
num3 = num1 // num2  #num3의 값은 3 
"앞으로 배울 slicing 에서 정수 나누기가 유용하다."
```

#Converting numbers to strings
python 에서는 string 과 integer type 을 함께 연결하여 출력 할 수 없다. 
따라서 아래와 같은 코드는 에러를 발생시킨다.
```python
num1 = 1
num2 = 2
print("더하기 : " + (num1 + num2))

Traceback (most recent call last):
  File "python", line 8, in <module>
TypeError: can only concatenate str (not "int") to str
```
따라서 출력을 원하는 (num1 + num2) 부분을 str 함수를 사용하여 string type 으로 변경 후 출력해야 원하는 값을 얻을 수 있다.

```python
num1 = 1
num2 = 2
print("더하기 : " + str(num1 + num2))
```

#Literal String Interpolation 포맷
기존에는 %-formatting과 str.format() 두 가지 방식의 String formating 방법이 있었다. 하지만 이 방법은 사용하기 매우 불편하고 하여.. 2015년에 파이썬 3.6에 새로운 방법이 도입되었다. 다음과 같이 사용할 수 있다.

```python
name = "Eric"
age = 74
f"Hello, {name}. You are {age}."
#output 'Hello, Eric. You are 74.'
```
다음과 같이 여러줄을 출력할 수도 있다.

```python
num1 = 4
num2 = 2

print(f"""
더하기: {num1 + num2}
빼기: {num1 - num2}
나누기: {num1 / num2}
곱하기 {num1 * num2}
""")

#output
더하기: 6
빼기: 2
나누기: 2.0
곱하기 8
```

#Advance Math Expression
**는 수학에서 멱법(Exponentiation)을 구할 때 사용한다. 10의 2승은 다음과 같이 구현 가능하다.
```python
10 ** 2
```

#If statement
파이썬에서는 if 의 조건문에 괄호()를 넣지 않아도 된다. 또한 들여쓰기로 코드의 종속성을 나타내기 때문에 당연히 {}도 쓰지 않는다. 아래의 예시와 같이 if, elif, else 를 사용한다.
```python
if car == "현대":
   print("현대는 국산차")
elif car == "기아":
   print("기아는 국산차")
else:
   print("외제차")
```

#Comments
파이썬에서 주석을 달 때는 `#`을 사용한다.
여러줄에 주석을 달 때는 아래와 같이 작은따옴표 ' 3개를 이용하여 나타낼 수 있다.
```python
'''
multiple line comments is possible in python..
check it out here
'''
```

#List
List는 string 이외에도 숫자, boolean 등의 모든 type의 값을 저장할 수 있고 서로 다른 type의 값들을 저장하는 것도 가능하다.
```python
sample_list = [1, 2, "three", "four]
```

###Adding elements to lists(Append)
기존의 list 에 append를 하면 list 의 맨 뒤에 추가된다.
```python
color_list = ["Red", "Blue", "Green", "Black"]
color_list.append("Yellow")
#output ['Red', 'Blue', 'Green', 'Black', 'Yellow']
```

###Adding two or more elements to lists
2개 이상의 element를 추가할 때는 append 대신 + 를 사용할 수 있다. +는 list와 list를 합해준다.
```python
color_list = color_list + ["Light Blue", "Pink"]
```

###Adding elements to lists with insert
insert를 사용하면 list의 원하는 위치에 element를 추가할 수 있다.

```python
cities = [
    "서울특별시",
    "부산광역시",
    "인천광역시",
    "대구광역시",
    "대전광역시",
]
cities.insert(1, "제주특별자치도 제주시") #1번 인덱스에 추가
```

###List slicing
List slicing 은 리스트의 일부분을 따로 copy 할 때 사용한다.
```python
bts = ["RM", "제이홉", "진", "정국", "지민", "뷔", "슈가"]
sub_bts = bts[1:4]
#ouput ['제이홉', '진', '정국']
```

###Slicing steps
step만큼 건너뛰며 저장한다.
```python
sub_bts = bts[1:4:2]
#ouput ['제이홉', '정국']
```

###Slicing tips
- List를 slicing 할 때 start index 를 빈칸으로 두면 list의 첫 요소부터 시작한다.
- stop index를 빈칸으로 남겨두면 start index부터 끝까지 가져온다.
- slicing 은 원래의 list 를 수정하는 것이 아니라 새로운 list 를 만들어 낸다.

###Deleting Elements From List
del 키워드를 사용하여 원하는 요소를 리스트에서 삭제할 수 있다. 요소가 리스트에서 삭제되면 파이썬이 자동으로 나머지 요소들을 정렬해준다. 
```python
sample_list = ['a', 'b', 'c', 'd', 'e']
del sample_list[1]
#output ['a', 'c', 'd', 'e']
```

remove를 사용하여 요소를 리스트에서 삭제할 수도 있다. del과 다르게 remove 는 리스트의 메소드이다.
```python
sample_list.remove('b')
```


#Tuple
- tuple은 list와 비슷하게 요소들을 저장할 때 사용한다.
- list는 수정이 가능하지만 tuple은 한번 선언되면 수정이 불가능하다.
- tuple의 요소들을 읽어들이는 방법과 slicing은 모두 list와 동일하다.
tuple은 다음과 같이 선언한다.
```python
my_tuple = (1, 2, 3)
my_tuple[0]
my_tuple[1:2]
```

tuple은 언제 사용하는가?
- tuple은 일반적으로 2~5개 사이의 요소들을 저장할 때 사용되며, 특정 데이터를 adhoc(즉석적으로) 하게 표현하고 싶을때 사용한다.
- 예를들어 좌표위의 네 점을 표현할 때 tuple을 사용하면 유용하다.
- tuple은 주로 list와 같이 쓰인다. List의 요소들로 tuple을 사용한다.
- 물론 아래의 경우 list를 사용하여 동일한 데이터를 표현할 수 있지만 이 경우는 tuple이 더 효과적이다.
- List는 수정이 가능하고 여러 수의 요소들을 저장할 수 있도록 설계했기 때문에 tuple보다 차지하는 메모리 용량이 더 크다.
- 그래서 수정이 필요없고 간단한 형태의 데이터를 표현할때는 tuple을 사용하는게 훨씬 더 효과적이다.
```python
coords = [ (4,4),  (5,2),  (-2,2),  (-3,-4) ]
```

#Set
- Set은 List와 마찬가지로 다양한 타입의 element들을 저장할 수 있다.
- List와 달리 element들이 순서대로 저장되어 있지 않다.
- 따라서 for문에서 읽어들일때 element들이 순서대로 나오는 것이 아니라 무작위 순서대로 나온다.
- 순서가 없기 때문에 indexing도 없다. 따라서 몇번째 element를 읽어들이거나 할 수 없다.
- 동일한 값을 가지고 있는 요소가 1개 이상 존재 할 수 없다. 즉, 중복된 값을 저장할 수 없다.
- 만약 새로 저장하려고 하는 element와 동일한 값의 element가 존재한다면 새로운 요소가 이 전 요소를 치환한다.

###set 생성하는 법
set을 생성하는 방법 2가지
```python
set1 = {1, 2, 3} #1.중괄호 {} 사용
set2 = set([1, 2, 3]) #2. set() 함수 사용
```
set() 함수를 사용해서 set을 만들기 위해서는 list를 파라미터로 전달해야 한다. 일반적으로 list를 set으로 변환하고 싶을때 set()함수를 사용한다.

```python
set1 = {1, 2, 3, 1}
print(set1)
> {1, 2, 3}
set2  = set([1, 2, 3, 1])
print(set2)
> {1, 2, 3}
```

###set에 새로운 요소 추가하기
set은 요소들이 순차적으로 저장되지 않기 때문에 append보다는 add가 어울린다.
```python
my_set = {1, 2, 3}
my_set.add(4)
print(my_set)
> {1, 2, 3, 4}
```

###set에 요소 삭제하기
```python
my_set = {1, 2, 3}
my_set.remove(3)
print(my_set)
> {1, 2}
```

###Look up
set에 어떤 값이 이미 들어있는지를 알아보는 것을 look up 이라고 한다. set에서 look up을 하기 위해서는 in 키워드를 사용해야 한다.
```python
my_set = {1, 2, 3}
if i in my_set:
  print("1 is in the set")
>1 is in the set
if 4 not in my_set:
    print("4 is not in the set")
> 4 is not in the set
```

###Intersection(교집합) & Union(합집합)
```python
#교집합 구하기
set1 = {1, 2, 3, 4, 5, 6}
set2 = {4, 5, 6, 7, 8, 9}

print(set1 & set2)
> {4, 5, 6}

print(set1.intersection(set2))
> {4, 5, 6}
```

```python
#합집합
print(set1 | set2)
> {1, 2, 3, 4, 5, 6, 7, 8, 9}
print(set1.union(set2))
> {1, 2, 3, 4, 5, 6, 7, 8, 9}
```

#Dictionary
Dictionary의 기본구조
```python
my_dic = { "key1" : "value1", "key2" : "value2"}
```

###dictionary에서 element 읽어들이기
Dictionary에서 element를 읽어들일 때는 key 값을 사용한다.
```python
my_dic["key1"]
```
- key는 string 뿐만 아니라 숫자도 가능하다.
- key 값은 중복될 수 없다.
- 만약 이미 존재하는 key값이 또 추가되면 기존의 key값의 value를 치환한다.

```python
dict1 = { 1 : "one", 1 : "two" }
print(dict1)
> { 1: "two" }
```

###dictionary에 새로운 element 추가하기
```python
my_dic[new_key] = new_value
```

###dictionary에서 element 삭제하기
```python
my_dict = { "one": 1, 2: "two", 3 : "three" }
del my_dict["one"]
print(my_dict)
> {2: 'two', 3: 'three'}
```

#For loop
```python
for element in list:
    do_something_with_element
```

###for loop with dictionary
```python
#리스트에서 오직 한번만 나타나는 값을 가지고 있는 요소 출력 
my_list = [1, 2, 3, 4, 5, 1, 2, 3, 7, 9, 9, 7]
my_dict = {}
for el in my_list:
  if el in my_dict:
    my_dict[el] += 1;
  else:
    my_dict[el] = 1
    
for key in my_dict:
  if my_dict[key] == 1:
    print(key)

#answer using list
current_index = 0
for element in my_list:
  is_unique = True
  list_without_current_element = my_list[0:current_index] + my_list[current_index+1:]
  
  for element2 in list_without_current_element:
    if element == element2:
      is_unique = False
      break
    
  if is_unique:
    print(element)
    
  current_index += 1
```

#While Loop
###While Else
파이썬의 while문은 else 문이 추가 될 수 있다. while문 종료후 else문이 실행된다.
```python
number = 0
while number <= 5:
    print(number)
    number += 1
else:
    print(f"while 문이 끝나고 난 후 의 number : {number}")
> 0
1
2
3
4
5

while 문이 끝나고 난 후 의 number : 6

```

###Looping Dictionary with Values instead of keys
```python
my_dict = {"key1" : "val1", "key2" : "val2", "key3" : "val3"}
for val in my_dict.values:
  print(val)

```

###Looping Dictionary with Both Keys and values

```python
for key, val in my_dict.items:
  print(key, val)

```

#Complex dictionary
###List of dictionaries

```python
bts = [
	{
		"실명" : "김남준",
		"가명" : "RM",
		"생년월일" : "1994년 9월 12일",
		"출생지" : "대한민국 서울특별시 동작구 상도동",
		"학력" : "글로벌사이버대학교 방송연예학과",
		"포지션" : "리더 · 메인 래퍼"
	},
	{
		"실명" : "김석진",
		"가명" : "진",
		"생년월일" : "1992년 12월 4일",
		"출생지" : "대한민국 경기도 과천시",
		"학력" : "한양사이버대학교 대학원",
		"포지션" : "서브 보컬"
	},
  ...
]

#find birday..
for member in bts:
	if member["가명"] == "제이홉":
		print(member["생년월일"])
```
###Nested dictionary
```python
bts = {
	"제이홉": {
		"실명" : "정호석",
		"가명" : "제이홉",
		"생년월일" : "1994년 2월 18일",
		"출생지" : "대한민국 광주광역시 북구 일곡동",
		"학력" : "글로벌사이버대학교 방송연예학과",
		"포지션" : "서브 래퍼 · 메인 댄서"
	},
	"지민": {
		"실명" : "박지민",
		"가명" : "지민",
		"생년월일" : "1995년 10월 13일",
		"출생지" : "대한민국 부산광역시 금정구 금사동",
		"학력" : "글로벌사이버대학교 방송연예학과",
		"포지션" : "리드 보컬 · 메인 댄서"
	},
  ...
}

print(bts["제이홉"]["생년월일"])
```

#More Complex function parameters

###keyworded variable length of arguments
- argument 수를 0부터 N까지 유동적으로 넘겨줄 수 있다.
- keyword가 미리 정해져 있기 않기 때문에 원하는 keyword를 유동적으로 사용할 수 있다.
- keyworded variable length of arguments는 dictionary 형태로 지정된다.
- 일반적으로 argument 이름을 kwargs라고 짓는다.
```python
def buy_A_car(**kwargs):
      print(f"다음 사양의 자동차를 구입하십니다:")
      for option in kwargs:
        print(f"{option} : {kwargs[option]}")
buy_A_car(seat="가죽", blackbox="최신", tint="yes")
#kwargs파라미터는 아래와 같이 dictionary 로 함수에 전달된다.
{'seat': '가죽', 'blackbox': '최신', 'tint': 'yes'}
```

###Non-keyworded variable length of arguments
- Keyworded variable length of arguments와 동일하지만 keyword 를 사용하지 않고 순서대로 값을 전달하는 방식도 가능하다.
- Non-keyworded variable length of arguments 혹은 그냥 variable length of arguments 라고도 한다.  
- 더 간단하게 variable arguments 라고 하기도 한다. 
- Variable arguments를 선언하는 방법은 별표 2개 대신에 1개를 사용해서 선언한다. 
- variable arguments는 tuple로 변환되어 함수에 된다.

###Mixing args and kwargs
args, kwargs 둘 다 사용하면 어떤 형태와 수의 argument도 허용 가능한 함수가 된다.
```python
def do_something(*args, **kwargs):
     ## some code here...
     ....

do_something(1, 2, 3, name="정우성", age=45)
do_something(1, 2, 3, 4, 5, "hello", {"주소" : "서울", "국가" : "한국"})
do_something(name="정우성", gender="남", height="187")
do_something(1)
do_something()
```

```python
#dictionary 키에 접근할 때 조심할 것
#kwargs[last_name] 이렇게 접근해서 last_name not defined error 발생
def what_is_my_full_name(**kwargs):
  if "first_name" not in kwargs and "last_name" not in kwargs :
    return "Nobody"
  elif "first_name" not in kwargs:
    return kwargs['last_name']
  elif "last_name" not in kwargs:
    return kwargs['first_name']
  else:
    return f"{kwargs['last_name']} {kwargs['first_name']}"
    
what_is_my_full_name(last_name="a")

```

#Nested Function

파이썬에서는 함수 안에 함수를 선언할 수 있다.
중첩함수(nested function) 혹은 내부 함수는 는 상위 부모 함수 안에서만 호출 가능하다.
```python
def parent_function():
    def child_function():
        print("this is a child function")

     child_function()

parent_function()
> "this is a child function"
```









###reference
1. 위코드 교육자료(not public)
2. https://www.digitalocean.com/community/tutorials/how-to-convert-data-types-in-python-3
3. https://realpython.com/python-f-strings/