$(window).load(function(){
    var allCheck = $("#all_check");
    // all 체크시 모두 체크
    allCheck.click(function () {
        var nomalCheck = $("input[name='check']");
        if (allCheck.prop("checked")) {
            nomalCheck.prop("checked", true);
        } else {
            nomalCheck.prop("checked", false);
        }
    });

    // 삭제버튼 누르면 체크된넘 value
    var removeBtn = $('.remove_btn');
    removeBtn.click(function () {
        var checkedCount = $("input[name='check']:checked");
        if(checkedCount.length == 0) return alert("선택된 유저가 없습니다.");
        deleteAction();
    });


    function createArray(){
        var valueArray = [];
        var checkedCount = $("input[name='check']:checked");

        for (var i = 0; i < checkedCount.length; i++) {
            valueArray.push(checkedCount.eq(i).attr('value'));
        }
        
        return JSON.stringify(valueArray);
    }

    function deleteAction(){
        $.ajax({
            url:"/admin/deleteUser",
            dataType:"json",
            type:"post",
            data:{data:createArray()},
            success:function(data){
                if(!data){
                    alert("삭제에 실패했습니다.");
                    return
                }else{
                    alert("삭제되었습니다.");
                    location.reload();
                }
            },error:function(err){
                console.log(err);
            }
        });
    }
});