# 스크래핑은 크롤링이 아니다.! 정식명칭은 스크래핑이다.

# 외부 라이브러리 패키지
import requests

# 노드에서는 npm install 패키지명
# 파이썬에서는 pip install 패키지명

# 네이버 요청! 주세요!
resp = requests.get("http://www.naver.com")
print("웹 페이지 내용: ", resp) # 객체인것 확인, 객체 타입은 Response
print("헤더정보: ", resp.headers)
print("바디데이터는 ", resp.text)

