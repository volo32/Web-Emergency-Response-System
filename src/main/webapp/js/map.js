function initMap() {

    const center = { lat: 35.3387, lng: 25.1442 }; // π.χ. Ηράκλειο, Κρήτη

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });

    fetch("/YourServletEndpoint")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch incidents");
            }
            return response.json();
        })
        .then((data) => {
            data.incidents.forEach((incident) => {
                const marker = new google.maps.Marker({
                    position: { lat: incident.lat, lng: incident.lng },
                    map: map,
                    title: incident.title,
                    icon: {
                        url: "https://img.icons8.com/color/48/000000/fire-element.png",
                        scaledSize: new google.maps.Size(40, 40),
                    },
                });


                const infoWindow = new google.maps.InfoWindow({
                    content: `<h4>${incident.title}</h4><p>${incident.description}</p>`,
                });


                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching incidents:", error);
        });


    document.getElementById("resetMap").addEventListener("click", () => {
        map.setCenter(center);
        map.setZoom(12);
    });

    document.getElementById("zoomIn").addEventListener("click", () => {
        map.setZoom(map.getZoom() + 1);
    });


    document.getElementById("zoomOut").addEventListener("click", () => {
        map.setZoom(map.getZoom() - 1);
    });
}
