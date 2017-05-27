//
// FORM INPUT
//  
var name;
var dest;
var time = moment();

//  gathering data from user
function formInput {
    name = $('name-input');
    dest = $('dest-input');

};

//  putting dates into the dropdown menu
function loadTime() {
    var time = moment()subtract(1, 'days');
    console.log(time.format('ll'));
    for (var i = 0; i < 5; i++) {
        time.add(1, 'days');
        var currentDate = $('.dates > option > value');
        if  (currentDate == i) {
            var convertedTime = time.format('ll');
            $('')
        }
        var date = $('')
        $('')
       var firstRowTds = $("table") // Get a reference to the table as a jQuery object
        .children() // Get all of table's immediate children as an array
        .eq(1) // Get element at the first index of this returned array (the <tbody>)
        .children("tr") // Get an array of all <tr> children inside the returned <tbody>
        .eq(0) // Get the 0th child of this returned array (the first <tr>)
        .children("td"); // Get an array of all <td> children inside the returned <tr>
    }
}

$(document).on('submit', '#input-btn', formInput); 