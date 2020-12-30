$(function() {
    searchResult();
});

function getAllTripCity(city, dstart,dend){
    $.ajax({
        url: 'http://localhost:5000/api/trips',
        type: 'GET',
        success: function(trips){
            filterCity(trips, city, dstart,dend);
        }
    });
}


function filterCity(trip, city, dstart, dend){
    var count = 0;
    var fDate,lDate,cDate;
    fDate = dstart.split('/');
    lDate = dend.split('/');
    trip.forEach(trip => {
        if(trip.trip_name_city === city){
            cDate = trip.tour_date.split('/')
            if(cDate[2] < lDate[2] && cDate[2] > fDate[2]){
                count++;
                appendTrips(trip);
            }
            else if(cDate[2] == lDate[2] && cDate[2] == fDate[2]){
                if (cDate[1] < lDate[1] && cDate[1] > fDate[1]){
                    count++;
                    appendTrips(trip);
                }
                else if(cDate[1] == lDate[1] && cDate[1] == fDate[1]){
                    if(cDate[0] == fDate[0] && cDate[0] < lDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                    else if(cDate[0] > fDate[0] && cDate[0] < lDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                    else if(cDate[0] > fDate[0] && cDate[0] == lDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                    else if(cDate[0] == fDate[0] && cDate[0] == lDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                }
                else if(cDate[1] < lDate[1] && cDate[1] == fDate[1]){
                    if(cDate[0] >= fDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                }
                else if(cDate[1] == lDate[1] && cDate[1] > fDate[1]){
                    if(cDate[0] <= lDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                }
            }
            else if(cDate[2] < lDate[2] && cDate[2] == fDate[2]){
                if (cDate[1] > fDate[1]){
                    count++;
                    appendTrips(trip);
                }
                else if(cDate[1] == fDate[1]){
                    if(cDate[0] >= fDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                }
            }
            else if(cDate[2] == lDate[2] && cDate[2] > fDate[2]){
                if (cDate[1] < lDate[1]){
                    count++;
                    appendTrips(trip);
                }
                else if(cDate[1] == lDate[1]){
                    if(cDate[0] <= lDate[0]){
                        count++;
                        appendTrips(trip);
                    }
                }
            }
        }
    })
    if(count === 0){
        $("#All-trips").append(
            '<p>No result for this serch.<br>' +
            '<a href="trips.html">back to search page</a>' +
            '</p>'
        );
    }
}
    
function appendTrips(trip){
    var html =  '<section class="col mb-4">';
    html += '<div class="card bg-light text-dark">';
    html += '<div class="card-body">';
    html += '<h5 class="card-title">'+ trip.tour_date +'</h5>';
    html += '<p class="card-text">'+ trip.stops +'</p>';
    html += ' <p class="card-text">' +
            'tour ID: ' + trip.id + '<br>' +
            'tour guide: ' + trip.tour_guide + '<br>' +
            'trip name city: '  + trip.trip_name_city + '<br>' +
            'tour time: ' + trip.tour_time + '<br>' +
            'start time: ' + trip.start_time + '<br>' +
            'spaces left: ' + trip.spaces_left + '<br>' +
            '<button class=join-trip id='+ trip.id+' >Join Trip</button>'+
            '</br></p>';
    html += '</div>';
    html += '</div>';
    html += '</section>';

    $("#All-trips").append(html);
    $(".join-trip").click(function(event){
        event.preventDefault();
        var id = localStorage.setItem("trip_id", this.id);
        window.location.replace("./maps.html")
      });
}


function searchResult(){
    var city = localStorage.getItem("city");
    var dstart = localStorage.getItem("dstart");
    var dend = localStorage.getItem("dend");
    getAllTripCity(city, dstart,dend);
            
}