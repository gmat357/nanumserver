$(function(){
    var productSumimg = $(".sumimg");
    var productName = $(".name");
    var productPrice = $(".price");
    var productStandard = $(".standard");
    var productOrigin = $(".origin");
    var description = $(".description");
    var cart = $(".cart");
    const URLSearch = new URLSearchParams(location.search).get("productId");

    cart.on("click", function(){
        location.href="/productCart/cart?productId="+URLSearch;
    });

    $.ajax({
        url:"/getProductSub/"+URLSearch,
        dataType:"json",
        type:"post",
        success:function(data){
            productSumimg.text(data[0].product_img);
            productName.text(data[0].product_nm);
            productPrice.text(data[0].product_pr + "원");
            productStandard.text(data[0].product_st);
            productOrigin.text(data[0].product_og);
            description.append(data[0].product_text);
            $(".orderBtn").attr("value",data[0].product_seq);
        },error:function(err){
            console.log(err);
        }
    })
});