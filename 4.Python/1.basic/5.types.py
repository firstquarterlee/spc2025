x = 5
y = "Hello"
z = [1, 2, 3]

print(type(x))
print(type(x))
print(type(x))

#print(isinstance("x는 숫자냐? ", x, int))
#print(isinstance("x는 글자냐? ", x, str))
#print(isinstance("y는 글자냐? ", y, str))

# 모든 언어(?)는 객체 만들 때 Class로 표현한다.
class A:
    pass
  
class B(A):
    pass

class C:
    pass

b = B() # 객체를 실체화.. instantiation -> 빵의 틀

print(isinstance(b, A))   # 맞음
print(isinstance(b, B))   # 맞음
print(isinstance(b, C))   # 틀림

a = A()
print(isinstance(a, A))   # 맞음
print(isinstance(a, B))   # 틀림
print(isinstance(a, C))   # 틀림