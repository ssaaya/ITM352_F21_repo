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
if (typeof exports != 'undefined') { // export this file to server.js, modified from dr.ports example assignment 1
    exports.products = products;
}
