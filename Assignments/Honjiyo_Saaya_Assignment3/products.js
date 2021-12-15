/*Saaya Honjiyo
Modified my Assignment 1  and borrowed code from WODs smartphoneproducts 3,and Prof. Port's screencast and assignment example 3*/
var productss=
[
    {"type": "Pointe Shoes", "inventory": 100},
    {"type":"Leotards", "inventory": 100},
    {"type": "Accessories", "inventory": 100},
    {"type": "Equipment", "inventory": 100}

];


var pointeshoes =
[
        {
            "name": "BalanceEuropean",
            "price": 89.99,
            "image": "balanceeuro.png",
            "inventory": 100
        },
        {
            "name": "EuropeanStretch",
            "price": 87.99,
            "image": "eurostretch.png",
            "inventory": 100
        },
        {
            "name": "Hannah",
            "price": 79.99,
            "image": "hannah.png",
            "inventory": 100
        },
        {
            "name": "Heritage",
            "price": 85.79,
            "image": "heritage.png",
            "inventory": 100
        },
        {
            "name": "Serenade",
            "price": 99.99,
            "image": "serenade.png",
            "inventory": 100
        }
];
var leotards = 
[
        {
            "name": "Hestia",
            "price": 32.99,
            "image": "hestia.png",
            "inventory": 100
        },
        {
            "name": "Svetlana",
            "price": 24.99,
            "image": "svetlana.png",
            "inventory": 100
        },
        {
            "name": "Oksana",
            "price": 49.99,
            "image": "oksana.png",
            "inventory": 100
        }
];
var accesories = 
[
        {
            "name": "Rhinestone Hair Tie",
            "price": 12.99,
            "image": "hairtierhine.png",
            "inventory": 100
        },
        {
            "name": "Hair Tie and Pins",
            "price": 4.99,
            "image": "hairtiespins.png",
            "inventory": 100
        },
        {
            "name": "Scrunchie",
            "price": 3.99,
            "image": "scrunchie.png",
            "inventory": 100
        }
];
var equipment = 
[
        {
            "name": "Shoe Spray",
            "price": 12.99,
            "image": "shoespray.png",
            "inventory": 100
        },
        {
            "name": "Foam Roller Set",
            "price": 49.99,
            "image": "foamrollerkit.png",
            "inventory": 100
        },
        {
            "name": "Dance Bag",
            "price": 79.99,
            "image": "dancebag.png",
            "inventory": 100
        }
];

//to create product array
var myProducts = 
{
    "Pointe Shoes": pointeshoes,
    "Leotards": leotards,
    "Accessories": accesories,
    "Equipment": equipment
}

if (typeof exports != 'undefined') { // export products to server.js
    exports.myProducts = myProducts;
}