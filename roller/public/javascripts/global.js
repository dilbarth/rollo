// Userlist data array for filling in info box
//var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    //populateTable();

    //alert("Hi");

	$('#rollerUpButton').on('click', rollerUp);	
	$('#rollerDownButton').on('click', rollerDown);	
});

// Functions =============================================================

function rollerUp(event) {
    event.preventDefault();
    //alert("UP");
    moveRoller("up");
};

function rollerDown(event) {
    event.preventDefault();
    moveRoller("down");
};

// move roller
function moveRoller(dir) {
    // If it is, compile all user info into one object
    // var data = {
    //     'rollerIndex': -1
    // };
    var data = "";

    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: data,
        url: '/roller/' + dir,
        dataType: 'JSON'
    }).done(function( response ) {

    	alert(response.msg);
        // // Check for successful (blank) response
        // if (response.msg === '') {

        //     // Clear the form inputs
        //     $('#addUser fieldset input').val('');

        //     // Update the table
        //     populateTable();

        // }
        // else {

        //     // If something goes wrong, alert the error message that our service returned
        //     alert('Error: ' + response.msg);

        // }
    });
};
