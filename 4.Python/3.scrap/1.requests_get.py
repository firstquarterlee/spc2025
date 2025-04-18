import requests

url = "https://jsonplaceholder.typicode.com/users"

response = requests.get(url)

users = response.json()

for user in users:
    #print(user)
    #print('-' * 10)
    #print(user['name'])
    id = user["id"]
    name = user["name"]
    username = user["username"]
    #이게 파싱이다. 
    email = user['email']
    
    print(f"{id:<2} {name:30} {username:>20} {email:20}")