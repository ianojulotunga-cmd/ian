// Edit this file to add or change products. Put each photo in assets/img/products/<image>.jpg (see IMAGES.md).
const CATS = {kitchen: "Home & Kitchen", computer: "Computer Accessories", electronics: "Electronics", service: "IT Services"};
// [id, category, name, description, price in KSh, stock (null = service), image file name, tags: F = featured, P = popular]
const PRODUCTS = [
  [1,"kitchen","Air Fryer 4L","Cook crispy meals with far less oil.",8500,12,"air-fryer-4l","FP"],
  [2,"kitchen","Electric Kettle 1.8L","Fast-boil stainless steel, auto shut-off.",1800,30,"electric-kettle","P"],
  [3,"kitchen","Blender 600W","Glass jar for smoothies, soups and sauces.",3200,15,"blender-600w",""],
  [4,"kitchen","Microwave Oven 20L","Solo microwave, six power levels, defrost.",9500,8,"microwave-20l","F"],
  [5,"computer","Mechanical Keyboard","Backlit, blue switches, full-size layout.",4200,20,"mechanical-keyboard","FP"],
  [6,"computer","Wireless Mouse","2.4GHz, silent clicks, adjustable DPI.",900,50,"wireless-mouse","P"],
  [7,"computer","USB-C Cable 1m","Braided fast-charge and data cable.",450,100,"usb-c-cable",""],
  [8,"computer","Flash Drive 64GB","USB 3.0 metal flash drive.",900,60,"flash-drive-64gb","P"],
  [9,"computer","Stereo Headset","Over-ear headset with microphone.",2200,18,"headset",""],
  [10,"computer","65W Laptop Charger","USB-C fast charger for laptops and phones.",2800,0,"laptop-charger",""],
  [11,"electronics","Smart TV 32 inch","HD Smart TV with Wi-Fi and streaming apps.",18500,6,"smart-tv-32","F"],
  [12,"electronics","Bluetooth Speaker","Portable, water-resistant, 12-hour battery.",3500,22,"bluetooth-speaker","P"],
  [13,"electronics","Power Bank 20000mAh","Two-port fast-charging power bank.",3000,25,"power-bank","FP"],
  [14,"electronics","Wireless Earbuds","Bluetooth 5.0 with charging case.",2500,40,"wireless-earbuds",""],
  [15,"service","Laptop Repair and Tune-up","Diagnosis, cleaning and repair in 48 hours.",1500,null,"","P"],
  [16,"service","Software Installation","Windows, Office and essential apps set up.",1000,null,"",""],
  [17,"service","Home and Office Networking","Wi-Fi setup, router configuration, cabling.",4000,null,"",""],
  [18,"service","Website Development","Responsive business site, up to five pages.",15000,null,"","F"]
].map(([id, cat, name, desc, price, stock, img, tags]) => ({id, cat, name, desc, price, stock, tags, image: img ? `assets/img/products/${img}.jpg` : ""}));

// Search words used to find a free photo on Wikimedia Commons when a product has no file in assets/img/products/.
// Change a word here to get a better match, or drop your own <image>.jpg file in (your file always wins).
const PHOTO_TERMS = {1:"air fryer",2:"electric kettle",3:"countertop blender",4:"microwave oven",5:"mechanical keyboard",6:"wireless computer mouse",7:"USB-C cable",8:"USB flash drive",9:"gaming headset",10:"laptop charger",11:"smart TV",12:"bluetooth speaker",13:"power bank",14:"wireless earbuds"};
