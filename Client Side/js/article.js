$(function(){
    operationsListener();
});

function getTrip(tripId){
    $.ajax({
        url: `http://localhost:5000/api/trips/${tripId}`,
        type: 'GET',
        success: function(trips){
            
        }
    });
}

function getUser(userId){
    $.ajax({
        url: `http://localhost:5000/api/users/${userId}`,
        type: 'GET',
        success: function(data) {
            tripList(data);    
        }
    });
}

function tripList(user){
    var all_trips = user.my_trips;
    console.log(all_trips)

}

function operationsListener(){
    getUser(localStorage.getItem("user_id"));
}