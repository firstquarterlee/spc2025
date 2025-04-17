# 자바스크립트에서 객체로 부르던게 파이썬에서는 딕셔너리라고 한다.

my_dict = {
  "name": "Alice",
  "age": 25,
  "location": "Seoul"
}

print(my_dict)
print("이름은: ", my_dict["name"])
print("나이는: ", my_dict["age"])
my_dict["age"] = 25
print("나이는: ", my_dict["age"])

my_dict["car"] = "현대 K5"
print("내 차는 ", my_dict["car"])
print(my_dict)

key_list = list(my_dict.keys())
print("키들은: ", key_list)

value_list = list(my_dict.values())
print("값들은 ", value_list)

for key, value in my_dict.items():
    print(f"키: {key}, 값: {value}")