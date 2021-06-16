//  전역변수

//  ajax 정보

//  데이터 받을 링크
const url = "/qna/getList";
//  데이터의 형태
const dataType = "json";

//  옵션

//  테이블 열의 갯수
const table_colspan = 5;
//  최대로 보여주는 리스트 갯수
const max_list_length = 10;
//  페이징 버튼 갯수
const paging_btn_length = 5;
//  버튼 클릭시 색상
const btn_click_color = "#eeeeee";


//  객체정보

//  페이징 박스
const paging_box = $('.paging_box');
//  prev 버튼
const prev_btn = $(".prev");
//  next 버튼
const next_btn = $('.next');
//  리스트 갯수 표현
const list_length = $('.list_length');
//  데이터를 넣을 공간
const list_object = $(".list_data");

function template_tag(data, i) {
    return `
    <tr value = "${data[i].num}">
        <a href="/qna_view/${data[i].num}">
        <td>${data.length - i}</td>  
        <td>${data[i].title}</td>  
        <td>${data[i].category}</td>  
        <td>${data[i].date}</td>  
        <td>${data[i].name}</td>
        </a>
    </tr>
    `
}

//  리스트 불러오는 함수
function template_fc(data, IsBull) {
    let template = "";
    list_object.empty();
    if (!IsBull) {
        for (let i = 0; i < max_list_length; i++) {
            if (i >= data.length) {
                continue;
            } else {
                template += template_tag(data, i);
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (i >= data.length) {
                continue;
            } else {
                template += template_tag(data, i);
            }
        }
    }
    return template;
}

//  리스트 초기화 함수
function list_reset(data, page) {
    list_object.empty();
    let template = "";
    for (let i = (page - 1) * max_list_length; i < max_list_length * page; i++) {
        if (data[i] == undefined) {
            continue;
        } else {
            template += template_tag(data, i);
        }
    }
    list_object.append(template);
}

//  페이징 버튼 생성 함수
function paging_btn_create(data, page) {
    let template = "";
    let max_list = 0;
    if (page <= 1) {
        page = 0;
    }
    for (let i = page; i < (data.length / max_list_length); i++) {
        max_list++;
        if (max_list <= paging_btn_length) {
            template += `
            <span class="paging_btn" value="${i + 1}">${i + 1}</span>
            `
        }
    }
    prev_btn.after(template);
}
//  ajax로 리스트 가져오는 함수
function list_data() {
    $.ajax({
        url: url,
        dataType: dataType,
        type: "post",
        success: function (data) {
            let $list_object = list_object;
            if (data.length <= 0) {
                template = `
                    <tr>
                        <td colspan="${table_colspan}">게시물 없음</td>
                    </tr>
                `
            } else {
                paging_btn_create(data, 0);
                $list_object.append(template_fc(data, false));

                let $paging_btn = $(".paging_btn");
                $paging_btn.eq(0).css("backgroundColor", btn_click_color);

                prev_btn.on("click", function () {
                    $paging_btn = $(".paging_btn");
                    let paging_btn_val = Number($paging_btn.first().attr('value'));
                    if (paging_btn_val <= 1 || paging_btn_val - paging_btn_length < 1) {
                        return;
                    } else {
                        $paging_btn.remove();
                        paging_btn_create(data, paging_btn_val - paging_btn_length - 1);
                        list_reset(data, paging_btn_val - paging_btn_length);
                        $(`.paging_btn[value=${paging_btn_val - paging_btn_length}]`).css("backgroundColor", btn_click_color);
                    }
                });

                next_btn.on("click", function () {
                    $paging_btn = $(".paging_btn");
                    let paging_btn_val = Number($paging_btn.last().attr('value'));
                    if (paging_btn_val >= data.length / max_list_length) {
                        return;
                    } else {
                        $paging_btn.remove();
                        paging_btn_create(data, paging_btn_val);
                        list_reset(data, paging_btn_val + 1);
                        $(`.paging_btn[value=${paging_btn_val + 1}]`).css("backgroundColor", btn_click_color);
                    }
                });

                paging_box.on("mouseover", function () {
                    let $paging_btn = $(".paging_btn");
                    $paging_btn.each(function () {
                        $(this).on("click", function () {
                            $paging_btn.removeAttr("style");
                            let page = $(this).attr("value");
                            $(this).css({ "backgroundColor": btn_click_color, "transitionDuration": "0.3s" });
                            list_reset(data, page);
                        });
                    });
                });

                var listData = $(".list_data > tr");
                listData.each(function (index) {
                    $(this).on("click", function () {
                        // console.log(index);
                        location.href = "/qna_view/" + $(this).attr("value");
                    });
                });
            }
        }
    });
}



$(function () {
    list_data();

});