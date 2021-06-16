const express = require('express');
const router = express.Router();
const path = require('path');
const Mypage = require('../../lib/Mypage');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

function userConfirm(user,res){
    if(!user){
        res.send(`
        <script>
            alert("로그인 후 이용해주세요.");
            location.href="/login";
        </script>
        `);
        return;
    }
    return;
}

router.get('/mypage',(req,res)=>{
    if(!req.user){
        res.send(`
        <script>
            alert("로그인 후 이용해주세요.");
            location.href="/login";
        </script>
        `);
        return;
    }
    res.sendFile(path.join(__dirname,"../../public/client/html/myPage.html"));
});

router.post('/mypage/pswChange',async(req,res)=>{
    try{
        userConfirm(req.user,res);
        var psw = req.body.userPsw;
        var mypage = await new Mypage().pswChange(req.user.user_id,psw);
        if(mypage){
            res.send(`
                <script>
                    alert("비밀번호가 수정되었습니다.");
                    history.back();
                </script>
            `);
            return;
        }
    }catch(err){
        console.log(err);
    }
});

router.post('/getUser',(req,res)=>{
    res.json(req.user);
});

router.post('/mypage/phoneChange',async(req,res)=>{
    try{
        userConfirm(req.user,res);
        var phone = req.body.phone[0]+","+req.body.phone[1]+","+req.body.phone[2];
        var mypage = await new Mypage().phoneChange(req.user.user_id,phone);
        if(mypage){
            res.send(`
                <script>
                    alert("전화번호가 수정되었습니다.");
                    history.back();
                </script>
            `);
            return;
        }
    }catch(err){
        console.log(err);
    }
});

router.post('/mypage/addressChange',async(req,res)=>{
    try{
        userConfirm(req.user,res);
        var address = req.body.address[0]+","+req.body.address[1]+","+req.body.address[2];
        var mypage = await new Mypage().addressChange(req.user.user_id,address);
        if(mypage){
            res.send(`
                <script>
                    alert("주소가 수정되었습니다.");
                    history.back();
                </script>
            `);
            return;
        }
    }catch(err){
        console.log(err);
    }
});

router.post('/getOrderData',async(req,res)=>{
    try{
        var orderList = await new Mypage().getOrderList(req.user.user_id);
        var orderNum = orderList[0].order_num.split(',');
        var orderData = [];
        var productData = [];
        var orderResult = [];
        for(var i = 0; i < orderNum.length; i++){
            var mypage = await new Mypage().getSeqList(orderNum[i]);
            if(!mypage) continue;
            console.log(mypage);
            orderData.push(JSON.parse(mypage.order_seq));
            orderResult.push(mypage);
        }
        for(var i = 0; i < orderData.length; i++){
            var result = [];
            for(var j = 0; j < orderData[i].length; j++){
                var mypage = await new Mypage().getProductList(orderData[i][j]);
                console.log(mypage);
                result.push(mypage);
            }
            productData.push(result);
        }
        res.json({productData,orderResult});
    }catch(err){
        console.log(err);
    }
});

router.post('/orderCencel',async (req,res)=>{
    try{
        var orderNum = req.body.orderNum;
        var mypage = await new Mypage().orderCencel(orderNum);
        res.json(mypage);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;