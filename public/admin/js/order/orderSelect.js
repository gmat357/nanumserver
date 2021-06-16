 //결제상태
 function defaultStateCSS(target) {
 
    var colorResult = target.attr("value");
    console.log(colorResult);
    // 결제상태 색상 변경 오류 수정
    if (colorResult == "입금전" || colorResult == "배송준비중") {
      target.css({
        'background': '#ff0000'
      });
    } else {
      target.css({
        'background': '#0000ff'
      });
    }
  }

 function changeStateCSS(target, felseText, trueText) {
   var result = target.attr('style');

   var colorResult = "background: rgb(255, 0, 0);"
   if (result != colorResult) {
     target.css({
       'background': '#ff0000'
     });
     target.text(felseText);
     target.attr("value",felseText);
     deposit(target.attr("data-value"),felseText,target.attr("name"));
   } else {
     target.css({
       'background': '#0000ff'
     });
     target.text(trueText);
     target.attr("value",trueText);
     deposit(target.attr("data-value"),trueText,target.attr("name"));
   }
 }

function productTemplate(data){
    var template = "";
    var orderLen = JSON.parse(data.order.order_len);

    for(var i = 0; i < data.product.length; i++){
        if(data.product[i] == null){
            template += `
            <ul>
                <li>
                <p>삭제된 제품입니다.</p>
                </li>
                <li>${orderLen[i]}</li>
            </ul>
            `
            continue;
        };

        template += `
        <ul>
            <li><img src="${data.product[i].product_img}" alt="">
            <p>${data.product[i].product_nm}</p>
            </li>
            <li>${orderLen[i]}</li>
        </ul>
        `
    }

    return template;
}

function resetData(data,page){
  var listSpace = $(".list_space");
  listSpace.empty();
  var dataList = "";
  for(var i = (page - 1) * maxListLength; i < maxListLength * page; i++){
      if(data[i] == undefined){
          continue;
      }else{
          dataList += `
          <tr>
          <td>${data[i].No}</td>
          <td><a href="/notice/board?view=${data[i].No}">${data[i].mt_title}</a></td>
          <td>${data[i].mt_name}</td>
          <td>${data[i].mt_date}</td>
          <td>${data[i].mt_look}</td>
          </tr>
          `
      }
  }
  listSpace.append(dataList);
}

function orderTemplate(data){
    var orderBox = $(".orderBox");
    for(var i = 0; i < data.length; i++){
        var receipt = data[i].order.order_busi != "" ? "사업자" : 
                      data[i].order.order_mp != "" ? "개인" : "";
        var receiptNum = data[i].order.order_busi != "" ? data[i].order.order_busi : 
        data[i].order.order_mp != "" ? data[i].order.order_mp : "";

        var payMeny = data[i].order.order_use == "bank" ? "무통장입금" : "카드결제";
        var template = `
        <table>
        <thead>
          <tr>
            <th>주문일</th>
            <th>주문자</th>
            <th>주문상품</th>
            <th>수량</th>
            <th>상품금액</th>
            <th>결제수단</th>
            <th>결제상태</th>
            <th>배송상태</th>
            <th>배송지</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              ${data[i].order.order_date}
            </td>
            <td>
              <p style="padding: 2px 0;">
                ${data[i].order.order_nm}
              </p>
            </td>
            <td colspan="2">
                ${productTemplate(data[i])}
            </td>
            <td>${data[i].order.order_price}</td>
            <td>${payMeny}</td>
            <td>
              <p class="pay_state" style="background: rgb(255, 0, 0);" value="${data[i].order.order_con}" data-value="order_con" name="${data[i].order.No}">${data[i].order.order_con}</p>
            </td>
            <td>
              <p class="deilvery_state" style="background: rgb(255, 0, 0);" value="${data[i].order.order_state}" data-value="order_state" name="${data[i].order.No}">${data[i].order.order_state}</p>
            </td>
            <td>${data[i].order.order_add}</td>
          </tr>
          <tr>
            <th colspan="" style="border-left: 1px solid #bbb;">현금영수증</td>
            <td colspan="2"><span>${receipt} </span>${receiptNum}</td>
            <th colspan="2">전화번호</th>
            <td colspan="4">${data[i].order.order_ph}</td>
          </tr>
          <tr style="margin-bottom: 5px;">
            <th colspan="" style="border-left: 1px solid #bbb;">메모</td>
            <td colspan="8" style="text-align: left;">${data[i].order.order_memo}</td>
          </tr>
        </tbody>
      </table>
        `

        orderBox.append(template);
    }
}

function deposit(title,state,page){
    $.ajax({
        url:"/admin/deposit",
        dataType:"json",
        type:"post",
        data:{title:title,state:state,page:page},
        success:function(){
            alert("변경되었습니다.");
            return;
        }
    })
}

function getOrder(){
    $.ajax({
        url:"/admin/getOrder",
        dataType:"json",
        type:"post",
        success:function(data){
            orderTemplate(data);
            var payState = $('.pay_state');
            var deilveryState = $('.deilvery_state');

            payState.each(function(){
                defaultStateCSS($(this));
            });
            deilveryState.each(function(){
                defaultStateCSS($(this));
            });

            payState.click(function () {
                var con = confirm("결제상태를 변경하시겠습니까?");
                if(!con) return;
              changeStateCSS($(this), "입금전", "입금완료")
            });
           
            deilveryState.click(function () {
                var con = confirm("배송상태를 변경하시겠습니까?");
                if(!con) return;
              changeStateCSS($(this), "배송준비중", "배송완료")
            });
           
        },error:function(){
            console.log("err");
        }
    })
}

$(function(){
    getOrder();
});