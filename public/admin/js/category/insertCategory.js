function insertCategory() {
    var name = $("#category_name").val();
    if (name == "") {
        alert("이름을 입력해주세요.");
        return;
    }

    var con = confirm("카테고리를 등록하시겠습니까?");
    if (!con) return;
    $.ajax({
        url: "/admin/setCategory",
        dataType: "json",
        type: "post",
        data: { name: name },
        success: function (data) {
            if (data) {
                alert("등록되었습니다.");
                location.reload();
            }
        }, error: function () {
            console.log("err");
        }
    })
}

$(function () {
    var addCategory = $(".add_category");
    addCategory.on("click", function () {
        insertCategory();
    });
});