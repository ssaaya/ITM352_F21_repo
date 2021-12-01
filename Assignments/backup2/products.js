/*Modified my Assignment 1  and borrowed code from WODs smartphoneproducts 3,and Prof. Port's screencast*/

var products =
    [
        {
            "name": "BalanceEuropean",
            "price": 89.99,
            "image": "balanceeuro.png"
        },
        {
            "name": "EuropeanStretch",
            "price": 87.99,
            "image": "eurostretch.png"
        },
        {
            "name": "Hannah",
            "price": 79.99,
            "image": "hannah.png"
        },
        {
            "name": "Heritage",
            "price": 85.79,
            "image": "heritage.png"
        },
        {
            "name": "Serenade",
            "price": 99.99,
            "image": "serenade.png"
        }
    ];

if (typeof exports != 'undefined') { // try to exports this file to server.js
    exports.products = products;
}
