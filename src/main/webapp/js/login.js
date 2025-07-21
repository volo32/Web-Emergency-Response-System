


function loginPOST() {
    $('#CheckLogin').text("Attempting to login...");
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#CheckLogin').text("Successfully logged in");
            $('#infoContent').load("info.html");
            InfoGET();
            $('#incidentRegisterUser').load("incidentsUser.html");

            loadChatWidget();
        } else if (xhr.status !== 200) {
            $('#CheckLogin').text("Invalid credentials");
        }
    };

    var data = $('#LoginForm').serialize();
    xhr.open('POST', 'LoginUser', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

