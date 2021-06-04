function footerSessionTrue(){
    var loginBtn = $(".login");
    var joinBtn = $(".join");
    var logoutBtn = $(".logout");
    loginBtn.empty();
    loginBtn.css("display","none");
    joinBtn.empty();
    joinBtn.css("display","none");
    logoutBtn.css("display","block");
}

$(function(){
    $.ajax({
        url:"/getSession",
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.user){
                footerSessionTrue();
            }
        },error:function(err){
            throw err;
        }
    })
});