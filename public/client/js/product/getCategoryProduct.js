var dataType = "json";
function menuPath() { 
  var uriParams = location.search.substr(1).split('&'); 
  var param = [];
  for (var i=0; i<uriParams.length; i++) {
    param = uriParams[i].split('=');
  } 
  return param[1]; 
}

function productTemplate(data) {
  var template = "";
  var list_object = $(".item_list");
  console.log(data);
  if(data.length == 0) return;
  for (var i = 0; i < data.length && i < 8; i++) {
      // 세일,신상품 아이콘 추 후 예정
    template = `
    <li class="item_value">
    <a href="/product/sub?productId=${data[i].product_seq}" style="color:black;">
    <img src="${data[i].product_img}" alt="상품이미지" class="item_img">
    <div class="patch_wrap" style="height:25px;">
    ${data[i].product_icon}
    </div>
    <p class="item_title">${data[i].product_nm}</p>
    </a>
    <ul class="item_info">
    <li>
    <p class="price">판매가</p>
    <p class="price_value">${data[i].product_pr}원</p>
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
    url: "/getCategoryProduct/"+menuPath(),
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