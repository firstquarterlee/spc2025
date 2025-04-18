import requests

url = "https://jsonplaceholder.typicode.com/users"

new_post = {
  "userId": 1,
  "title": "hello",
  "body": "world"
}

response = requests.post(url, json=new_post)
print(response.json())


print("---수정---")
post_id = 1

update_post = {
  "userId": 1,
  "title": "hello again",
  "body": "world again"
}

response = requests.put(f"{url}/{post_id}", json=update_post)
print(response.json())

print("---PATCH---")
patch_data = {
  "name": "partial name change"
}

response = requests.patch(f"{url}/{post_id}", json=patch_data)
print(response.json())

print("---DELETE---")
response = requests.delete(f"{url}/{post_id}")
print(response.status_code)
print(response.json())