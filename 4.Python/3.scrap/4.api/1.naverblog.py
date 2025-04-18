import os
import sys
import urllib.request

client_id = "7Q6e37SBNgNccza9cbeY"
client_secret = open("KIwrxN5xil", "r").read()

url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&"

request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id", client_id)
request.add_header("X-Naver-Client-Secret", cliient_secret)
response = urllib.request.urlopen(request)


