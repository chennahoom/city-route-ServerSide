var mymap = L.map('mapid').setView([42.658694, -73.602323], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoiY2hlbm5haG9vbSIsImEiOiJja2o1cHVmM2E2MGQ3MnFsYmp5aG9lY2E4In0.9ENsXnIeUpwpf30O2vAgHA'
}).addTo(mymap);

function drawLocationsOnMap(locations){
        if(locations && locations.length > 0) {
            const latlngs = [];

            locations.forEach((location,index) => {
                    const marker = L.marker(location).addTo(mymap);
                    latlngs.push(marker.getLatLng());
                    marker.bindPopup(`<b>Stop ${index + 1}</b>`).openPopup();
            })

            const polyline = L.polyline(latlngs, {color: 'green'}).addTo(mymap);
            mymap.fitBounds(polyline.getBounds());
        }
    }

   function getTripById(tripId) {
    $.ajax({
        url: `http://localhost:5000/api/trips/${tripId}`,
        type: 'GET',
        success: function(trip) {
            drawLocationsOnMap(trip.locations)
            appendCity(trip.trip_name_city)
        }
    });
    }


    function appendCity(trip_name_city){
        $(".card-title").append(trip_name_city);

}


    window.onload = function () { 
        getTripById(localStorage.getItem("trip_id"));
           

    }



