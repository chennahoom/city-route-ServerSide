var mymap = L.map('mapid').setView([42.658694, -73.602323], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoiY2hlbm5haG9vbSIsImEiOiJja2o1cHVmM2E2MGQ3MnFsYmp5aG9lY2E4In0.9ENsXnIeUpwpf30O2vAgHA'
}).addTo(mymap);

function drawLocationsOnMap(locations,stops){
        const stopsArray = stops.split(',');
        if(locations && locations.length > 0) {
            const latlngs = [];
            locations.forEach((location, index) => {
                    const marker = L.marker(location).addTo(mymap);
                    latlngs.push(marker.getLatLng());
                    marker.bindPopup(`<b>Stop ${stopsArray[index]}</b>`).openPopup();
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
                getUser(localStorage.getItem("user_id"));    
            }
        });
    }

    function getUser(userId){
        $.ajax({
            url: `http://localhost:5000/api/users/${userId}`,
            type: 'GET',
            success: function(data) {
                updateUser(data);    
            }
        });
    }

    function updateUser(user){
        var mytrips = [];
        
        $.each(user.my_trips, function(index){
            mytrips[index] = user.my_trips[index];
        })
        var new_trip = localStorage.getItem("trip_id");
        mytrips.push(new_trip);
;
        const info = {
            my_trips: mytrips,
        }
        updateUsers(user.id, info);
    }

    function updateUsers(userId, info){        
        $.ajax({
            url: `http://localhost:5000/api/users/${userId}`,
            type: 'PUT',
            data: info,
            success: function(data) {
                window.location.replace("./article.html")   
            }
        });
    }
    

   function getTripById(tripId) {
    $.ajax({
        url: `http://localhost:5000/api/trips/${tripId}`,
        type: 'GET',
        success: function(trip){
            getTourGuideById(trip.tour_guide_id)
            drawLocationsOnMap(trip.locations,trip.stops)
            appendCity(trip.trip_name_city)
            appendTourDate(trip.tour_date)
            appendTourTime(trip.tour_time)
            appendTourStartTime(trip.start_time)
            appendSpacesLeft(trip.spaces_left)
            appendStops(trip.stops)

        }
    });
    }

    function getTripByIdNumTickets(tripId, numTickets) {
        if (localStorage.getItem("user_type") === "Traveler") {
            $.ajax({
                url: `http://localhost:5000/api/trips/${tripId}`,
                type: 'GET',
                success: function(trip) {
                    numOfTickets(trip , numTickets)
                }
            });
        
        }else {
           alert("You don't have the permission to be added to this trip. Please contact admin.");
        }
 }

    
    function getTourGuideById(userId) {
        $.ajax({
             url: `http://localhost:5000/api/users/${userId}`,
             tpe: 'GET',
                success: function(userData) {
                 guideDetails = userData;
                 appendTourGuide(userData.full_name)
                }
            });
    }

    function numOfTickets(trip, numTickets){
        if (trip.spaces_left >= numTickets){
            
            const info = {
                spaces_left: parseInt(trip.spaces_left) - parseInt(numTickets),
            }
            updateSpace(trip.id, info);
        }
        else{
            $("#ticketsError").html(`This trip is sold out. You can try contacting our tour guide, ${guideDetails.full_name} at ${guideDetails.phone}.`).addClass("error-msg");
            $("#ticketsError").css("color","red");
        }
    }

    function appendCity(trip_name_city){
        $("#tour-city").append(trip_name_city);
    }

    function appendTourGuide(tour_guide_id){
        $("#tour-guide").append(tour_guide_id);
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



