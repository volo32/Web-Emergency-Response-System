function isLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#LoginForm").load("info.html");
            InfoGET();
            $('#incidentRegisterUser').load("incidentsUser.html");
            console.log(xhr.responseText);


            loadChatWidget();
        }
    };
    xhr.open('GET', 'LoginUser');
    xhr.send();
}
