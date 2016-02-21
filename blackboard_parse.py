from seleniumrequests import Chrome
from selenium.webdriver.common.keys import Keys
import getpass
import time, code, traceback
from os import getenv


def get_webdriver():
    return Chrome()

def get_credentials():
    if getenv("USERNAME") is not None:
        user_id =  getenv("USERNAME")
    else:
        user_id = raw_input('Please enter username:')
    if getenv("PASSWORD") is not None:
        password = getenv("PASSWORD")
    else:
        password = getpass.getpass('Password:')
    return user_id, password

def login_to_blackboard(browser):
    #Get the blackboard main page
    browser.get("https://bb.its.iastate.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_1_1")

    user_id_field = browser.find_element_by_id("user_id")
    password_field = browser.find_element_by_id("password")
    user_id, password = get_credentials()

    user_id_field.send_keys(user_id)
    password_field.send_keys(password)
    browser.find_element_by_id("entry-login").click()

def get_list_of_classes(browser):
    time.sleep(2)
    courses = browser.find_elements_by_xpath('//*[@id="div_4_1"]//li/a[@target="_top"]')
    print courses
    for course in courses:
        print course.text
    return courses

def find_files(browser, prefix=''):
    time.sleep(2)
    files = [{"url":str(x.get_attribute("href")),"text":x.text} for x in browser.find_elements_by_xpath('//ul[@id="content_listContainer"]/li//a')]
    for f in files:
        print f
        if "bbcswebdav" not in f["url"]:
            old_url = browser.current_url
            prefix += f["text"] + "/"
            browser.get(f["url"])
            find_files(browser, prefix=prefix)
            browser.get(old_url)
        else:
           print prefix
           r = browser.request('GET', str(f["url"]))
           with open("out", "w") as download:
               download.write(r.content)


def open_course_content(browser):
    content_link = browser.find_element_by_xpath("//span[@title='Course Content']/..")
    content_link.click()

def download_from_class(browser, course_link):
    course_link.click()
    time.sleep(2)
    open_course_content(browser)
    find_files(browser)

if __name__ == '__main__':
    try:
        browser = get_webdriver()
        login_to_blackboard(browser)
        for course in get_list_of_classes(browser):
            if course.text == "E_E 230 All Sections (Spring 2016)":
                download_from_class(browser, course)
                break;
    except:
        raise
    finally:
        browser.close()
