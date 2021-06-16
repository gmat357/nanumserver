function nameCategoryInfo() {
    var choiceMenu = $(".choiceMenu");
    var categoryName = $("#category_name");
    if(categoryName.val() == ""){
        alert("이름을 입력하세요!");
        return false;
    }
    var categoryArr = new Array();
    var isChoice = false;
    for (var i = 0; i < choiceMenu.length; i++) {
        if(choiceMenu.eq(i).is(":checked")){
            var categoryJson = new Object();
            categoryJson.seq = choiceMenu.eq(i).parent().attr("value");
            categoryJson.name = categoryName.val();
            categoryArr.push(categoryJson);
            isChoice = true;
        }
    }
    if(!isChoice){
        alert("메뉴를 선택해주세요!");
        return false;
    } 
    console.log(categoryArr);
    return JSON.stringify(categoryArr);
}

function nameUpdateAction() {
    $.ajax({
        url: "/admin/category/nameUpdateAction",
        dataType: "json",
        type: "post",
        data: { info: nameCategoryInfo() },
        success: function (data) {
            console.log(data);
            alert("수정되었습니다.");
            location.reload();
        }, error: function () {
            console.log("err");
        }
    })
}

$(function () {
    var nameBtn = $(".nameBtn");
    nameBtn.on("click", function () {
        nameUpdateAction();
    });
})