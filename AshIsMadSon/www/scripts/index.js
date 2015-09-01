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



})();


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
        var name = checkForNull(contacts[i].name.givenName, contacts[i].name.familyName); 
        $("#resultFirstName").text(name);
        displayPhoneNumber(contacts[i]);
        displayEmail(contacts[i]);
        displayAddress(contacts[i]);
    }
}

function displayPhoneNumber(contact) {
    if (contact.phoneNumbers == null) return;
    var phoneNumbers = "";
    for (var j = 0; j < contact.phoneNumbers.length; j++) {
        phoneNumbers += contact.phoneNumbers[j].value + "\n";
    }
    $("#resultPhone").text(phoneNumbers);

}

function displayEmail(contact) {
    if (contact.emails == null) return;
    var email = "";
    for (var j = 0; j < contact.emails.length; j++) {
        email += contact.emails[j].value + "\n";
    }
    $("#resultEmail").text(checkForNull(email, ""));

}

function displayAddress(contact) {
    if (contact.addresses == null || contact.addresses.length < 1)
        $("#resultAddress").text("");
    else
        $("#resultAddress").text(
            checkForNull(contact.addresses[0].streetAddress, "\n") + 
            checkForNull(contact.addresses[0].locality, ", ") +
            checkForNull(contact.addresses[0].region, " ") +
            checkForNull(contact.addresses[0].postalCode));
}


function checkForNull(value, suffix) {
    if (value == null) return "";
    if (value.trim() == "") return "";
    if (suffix == null) suffix = "";
    return value.trim() + suffix;
}

function onError(contactError) {
    alert('onError!');
}

$(function() {
    $("#searchInput").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            searchClick();
            return false;
        } else {
            return true;
        }
    });
});