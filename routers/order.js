const express = require('express');
const router = express.Router();
const path = require('path');
const Cart = require('../lib/Cart');
const Order = require('../lib/Order');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/order',(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/orderPage.html"));
});

function orderDataParse(query){
    var result = []
    for(var i = 0; i < query.length; i++){
        if(i % 2 == 0){
            result.push(query[i]);
        }
    }
    return result;
}

router.post('/orderGetData', async(req,res)=>{
    try{
        var query = JSON.parse(req.body.seq);
        var queryParse = orderDataParse(query);
        var orderResult = [];
        for(var i = 0; i < queryParse.length; i++){
            order = await new Order().orderGetData(queryParse[i]);
            orderResult.push(order);
        }
        res.json(orderResult);
    }catch(err){
        console.log(err);
        return;
    }
});

router.post('/orderGetUser',(req,res)=>{
    if(!req.user){
        res.json(false);
        return;
    }
    res.json([req.user]);
});

router.post('/cardOrder',async (req,res)=>{
    try{
        var body = JSON.parse(req.body.seq);
        var seq = JSON.parse(body[0]);
        var productLength = JSON.parse(body[1]);
        var userInfo = JSON.parse(body[2]);
        var price = body[3];
        var orderNum = await randomNum();
        var order = await new Order().cardOrderInsert(seq,productLength,userInfo,price,orderNum,req.user.user_id);
        await new Order().userOrderUpdate(req.user.user_id, orderNum);
        res.json({message:orderNum});
    }catch(err){
        console.log(err);
        res.json({message:"주문실패했습니다."});
    }
});

router.post('/bankOrder',async(req,res)=>{
    if(!req.user){
        res.send(`
            <script>
                alert("로그인 후 이용해주세요.");
                location.href="/login";
            </script>
        `)
    }
    try{
        var body = req.body;
        var product = JSON.parse(body.product);
        var query = {
        order_seq:product[0],
        order_len:product[1],
        order_nm:body.recipient,
        order_add:body.address[0] + "," + body.address[1] + "," + body.address[2],
        order_ph:body.phoneNumber + body.middleNum + body.lastNum,
        order_email:body.user_mail_id +"@"+ body.mail_domain,
        order_memo:body.delivery_msg,
        order_bn:body.depositor,
        order_bank:body.bankaccount,
        order_use:"bank",
        order_price:"",
        order_date:require('../function/date').date(),
        order_mp:"",
        order_busi:"",
        order_con:"입금확인바람",
        order_state:"입금대기중",
        order_id:req.user.user_id,
        };
        body.business_num == undefined ? "" : query.businessNum = body.business_num;
        body.money_phone == undefined ? "" : query.moneyPhone = body.money_phone[0] + "-" + body.money_phone[1] + "-" + body.money_phone[2];
        var order = await new Order().getPrice(JSON.parse(query.order_seq),JSON.parse(query.order_len));
        query.order_price = order;
        //랜덤 주문번호
        query.order_num = await randomNum();

        await new Order().moneyOrderInsert(query);
        await new Order().userOrderUpdate(req.user.user_id, query.order_num);
        var orderSeq = JSON.parse(query.order_seq);
        for(var i = 0; i < orderSeq.length; i++){
            await new Cart().cartDelete(orderSeq[i],req.user.user_id); 
        }
        res.send(`
          <script>
            alert("주문완료 되었습니다.");
            location.href="/orderSuccess/success?num=${query.order_num}";
          </script>  
        `);
        return;

    }catch(err){
        console.log(err);
    }
});

async function randomNum(){
    var orderNumRandom = Math.floor(Math.random() * 1000000000);
    var overlap = await new Order().getNumOverlap(orderNumRandom);
    if(!overlap) return orderNumRandom;
    else return randomNum();
}

router.get('/orderSuccess/:query', (req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/orderSuccess.html"));
});

router.post('/orderSuccessData', async(req,res)=>{
    try{
        var orderNum = JSON.parse(req.body.orderNum);
        var order = await new Order().getSuccessData(orderNum);
        res.json(order);
    }catch(err){
        console.log(err);
        res.json({message:"주문내역이 없습니다."});
    }

});

module.exports = router;