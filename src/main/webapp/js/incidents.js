
function addIncidentUser(){
    let myForm = document.getElementById('incidentForm');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data['danger']='unknown';
    data['status']='submitted';
    var jsonData=JSON.stringify(data);
    console.log("Data to send:", jsonData);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('msg').innerHTML="Successfully registered incident";
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
                JSON.stringify(xhr.responseText);
        }
    };
    xhr.open('POST', 'IncidentRegister',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function addIncidentGuest(){
    let myForm = document.getElementById('incidentGuestForm');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data['danger']='unknown';
    data['status']='submitted';
    var jsonData=JSON.stringify(data);
    console.log("Data to send:", jsonData);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('msg').innerHTML="Successfully registered incident";
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
                JSON.stringify(xhr.responseText);
        }
    };
    xhr.open('POST', 'IncidentRegister',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}


function getIncidents(){
    $('#msgGet').text("Attempting to login...");
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#msgGet').text("Successfully get request");
        }else if (xhr.status !== 200) {
            $('#msgGet').text("Invalid credentials");
        }
    };
    var data = $('#incidentGet').serialize();
    xhr.open('GET', 'IncidentRegister?'+data,true);
    xhr.send();
}



function putIncident(){
    $('#msgPut').text("Attempting to update...");
    let myForm = document.getElementById('incidentPut');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#msgPut').text("Successfully get request");
        }else if (xhr.status !== 200) {
            $('#msgPut').text("Invalid credentials");
        }
    };

    xhr.open('PUT', 'IncidentRegister',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}


function delIncident(){
    $('#msgDel').text("Attempting to update...");
    let myForm = document.getElementById('incidentDel');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#msgDel').text("Successfully deleted");
        }else if (xhr.status !== 200) {
            $('#msgDel').text("Invalid credentials");
        }
    };

    xhr.open('DELETE', 'IncidentRegister',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}