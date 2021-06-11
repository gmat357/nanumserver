function orderData(product,length){
    var url = "/order?";
    for(var i = 0; i < product.length; i++){
        if(i == product.length - 1){
            url += "product"+(i+1)+"="+product[i]+"&";
            url += "length"+(i+1)+"="+length[i];
        }else{
            url += "product"+(i+1)+"="+product[i]+"&";
            url += "length"+(i+1)+"="+length[i]+"&";
        }
    }
    location.href=url;
}

function orderAction(){
    var orderBtn = $(".orderBtn");
    var deleteCon = confirm("주문 하시겠습니까?");
    if(deleteCon){
        var productCount = $("#product_count");
        var seqResult = [];
        var lengthResult = [];
        if(productCount.val() == ""){
            alert("수량을 입력해주세요");
            return;
        }
        seqResult.push(orderBtn.attr("value"));
        lengthResult.push(productCount.val());
        orderData(seqResult,lengthResult);
    }else{
        alert("취소되었습니다.");
    }
}

$(function(){
    var orderBtn = $(".orderBtn");
    orderBtn.on("click", function(){
        orderAction();
    });
});