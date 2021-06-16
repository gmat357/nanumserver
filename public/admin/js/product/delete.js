function productDelete(){
    var delCheck = $(".delCheck");
    var checkOn = [];
    for(var i = 0; i < delCheck.length; i++){
        if(delCheck.eq(i).is(":checked")){
            checkOn.push(delCheck.eq(i).attr("value"));
        }
    }
    return JSON.stringify(checkOn);
}

function deleteAction(){
    console.log(productDelete());
    $.ajax({
        url:"/admin/deleteProduct",
        dataType:"json",
        type:"post",
        data:{seq:productDelete()},
        success:function(data){
            alert("삭제되었습니다.");
            location.reload();
        },error:function(err){
            console.log(err);
        }
    })
}

$(function(){
    var deleteBtn = $(".remove_btn");
    deleteBtn.on("click", function(){
        var con = confirm("삭제하시겠습니까?");
        if(con){
            deleteAction();
        }
    });
});