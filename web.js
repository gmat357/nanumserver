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

app.get('/cart',cartRouter);

app.post('/getMenu',menuRouter)
app.post('/getProduct',productRouter);
app.post('/searchProduct',productRouter);
app.post('/getSession',loginRouter);
app.post('/getProductSub/:page',productRouter);
app.post('/getCart', cartRouter);
app.post('/getCartProduct', cartRouter);

app.listen(port, (req,res)=>{
    console.log(`${port} 나눔마트 서버가 열렸습니다.`);
});

