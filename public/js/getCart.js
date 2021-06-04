
function cartProductTamplate(data){
    var cartTable = $(".cart_table");
    for(var i = 0; i < data.length; i++ ){

        var template = `
        <tr class="item_num">
            <td>
                <input type="checkbox" name="wish_list1" id="wish_list1" class="wish_check">
                <label for="wish_list1" class="check_box"></label>
            </td>
            <td>
                <img src="/public/img/flower.jpg" alt="상품이미지">
            </td>
            <td>${data[i][0].product_nm}</td>
                <td class="item_price"><span>${data[i][0].product_pr}</span> 원</td>
                <td>
            <ul>
                <li class="order_item_count">0</li>
                <li class="count_btn">
                    <p class="up_btn"></p>
                    <p class="down_btn"></p>
                </li>
            </ul>
            </td>
        <td class="order_pirce">0</td>
        <td>
            <p class="order_btn">주문하기</p>
            <p class="cancel_btn">삭제</p>
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
