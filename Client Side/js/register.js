$(function() {
    operationsListenersReg();
});

function addUser(info) {
    $.ajax({
        url: `http://localhost:5000/api/users`,
        type: 'POST',
        data: info,
        success: function(user) {
            console.log(user.id);
            localStorage.setItem("user_id", user.id);
            $(location).attr('href',"./trips.html");
        }
    });
}


function operationsListenersReg(){
    var val = [];
    $("#submitRegister").click(function(event){
        event.preventDefault();
        $(':checkbox:checked').each(function(i){
            val[i] = $(this).val();
        });
        
        const info = {
            full_name: $("#examplefullName").val(),
            type_of_user: $("#exampleFormControlSelect1").val(),
            about_me: $("#exampleFormControlTextarea1").val(),
            languages: val,
            email: $("#exampleInputEmail1").val(),
            phone: $("#examplePhone").val(),
        }
        addUser(info);
    });
};

       

