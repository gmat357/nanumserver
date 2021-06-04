getCart();

function wishList(){
  // 체크박스 
  var allCheckBox = $("#all_check");
  var item_count = $(".item_num");
  var checkBox = $(".wish_check");

  allCheckBox.click(function () {
    if (allCheckBox.prop("checked")) {
      checkBox.prop("checked", true);
    } else {
      checkBox.prop("checked", false);
    }
  });

  checkBox.click(function () {
    var allCheck = true;
    for(var i = 0; i < checkBox.length; i++){
      if(!checkBox.eq(i).is(":checked")){
        allCheck = false;
      }
    }
    if (allCheck) {
      allCheckBox.prop("checked", true);
    } else {
      allCheckBox.prop("checked", false);
    }
  });

  // 수량
  var orderCount = $('.order_item_count');
  var countUpBtn = $('.up_btn');
  var countDownBtn = $('.down_btn');

  countUpBtn.each(function (index) {
    $(this).on("click", function () {
      var countElement = $(this).parent().prev();
      var nowCount = Number(countElement.text());
      countElement.text(nowCount = nowCount + 1);
      var price = $(this).parent().parent().parent().prev();
      sumPrice(nowCount, price);
      checkBox.eq(index).prop("checked",true);
    });
  });
  countDownBtn.each(function (index) {
    $(this).on("click", function () {
      var countElement = $(this).parent().prev();
      var nowCount = Number(countElement.text());
      countElement.text(nowCount <= 0 ? 0 : nowCount = nowCount - 1);
      if(nowCount == 0) checkBox.eq(index).prop("checked",false);
      var price = $(this).parent().parent().parent().prev();
      sumPrice(nowCount, price);
    });
  });

  //합계
  function sumPrice(Count, price) {
    var resultPrice = price.children().text();
    var orderPrice = price.next().next();
    orderPrice.text(resultPrice * Count);
    orderSumPrice()
  }
  //총 금액 합계
  function orderSumPrice() {
    var orderPrice = $('.order_pirce');
    var sum_price = $('.sum_price');
    var sum = 0;
    var result = [];
    for (var i = 0; i < orderPrice.length; i++) {
      sum += Number(orderPrice.eq(i).text());
    }
    sum_price.text(sum);
  }


  //쇼핑계속하기
  var shoping = $('.shoping_btn');
  shoping.on("click", function () {
    history.back();
  });

  cartDelete();

}

