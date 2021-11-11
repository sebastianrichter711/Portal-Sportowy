from bs4.element import Script
import requests
from bs4 import BeautifulSoup
from sport24app.models import Article, Section
import re
from datetime import datetime

def download_article(url, section_name):

    data = requests.get(url)
    html = BeautifulSoup(data.text, 'html.parser')

    title = html.find("meta", {"property": "og:title"})
    proper_title = title["content"]
    date = html.find("span", {"class": "article_date"})
    lead_text = html.find("div", {"id": "gazeta_article_lead"})
    main_text = html.find_all("p", {"class": "art_paragraph"})

    main_text_to_db = ""
    for item in main_text:
        main_text_to_db += item.text

    first_digit = re.search(r"\d", date.text)
    if first_digit:
        date_index = first_digit.start()
        new_date = date.text[date_index:date_index+16]
        new_date += ":00"
        date_time_obj = datetime.strptime(new_date, '%d.%m.%Y %H:%M:%S')

    print(proper_title)
    print(new_date)
    print(lead_text.text)
    print(main_text_to_db)

    images = html.find_all("script")
    str_img = str(images)
    split_images = str_img.split('<script>')

    images_gallery = ""
    for item in split_images:
        if "galleryInArticleData" in item:
            images_gallery = item

    images_url = images_gallery.find("url:")
    images_title = images_gallery.find("title:")
    image_link = images_gallery[images_url:images_title]
    https = image_link.find("https:")
    comma = image_link.find("',")
    full_image_link = image_link[https:comma]
    print(full_image_link)

    section = Section.objects.get(name=section_name)
    new_article = Article.objects.create(title=proper_title, date_of_create = date_time_obj,
               lead_text = lead_text.text, text = main_text_to_db, big_title_photo = full_image_link, section_id = section)
    if new_article != None:
        new_article.save()
        articles_number = getattr(section, 'number_of_articles')
        articles_number = articles_number + 1
        setattr(section, 'number_of_articles', articles_number) 
        section.save()      
        return True

    return False

'''
data = requests.get("https://www.sport.pl/pilka/7,65080,27793434,pogba-gotowy-zostac-w-mu-postawil-jeden-warunek-chodzi-o-cristiano.html#do_w=107&do_v=314&do_st=RS&do_sid=677&do_a=677&s=SMT_Link_9")
html = BeautifulSoup(data.text, 'html.parser')
title = html.find("meta", {"property": "og:title"})

#print(html)
print(title["content"])

title = html.find("h1", {"id": "article_title"})

new_title = ""
space_number = 0
for letter in title.text:
    if ord(letter)!=32:
        new_title += letter
        space_number = 0
    else:
        if new_title.count != 0:
            if space_number == 10 and ord(letter)==32:
                break
            elif ord(letter)==32:
                space_number += 1 
                new_title += letter
                
    
            
print (len(new_title))
'''         

        