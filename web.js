// library
const express = require('express');
const path = require('path');
const Mysql = require('./mysql/mysql');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
// port and server 
const app = express();
const port = process.env.PORT || 3000;

// routers
const menuRouter = require('./routers/menu');
const productRouter = require('./routers/product');
const loginRouter = require('./routers/login');
const joinRouter = require('./routers/join');
const cartRouter = require('./routers/cart');
const orderRouter = require('./routers/order');
const findRouter = require('./routers/find');
const priceRouter = require('./routers/price');
const noticeRouter = require('./routers/notice');
const mypageRouter = require('./routers/mypage');
app.use(flash());
//  express-session setting
app.use(session({secret:'keyboard cat', resave:true, saveUninitialized:false}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/public",express.static(path.join(__dirname,"/public")));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+"/public/html/main.html"));
});

app.get('/login',loginRouter);
app.post('/loginAction',loginRouter);
app.get('/failedLogin',loginRouter);
app.get('/logout',loginRouter);

app.get('/join',joinRouter);
app.post('/joinAction',joinRouter);

app.get('/product/:query',productRouter);
app.get('/productCart/:query',productRouter);
app.get('/category/:query', productRouter);

app.get('/cart',cartRouter);

app.get('/order',orderRouter);

app.post('/bankOrder', orderRouter);
app.get('/orderSuccess/:query', orderRouter);

app.get('/notice',noticeRouter);
app.get('/notice/:query',noticeRouter);

app.get('/mypage',mypageRouter);
app.post('/mypage/pswChange',mypageRouter);
app.post('/mypage/phoneChange',mypageRouter);
app.post('/mypage/addressChange',mypageRouter);


app.post('/findId', findRouter);
app.post('/findPsw', findRouter);
app.post('/findChangePsw', findRouter);
app.post('/getMenu',menuRouter)
app.post('/getProduct',productRouter);
app.post('/getCategoryProduct/:page',productRouter);
app.post('/searchProduct',productRouter);
app.post('/searchCategoryProduct/:page',productRouter);
app.post('/getSession',loginRouter);
app.post('/getProductSub/:page',productRouter);
app.post('/getCart', cartRouter);
app.post('/getCartProduct', cartRouter);
app.post('/cart/deleteAction',cartRouter);
app.post('/cart/checkDelete', cartRouter);
app.post('/orderGetData',orderRouter);
app.post('/orderGetUser',orderRouter);
app.post('/getPrice', priceRouter);
app.post('/cardOrder', orderRouter);
app.post('/bankOrder', orderRouter);
app.post('/orderSuccessData', orderRouter);
app.post('/getNotice',noticeRouter);
app.post('/getBoardData',noticeRouter);
app.post('/getUser', mypageRouter);
app.post('/getOrderData', mypageRouter);
app.post('/orderCencel', mypageRouter);

app.get('/let',(req,res)=>{
    var i = 0;
    while(true){
        new Mysql().db.getConnection(function(err,conn){
            console.log(err);
            if(!err){
                conn.query("select * from mt_product",(error,rows)=>{
                    console.log(error);
                    i++;
                    console.log(i);
                });
            }
            conn.release();
            console.log("에러");
        });
    }
});

app.listen(port, (req,res)=>{
    console.log(`${port} 나눔마트 서버가 열렸습니다.`);
});

