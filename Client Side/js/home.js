$(function(){
    navigate();
})

function navigate(){
    $("#trips").click(() => {
        $(location).attr('href',"./trips.html");
    });

    // $("#users").click(() => {
    //     $(location).attr('href',"./traveler.html");
    // });
}