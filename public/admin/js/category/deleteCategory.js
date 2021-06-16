function deleteAction() {
    var choiceMenu = $(".choiceMenu");
    var choice = "";
    for (var i = 0; i < choiceMenu.length; i++) {
        if (choiceMenu.eq(i).is(":checked")) {
            choice = choiceMenu.eq(i).parent().attr("value");
        }
    }
    if (choice == "") {
        return alert("메뉴를 선택해주세요!");
    }
    console.log(choice);
    return choice;
}

$(function () {
    var removeBtn = $(".remove_btn");
    removeBtn.on("click", function () {
        var con = confirm("삭제하시겠습니까?");
        if (!con) return;
        $.ajax({
            url: "/admin/category/deleteAction",
            dataType: "json",
            type: "post",
            data: { seq: deleteAction() },
            success: function (data) {
                if (data) {
                    alert("삭제되었습니다.");
                    location.reload();
                }
            }, error: function () {
                console.log("err");
            }
        })
        deleteAction();

    });
});