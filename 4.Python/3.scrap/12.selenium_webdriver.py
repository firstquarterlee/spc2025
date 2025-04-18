####################이것도 복붙해오기

#pip install selenium
#pip install webdriver_manager

# 이건 그냥 문법이다 셀레니움만든사람이 정의함 공식문서보고 하면됨
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

import time

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
#화면 떴다
driver.get("https://www.naver.com")

search_box = driver.find_element(By.NAME, 'query')
search_box.send_keys("Python programming")
search_box.submit() #제출해라

time.sleep(5)

lement = driver.find_element(By.CSS_SELECTOR, 'div')

driver.save_screenshot("search_results.png")


