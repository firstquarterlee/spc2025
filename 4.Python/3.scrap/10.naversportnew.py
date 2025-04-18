import requests
from bs4 import BeautifulSoup

# 미션1: 뉴스의 타이틀(제목)만 가져와서 출력한다.
url = "https://sports.news.naver.com/index"
response = requests.get(url)

# 미션2: 해당 뉴스의 원본 URL을 가져온다.(그래서, 그 url을 클릭했을때 해당 사이트로 갈 수 있도록)
soup = BeautifulSoup(response.text, "html.parser")

print(response) # 200확인됨

for a_tag in soup.select("a[href]"): #선택함
    title = a_tag.text.strip() # 짤라냄, title변수로 만듬
    link = a_tag["href"] # 태그로가져옴, link변수로 만듬

# title 트루면 보여주기 짜봄
    if title: 
        print(f"이것이 제목: {title}")
        print(f"이것이 링크: https://sports.news.naver.com {link}")
        
        
# 미션3. 링크 타고 본문 가져오기!(앞에 100글자만 화면에 출력하기)