# https://pythonscraping.com/pages/page3.html
# 미션1. 해당 페이지에 요청한다.
# 미션2. 해당 페이지를 파싱해서 상품명과 가격을 출력한다.

import requests
from bs4 import BeautifulSoup

# 미션1: 해당 페이지 요청!!!! O
url = "https://pythonscraping.com/pages/page3.html"
response = requests.get(url)

# 미션2: 파싱 및 상품명과 가격을 출력해라!!! O
soup = BeautifulSoup(response.text, "html.parser")

for item in soup.select("tr.gift"):
    name = item.select_one("td:nth-of-type(1)").text.strip()
    price = item.select_one("td:nth-of-type(3)").text.strip()
    print(f"상품명: {name:30} 가격: {price:20}")
