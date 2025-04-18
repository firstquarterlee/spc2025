
#pip install python-dotenv.py

import os
import urllib.request
import json
from dotenv import load_dotenv

# .env를 읽어서, 해당 내용을 이 프로세스의 환경변수에 저장한다.
load_dotenv()



client_id = "7Q6e37SBNgNccza9cbeY"
client_secret = open("KIwrxN5xil", "r").read()
encText = urlib.parse.quote("맛집")

url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&"

request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id", client_id)
request.add_header("X-Naver-Client-Secret", cliient_secret)
response = urllib.request.urlopen(request)


