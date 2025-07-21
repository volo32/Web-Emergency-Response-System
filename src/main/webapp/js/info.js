
function InfoGET(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#infoBox').html(createTableFromJSONString(xhr.responseText));
        } else if (xhr.status !== 200) {
            $('#infoBox').text("Couldn't find your Data");
        }
    };
    xhr.open('GET','InfoUser',true);
    xhr.send();
}

function InfoPUT(){
        const table = document.querySelector("table");
        const headers = Array.from(table.querySelectorAll("th")).map(th => th.textContent);
        const rows = Array.from(table.querySelectorAll("tr")).slice(1); // Skip header row
        const jsonData = rows.map(row => {
            const cells = row.querySelectorAll("td");
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = cells[index].textContent;
            });
            return rowData;
        });
        console.log(JSON.stringify(jsonData));




        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                $('#msgLogout').text("Successfully saved the changes");
            } else if (xhr.status === 403) {
                $('#msgLogout').text("Couldn't save the changes");
            }
        };

        xhr.open('PUT', 'InfoUser', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(jsonData).slice(1,-1));

}

function Logout(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#msgLogout').text("Successfully Logged out");
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1000);
        } else if (xhr.status !== 200) {
            $('#msgLogout').text("Couldn't Logout");
        }
    };
    xhr.open('GET','LogoutUser',true);
    xhr.send();
}

/*$(document).ready(function () {
    // Trigger InfoGET when the document is ready
    InfoGET();
});*/