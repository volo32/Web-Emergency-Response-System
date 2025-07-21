google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    fetch('/getStats')
        .then(response => response.json())
        .then(data => {
            drawPieChart(data.incidents);
            drawBarChartUsers(data.users);
            drawBarChartVehicles(data.vehicles);
        })
        .catch(error => console.error('Error fetching stats:', error));
}

function drawPieChart(incidents) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Type');
    data.addColumn('number', 'Number');

    // add ap to api
    for (const [type, count] of Object.entries(incidents)) {
        data.addRow([type, count]);
    }

    var options = {
        title: 'Number of Incidents by Type',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

function drawBarChartUsers(users) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Role');
    data.addColumn('number', 'Number');

    data.addRows([
        ['Registered Users', users.registered],
        ['Volunteers', users.volunteers],
    ]);

    var options = {
        title: 'Number of Users and Volunteers',
        hAxis: { title: 'Role' },
        vAxis: { title: 'Number' },
        legend: { position: 'none' },
    };

    var chart = new google.visualization.BarChart(document.getElementById('barchart_users'));
    chart.draw(data, options);
}

function drawBarChartVehicles(vehicles) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Number');

    data.addRows([
        ['Vehicles', vehicles.count],
        ['Firefighters', vehicles.firefighters],
    ]);

    var options = {
        title: 'Number of Vehicles and Firefighters',
        hAxis: { title: 'Category' },
        vAxis: { title: 'Number' },
        legend: { position: 'none' },
    };

    var chart = new google.visualization.BarChart(document.getElementById('barchart_vehicles'));
    chart.draw(data, options);
}
