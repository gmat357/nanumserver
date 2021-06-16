function getUser(){
    $.ajax({
        url:"/getUser",
        dataType:"json",
        type:"post",
        success:function(data){
            userDataSpread(data);
        },error:function(){

        }
    });
}

function userDataSpread(data){
    var name = $(".name");
    var userId = $(".user_id");
    var firstNumber = $("#phoneNumber > option");
    var middleNum = $("#middleNum");
    var lastNum = $("#lastNum");
    var postCode = $("#sample6_postcode");
    var address = $("#sample6_address");
    var detail = $("#sample6_detailAddress");
    
    var resultNum = data.user_phone.split(',');
    var resultAdd = data.user_add.split(',');

    name.text(data.user_name);
    userId.text(data.user_id);
    for(var i = 0; i < firstNumber.length; i++){
        if(firstNumber.eq(i).attr("value") == resultNum[0]){
            firstNumber.eq(i).prop("selected", true);
        }
    }
    middleNum.val(resultNum[1]);
    lastNum.val(resultNum[2]);
    postCode.val(resultAdd[0]);
    address.val(resultAdd[1]);
    detail.val(resultAdd[2]);
}

$(function(){
    getUser();
});