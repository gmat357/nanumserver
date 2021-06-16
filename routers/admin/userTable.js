const express = require('express');
const router = express.Router();
const path = require('path');
const Order = require('../../lib/Order');
const Product = require('../../lib/Product');
const User = require('../../lib/User');

router.get("/admin/userTable",(req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/admin/html/user_table.html' ));
});

router.post("/admin/getUser", async (req,res)=>{
    try {
        var user = await new User().getUser();
        res.json(user);

    } catch (err) {
        console.log(err);
    }
});

router.post("/admin/deleteUser", async (req,res)=> {
    var userNo = JSON.parse(req.body.data);
    for (let index = 0; index < userNo.length; index++) {
        var user = await new User().deleteUser(userNo[index]);
        if(!user)return res.json(false);
    }
    res.json(true);
});

router.get('/admin/userTable/order/',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/admin/html/order_sub.html"));
});

router.post('/admin/userTable/getOrder',async (req,res)=>{
    try{
        var userId = JSON.parse(req.body.userId);
        var order = new Order();
        var orderArr = new Array();
        var getOrder = await order.adminGetUserOrder(userId[0]);
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
})


module.exports = router;