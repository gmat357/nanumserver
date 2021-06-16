 //결제상태
 function defaultStateCSS(target) {
 
    var colorResult = target.attr("value");
    console.log(colorResult);
    // 결제상태 색상 변경 오류 수정
    if (colorResult == "입금전" || colorResult == "취소중") {
      target.css({
        'background': '#ff0000'
      });
    } else {
      target.css({
        'background': '#0000ff'
      });
    }
  }

  function moneyBuyUser(data){
    for(var i = 0; i < data.length; i++){
      if(data[i].order.order_use == "bank"){

        var template = `
          <tr>
            <td>성명</td>
            <td>${data[i].order.order_bn}</td>
            <td style="border-right:1px solid #cccccc; width:50px;">연락처</td>
            <td colspan="2">${data[i].order.order_ph}</td>
            <td>이메일</td>
            <td colspan="3">${data[i].order.order_email}</td>
          </tr>
        `

        return template;
      }else{
        continue;
      }
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

function orderTemplate(data){
    var orderBox = $(".orderBox");
    for(var i = 0; i < data.length; i++){
        var payMeny = data[i].order.order_use == "bank" ? "무통장입금" : "카드결제";
        var template = `
        <table>
        <thead>
        <tr>
        <th>취소신청일</th>
        <th>주문자</th>
        <th>주문상품</th>
        <th>수량</th>
        <th>상품금액</th>
        <th>결제수단</th>
        <th>결제상태</th>
        <th>취소처리</th>
        <th>사용자 메모</th>
      </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              ${data[i].order.order_cendate}
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
              <p class="pay_state" style="background: rgb(255, 0, 0); cursor:unset;" value="${data[i].order.order_con}" data-value="order_con" name="${data[i].order.No}">${data[i].order.order_con}</p>
            </td>
            <td>
              <p class="deilvery_state" style="background: rgb(255, 0, 0);" value="${data[i].order.order_censtate}" data-value="order_censtate" name="${data[i].order.No}">${data[i].order.order_censtate}</p>
            </td>
            <td>${data[i].order.order_add}</td>
          </tr>
          ${moneyBuyUser(data)}
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
        url:"/admin/getOrderCancel",
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
           
            deilveryState.click(function () {
                var con = confirm("취소상태를 변경하시겠습니까?");
                if(!con) return;
              changeStateCSS($(this), "취소중", "취소완료")
            });
           
        },error:function(){
            console.log("err");
        }
    })
}

$(function(){
    getOrder();
});