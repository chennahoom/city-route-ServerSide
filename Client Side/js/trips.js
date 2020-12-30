$(function() {
    operationsListeners();
    
});


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