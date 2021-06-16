function userForm(){
    $.ajax({
        url:"/orderGetUser",
        dataType:"json",
        type:"post",
        success:function(data){
            if(!data){
                alert("로그인 후 이용해주세요");
                location.href="/login";
                return;
            }
            userDataFormat(data);
        },error:function(err){
            console.log(err);
        }
    })
}

function userDataFormat(data){
    var recipient = $("#recipient");
    var postcode = $("input[name='address']");
    var addressResult = data[0].user_add.split(",");
    var phoneNumber = $("#phoneNumber > option");
    var phoneResult = [];
    var middleNum = $("#middleNum");
    var lastNum = $("#lastNum");
    var userMailId = $("#user_mail_id");
    var userSelectMail = $("#mail_domain");
    var emailResult = data[0].user_email.split("@");


    phoneResult[0] = data[0].user_phone.substring(0,3);
    phoneResult[1] = data[0].user_phone.substring(4,8);
    phoneResult[2] = data[0].user_phone.substring(9);
    recipient.val(data[0].user_name);

    for(var i = 0 ; i < postcode.length; i++){
        postcode.eq(i).val(addressResult[i]);
    }

    for(var i = 0; i < phoneNumber.length; i++){
        if(phoneNumber.eq(i).attr("value") == phoneResult[0]){
            phoneNumber.eq(i).prop("selected",true);
        }
    }

    middleNum.val(phoneResult[1]);
    lastNum.val(phoneResult[2]);

    userMailId.val(emailResult[0]);
    userSelectMail.val(emailResult[1]);

}

function resetForm(){
    var recipient = $("#recipient");
    var postcode = $("input[name='address']");
    var phoneNumber = $("#phoneNumber > option");
    var middleNum = $("#middleNum");
    var lastNum = $("#lastNum");
    var userMailId = $("#user_mail_id");
    var userSelectMail = $("#mail_domain");

    recipient.val("");
    for(var i = 0; i < postcode.length; i++){
        postcode.eq(i).val("");
    }
    for(var i = 0; i < phoneNumber.length; i++){
        if(phoneNumber.eq(i).is(":selected")){
            phoneNumber.eq(i).prop("selected", false);
        }
    }
    middleNum.val("");
    lastNum.val("");
    userMailId.val("");
    userSelectMail.val("");
}

$(function(){
    var userAdd = $("#user_delivery");
    var newAdd = $("#new_delivery");
    userForm();
    userAdd.on("click",function(){
        userForm();
    });

    newAdd.on("click", function(){
        resetForm();
    });

});