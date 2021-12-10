/*Saaya Honjiyo
Modified my Assignment 1  and borrowed code from WODs smartphoneproducts 3,and Prof. Port's screencast and assignment example 3*/
var products = 
[
    {"type": "pointeshoes"},
    {"type": "leotard"},
    {"type": "accesories"},
    {"type": "equipment"},
];

var pointeshoes =
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
var leotard = 
[
        {
            "name": "Hestia",
            "price": 32.99,
            "image": "hestia.png"
        },
        {
            "name": "Svetlana",
            "price": 24.99,
            "image": "svetlana.png"
        },
        {
            "name": "Oksana",
            "price": 49.99,
            "image": "oksana.png"
        }
];
var accesories = 
[
        {
            "name": "Rhinestone Hair Tie",
            "price": 12.99,
            "image": "hairtierhine.png"
        },
        {
            "name": "Hair Tie and Pins",
            "price": 4.99,
            "image": "hairtiespins.png"
        },
        {
            "name": "Scrunchie",
            "price": 3.99,
            "image": "scrunchie.png"
        }
];
var equipment = 
[
        {
            "name": "Shoe Spray",
            "price": 12.99,
            "image": "shoespray.png"
        },
        {
            "name": "Foam Roller Set",
            "price": 49.99,
            "image": "foamrollerkit.png"
        },
        {
            "name": "Dance Bag",
            "price": 79.99,
            "image": "dancebag.png"
        }
];

if (typeof exports != 'undefined') { // try to exports this file to server.js
    exports.products = products;
}
