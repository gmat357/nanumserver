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
    var deleteCon = confirm("주문 하시겠습니까?");
    if(deleteCon){
        var checkBox = $(".wish_check");
        var orderItemCount = $(".order_item_count");
        var seqResult = [];
        var lengthResult = [];
        var checkCount = 0;
        for(var i = 0 ; i < checkBox.length; i++){
            if(checkBox.eq(i).is(":checked")){
                if(orderItemCount.eq(i).text() == "0"){
                    alert("수량을 입력해주세요");
                    return;
                }
                seqResult.push(checkBox.eq(i).attr("value"));
                lengthResult.push(orderItemCount.eq(i).text());
            }
            if(!checkBox.eq(i).is(":checked")){
                checkCount++;
            }
        }
        if(checkCount == checkBox.length)return alert("상품을 선택해주세요.");
        orderData(seqResult,lengthResult);
    }else{
        alert("취소되었습니다.");
    }
}

function choiceOrderAction(){
    var orderBtn = $(".order_btn");
    orderBtn.each(function(index){
        $(this).on("click", function(){
            var wishList = $(".wish_check");
            wishList.eq(index).prop("checked",true);
            orderAction();
        });
    });
}

function allCheckOrderAction(){
    var wishCheck = $(".wish_check");
    for(var i = 0; i < wishCheck.length; i++){
        wishCheck.eq(i).prop("checked", true);
    }
    orderAction(); 
}

$(function(){
    var selectOrderBtn = $(".select_order_btn");
    selectOrderBtn.on("click",function(){
       orderAction();
    });
    var allOrder = $('.all_order');
    allOrder.on("click", function(){
        allCheckOrderAction();
    });
});