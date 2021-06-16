function categoryInfo() {
    var categoryItem = $(".category_item");
    var categoryArr = new Array();
    for (var i = 0; i < categoryItem.length; i++) {
        var categoryJson = new Object();
        categoryJson.seq = categoryItem.eq(i).attr("value");
        categoryJson.ord = categoryItem.eq(i).attr("data-value");
        categoryArr.push(categoryJson);
    }
    return JSON.stringify(categoryArr);
}

function updateAction() {
    $.ajax({
        url: "/admin/category/updateAction",
        dataType: "json",
        type: "post",
        data: { info: categoryInfo() },
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
    var updateBtn = $(".updateBtn");
    updateBtn.on("click", function () {
        updateAction();
    });
})