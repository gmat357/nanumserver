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

function resetProduct(){
  var searchResultList = $(".item_list");
  searchResultList.empty();
  $.ajax({
    url: "/getProduct",
    dataType: dataType,
    type: "post",
    success: function (data) {
        productTemplate(data);
        navAutoHeight();
    },
    error: function (err) {
      throw err;
    }
  });
}

$(function () {
  resetProduct();
});