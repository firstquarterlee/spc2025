print("hello, world")

x = 5
y = 5
str = "Hello, World"

print("덧셈:", x + y)
print("뺄셈:", x - y)
print("곱셈:", x * y)
print(f"나눗셈: {x} / {y}")
# f는 포맷팅이다.

print(str.lower())
#print(x.lower()) #오류 발생
print(str.upper())

# string(), lstrip(), restrip(), ... 쭉 한번 보기.

s = "apple, banana, cherry"
s_list = s.split(",")
print(s)
print(s_list)
print(s_list[0])
print(s_list[2])
# print(s_list[3])