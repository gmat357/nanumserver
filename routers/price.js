const express = require('express');
const Price = require('../lib/Price');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/getPrice',async(req,res)=>{
    try{
        var body = JSON.parse(req.body.seq);
        var seq = JSON.parse(body[0]);
        var productLength = JSON.parse(body[1]);
        var userInfo = JSON.parse(body[2]);
        var totalPrice = 0;
        for(var i = 0; i < seq.length; i++){
            var price = await new Price().getPrice(seq[i]);
            totalPrice += (Number(price[0].product_pr) * Number(productLength[i]));
        }
        res.json([totalPrice,userInfo]);
    }catch(err){
       console.log(err); 
    }
});

module.exports = router;