var checkIt(item, index) => {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}

attributes = "Saaya;19;19.5;-19.5";
pieces = attributes.split(';');

pieces.forEach(checkIt)