function searchMenuPath() { 
    var uriParams = location.search.substr(1).split('&'); 
    var param = [];
    for (var i=0; i<uriParams.length; i++) {
      param = uriParams[i].split('=');
    } 
    return param[1]; 
  }

function searchTemplate(data){
    var template = "";
    var searchResultList = $(".item_list");
    console.log(data);
    if(data.length == 0){
        return;
    }
    searchResultList.empty();
    for(var i = 0; i < data.length; i++){
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
        searchResultList.append(template);
    }
}

function searchLineCreate(searchText){
    var line = $(".line");
    line.children("p").empty();
    var template = `
    <p class="menu_info_text" style="text-align:center;"><b> ${searchText} 결과입니다!</b></p>
    `;

    line.append(template);
}

function searchTrim(searchItemText){
    var searchText = "";
    for(var i = 0; i < searchItemText.length; i++){
        if(searchItemText[i] != " "){
            searchText += searchItemText[i];
        }
    }
    return searchText;
}

function searchAjax(navText){
    var searchItemText = $("#serch_item_text");
    var menuInfoText = $(".menu_info_text");
    var navText = navText != undefined ? navText : searchItemText.val();
    var textResult = searchTrim(navText);
    $.ajax({
        url:"/searchCategoryProduct/"+searchMenuPath(),
        dataType:"json",
        type:"post",
        data:{text:textResult},
        success:function(data){
            if(data.length == 0){
                alert("검색결과가 없습니다.");
                resetProduct();
                return;
            } 
            menuInfoText.empty();
            searchLineCreate(textResult);
            searchTemplate(data);
        },
        error:function(err){
            console.log(err);
        }
    });
}

$(function(){
    var searchSubmit = $(".submit_text");
    var searchItemText = $("#serch_item_text");

    searchItemText.on("keydown",function(e){
        if(e.keyCode == 13){
            if(searchItemText.val() == ""){
                alert("검색어를 입력해주세요!");
                resetProduct();
                return;
            }else{
                searchAjax();
                return;
            }
        }
    });

    searchSubmit.on("click", function(){
        if(searchItemText.val() == ""){
            alert("검색어를 입력해주세요!");
            resetProduct();
            return;
        }else{
            searchAjax();
        }
    });

});