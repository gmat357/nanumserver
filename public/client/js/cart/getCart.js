
function cartProductTamplate(data){
    var cartTable = $(".cart_table");
    var wishCount = $(".wish_count");
    wishCount.text("일반상품 "+data.length+"개");
    for(var i = 0; i < data.length; i++ ){
        if(data[i].length == 0) continue;
        
        var template = `
        <tr class="item_num">
            <td>
                <input type="checkbox" name="wish_list" id="wish_list${i}" class="wish_check" value="${data[i][0].product_seq}">
                <label for="wish_list${i}" class="check_box"></label>
            </td>
            <td>
                <img src="${data[i][0].product_img}" alt="상품이미지">
            </td>
            <td>${data[i][0].product_nm}</td>
                <td class="item_price"><span>${data[i][0].product_pr}</span> 원</td>
                <td>
            <ul>
                <li class="order_item_count">1</li>
                <li class="count_btn">
                    <p class="up_btn"></p>
                    <p class="down_btn"></p>
                </li>
            </ul>
            </td>
        <td class="order_pirce">${data[i][0].product_pr}</td>
        <td>
            <p class="order_btn">주문하기</p>
            <p class="cancel_btn" value="${data[i][0].product_seq}">삭제</p>
        </td>
        </tr>
        `
        
        cartTable.prepend(template);
    }
}

function getCartProduct(productSeq){
    $.ajax({
        url:"/getCartProduct",
        dataType:"json",
        type:"post",
        data:{seq:productSeq},
        success:function(data){
            cartProductTamplate(data);
            wishList();
            choiceOrderAction();
        },
        error:function(err){
            throw err;
        }
    })
}

function getCart(){
    $.ajax({
        url:"/getCart",
        dataType:"json",
        type:"post",
        success:function(data){
            if(data == null) return;
            getCartProduct(data);
        },
        error:function(err){
            throw err;
        }
    });
}
