# Product photos

The site shows a neutral "Product photo coming soon" tile for any photo that is missing, so nothing looks broken.
For a real store, add one photo per product:

1. Save each photo as JPG in `assets/img/products/` with the exact file name below.
2. Square, about 1000 x 1000 px, product centred on a white or light-grey background, under 200 KB. Use the same style and lighting for every photo.
3. Good sources: photos you take yourself (phone camera, window light, white sheet), your supplier's official photos, or free stock sites (Unsplash, Pexels) after you read each licence.
4. Do not copy photos from other shops; you need permission.

Files: air-fryer-4l, electric-kettle, blender-600w, microwave-20l, mechanical-keyboard, wireless-mouse, usb-c-cable, flash-drive-64gb, headset, laptop-charger, smart-tv-32, bluetooth-speaker, power-bank, wireless-earbuds (all `.jpg`).
IT services use a clean icon because they are not physical products.

To add a product, add one line in `products.js` and its photo here.
AI image tools can also make studio shots: "Photorealistic e-commerce product photo of a [product], 3/4 angle, white seamless background, soft studio lighting, realistic reflections and shadows, sharp focus". Check the tool's licence terms, and only use photos that match the real item you sell.

Without your own files, the site automatically looks for a free photo of each product on Wikimedia Commons, then Openverse. These are real photos but not always studio shots. Change a word in `PHOTO_TERMS` (in `products.js`) for a better match, or add your own JPG, which always wins.
