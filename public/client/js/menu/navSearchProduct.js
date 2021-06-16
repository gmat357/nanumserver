function navSearchTemplate(data){
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
        <img src="${data[i].product_img}" alt="상품이미지" class="item_img">
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
        </ul>
        </li>
        `;
        searchResultList.append(template);
    }
}

function navSearchLineCreate(searchText){
    var line = $(".line");
    line.children("p").empty();
    var template = `
    <p class="menu_info_text" style="text-align:center;"><b> ${searchText} 결과입니다!</b></p>
    `;

    line.append(template);
}

function navSearchTrim(searchItemText){
    var searchText = "";
    for(var i = 0; i < searchItemText.length; i++){
        if(searchItemText[i] != " "){
            searchText += searchItemText[i];
        }
    }
    return searchText;
}

function navSearchAjax(navText){
    var searchItemText = $("#serch_item_text");
    var menuInfoText = $(".menu_info_text");
    var navText = navText != undefined ? navText : searchItemText.val();
    var textResult = navSearchTrim(navText);
    $.ajax({
        url:"/searchProduct",
        dataType:"json",
        type:"post",
        data:{text:textResult},
        success:function(data){
            if(data.length == 0){
                alert("검색결과가 없습니다.");
                return;
            } 
            menuInfoText.empty();
            navSearchLineCreate(textResult);
            navSearchTemplate(data);
        },
        error:function(err){
            console.log(err);
        }
    });
}

$(function(){
    var navSearch = $("#nav_search");

    navSearch.on("keydown",function(e){
        if(e.keyCode == 13){
            if(navSearch.val() == ""){
                alert("검색어를 입력해주세요!");
                return;
            }else{
                navSearchAjax(navSearch.val());
            }
        }
    });


});