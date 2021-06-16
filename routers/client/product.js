const express = require('express');
const router = express.Router();
const Product = require('../../lib/Product');
const path = require('path');
const Cart = require('../../lib/Cart');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/getProduct', async (req,res)=>{
    try{
        var product = await new Product().selectProduct();
        res.json(product);
    }catch(err){
        console.log("/getProduct "+err);
    }
});

router.post('/searchProduct',async (req,res)=>{
    try{
        var searchText = req.body.text;
        var product = await new Product().searchProduct(searchText);
        res.json(product);
    }catch(err){
        console.log(err);
    }
});

router.get('/product/:query',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/client/html/item_sub.html"));
});

router.post('/getProductSub/:page', async (req,res)=>{
    try{
        var productId = req.params.page;
        var product = await new Product().selectProductSubData(productId);
        res.json(product);
    }catch(err){
        console.log(err);
    }
});

router.get('/productCart/:query',async (req,res)=>{
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
        var productId = req.query.productId;
        var cart = await new Cart().cartInsert(productId,req.user.user_id);
        res.send(`
            <script>
                alert("장바구니에 담겼습니다.");
                history.back();
            </script>
        `)
    }catch(err){
        res.send(`
        <script>
            alert("이미 장바구니에 담겨있습니다.");
            history.back();
        </script>
        `);
        console.log(err);
    }
});

router.get('/category/:query',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/client/html/sub.html"));
});

router.post('/getCategoryProduct/:page',async(req,res)=>{
    try{
        var page = req.params.page;
        var product = await new Product().categoryProduct(page);
        res.json(product);
    }catch(err){
        console.log(err);
    }
});

router.post('/searchCategoryProduct/:page',async (req,res)=>{
    try{
        var searchText = req.body.text;
        var page = req.params.page;
        var product = await new Product().searchCategoryProduct(page,searchText);
        res.json(product);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;