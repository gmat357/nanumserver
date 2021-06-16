const express = require('express');
const router = express.Router();
const path = require('path');
const Order = require('../../lib/Order');
const Product = require('../../lib/Product');

router.get('/admin/order',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/admin/html/order.html"));
});

router.post('/admin/getOrder',async(req,res)=>{
    try{
        var order = new Order();
        var orderArr = new Array();
        var getOrder = await order.adminGetOrder();
        for(var i = 0; i < getOrder.length; i++){
            var orderJson = new Object();
            var orderProduct = JSON.parse(getOrder[i].order_seq);
            var productInfo = [];
            for(var j = 0; j < orderProduct.length; j++){
                var product = await new Product().selectProductSubData(orderProduct[j]);
                productInfo.push(product[0]);
            }
            orderJson.order = getOrder[i];
            orderJson.product = productInfo;
            orderArr.push(orderJson);
        }
        res.json(orderArr);
    }catch(err){
        console.log(err);
    }
});

router.post('/admin/deposit', async(req,res)=>{
    var title = req.body.title;
    var state = req.body.state;
    var page = req.body.page;
    await new Order().adminOrderState(title,state,page);
    res.json(true);
});

module.exports = router;