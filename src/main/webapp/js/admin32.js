

/*function createTableFromMultipleJSONStrings(jsonStrings) {
        // Parse the JSON array string into an object
        let dataArray;
        try {
            dataArray = JSON.parse(jsonStrings);
        } catch (error) {
            return "<p>Invalid JSON array provided.</p>";
        }

        // Start the HTML table
        let html = "<table border='1' style='border-collapse: collapse; width: 100%;'>";
        html += "<tr>";
        // Generate the table headers dynamically from the first object's keys
        const headers = Object.keys(dataArray[0] || {});
        headers.forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += "</tr>";

        // Loop through each object in the array to create rows
        dataArray.forEach(item => {
            html += "<tr>";
            headers.forEach(header => {
                html += `<td>${item[header] || ""}</td>`;
            });
            html += "</tr>";
        });

        // Close the table
        html += "</table>";
        return html;
    }*/

function loadIncidents() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#tables-field').html(createEditableTableFromJSONArray(xhr.responseText));
        } else if (xhr.status !== 200) {
            $('#tables-field').text("There are not any incidents");
        }
    };

    xhr.open('GET', 'AdminIncidents', true);
    xhr.send();
}

/*function createEditableTableFromJSONArray(jsonArrayString) {
    // Parse the JSON array string into an object
    let dataArray;
    try {
        dataArray = JSON.parse(jsonArrayString);
    } catch (error) {
        return "<p>Invalid JSON array provided.</p>";
    }

    // Start the HTML table
    let html = "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    html += "<tr>";
    // Generate the table headers dynamically from the first object's keys
    const headers = Object.keys(dataArray[0] || {});
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += "</tr>";

    // Loop through each object in the array to create rows
    dataArray.forEach(item => {
        html += "<tr>";
        headers.forEach(header => {
            html += `<td contenteditable="true">${item[header] || ""}</td>`;
        });
        html += "</tr>";
    });

    // Close the table
    html += "</table>";
    return html;
}*/

function createEditableTableFromJSONArray(jsonArrayString) {

    let dataArray;
    try {
        dataArray = JSON.parse(jsonArrayString);
    } catch (error) {
        return "<p>Invalid JSON array provided.</p>";
    }


    const statusOptions = ["submitted","running", "fake", "finished",];


    let html = "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    html += "<tr>";
    // Generate the table headers dynamically from the first object's keys
    const headers = Object.keys(dataArray[0] || {});
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += "</tr>";


    dataArray.forEach(item => {
        html += "<tr>";
        headers.forEach(header => {
            if (header === "status") {

                html += "<td>";
                html += `<select>`;
                statusOptions.forEach(option => {
                    const selected = item[header] === option ? "selected" : "";
                    html += `<option value="${option}" ${selected}>${option}</option>`;
                });
                html += "</select>";
                html += "</td>";
            } else {

                html += `<td contenteditable="true">${item[header] || ""}</td>`;
            }
        });
        html += "</tr>";
    });

    html += "</table>";
    return html;
}


function extractTableDataAsJSON() {
    const table = document.querySelector("table");
    const headers = Array.from(table.querySelectorAll("th")).map(th => th.textContent);
    const rows = Array.from(table.querySelectorAll("tr")).slice(1); // Skip header row
    const jsonData = rows.map(row => {
        const cells = row.querySelectorAll("td");
        const rowData = {};
        headers.forEach((header, index) => {
            const cell = cells[index];
            const selectElement = cell.querySelector("select");
            if (selectElement) {

                rowData[header] = selectElement.value.toString();
            } else {

                rowData[header] = cell.textContent.trim();
            }
        });
        return rowData;
    });
    console.log(JSON.stringify(jsonData));

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#CheckStatus').text("Successfully saved the changes");
        } else if (xhr.readyState === 4 && xhr.status === 207) {
            $('#CheckStatus').text("Some changes have been saved");
        } else if (xhr.status === 500) {
            $('#CheckStatus').text("Couldn't save the changes");
        }
    };

    xhr.open('PUT', 'AdminIncidents', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(jsonData));
}


function showFieldsForNewIncident() {
    // Ελέγχει αν υπάρχει ήδη η φόρμα
    if ($('#IncidentRegister').find('input, button').length > 0) {
        return; // Αν υπάρχει, δεν δημιουργεί νέα
    }

    const incident_type = $('<input>').attr({
        type: 'text',
        name: 'incident_type',
        id: 'incident_type',
        placeholder: 'incident_type'
    });
    const description = $('<input>').attr({
        type: 'text',
        name: 'description',
        id: 'description',
        placeholder: 'description'
    });
    const address = $('<input>').attr({
        type: 'text',
        name: 'address',
        id: 'address',
        placeholder: 'address'
    });
    const municipality = $('<input>').attr({
        type: 'text',
        name: 'municipality',
        id: 'municipality',
        placeholder: 'municipality'
    });
    const prefecture = $('<input>').attr({
        type: 'text',
        name: 'prefecture',
        id: 'prefecture',
        placeholder: 'prefecture'
    });
    const danger = $('<input>').attr({
        type: 'text',
        name: 'danger',
        id: 'danger',
        placeholder: 'danger'
    });
    const submitIncident = $('<button>').attr({
        type: 'button',
        name: 'submitIncident',
    }).text('Καταχώρηση Περιστατικού')
        .on('click', function () {
            adminIncidentPOST();
        });

    $('#IncidentRegister').append(incident_type, description, address, municipality, prefecture, danger, submitIncident);
}

function adminIncidentPOST() {
    let requiredFields = ['incident_type', 'description', 'address', 'municipality', 'prefecture', 'danger'];
    let missingFields = [];

    requiredFields.forEach(field => {
        let inputElement = document.getElementById(field);
        if (!inputElement || inputElement.value.trim() === '') {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        document.getElementById('CheckStatus').innerHTML =
            "Παρακαλώ συμπληρώστε τα λοιπά πεδία";
        return;
    }

    let myForm = document.getElementById('adminIncidentRegister');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data['user_phone'] = '2813407000';
    data['user_type'] = 'admin';
    data['lat'] = '35.2975689';
    data['lon'] = '25.0787173';
    data['status'] = 'running';
    var jsonData = JSON.stringify(data);
    console.log("Data to send:", jsonData);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('CheckStatus').innerHTML = "Επιτυχής καταχώρηση!";
        } else if (xhr.status !== 200) {
            document.getElementById('CheckStatus')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>" +
                JSON.stringify(xhr.responseText);
        }
    };
    xhr.open('POST', 'AdminIncidents', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function loadMessages() {
    window.location.href ='messages.html';
}

function loadVolunteers() {

}
