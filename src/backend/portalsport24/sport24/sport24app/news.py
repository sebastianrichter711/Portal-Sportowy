from bs4.element import Script
import requests
from bs4 import BeautifulSoup
#from sport24app.models import Article, Section

def download_article(url):
    data = requests.get(url)

    html = BeautifulSoup(data.text, 'html.parser')
    title = html.find("h1", {"id": "article_title"})
    date = html.find("span", {"class": "article_date"})
    lead_text = html.find("div", {"id": "gazeta_article_lead"})
    main_text = html.find_all("p", {"class": "art_paragraph"})

    main_text_to_DB = ""
    for item in main_text:
        main_text_to_DB += item.text

    date_index = date.text.find("0")
    new_date = date.text[date_index:date_index+16]
    print(title.text)
    print(new_date)
    print(lead_text.text)
    print(main_text_to_DB)

    images = html.find_all("script")
    str_img = str(images)
    split_images = str_img.split('<script>')

    images2 = ""
    for item in split_images:
        if "galleryInArticleData" in item:
            images2 = item

    print(images2)

    imagesUrl = images2.find("url:")
    imagesTitle = images2.find("title:")
    newText = images2[imagesUrl:imagesTitle]
    https = newText.find("https:")
    jpg = newText.find("',")
    fullUrl = newText[https:jpg]
    print(fullUrl)

    return title.text, new_date, lead_text.text, main_text_to_DB, fullUrl

#section = Section.objects.get(name="Piłka nożna")
#new_article = Article.objects.create(title=title, date_of_create = date,
#               lead_text = lead_text, text = main_text_to_DB, big_title_photo = fullUrl, section_id = section)
#new_article.save()


