var IMP = window.IMP;
IMP.init('imp89324211');

var paymentBtn = $(".payment_btn");
var product = $(".product");
product.attr("value",JSON.stringify([seq(),orderLength()]));
paymentBtn.on("click", function(){
    getPrice();
});

function seq() { 
    var arrParams = []; 
    var uriParams = location.search.substr(1).split('&'); 
    for (var i=0; i<uriParams.length; i++) {
        if(i % 2 == 0){
            var param = uriParams[i].split('=');
            arrParams.push(decodeURIComponent(param[1])); 
        }
    } 
    return JSON.stringify(arrParams); 
}

function orderLength() {
    var arrParams = [];
    var uriParams = location.search.substr(1).split('&');
      for (var i=0; i< uriParams.length; i++) {
          if(i % 2 == 1){
              var param = uriParams[i].split('=');
              arrParams.push(decodeURIComponent(param[1]));
            }
        }
    return JSON.stringify(arrParams); 
}

function getUser(){
    var userInfo = {
        name:$("#recipient").val(),
        address:$("#sample6_postcode").val()+","+$("#sample6_address").val()+","+$("#sample6_detailAddress").val(),
        phone:$("#phoneNumber").val()+","+$("#middleNum").val()+","+$("#lastNum").val(),
        email:$("#user_mail_id").val()+"@"+$("#mail_domain").val(),
        memo:$("#delivery_msg").val(),
    };
    console.log(userInfo.memo);
    return JSON.stringify(userInfo);
}

function getPrice(){
    $.ajax({
        url:"/getPrice",
        dataType:"json",
        type:"post",
        data:{seq:JSON.stringify([seq(),orderLength(),getUser()])},
        success:function(data){
            payment(data);
            // payment(data);
        },error:function(){
            alert("결제오류(서버와 연결이 끊겼습니다.)");
        }
    })
}

function orderInsert(price){
    $.ajax({
        url:"/cardOrder",
        type:"post",
        dataType:"json",
        data:{seq:JSON.stringify([seq(),orderLength(),getUser(),price])},
        success:function(data){
            console.log(data);
            location.href="/orderSuccess/success?num="+data.message;
        },error:function(){
            console.log("서버오류");
        }
    })
}

function payment(data){
    var address = data[1].address.split(",");
    IMP.request_pay({
        pg : 'inicis', // version 1.1.0부터 지원.
        pay_method : 'card',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : '나눔마트 상품',
        amount : 100,
        buyer_email : data[1].email,
        buyer_name : data[1].name,
        buyer_tel : data[1].phone.replace(/,/gi,"-"),
        buyer_addr : address[1] + " " + address[2],
        buyer_postcode : address[0],
    }, function(rsp) {
        if ( rsp.success ) {
        var msg = '결제가 완료되었습니다.';
        // msg += '고유ID : ' + rsp.imp_uid;
        // msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        // msg += '카드 승인번호 : ' + rsp.apply_num;
        orderInsert(data[0]);
        checkDelete(parseQueryString());
    } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
    }
        alert(msg);
    });
}