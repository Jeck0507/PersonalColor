import requests
import os
from bs4 import BeautifulSoup
from urllib.parse import quote

def download_image(url, save_path):
    response = requests.get(url, stream=True)
    response.raise_for_status()
    with open(save_path, 'wb') as file:
        for chunk in response.iter_content(8192):
            file.write(chunk)

def google_image_crawler(query, num_images):
    encoded_query = quote(query, safe='')

    url = f"https://www.google.com/search?q={encoded_query}&tbm=isch"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    soup = BeautifulSoup(response.content, 'html.parser')

    image_tags = soup.find_all('img')

    save_directory = f"images/{query}"
    os.makedirs(save_directory, exist_ok=True)

    count = 0
    for tag in image_tags:
        if count >= num_images:
            break

        image_url = tag.get('src') or tag.get('data-src')
        alt_text = tag.get('alt')

        if image_url and image_url.startswith('http') and alt_text:
            save_path = os.path.join(save_directory, f"image{count}.jpg")
            try:
                download_image(image_url, save_path)
                print(f"Downloaded image{count}.jpg")
                count += 1
            except requests.exceptions.HTTPError:
                print(f"Failed to download image{count}.jpg")

#사용 예시
query = input("검색어: ")
num_images = int(input("갯수"))

google_image_crawler(query, num_images)