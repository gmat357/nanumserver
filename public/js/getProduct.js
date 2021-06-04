var url = "/getProduct";
var dataType = "json";

function productTemplate(data) {
  var template = "";
  var list_object = $(".item_list");
  for (var i = 0; i < data.length && i < 8; i++) {
      var icon = "";
      // 세일,신상품 아이콘 추 후 예정
    template = `
    <li class="item_value">
    <a href="/product/sub?productId=${data[i].product_seq}" style="color:black;">
    <img src="/public/img/flower.jpg" alt="상품이미지" class="item_img">
    <!-- 신제품, 할인등 패치가 붙는곳 -->
    <!-- <div class="patch_wrap">
    <img src="" alt="patch item">
    </div> -->
    <p class="item_title">${data[i].product_nm}</p>
    </a>
    <ul class="item_info">
    <li>
    <p class="price">판매가</p>
    <p class="price_value">${data[i].product_pr}원</p>
    </li>
    <li>
    <p class="sale_price">할인</p>
    <p class="sale_price_value">${data[i].product_sale}원</p>
    </li>
    </ul>
    </li>
    `;

    list_object.append(template);
  }
}

// function productSearchTemplate(data, result) {
//     var template = "";
//     var list_object = $(".search_list");
//     list_object.empty();
//     for (var i = 0; i < data.length; i++) {
//         for(var j = 0; j < result.length; j++){
//             if(data[i].No == result[j]){
//                 template = `
//                 <li class="item_value">
//                 <img src="/public/img/flower.jpg" alt="상품이미지" class="item_img">
//                 <!-- 신제품, 할인등 패치가 붙는곳 -->
//                 <!-- <div class="patch_wrap">
//                 <img src="" alt="patch item">
//                 </div> -->
//                 <p class="item_title">${data[i].product_nm}</p>
//                 <ul class="item_info">
//                 <li>
//                 <p class="price">판매가</p>
//                 <p class="price_value">${data[i].product_pr}원</p>
//                 </li>
//                 <li>
//                 <p class="sale_price">할인</p>
//                 <p class="sale_price_value">${data[i].product_sale}원</p>
//                 </li>
//                 </ul>
//                 </li>
//             `;   
//             list_object.append(template);
//         }
//         }
//     }
// }

// function searching(data ,result){
//     var resultArr = [];
//     for(var i = 0; i < data.length; i++){
//         var text = "";
//         var success = false;
//         var count = 0;
//         for(var j = 0; j < data[i].product_nm.length && !success; j++){
//             for(var k = 0; k < result.length; k++){
//                 if(data[i].product_nm[j] == result[k]){
//                     count++;
//                     if(count > 1){
//                         text += data[i].product_nm;
//                         resultArr.push(data[i].No);
//                         success = true;
//                     }
//                     break;
//                 }
//             }
//         }
//     }
//     return resultArr.sort(function(a,b){return a-b;});
// }

$(function () {
  $.ajax({
    url: url,
    dataType: dataType,
    type: "post",
    success: function (data) {
        // var searchBtn = $(".submit_text");
        // var searchLine = $(".search_line");
        // var search_list = $(".search_list");
        // var firstInfoText = $(".line");
        // var itemList = $(".item_list");

        productTemplate(data);
        navAutoHeight();
        // searchBtn.on("click",function(){
        //     var searchText = $("#serch_item_text").val();
        //     var searchResult = searching(data,searchText);
        //     firstInfoText.css("display","none");
        //     itemList.css("display","none");
        //     searchLine.css("display","block");
        //     search_list.css("display","block");
        //     productSearchTemplate(data,searchResult);
            

        // });
    },
    error: function (err) {
      throw err;
    }
  });


});