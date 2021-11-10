from bs4.element import Script
import requests
from bs4 import BeautifulSoup
from sport24app.models import Article, Section
import re

def download_article(url, section_name):

    data = requests.get(url)
    html = BeautifulSoup(data.text, 'html.parser')

    title = html.find("title")
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

    print(title.text)
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
    new_article = Article.objects.create(title=title.text, date_of_create = new_date,
               lead_text = lead_text.text, text = main_text_to_db, big_title_photo = full_image_link, section_id = section)
    if new_article != None:
        new_article.save()
        return True

    return False


#data = requests.get("https://www.sport.pl/lekkoatletyka/7,64989,27758727,nazwali-mnie-zdrajczynia-ojczyzny-grozila-mi-najgorsza-kara.html")
#html = BeautifulSoup(data.text, 'html.parser')
#print(html)