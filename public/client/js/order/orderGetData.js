function parseQueryString() { 
    var arrParams = []; 
    var uriParams = location.search.substr(1).split('&'); 
    for (var i=0; i<uriParams.length; i++) {
        var param = uriParams[i].split('=');
        arrParams[i] = decodeURIComponent(param[1]); 
    } 
    return JSON.stringify(arrParams); 
}

function parseOrderLength() {
    var arrParams = [];
     var uriParams = location.search.substr(1).split('&');
      for (var i=0; i< uriParams.length; i++) {
          if(i % 2 == 1){
              var param = uriParams[i].split('=');
              arrParams.push(decodeURIComponent(param[1]));
            }
        }
        return arrParams; 
    }


function orderTemplate(data){
    var orderData = $(".order_data");
    var orderLength = parseOrderLength();
    for(var i = 0; i < data.length; i++){
    var template = `
        <tr class="item_num">
            <td>
            </td>
            <td>
            <img src="${data[i][0].product_img}" alt="상품이미지">
            </td>
            <td>${data[i][0].product_nm}</td>
            <td class="item_price"><span>${data[i][0].product_pr}</span> 원</td>
            <td>
            <ul style="border:none">
                <li class="order_item_count" style="border:none">${orderLength[i]}</li>
            </ul>
            </td>
            <td class="order_pirce" style="border-right: 1px solid #bbb;">0</td>
        </tr>
    `
    orderData.prepend(template);
    }
}

function sumPrices(){
    var itemPrice = $(".item_price > span");
    var orderItemCount = $(".order_item_count");
    var orderPrice = $(".order_pirce");
    for(var i = 0; i < itemPrice.length; i++){
        orderPrice.eq(i).text(Number(itemPrice.eq(i).text()) * Number(orderItemCount.eq(i).text()));
    }
}

function resultSumPrice(){
    var itemPrice = $(".item_price > span");
    var orderItemCount = $(".order_item_count");
    var sumPrice = $(".sum_price");
    var finalPrice = $(".final_price");
    var sumResult = 0;
    for(var i = 0; i < itemPrice.length; i++){
        sumResult += (Number(itemPrice.eq(i).text()) * Number(orderItemCount.eq(i).text()));
    }
    sumPrices();
    sumPrice.text(sumResult);
    finalPrice.text(sumResult);
}

function orderGetData(data){
    $.ajax({
        url:"/orderGetData",
        dataType:"json",
        type:"post",
        data:{seq:data},
        success:function(data){
            orderTemplate(data);
            resultSumPrice();
        },error:function(err){
            console.log(err.error);
            return;
        }
    });
}
