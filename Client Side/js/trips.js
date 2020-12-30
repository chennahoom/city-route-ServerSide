$(function() {
    operationsListeners();
    
});

// function getTripById(tripId) {
//     $.ajax({
//         url: `http://localhost:5000/api/trips/${tripId}`,
//         type: 'GET',
//         success: function(trip) {
//             showTrip(trip);
//         }
//     });
// }


// function getAllTripCity(city, dstart,dend){
//     $.ajax({
//         url: 'http://localhost:5000/api/trips',
//         type: 'GET',
//         success: function(trips){
//             filterCity(trips, city, dstart,dend);
//         }
//     });
// }

// function upateSpace(tripId, info){
//     $.ajax({
//         url: `http://localhost:5000/api/trips/${tripId}`,
//         type: 'PUT',
//         data: info,
//         success: function(data) {
//             updateTrip(data);
//         }
//     });
// }

// function updateTrip(trip) {
//     $("#trips-result").empty();
//     $("#trips-result").append(
//         '<p>Your register to trip number '+ trip.id +' was succesfully updated <p>'
//     );
// }

// function filterCity(trip, city, dstart, dend){
//     var fDate,lDate,cDate;
//     fDate = dstart.split('/');
//     lDate = dend.split('/');
//     trip.forEach(trip => {
//         if(trip.trip_name_city === city){
//             cDate = trip.tour_date.split('/')
//             if(cDate[2] < lDate[2] && cDate[2] > fDate[2]){
//                 appendTrips(trip);
//             }
//             else if(cDate[2] == lDate[2] && cDate[2] == fDate[2]){
//                 if (cDate[1] < lDate[1] && cDate[1] > fDate[1])
//                     appendTrips(trip);
//                 else if(cDate[1] == lDate[1] && cDate[1] == fDate[1]){
//                     if(cDate[0] == fDate[0] && cDate[0] < lDate[0])
//                         appendTrips(trip);
//                     else if(cDate[0] > fDate[0] && cDate[0] < lDate[0])
//                         appendTrips(trip);
//                     else if(cDate[0] > fDate[0] && cDate[0] == lDate[0])
//                         appendTrips(trip);
//                     else if(cDate[0] == fDate[0] && cDate[0] == lDate[0])
//                         appendTrips(trip);
//                 }
//                 else if(cDate[1] < lDate[1] && cDate[1] == fDate[1]){
//                     if(cDate[0] >= fDate[0])
//                         appendTrips(trip);
//                 }
//                 else if(cDate[1] == lDate[1] && cDate[1] > fDate[1]){
//                     if(cDate[0] <= lDate[0])
//                         appendTrips(trip);
//                 }
//             }
//             else if(cDate[2] < lDate[2] && cDate[2] == fDate[2]){
//                 if (cDate[1] > fDate[1])
//                     appendTrips(trip);
//                 else if(cDate[1] == fDate[1]){
//                     if(cDate[0] >= fDate[0])
//                         appendTrips(trip);
//                 }
//             }
//             else if(cDate[2] == lDate[2] && cDate[2] > fDate[2]){
//                 if (cDate[1] < lDate[1])
//                     appendTrips(trip);
//                 else if(cDate[1] == lDate[1]){
//                     if(cDate[0] <= lDate[0])
//                         appendTrips(trip);
//                 }
//             }
//         }
//     });
// }

// function appendTrips(trip){
    
//     console.log("fffff");
//     // $(".card-title").append(trip.id);
//     $("#All-trips").append(
//         '<p>' +
//         'ID: ' + trip.id + '<br>' +
//         'tour guide: ' + trip.tour_guide + '<br>' +
//         'trip name city: '  + trip.trip_name_city + '<br>' +
//         'tour date: ' + trip.tour_date + '<br>' +
//         'tour time: ' + trip.tour_time + '<br>' +
//         'start time: ' + trip.start_time + '<br>' +
//         'spaces left: ' + trip.spaces_left + '<br>' +
//         'stops: ' + trip.stops + '<br>' +

//         '<button class=join-trip id='+ trip.id+' >Join Trip</button>'+
//         '<br><p>'    
//     );
//     $(".join-trip").click(function(event){
//         event.preventDefault();
//         localStorage.setItem("trip_id", this.id);
//         window.location.replace("./maps.html")
//         //getTripById(this.id);
//       });
// }

// function showTrip(trip){
//     const info = {
//         spaces_left: parseInt(trip.spaces_left) - 1,
//     }
//     upateSpace(trip.id, info);
// }



function operationsListeners(){
    $("#submit").click(() => {
        $("form").css("display", "block");
        $("#get-delete-form").css("display", "none");
        $("#put-post-form").css("display", "none");
        $("#join-trip").css("display", "block");
        $("#submit").css("display", "block");
        $("#get-filter").css("display", "block");

    })

    $("#submit").click(function(event) {
        event.preventDefault();
        const city = $("#filter-city").val();
        const dstart = $("#start-trip").val();
        const dend = $("#end-trip").val();
        localStorage.setItem("city", city);
        localStorage.setItem("dstart", dstart);
        localStorage.setItem("dend", dend);

        window.location.replace("./results.html")

    });
}