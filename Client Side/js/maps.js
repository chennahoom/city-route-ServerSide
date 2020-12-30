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

    function updateSpace(tripId, info){
        $.ajax({
            url: `http://localhost:5000/api/trips/${tripId}`,
            type: 'PUT',
            data: info,
            success: function(data) {
                console.log("ariel here");
                getUser(data);    
            }
        });
    }

    function getUser(userId){
        console.log("chen here");
        $.ajax({
            url: `http://localhost:5000/api/users/${userId}`,
            type: 'GET',
            success: function(data) {
                console.log("ariel here");
                updateUser(data);    
            }
        });
    }

    function updateUser(user){
        console.log("Im here");
        var info = parseInt(user.my_trips) + parseInt(localStorage.getItem(trip_id));
        console.log(info);
        updateUsers(user, info);
    }

    function updateUsers(userId, info){        
        $.ajax({
            url: `http://localhost:5000/api/trips/${userId}`,
            type: 'PUT',
            data: info,
            success: function(data) {
                // updateTrip(data); 
                window.location.replace("./article.html")   
            }
        });
    }
    

   function getTripById(tripId) {
    $.ajax({
        url: `http://localhost:5000/api/trips/${tripId}`,
        type: 'GET',
        success: function(trip) {
            drawLocationsOnMap(trip.locations)
            appendCity(trip.trip_name_city)
            appendTourGuide(trip.tour_guide)
            appendTourDate(trip.tour_date)
            appendTourTime(trip.tour_time)
            appendTourStartTime(trip.start_time)
            appendSpacesLeft(trip.spaces_left)
            appendStops(trip.stops)

        }
    });
    }

    function getTripByIdNumTickets(tripId,numTickets) {
        $.ajax({
            url: `http://localhost:5000/api/trips/${tripId}`,
            type: 'GET',
            success: function(trip) {
                numOfTickets(trip , numTickets)
            }
        });
        }

    function numOfTickets(trip, numTickets){
        const info = {
            spaces_left: parseInt(trip.spaces_left) - parseInt(numTickets),
            // my_trips: my_trips + trip.id,
        }
        if(numTickets === 1 && info.spaces_left === 1){
            console.log("gggg");
            updateSpace(trip.id, info);
        }
        else if(numTickets >= info.spaces_left){
            console.log("gggg");

            $("#ticketsError").html("Sold Out").addClass("error-msg");
            $("#ticketsError").css("color","red");
        }
        else{
            console.log("gggg");

            updateSpace(trip.id, info);
        }
    }

    function appendCity(trip_name_city){
        $("#tour-city").append(trip_name_city);
    }

    function appendTourGuide(tour_guide){
        $("#tour-guide").append(tour_guide);
    }

    function appendTourDate(tour_date){
        $("#tourDate").append(tour_date);
    }

    function appendTourTime(tour_time){
        $("#tourTime").append(tour_time);
    }

    function appendTourStartTime(start_time){
        $("#startTime").append(start_time);
    }

    function appendSpacesLeft(spaces_left){
        $("#spacesLeft").append(spaces_left);
    }

    function appendStops(stops){
        $("#trip-stops").append(stops);
    }


    window.onload = function () { 
        getTripById(localStorage.getItem("trip_id"));
        var numTickets = "";
        $("#save-tickets").click(() => {
            numTickets = $("#spaces").val();
            getTripByIdNumTickets(localStorage.getItem("trip_id"), numTickets);
        })
    }



