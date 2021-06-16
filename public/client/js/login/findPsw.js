function getUser(){
    var name = $(".id");
    var email = $(".email");
    var resultId = $(".result_id");
    var inputArr = [];
    inputArr.push(name.val().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>\#$%&\\\=\(\'\"]/gi,"a"));
    inputArr.push(email.val().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>\#$%&\\\=\(\'\"]/gi,"a"));

    $.ajax({
        url:"/findPsw",
        type:"post",
        dataType:"json",
        data:{info:JSON.stringify(inputArr)},
        success:function(data){
            if(!data){
                resultId.text("계정이 없습니다.").css("color","red");
                return;
            }else{
                var loginContainer = $(".login_container");
                var psw = $(".psw");
                loginContainer.eq(0).empty();
                loginContainer.eq(1).css("display","block");
                var changeBtn = $(".change_btn");
                changeBtn.on("click", function(){
                    changeUser(data.user_id,psw.val());
                });
            }
        },error:function(err){
            console.log(err);
        }
    });
}

function changeUser(id,psw){
    var inputArr = [];
    inputArr.push(id);
    inputArr.push(psw);
    $.ajax({
        url:"/findChangePsw",
        type:"post",
        dataType:"json",
        data:{info:JSON.stringify(inputArr)},
        success:function(data){
            if(!data){
                alert("실패했습니다.");
            }else{
                alert("비밀번호가 변경되었습니다.");
                window.close();
            }
        },error:function(err){
            console.log(err);
        }
    });
}

$(function(){
    var searchPswBtn = $(".psw_search");
    var cencelBtn = $(".cencel_btn");
    cencelBtn.on("click", function(){
        window.close();
    });
    searchPswBtn.on("click", function(){
        getUser();
    });
});