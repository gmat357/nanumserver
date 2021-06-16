var dataGetUrl = "/admin/getProduct"; // 데이터를 가져올 링크
var urlType = "post"; // 데이터 방식 GET/POST
var dataType = "json"; // 데이터 형식
var maxTableColspan = 9; // 테이블 열의 갯수
var maxListLength = 10; // 보여주는 리스트 갯수
var pagingBtnLength = 10; // 페이징 버튼 갯수
var btnClickColor = "#c8c8c8"; // 페이징 버튼 클릭시 색상
var btnColor = "black";
var pagingBox = $(".paging_box"); // 페이징 박스 엘리먼트
var prev = $(".prev"); // 이전 버튼 엘리먼트
var next = $(".next"); // 다음 버튼 엘리먼트
var listContainer = $(".product_table"); // 데이터를 넣을 컨테이너 엘리먼트

listContainer.children("tbody").addClass("list_space");

function failedGetData(){
    return "<tr><td colspan="+maxTableColspan+">게시물 없음</td></tr>";
}

function categoryResult(menu,menuSeq){
    for(var i = 0; i < menu.length; i++){
        if(menu[i].menu_seq == menuSeq){
            return menu[i].menu_nm;
        }
    }
    return "분류없음";
}

function allCheck(){
    var allCheck = $("#all_check");
    var nomalCheck = $("input[name='check']");
    var checkedCount = $("input[name='check']:checked");

    // all 체크시 모두 체크
    allCheck.click(function () {
      if (allCheck.prop("checked")) {
        nomalCheck.prop("checked", true);
      } else {
        nomalCheck.prop("checked", false);
      }
    });

    //모두 체크시 all 체크 기능
    nomalCheck.click(function () {
      checkedCount = $("input[name='check']:checked");
      if (checkedCount.length == nomalCheck.length) {
        allCheck.prop("checked", true);
      } else {
        allCheck.prop("checked", false);
      }
    });
}

function successGetData(data, menu){
    var dataList = "";
    for(var i = 0; i < maxListLength && i < data.length; i++){
        dataList += `
            <tr>
                <td>
                    <input type="checkbox" name="check" value="${data[i].product_seq}" id="check1" class="delCheck">
                </td>
                <td class="item_title">
                    <span>
                    <img src="${data[i].product_img}" alt="">
                    <p class="item_name">${data[i].product_nm}</p>
                    </span>
                </td>
                <td>${data[i].product_pr}원</td>
                <td>${data[i].product_og}</td>
                <td>${data[i].product_st}</td>
                <td>${categoryResult(menu,data[i].menu_seq)}</td>
                <td>
                    <a href="/admin/productUpdate/${data[i].product_seq}">수정</a>
                </td>
            </tr>
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

function resetData(data,page, menu){
    var listSpace = $(".list_space");
    listSpace.empty();
    var dataList = "";
    for(var i = (page - 1) * maxListLength; i < maxListLength * page; i++){
        if(data[i] == undefined){
            continue;
        }else{
            dataList += `
            <tr>
                <td>
                    <input type="checkbox" name="check" value="${data[i].product_seq}" id="check1" class="delCheck">
                </td>
                <td class="item_title">
                    <span>
                    <img src="${data[i].product_img}" alt="">
                    <p class="item_name">${data[i].product_nm}</p>
                    </span>
                </td>
                <td>${data[i].product_pr}원</td>
                <td>${data[i].product_og}</td>
                <td>${data[i].product_st}</td>
                <td>${categoryResult(menu,data[i].menu_seq)}</td>
                <td>
                    <a href="">수정</a>
                </td>
            </tr>
            `
        }
    }
    listSpace.append(dataList);
}

function prevClick(data,menu){
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.first().attr('value'));
    var pagingCreatePageResult = ((pagingBtnValue - pagingBtnLength) - 1);
    var resetDataPageResult = (pagingBtnValue - pagingBtnLength);
    if(pagingBtnValue <= 1 || pagingBtnValue - pagingBtnLength < 1){
        return;
    }else{
        pagingBtn.remove();
        pagingCreate(data, pagingCreatePageResult);
        resetData(data, resetDataPageResult,menu);
        $(`.paging_btn[value=${resetDataPageResult}]`).css("backgroundColor",btnClickColor).css("color",btnColor);
    }
}

function nextClick(data,menu){
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.last().attr('value'));

    if(pagingBtnValue >= data.length / maxListLength){
        return;
    }else{
        pagingBtn.remove();
        pagingCreate(data, pagingBtnValue);
        resetData(data, pagingBtnValue + 1,menu);
        $(`.paging_btn[value=${pagingBtnValue+1}]`).css("backgroundColor",btnClickColor).css("color",btnColor);
    }
}

function pagingClick(data,menu){
    var pagingBtn = $(".paging_btn");
    pagingBtn.each(function(){
        $(this).on("click",function(){
            pagingBtn.removeAttr("style");
            var page = $(this).attr("value");
            $(this).css({"backgroundColor":btnClickColor,"color":btnColor,"transitionDuration":"0.3s"});
            resetData(data,page,menu);
        });
    });
}


$(function(){
    var list_space = $(".list_space");
    
    $.ajax({
        url:dataGetUrl,
        type:urlType,
        dataType:dataType,
        success:function(rows){
            var data = rows[0];
            var menu = rows[1];
            var list_clone = "";
            if(data.length <= 0)
            list_clone = failedGetData();
            else
            list_clone = successGetData(data,menu);
            
            list_space.append(list_clone);
            pagingCreate(data,0);
            $(".paging_btn").eq(0).css("background-color",btnClickColor).css("color",btnColor);
            prev.on("click",function(){
                prevClick(data,menu)
            });
            next.on("click",function(){
                nextClick(data,menu)
            });
            pagingBox.on("mouseover", function(){
                pagingClick(data,menu);
            });
            allCheck();
        },error:function(){
            console.log("Failed to fetch Data");
        }
    });
});