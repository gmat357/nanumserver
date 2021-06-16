function menuSpread(data) {
    var categoryList = $(".category_list");
    for (var i = 0; i < data.length; i++) {
        var template = `
        <li class="category_item" value="${data[i].menu_seq}">
            <input type="checkbox" name="item${i}" id="item${i}" class="choiceMenu" value="${data[i].menu_nm}">
            <label for="item${i}">${data[i].menu_nm}</label>
        </li>
        `
        categoryList.append(template);
    }
}

function menuChoiceSpread(){
    var categoryItem = $(".category_item");
    var categoryName = $("#category_name");
    categoryItem.each(function(){
        $(this).children(".choiceMenu").on("click", function(){
            categoryName.val($(this).next().text());
        });
    });
}

function getMenu() {
    $.ajax({
        url: "/admin/getCategory",
        dataType: "json",
        type: "post",
        success: function (data) {
            menuSpread(data);
            addDataVal();
            listChangeUp();
            menuChoiceSpread();
        }, error: function () {
            console.log("err");
        }
    })
}

$(function () {
    getMenu();
});