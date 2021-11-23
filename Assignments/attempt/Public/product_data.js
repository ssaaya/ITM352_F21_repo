// Product list for server
var products =
[
    {
        "brand": "Patagonia", 
        "price": 220.00, 
        "image": "./product_image/Patagonia.jpg"
    },
    {
        "brand": "Huckberry", 
        "price": 300.00, 
        "image": "./product_image/Huckberry.webp"
    },
    {
        "brand": "Levi", 
        "price": 150.00, 
        "image": "./product_image/Levi.webp"
    },
    {
        "brand": "North Face", 
        "price": 250.00, 
        "image": "./product_image/North_Face.jpg"
    },
    {
        "brand": "Columbia", 
        "price": 140.00, 
        "image": "./product_image/Columbia.webp"
    }
];
if (typeof module != 'undefined') {
    module.exports.products = products;
  }