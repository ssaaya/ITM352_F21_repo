
var attributes = "Saaya;19;19.5;-19.5";

var parts = attributes.split(';');

/*
for(part of parts){

    console.log(`${part} isNonNegInt: ${isNonNegInt(part)}`);
}
*/
parts.forEach(checkIt)

function isNonNegInt (q, returnErrors = false) {
    //If returnErrors is true, array of errors is returned
    //others return true if q is a non-neg int.
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0)
  };


function checkIt(item, index) {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}