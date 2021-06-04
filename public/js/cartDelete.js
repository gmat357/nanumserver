function cartDelete(){
    var deleteBtn = $(".cancel_btn");
    deleteBtn.each(function(){
        $(this).on("click",function(){
            var deleteCon = confirm("삭제하시겠습니까?");
            if(deleteCon){
                var seq = $(this).attr("value");
                cartDeleteSubmit(seq);
            }else{
                return;
            }
        });
    });
}

function cartDeleteSubmit(data){
    $.ajax({
        url:"/cart/deleteAction",
        dataType:"json",
        type:"post",
        data:{seq:data},
        success:function(data){
            console.log(data);
            alert(data.message);
            location.href="/cart";
            console.log("삭제완료");
        },
        error:function(){
            console.log("오류");
        }
    });
}