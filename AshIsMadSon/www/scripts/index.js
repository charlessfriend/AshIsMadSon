// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        $("#resultContainer").hide();
        $("#noresult").hide();
        $("#btnSearch").click( function() { searchClick(); });

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };


function searchClick() {
    var options = new ContactFindOptions();
    options.filter = $("#searchInput").val();
    if (options.filter == "") return;
    var fields = ["displayName", "name", "phoneNumbers", "emails", "addresses"];
    navigator.contacts.find(fields, onSuccess, onError, options);

}

function onSuccess(contacts) {
    if (contacts.length == 0) {
        $("#noresult").show();
        $("#resultContainer").hide();
        return;
    }

    $("#noresult").hide();
    $("#resultContainer").show();

    for (var i = 0; i < contacts.length; i++) {
        console.log("Display Name = " + contacts[i].displayName);
        $("#resultFirstName").text(contacts[i].name.givenName);
        $("#resultLastName").text(contacts[i].name.familyName);

        displayPhoneNumber(contacts[i]);
        displayEmail(contacts[i]);
        displayAddress(contacts[i]);
    }
}

function displayPhoneNumber(contact) {
    if (contact.phoneNumbers == null) return;
    for (var j = 0; j < contact.phoneNumbers.length; j++) {
        if (contact.phoneNumbers[j].type == "mobile") {
            $("#resultPhone").text(contact.phoneNumbers[0].value);
            return;
        } else {
            if (contact.phoneNumbers[j].type == "home" && contact.phoneNumbers[j].value != "") {
                $("#resultPhone").text(contact.phoneNumbers[0].value);
            }
        }
    }
}

function displayEmail(contact) {
    if (contact.emails == null) return;
    for (var j = 0; j < contact.emails.length; j++) {
        if (contact.emails[j].type == "personal") {
            $("#resultEmail").text(contact.emails[0].value);
            return;
        } else {
            if (contact.emails[j].type == "work" && contact.emails[j].value != "") {
                $("#resultEmail").text(contact.emails[0].value);
            }
        }
    }
}

function displayAddress(contact) {
    if (contact.addresses == null) return;
    for (var j = 0; j < contact.addresses.length; j++) {
        if (contact.addresses[j].type == "home") {
            $("#resultAddress").text(contact.addresses[0].streetAddress);
            $("#resultAddress2").text(contact.addresses[0].locality + ", " + contact.addresses[0].region + " " + contact.addresses[0].postalCode);
            return;
        } else {
            if (contact.addresses[j].type == "work" && contact.addresses[j].value != "") {
                $("#resultAddress").text(contact.addresses[0].value);
                $("#resultAddress2").text(contact.addresses[0].locality + ", " + contact.addresses[0].region + " " + contact.addresses[0].postalCode);
            }
        }
    }
}


// onError: Failed to get the contacts

function onError(contactError) {
    alert('onError!');
}


})();
