#pip install selenium
#pip install webdriver_manager

from selenium import webdriver

driver = webdriver.Chrome()

#화면 떴다
driver.get("https://www.naver.com")

