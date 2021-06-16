function parseQueryString() { 
    var arrParams = []; 
    var uriParams = location.search.substr(1).split('&'); 
    for (var i=0; i<uriParams.length; i++) {
        var param = uriParams[i].split('=');
        arrParams[i] = decodeURIComponent(param[1]); 
    }
    return JSON.stringify(arrParams); 
}


async function orderTemplate(data){
    var orderData = $(".order_data");

    var orderLen = JSON.parse(data.order_len);
    var orderSeq = JSON.parse(data.order_seq);
    var orderResultSeq = [];

    for(var i = 0; i < orderSeq.length; i++){
        orderResultSeq.push(orderSeq[i]);
        orderResultSeq.push("");
    }
    var orderResult = await orderGetData(JSON.stringify(orderResultSeq));
    var orderTotal = 0;
    for(var i = 0; i < orderResult.length; i++){
    var template = `
        <tr class="item_num">
            <td>
            </td>
            <td>
            <img src="${orderResult[i][0].product_img}" alt="상품이미지">
            </td>
            <td>${orderResult[i][0].product_nm}</td>
            <td class="item_price"><span>${orderResult[i][0].product_pr}</span> 원</td>
            <td>
            <ul style="border:none">
                <li class="order_item_count" style="border:none">${orderLen[i][0]}</li>
            </ul>
            </td>
            <td class="order_pirce" style="border-right: 1px solid #bbb;">${orderResult[i][0].product_pr * orderLen[i][0]}</td>
        </tr>
    `;
    orderData.prepend(template);
    orderTotal += orderResult[i][0].product_pr * orderLen[i][0];
};
    var selectInfo = $(".select_bank");
    $(".select_product > p").text("합계 : "+orderTotal+"원");
    selectInfo.children().eq(1).text("주문자 : "+data.order_nm);
    selectInfo.children().eq(3).text("주소 : "+data.order_add.replace(/,/gi, " "));
    selectInfo.children().eq(4).text("전화번호 : "+data.order_ph);
    if(data.order_bank != ""){
        selectInfo.children().eq(0).text(data.order_bank);
        selectInfo.children().eq(2).text("입금자 명 : "+data.order_bn);
        selectInfo.children().eq(4).text("입금 확인 후 배송됩니다.");
    }
}

function orderSuccessData(data){
    $.ajax({
        url:"/orderSuccessData",
        dataType:"json",
        type:"post",
        data:{orderNum:data},
        success:function(data){
            orderTemplate(data);
        },error:function(err){
            console.log(err.error);
            return;
        }
    });
}

function orderGetData(data){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url:"/orderGetData",
            dataType:"json",
            type:"post",
            data:{seq:data},
            success:function(data){
                console.log(data);
                resolve(data);
            },error:function(err){
                console.log(err.error);
                return;
            }
        });
    });
}

$(function(){
    orderSuccessData(parseQueryString());
})