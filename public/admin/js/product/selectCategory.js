function ctTemplate(data) {
    var category = $("#category");
    for (var i = 0; i < data.length; i++) {
        var template = `
            <option value="${data[i].menu_seq}">${data[i].menu_nm}</option>
        `
        category.append(template);
    }
}

function getCategory() {
    $.ajax({
        url: "/admin/getCategory",
        dataType: "json",
        type: "post",
        success: function (data) {
            ctTemplate(data);
        }, error: function (err) {
            console.log(err);
        }
    })
}

$(function () {

    getCategory();
});