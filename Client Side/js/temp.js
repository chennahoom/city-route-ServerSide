$(function() {
    operationsListeners();
});

function getAllTrips(){
    $.ajax({
        url: 'http://localhost:5000/api/trips',
        type: 'GET',
        success: function(trips){
            showAllTrips(trips);
        }
    });
}

function getAllTripCity(city, dstart,dend){
    $.ajax({
        url: 'http://localhost:5000/api/trips',
        type: 'GET',
        success: function(trips){
            filterCity(trips, city, dstart,dend);
        }
    });
}

function getTripById(tripId) {
    $.ajax({
        url: `http://localhost:5000/api/trips/${tripId}`,
        type: 'GET',
        success: function(trip) {
            showTrip(trip);
        }
    });
}

function deleteTripById(tripId) {
    $.ajax({
        url: `http://localhost:5000/api/trips/${tripId}`,
        type: 'DELETE',
        success: function(trip) {
            deleteTrip(trip);
        }
    });
}

function addTrip(info) {
    $.ajax({
        url: `http://localhost:5000/api/trips`,
        type: 'POST',
        data: info,
        success: function(trip) {
            addNewTrip(trip);
        }
    });
}

function updateTripById(tripId, info) {
    $.ajax({
        url: `http://localhost:5000/api/trips/${tripId}`,
        type: 'PUT',
        data: info,
        success: function(data) {
            updateTrip(data);
        }
    });
}

function updateTrip(trip) {
    $("#trips-result").empty();
    $("#trips-result").append(
        '<p>Trip number '+ trip.id +' was succesfully updated <p>'
    );
    getAllTrips();
}

function addNewTrip(trip) {
    $("#trips-result").empty();

    $("#trips-result").append(
        '<p>Trip number '+ trip.id +' was succesfully created <p>'
    );
    getAllTrips();
}

function showTrip(trip){
    $("#trips-result").empty();
    $("#trips-result").append(
        '<p>' +
        'ID: ' + trip.id + '<br>' +
        'tour guide: ' + trip.tour_guide + '<br>' +
        'trip name city: '  + trip.trip_name_city + '<br>' +
        'tour date: ' + trip.tour_date + '<br>' +
        'tour time: ' + trip.tour_time + '<br>' +
        'start time: ' + trip.start_time + '<br>' +
        'spaces left: ' + trip.spaces_left + '<br>' +
        '<br><p>'
    );
}

function showAllTrips(trip){
    trip.forEach(trip => {
        $("#All-trips").append(
            '<p>' +
            'ID: ' + trip.id + '<br>' +
            'tour guide: ' + trip.tour_guide + '<br>' +
            'trip name city: '  + trip.trip_name_city + '<br>' +
            'tour date: ' + trip.tour_date + '<br>' +
            'tour time: ' + trip.tour_time + '<br>' +
            'start time: ' + trip.start_time + '<br>' +
            'spaces left: ' + trip.spaces_left + '<br>' +
            '<br><p>'    
        );
    });
}

function deleteTrip(trip) {
    $("#trips-result").empty();

    $("#trips-result").append(
        '<p>Trip number '+ trip.id +' was succesfully deleted <p>'
    );
    getAllTrips();
}

// function filterCity(trip,city,dstsrt,dend) {
//     var startDate, endDate;
//     var result= trip.tour_date.filer(function(obj) {
//         return obj.date >= startDate && obj.data <= endDate;
//     });

//     console.log(result);
// }

function filterCity(trip, city, dstart, dend){
    console.log(trip);
    var fDate,lDate,cDate;
    fDate = dstart.split('/');
    lDate = dend.split('/');
    trip.forEach(trip => {
        if(trip.trip_name_city === city){
            cDate = trip.tour_date.split('/');
            if(cDate[2] < lDate[2] && cDate[2] > fDate[2]){
                appendTrips(trip);
            }
            else if(cDate[2] == lDate[2] || cDate[2] == fDate[2]){
                if (cDate[1] < lDate[1] && cDate[1] > fDate[1]){
                    appendTrips(trip);
                }
                else if(cDate[1] == lDate[1] || cDate[1] == fDate[1]){
                    if(cDate[0] <= lDate[0] && cDate[0] >= fDate[0]){
                        appendTrips(trip);

                    }
                    else if(cDate[0] == lDate[0] || cDate[0] == fDate[0]){
                        appendTrips(trip);
                    }
                }
            }
        }
    })
}

function appendTrips(trip){
    $("#All-trips").append(
        '<p>' +
        'ID: ' + trip.id + '<br>' +
        'tour guide: ' + trip.tour_guide + '<br>' +
        'trip name city: '  + trip.trip_name_city + '<br>' +
        'tour date: ' + trip.tour_date + '<br>' +
        'tour time: ' + trip.tour_time + '<br>' +
        'start time: ' + trip.start_time + '<br>' +
        'spaces left: ' + trip.spaces_left + '<br>' +
        '<br><p>'    
    );
}


function operationsListeners(){
    $("#get-all-t").click(() => {
        $("#trips-result").empty();
        $("form").css("display", "block");
        $("#get-delete-form").css("display", "none");
        $("#put-post-form").css("display", "none");
        $("#submit-temp").css("display", "none");
        $("#get-filter").css("display", "none");
        getAllTrips();
    });

    $("#get-by-id-t").click(() => {
        $("#trips-result").empty();
        $("#All-trips").empty();
        $("form").css("display", "block");
        $("#get-delete-form").css("display", "block");
        $("#put-post-form").css("display", "none");
        $("#submit-temp").css("display", "block");
        $("#get-filter").css("display", "none");
        $("#submit-temp").text("Get");
    });

    $("#delete-t").click(() => {
        $("#trips-result").empty();
        $("#All-trips").empty();
        $("form").css("display", "block");
        $("#get-delete-form").css("display", "block");
        $("#put-post-form").css("display", "none");
        $("#submit-temp").css("display", "block");
        $("#get-filter").css("display", "none");
        $("#submit-temp").text("Delete");
    });

    $("#add-t").click(() => {
        $("#trips-result").empty();
        $("#All-trips").empty();
        $("form").css("display", "block");
        $("#get-delete-form").css("display", "none");
        $("#put-post-form").css("display", "block");
        $("#submit-temp").css("display", "block");
        $("#get-filter").css("display", "none");
        $("#submit-temp").text("Add");
    });

    $("#update-t").click(() => {
        $("#trips-result").empty();
        $("#All-trips").empty();
        $("form").css("display", "block");
        $("#get-delete-form").css("display", "block");
        $("#put-post-form").css("display", "block");
        $("#submit-temp").css("display", "block");
        $("#get-filter").css("display", "none");
        $("#submit-temp").text("Update");
    });

    $("#filter").click(() => {
        $("#trips-result").empty();
        $("#All-trips").empty();
        $("form").css("display", "block");
        $("#get-delete-form").css("display", "none");
        $("#put-post-form").css("display", "none");
        $("#submit-temp").css("display", "block");
        $("#get-filter").css("display", "block");
        $("#submit-temp").text("Filter");

    })

    $("#submit-temp").click(() => {
        if ($("#submit-temp").text() === "Get") {
            const tripId = $("#trip-id").val();
            getTripById(tripId);
        }
        else if ($("#submit-temp").text() === "Delete") {
            const tripId = $("#trip-id").val();
            deleteTripById(tripId);
        } 
        else if ($("#submit-temp").text() === "Add") {
            const info = {
                tour_guide: $("#trip-tour-guide").val(),
                trip_name_city:  $("#trip-name-city").val(),
                tour_date:  $("#trips-tour-date").val(),
                tour_time:  $("#trips-tour-time").val(),
                start_time:  $("#trips-start-time").val(),
                spaces_left:  $("#trips-spaces-left").val()
            }
            addTrip(info);
        } 
        else if ($("#submit-temp").text() === "Update") {
            const tripId = $("#trip-id").val();
            const info = {
                tour_guide: $("#trip-tour-guide").val(),
                trip_name_city:  $("#trip-name-city").val(),
                tour_date:  $("#trips-tour-date").val(),
                tour_time:  $("#trips-tour-time").val(),
                start_time:  $("#trips-start-time").val(),
                spaces_left:  $("#trips-spaces-left").val()
            }
            updateTripById(tripId, info);
        }

        else if($("#submit-temp").text() === "Filter"){
            const city = $("#filter-city").val();
            const dstart = $("#start-trip").val();
            const dend = $("#end-trip").val();
            getAllTripCity(city, dstart,dend);
        }
    });
}