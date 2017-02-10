from os import listdir
import json

images = [f for f in listdir('./data') if (f.endswith('.jpg') or f.endswith('.png') or
                                           f.endswith('.bmp') or f.endswith('.jpeg'))]

with open('data.json', 'w') as fp:
    json.dump(images, fp)

