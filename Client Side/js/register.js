$(function() {
    operationsListenersReg();
});

function addUser(info) {
    $.ajax({
        url: `http://localhost:5000/api/users`,
        type: 'POST',
        data: info,
        success: function(user) {
            // addNewUser(user);
            console.log(user);
        }
    });
}

function lang(optio){
      var val = [];
      optio.each(function(i){
        val[i] = $(this).val();
      });
      return val;
  }


function operationsListenersReg(){
    $("#submitRegister").click(() => {
       const info = {
        full_name: $("#examplefullName").val(),
        type_of_user: $("#exampleFormControlSelect1").val(),
        about_me: $("#exampleFormControlTextarea1").val(),
        // languages: $("#languagesSpoken").val(),
        languages: lang($("#languagesSpoken").val()),
        email: $("#exampleInputEmail1").val(),
        phone: $("#examplePhone").val(),
    }
    addUser(info);
});
}
       

