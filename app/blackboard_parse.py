from seleniumrequests import Chrome
from selenium.webdriver.common.keys import Keys
import getpass
import time, code, traceback
from os import getenv, path
from distutils.dir_util import mkpath
import os


def get_webdriver():
    return Chrome()

def get_credentials(username=None, password=None):
    if username is not None or getenv("USERNAME") is not None:
        user_id =  getenv("USERNAME")
    else:
        user_id = raw_input('Please enter username:')
    if password is not None or getenv("PASSWORD") is not None:
        password = getenv("PASSWORD")
    else:
        password = getpass.getpass('Password:')
    return user_id, password

def login_to_blackboard(browser, user_id=None, password=None):
    #Get the blackboard main page
    browser.get("https://bb.its.iastate.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_1_1")

    user_id_field = browser.find_element_by_id("user_id")
    password_field = browser.find_element_by_id("password")
    if user_id is None or password is None:
        user_id, password = get_credentials(user_id, password)

    user_id_field.send_keys(user_id)
    password_field.send_keys(password)
    browser.find_element_by_id("entry-login").click()

def get_list_of_classes(browser):
    time.sleep(2)
    courses = browser.find_elements_by_xpath('//*[@id="div_4_1"]//li/a[@target="_top"]')
    return [{"url": course.get_attribute("href"), "text": course.text} for course in courses]

def find_files(browser, prefix=''):
    time.sleep(2)
    files = [{"url":str(x.get_attribute("href")),"text":x.text.replace(" ","_").title()} for x in browser.find_elements_by_xpath('//ul[@id="content_listContainer"]/li//a')]
    old_prefix = prefix
    for f in files:
        print f
        if "bbcswebdav" not in f["url"]:
            old_url = browser.current_url
            prefix = old_prefix + f["text"]+ "/"
            browser.get(f["url"])
            find_files(browser, prefix=prefix)
            browser.get(old_url)
        else:
           print prefix
           print f["text"]
           r = browser.request('GET', str(f["url"]))
           mkpath(prefix)
           filename = prefix + f["text"] + "." + r.headers['Content-Type'].split("/")[1]
           with open(filename, "w") as download:
               download.write(r.content)


def open_course_content(browser):
    try:
        content_link = browser.find_element_by_xpath("//span[@title='Course Content']/..")
    except:
        print("Course Does Not Have Content")
        return False

    content_link.click()
    return True


def download_from_class(browser, course):
    browser.get(course["url"])
    time.sleep(2)
    if open_course_content(browser):
        find_files(browser,prefix="Blackboard_Files/" + course["text"].replace(" ","_").title() + "/")


def download_all_files(user_id=None, password=None):
    browser = get_webdriver()
    try:
        login_to_blackboard(browser, user_id=user_id, password=password)
        for course in get_list_of_classes(browser):
            download_from_class(browser, course)
    except:
        raise
    finally:
        browser.close()

if __name__ == '__main__':
    download_all_files()
