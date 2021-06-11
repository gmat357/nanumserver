function getUser(){
    var name = $(".name");
    var email = $(".email");
    var resultId = $(".result_id");
    var inputArr = [];
    inputArr.push(name.val());
    inputArr.push(email.val());

    $.ajax({
        url:"/findId",
        type:"post",
        dataType:"json",
        data:{info:JSON.stringify(inputArr)},
        success:function(data){
            if(!data){
                resultId.text("계정이 없습니다.").css("color","red");
                return;
            } 
            var message = `해당하는 아이디는 ${data} 입니다.`;
            resultId.text(message);
        },error:function(err){
            console.log(err);
        }
    });
}

$(function(){
    var searchIdBtn = $(".id_search");
    searchIdBtn.on("click", function(){
        getUser();
    });
});