function sendEmailToC() {
    var pagePathName = window.location.pathname;
    var pageName = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
    var icount = 0;
    if ($("#txtname1").val().trim() == "") {
        icount++;
        $('#txtname1').addClass('has-error');
        $("#lblName").html("* Please enter your name");
        $("#lblName").show();
    } else {
        $('#txtname1').removeClass('has-error');
        $("#lblName").hide();

    }

    //if ($("#txtcompany").val().trim() == "") {
    //    icount++;
    //    $('#txtcompany').addClass('has-error');
    //    $("#lblcompany").html("* Please enter your name");
    //    $("#lblcompany").show();
   // } else {
   //     $('#txtcompany').removeClass('has-error');
   //     $("#lblcompany").hide();
//
   // }

  //  if ($("#txtcontact").val().trim() == "") {
    //    icount++;
     //   $('#txtcontact').addClass('has-error');
     //   $("#lblcontact").html("* Please enter your name");
    //    $("#lblcontact").show();
   // } else {
   //     $('#txtcontact').removeClass('has-error');
   //     $("#lblcontact").hide();

 //      check();

  //  }


    if ($("#txtemail1").val().trim() == "") {
        icount++;
        $('#txtemail1').addClass('has-error');
        $("#lblemail").html("* Please enter your email");
        $("#lblemail").show();
    } else {
        var e = IsValidEmail($("#txtemail1").val());
        if (!e) {
            icount++;
            $('#txtemail1').addClass('has-error');
            $("#lblemail").html("* Please enter valid email id");
            $("#lblemail").show();
        } else {
            $('#txtemail1').removeClass('has-error');
            $("#lblemail").hide();
        }
    }
    if ($("#txtmessage1").val().trim() == "") {
        icount++;
        $('#txtmessage1').addClass('has-error');
        $("#lblMessage").html("* Please enter your message");
        $("#lblMessage").show();
    } else {
        $('#txtmessage1').removeClass('has-error');
        $("#lblMessage").hide();
    }
    if (icount > 0) {
        return false;
    } else {
        var obj = {
            'name': $("#txtname1").val(),
            'email': $("#txtemail1").val(),
            'message': $("#txtmessage1").val(),
            'sourcePage': pageName
        };
        $("#irLoader1").show();
        $.ajax({
            type: 'GET',
            url: "Services/mail.ashx",
            contentType: "application/json; charset=utf-8",
            data: obj,
            success: function (response) {
                //$("#irLoader").hide();
                console.log(response);
                $("#txtname1").val('');
                $("#txtemail1").val('');
                $("#txtmessage1").val('');
                $("#irLoader1").hide();
                $("#messageSuccess").html("Thank you for contacting us.<br><br><br>We have received your enquiry and shall get back to you shortly.");
               // $("#messageShort").html("We have received your enquiry and shall get back to you shortly.");
               // $('#sentFeedbackSuccess').modal('show');
               $('.popup1').show();
            },
            error: function (response) {
               // $("#irLoader").hide();
                $("#txtname1").val('');
                $("#txtmessage1").val('');
                $("#txtmessage").val('');
                $("#irLoader1").hide();
                $("#messageSuccess").html("Error submitting the form");
              //  $("#messageShort").html("");
               // $('#sentFeedbackSuccess').modal('show');
               $('.popup1').show();
            }
        });
    }
}
function check() {

    var pass1 = document.getElementById('txtcontact');
    if (pass1.value.length != 10) {

        $("#lblcontact").html("* Please enter 10 digit mobile no");
        $("#lblcontact").show();
    }
    else
    {
      
        $('#txtcontact').removeClass('has-error');
        $("#lblcontact").hide();
    }
}

function IsValidEmail(email) {
    var spliter = [];
    if (email.toString().indexOf('@') >= 0) {
        spliter = email.toString().split("@");
        if (spliter.length > 2) {
            return false;
        } else {
            if (spliter[0].toString() == "")
                return false;
            if (email.toString().indexOf('.') >= 0) {
                spliter = spliter[1].toString().split('.');
                if (spliter.length > 2)
                    return false;
                else {
                    if (spliter[1].toString() == "")
                        return false;
                    else
                        return true;
                }
            } else
                return false;
        }
    } else
        return false;
}

function validate(key) {
    var keycode = (key.which) ? key.which : key.keyCode;
    var phn = document.getElementById('txtcontact');
    if (!(keycode == 8 || keycode == 46) && (keycode < 48 || keycode > 57)) {
        return false;
    } else {
        if (phn.value.length < 10) {
            return true;
        } else {
            return false;
        }
    }
}

function resetForm() {
    $("#txtname").val('');
    $("#txtemail").val('');
    $("#txtmessage").val('');
    $('#txtname').removeClass('has-error');
    $('#txtemail').removeClass('has-error');
    $('#txtmessage').removeClass('has-error');
    $("#irLoader").hide();
}

function popup()
{

           $('#sentFeedbackSuccess').modal('hide');
}

//popup();