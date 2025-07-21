function showNotification(incidentId, incidentDetails) {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.style.cssText = `
        background: #ffeb3b;
        padding: 15px;
        margin-bottom: 10px;
        border: 1px solid #ff9800;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #000;
        font-size: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    notification.innerHTML = `
        <div>
            <strong>New Incident</strong><br>
            ${incidentDetails}
        </div>
        <div>
            <button class="accept-btn" style="margin-right: 5px; background: #4caf50; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Accept</button>
            <button class="decline-btn" style="background: #f44336; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Decline</button>
        </div>
    `;

    notificationContainer.appendChild(notification);


    notification.querySelector('.accept-btn').addEventListener('click', () => {
        handleAcceptIncident(incidentId);
        notification.remove();
    });

    notification.querySelector('.decline-btn').addEventListener('click', () => {
        handleDeclineIncident(incidentId);
        notification.remove();
    });

//timeout sto notify sta 30 secs
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 30000);
}

function handleAcceptIncident(incidentId) {
    console.log(`Incident ${incidentId} accepted`);
    // PAIKSE MPALA ME BACKEND
    fetch(`/api/incidents/${incidentId}/accept`, {
        method: 'POST',
    }).then(response => {
        if (response.ok) {
            alert('You accepted the incident!');
        }
    }).catch(err => console.error(err));
}

function handleDeclineIncident(incidentId) {
    console.log(`Incident ${incidentId} declined`);
    // MPALA BACKEND
    fetch(`/api/incidents/${incidentId}/decline`, {
        method: 'POST',
    }).then(response => {
        if (response.ok) {
            alert('You declined the incident.');
        }
    }).catch(err => console.error(err));
}

function fetchNewIncidents() {
    fetch('/api/incidents/active')
        .then(response => response.json())
        .then(incidents => {
            incidents.forEach(incident => {
                showNotification(incident.id, `Type: ${incident.type}, Location: ${incident.location}`);
            });
        })
        .catch(err => console.error('Failed to fetch new incidents:', err));
}

setInterval(fetchNewIncidents, 30000);
fetchNewIncidents();
