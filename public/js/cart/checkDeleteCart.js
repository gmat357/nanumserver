function checkDelete(seq){
    console.log(seq);
    $.ajax({
        url:"/cart/checkDelete",
        dataType:"json",
        type:"post",
        data:{seq:seq},
        success:function(data){
            if(data){
                alert("삭제되었습니다.");
                location.href="/cart";
            }
        },error:function(err){
            alert(err.error);
            console.log("오류");
        }
    });
}

$(function(){
    var selectCencelBtn = $(".select_cancel_btn");
    selectCencelBtn.on("click", function(){
        var deleteCon = confirm("삭제 하시겠습니까?");
        if(deleteCon){
            var checkBox = $(".wish_check");
            var seqResult = [];
            for(var i = 0 ; i < checkBox.length; i++){
                if(checkBox.eq(i).is(":checked")){
                    seqResult.push(checkBox.eq(i).attr("value"));
                }
            }
            checkDelete(JSON.stringify(seqResult));
        }else{
            alert("취소되었습니다.");
        }
    }); 
});