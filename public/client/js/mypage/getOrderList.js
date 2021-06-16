function deletedProduct(order,i,orderState){
    var orderList = $(".order_list");
    var template = `
    <tr>
    <td class="order_time">
        ${order[i].order_date}<br>
        (${order[i].order_num})
    </td>
    <td class="product_name_img">
        <ul class="product_info">
            <li>
                <div style="width:58px;height:58px;"></div>
                <p>삭제된 상품입니다.</p>
            </li>
        </ul>
    </td>
    <td class="product_count">
        0개
    </td>
    <td class="order_price">
      <span>${order[i].order_price}</span>
      원
    </td>
    <td class="order_delivery">
        ${orderState}
    </td>
    <td class="order_cancel">
      <p class="orderCencelBtn" value="${order[i].order_num}">취소하기</p>
    </td>
  </tr>
    `;
    orderList.append(template);
}

function orderTemplate(data,order){
    var orderList = $(".order_list");
    for(var i = data.length-1 ; i >= 0; i--){
        var orderLen = JSON.parse(order[i].order_len);
        var orderLenResult = 0;
        var orderState = "";

        if(order[i].order_state == "배송완료")
            orderState = `<p class="delivery_success">배송완료</p>`;
        else if(order[i].order_state == "배송준비중")
            orderState = `<p class="delivery_loading">배송준비중</p>`;
        else if(order[i].order_state == "입금대기중")
            orderState = `<p>입금대기중</p>`;

        if(!data[i][0]){
            deletedProduct(order,i,orderState);
            continue;
        }

        for(var j = 0; j < orderLen.length; j++){
            orderLenResult += Number(orderLen[j]);
        }

        var template = `
        <tr>
        <td class="order_time">
            ${order[i].order_date}<br>
            (${order[i].order_num})
        </td>
        <td class="product_name_img">
            <ul class="product_info">
                ${orderSubList(data[i],order[i])}
            </ul>
        </td>
        <td class="product_count">
            ${orderLenResult}
        </td>
        <td class="order_price">
          <span>${order[i].order_price}</span>
          원
        </td>
        <td class="order_delivery">
            ${orderState}
        </td>
        <td class="order_cancel">
          <p class="orderCencelBtn" value="${order[i].order_num}">취소하기</p>
        </td>
      </tr>
        `;
        orderList.append(template);
    }
}



function orderSubList(data,order){
    var template = "";
    var orderLen = JSON.parse(order.order_len);
    for(var i = 0; i < data.length; i++){
        template += `
        <li>
        <img src="${data[i].product_img}" alt="상품이미지">
        <p class="product_title">${data[i].product_nm}(${orderLen[i]}개)(${data[i].product_pr}원)</p>
        </li>
        `
    }

    return template;
}

function orderCencel(orderNum){
    $.ajax({
        url:"/orderCencel",
        dataType:"json",
        type:"post",
        data:{orderNum:orderNum},
        success:function(data){
            if(data){
                alert("삭제 되었습니다.");
                location.reload();
            }
        },error:function(err){
            console.log(err);
        }
    })
}

function cencelBtnClick(){
    var orderCencelBtn = $(".orderCencelBtn");
    orderCencelBtn.each(function(){
        $(this).on("click", function(){
            var con = confirm("주문취소하시겠습니까?");
            if(con){
                orderCencel($(this).attr("value"));
            }
        });
    });
}

function getOrderList(){
    $.ajax({
        url:"/getOrderData",
        dataType:"json",
        type:"post",
        success:function(data){
            orderTemplate(data.productData,data.orderResult);
            cencelBtnClick();
        },error:function(){

        }
    })
}

$(function(){
    getOrderList();
});