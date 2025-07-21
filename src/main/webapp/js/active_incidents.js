
$(document).ready(function () {

    activeIncidentsGET();
});

function activeIncidentsGET(){
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                $('#activeIncidents').html(createTableFromMultipleJSONStrings(xhr.responseText));
            } else if (xhr.status !== 200) {
                $('#activeIncidents').text("There are not any active incidents");
            }
        };

        xhr.open('GET', 'ActiveIncidents', true);
        xhr.send();

}


function createTableFromMultipleJSONStrings(jsonStrings) {

    let dataArray;
    try {
        dataArray = JSON.parse(jsonStrings);
    } catch (error) {
        return "<p>Invalid JSON array provided.</p>";
    }


    const desiredHeaders = ["incident_type", "description", "municipality", "start_datetime", "status"];


    let html = "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    html += "<tr>";


    desiredHeaders.forEach(header => {
        html += `<th>${header.replace("_",' ')}</th>`;
    });
    html += "</tr>";


    dataArray.forEach(item => {
        html += "<tr>";
        desiredHeaders.forEach(header => {

            const key = header.toLowerCase().replace(/ /g, "_");
            html += `<td>${item[key] || ""}</td>`;
        });
        html += "</tr>";
    });


    html += "</table>";
    return html;
}
