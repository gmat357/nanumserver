function urlParse() {
    var url = window.location.href
    var parse = url.split('/');
    var urlResult = parse[parse.length - 1];
    var dataForm = $(".dataForm");
    dataForm.attr("action", "/admin/productUpdateAction/" + urlResult);

    return JSON.stringify(urlResult);
}

function dataSpread(data) {
    var name = $("#item_name");
    var price = $("#item_price");
    var standard = $("#item_standard");
    var origin = $("#item_origin");
    var text = $("#item_contents");
    var sumImg = $(".sum_img");
    var menu = $("#category > option");
    var newItem = $("#new_item");
    var saleItem = $("#sale_item");
    var itemPrevImg = $(".item_prev_img");

    if (data[0].product_icon.match("new_item"))
        newItem.prop("checked", true);
    if (data[0].product_icon.match("sale_item"))
        saleItem.prop("checked", true);

    for (var i = 0; i < menu.length; i++) {
        if (menu.eq(i).val() == data[0].menu_seq) {
            menu.eq(i).prop("selected", true);
        }
    }

    name.val(data[0].product_nm);
    price.val(data[0].product_pr);
    standard.val(data[0].product_st);
    origin.val(data[0].product_og);
    text.val(data[0].product_text);
    sumImg.attr("src", data[0].product_img);
    itemPrevImg.val(data[0].product_img);

}

function getProductData() {
    $.ajax({
        url: "/admin/getUpdateProduct",
        dataType: "json",
        type: "post",
        data: { seq: urlParse() },
        success: function (data) {
            dataSpread(data);
        }, error: function (err) {
            console.log(err);
        }
    })
}

$(function () {
    getProductData();
});