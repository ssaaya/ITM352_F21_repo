/*Saaya Honjiyo
Modified my Assignment 1  and borrowed code from WODs smartphoneproducts 3,and Prof. Port's screencast and assignment example 3*/
var prods=
[
    {"type": "Pointe Shoes", "inventory": 50},
    {"type":"Leotards", "inventory": 50},
    {"type": "Accessories", "inventory": 50},
    {"type": "Equipment", "inventory": 50}

];



var myProducts = 
{
    "Pointe Shoes": pointeshoes,
    "Leotards": leotard,
    "Accessories": accesories,
    "Equipment": equipment
}

var pointeshoes =
[
        {
            "name": "BalanceEuropean",
            "price": 89.99,
            "image": "balanceeuro.png",
            "inventory": 50
        },
        {
            "name": "EuropeanStretch",
            "price": 87.99,
            "image": "eurostretch.png",
            "inventory": 50
        },
        {
            "name": "Hannah",
            "price": 79.99,
            "image": "hannah.png",
            "inventory": 50
        },
        {
            "name": "Heritage",
            "price": 85.79,
            "image": "heritage.png",
            "inventory": 50
        },
        {
            "name": "Serenade",
            "price": 99.99,
            "image": "serenade.png",
            "inventory": 50
        }
];
var leotard = 
[
        {
            "name": "Hestia",
            "price": 32.99,
            "image": "hestia.png",
            "inventory": 50
        },
        {
            "name": "Svetlana",
            "price": 24.99,
            "image": "svetlana.png",
            "inventory": 50
        },
        {
            "name": "Oksana",
            "price": 49.99,
            "image": "oksana.png",
            "inventory": 50
        }
];
var accesories = 
[
        {
            "name": "Rhinestone Hair Tie",
            "price": 12.99,
            "image": "hairtierhine.png",
            "inventory": 50
        },
        {
            "name": "Hair Tie and Pins",
            "price": 4.99,
            "image": "hairtiespins.png",
            "inventory": 50
        },
        {
            "name": "Scrunchie",
            "price": 3.99,
            "image": "scrunchie.png",
            "inventory": 50
        }
];
var equipment = 
[
        {
            "name": "Shoe Spray",
            "price": 12.99,
            "image": "shoespray.png",
            "inventory": 50
        },
        {
            "name": "Foam Roller Set",
            "price": 49.99,
            "image": "foamrollerkit.png",
            "inventory": 50
        },
        {
            "name": "Dance Bag",
            "price": 79.99,
            "image": "dancebag.png",
            "inventory": 50
        }
];

if (typeof exports != 'undefined') { // export products to server.js
    exports.myProducts = myProducts;
}