professors = [
    { "name": "Irvin, Vanessa", "affiliation": "Assistant Professor", "department": "LIS", "research_area": "Public libraries, Reference services, Youth services, Social media" , "image" : "./images/Vanessa.jpg" },
    { "name": "Sadowski, Peter", "affiliation": "Assistant Professor", "department": "ICS", "research_area": "Machine learning, Artificial intelligence, Deeep learning with neural networks" , "image" : "./images/Peter.jpg" },
    { "name": "Gazan, Rich", "affiliation": "Professor", "department": "LIS", "research_area": "Interdisciplinary scientific collaborations, Social Q&A commnunities, Information sharing" , "image" : "./images/Rich.png" },
    { "name": "Bergstrom, Kelly", "affiliation": "Assistant Professor", "department": "COM", "research_area": "Digital Cultures, Game Studies, Feminist Methods" , "image" : "./images/kelly.png" },
    { "name": "Port, Daniel", "affiliation": "Associate Professor", "department": "ITM", "research_area": "Information Technology Engineering, Methods in software engineering, IT Education" , "image" : "./images/Daniel.jpg" },
    { "name": "Xiao, Bo", "affiliation": "Associate Professor", "department": "ITM", "research_area": "Human-Computer Interaction, Dark side of digitization, Health information systems" , "image" : "./images/Bo.jpg" }
];

console.log("data loded.")

    //has_errors = false
    //checks if it's a non neg intiger
    function isNonNegInt(q, returnErrors = false) {
        if (q == '') q = 0; //I have added this so the script gives error if you press calculate when not enterying anyhing -> it becomess negative int.
        var errors = []; // assume no errors at first
        if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
        if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
        if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

        return returnErrors ? errors : (errors.length == 0);
    }

    //here is a function that will test the input in the texbox and give an alert if it is non neg int, this is how I solve the input check.
    function checkQuantityTextbox(qtyTexboxObj) {
        if (!isNonNegInt(qtyTexboxObj.value, returnErrors = false)){
        document.getElementById(qtyTexboxObj.name+'_message').innerHTML= "error";
        }
    }
