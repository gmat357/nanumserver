var dataGetUrl = "/admin/userTable/getOrder"; // 데이터를 가져올 링크
var urlType = "post"; // 데이터 방식 GET/POST
var dataType = "json"; // 데이터 형식
var maxTableColspan = 9; // 테이블 열의 갯수
var maxListLength = 10; // 보여주는 리스트 갯수
var pagingBtnLength = 5; // 페이징 버튼 갯수
var btnClickColor = "#545454"; // 페이징 버튼 클릭시 색상
var btnColor = "white";
var pagingBox = $(".paging_box"); // 페이징 박스 엘리먼트
var prev = $(".prev"); // 이전 버튼 엘리먼트
var next = $(".next"); // 다음 버튼 엘리먼트
var listContainer = $(".list_space"); // 데이터를 넣을 컨테이너 엘리먼트

function failedGetData(){
    return "<div style='width:100%; height:100px; line-height:100px; border:1px solid #cccccc; margin:0 0 10px 0'><p style='text-align:center;'>주문내역 없음</p></div>";
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

function successGetData(data){
    var dataList = "";
    for(var i = 0; i < maxListLength && i < data.length; i++){
        var receipt = data[i].order.order_busi != "" ? "사업자" : 
        data[i].order.order_mp != "" ? "개인" : "";
        var receiptNum = data[i].order.order_busi != "" ? data[i].order.order_busi : 
        data[i].order.order_mp != "" ? data[i].order.order_mp : "";

        var payMeny = data[i].order.order_use == "bank" ? "무통장입금" : "카드결제";
        dataList += `
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
    }
    return dataList;
}

function pagingCreate(data,page){
    var pagingList = "";
    var maxList = 0;
    if(page <= 1)
        page = 0;
    for(var i = page; i < (data.length / maxListLength); i++){
        maxList++;
        if(maxList <= pagingBtnLength){
            pagingList += `<span class="page_num_box paging_btn" value="${i+1}"><p class="page_num">${i+1}</p></span>`
        }
    }
    prev.after(pagingList);
}

function resetData(data,page){
    var listSpace = $(".list_space");
    listSpace.empty();
    var dataList = "";
    for(var i = (page - 1) * maxListLength; i < maxListLength * page; i++){
        if(data[i] == undefined){
            continue;
        }else{
            var receipt = data[i].order.order_busi != "" ? "사업자" : 
            data[i].order.order_mp != "" ? "개인" : "";
            var receiptNum = data[i].order.order_busi != "" ? data[i].order.order_busi : 
            data[i].order.order_mp != "" ? data[i].order.order_mp : "";
    
            var payMeny = data[i].order.order_use == "bank" ? "무통장입금" : "카드결제";
            dataList += `
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
        }
    }
    listSpace.append(dataList);
}

function prevClick(data){
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.first().attr('value'));
    var pagingCreatePageResult = ((pagingBtnValue - pagingBtnLength) - 1);
    var resetDataPageResult = (pagingBtnValue - pagingBtnLength);
    if(pagingBtnValue <= 1 || pagingBtnValue - pagingBtnLength < 1){
        return;
    }else{
        pagingBtn.remove();
        pagingCreate(data, pagingCreatePageResult);
        resetData(data, resetDataPageResult);
        $(`.paging_btn[value=${resetDataPageResult}]`).css("backgroundColor",btnClickColor).css("color",btnColor);
    }
}

function nextClick(data){
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.last().attr('value'));

    if(pagingBtnValue >= data.length / maxListLength){
        return;
    }else{
        pagingBtn.remove();
        pagingCreate(data, pagingBtnValue);
        resetData(data, pagingBtnValue + 1);
        $(`.paging_btn[value=${pagingBtnValue+1}]`).css("backgroundColor",btnClickColor).css("color",btnColor);
    }
}

function pagingClick(data){
    var pagingBtn = $(".paging_btn");
    pagingBtn.each(function(){
        $(this).on("click",function(){
            pagingBtn.removeAttr("style");
            var page = $(this).attr("value");
            $(this).css({"backgroundColor":btnClickColor,"color":btnColor,"transitionDuration":"0.3s"});
            resetData(data,page);
        });
    });
}

function defaultStateCSS(target) {
 
    var colorResult = target.attr("value");
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

function parseQueryString() { 
  var arrParams = []; 
  var uriParams = location.search.substr(1).split('&'); 
  for (var i=0; i<uriParams.length; i++) {
      var param = uriParams[i].split('=');
      arrParams[i] = decodeURIComponent(param[1]); 
  } 
  return JSON.stringify(arrParams); 
}


$(function(){
    var list_space = $(".list_space");
    
    $.ajax({
        url:dataGetUrl,
        type:urlType,
        dataType:dataType,
        data:{userId:parseQueryString()},
        success:function(data){
            var list_clone = "";
            console.log(data);
            if(data.length == 0){
              list_clone = failedGetData();
            }
            else
            list_clone = successGetData(data);
            
            list_space.append(list_clone);
            pagingCreate(data,0);
            $(".paging_btn").eq(0).css("background-color",btnClickColor).css("color",btnColor);
            prev.on("click",function(){
                prevClick(data)
            });
            next.on("click",function(){
                nextClick(data)
            });
            pagingBox.on("mouseover", function(){
                pagingClick(data);
            });

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
            console.log("Failed to fetch Data");
        }
    });
});

