const express = require('express');
const router = express.Router();
const path = require('path');
const Cart = require('../lib/Cart');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/cart',(req,res)=>{
    if(!req.user){
        res.send(`
            <script>
                alert("로그인 후 이용해주세요.");
                location.href="/login";
            </script>
        `);
        return;
    }
    res.sendFile(path.join(__dirname,"../public/html/wishList.html"));
});

router.post('/getCart', async(req,res)=>{
    if(!req.user){
        res.send(`
        <script>
            alert("로그인 후 이용해주세요.");
            location.href="/login";
        </script>
    `);
    return;
    }
    try{
        var cart = await new Cart().cartSelect(req.user.user_id);
        res.json(cart);
    }catch(err){
        console.log(err);
    }
});

router.post('/getCartProduct',async(req,res)=>{
    var seq = req.body.seq;
    var seqArr = seq.split(',');
    var productArr = [];
    var cart = new Cart();
    for(var i = 0; i < seqArr.length; i++){
        try{
            var product = await cart.cartGetSelect(seqArr[i]);
            productArr.push(product);
        }catch(err){
            console.log(err);
        }
    }
    res.json(productArr);
});

router.post('/cart/deleteAction', async(req,res)=>{
    try{
        var seq = req.body.seq;
        var cart = await new Cart().cartDelete(seq,req.user.user_id);
        res.json(cart);
    }catch(err){
        console.log(err);
    }
});

router.post('/cart/checkDelete', async (req,res)=>{
    try{
        var seq = JSON.parse(req.body.seq);
        var cart = new Cart();
        for(var i = 0 ; i < seq.length; i++){
            await cart.cartDelete(seq[i],req.user.user_id);
        }
        res.json(true);
    }catch(err){
        console.log(err);
        res.json({error:"삭제에 실패했습니다."});
    }
});
module.exports = router;