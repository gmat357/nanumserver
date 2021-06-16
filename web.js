// library
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
// port and server 
const app = express();
const port = process.env.PORT || 3000;

// routers
const menuRouter = require('./routers/client/menu');
const productRouter = require('./routers/client/product');
const loginRouter = require('./routers/client/login');
const joinRouter = require('./routers/client/join');
const cartRouter = require('./routers/client/cart');
const orderRouter = require('./routers/client/order');
const findRouter = require('./routers/client/find');
const priceRouter = require('./routers/client/price');
const noticeRouter = require('./routers/client/notice');
const mypageRouter = require('./routers/client/mypage');

const adminLoginRouter = require('./routers/admin/login');
const adminProductRouter = require('./routers/admin/product');
const adminCategoryRouter = require('./routers/admin/category');
const adminOrderRouter = require('./routers/admin/order');
const adminOrderCencelRouter = require('./routers/admin/order_cencel');
const adminUserTableRouter = require('./routers/admin/userTable');

app.use(flash());
//  express-session setting
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "/public")));
// app.use("/public/ad",express.static(path.join(__dirname,"/public")));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/client/html/main.html"));
});

app.get('/login', loginRouter);
app.post('/loginAction', loginRouter);
app.get('/failedLogin', loginRouter);
app.get('/logout', loginRouter);

app.get('/join', joinRouter);
app.post('/joinAction', joinRouter);

app.get('/product/:query', productRouter);
app.get('/productCart/:query', productRouter);
app.get('/category/:query', productRouter);

app.get('/cart', cartRouter);

app.get('/order', orderRouter);

app.post('/bankOrder', orderRouter);
app.get('/orderSuccess/:query', orderRouter);

app.get('/notice', noticeRouter);
app.get('/notice/:query', noticeRouter);

app.get('/mypage', mypageRouter);
app.post('/mypage/pswChange', mypageRouter);
app.post('/mypage/phoneChange', mypageRouter);
app.post('/mypage/addressChange', mypageRouter);

app.get('/admin/login', adminLoginRouter);
app.post('/admin/loginAction', loginRouter);
app.get('/admin/logout', loginRouter);
app.get('/admin/failedLogin', loginRouter);

app.get('/admin', adminProductRouter);
app.post('/admin/productInsert', adminProductRouter);
app.post('/admin/productImg', adminProductRouter);
app.get('/admin/product', adminProductRouter);
app.get('/admin/productUpdate/:page', adminProductRouter);
app.post('/admin/productUpdateAction/:page', adminProductRouter);

app.get('/admin/category', adminCategoryRouter);

app.get('/admin/order',adminOrderRouter);

app.get('/admin/orderCancel',adminOrderCencelRouter);

app.get('/admin/userTable',adminUserTableRouter);
app.get('/admin/userTable/order/',adminUserTableRouter);

app.post('/findId', findRouter);
app.post('/findPsw', findRouter);
app.post('/findChangePsw', findRouter);
app.post('/getMenu', menuRouter)
app.post('/getProduct', productRouter);
app.post('/getCategoryProduct/:page', productRouter);
app.post('/searchProduct', productRouter);
app.post('/searchCategoryProduct/:page', productRouter);
app.post('/getSession', loginRouter);
app.post('/getProductSub/:page', productRouter);
app.post('/getCart', cartRouter);
app.post('/getCartProduct', cartRouter);
app.post('/cart/deleteAction', cartRouter);
app.post('/cart/checkDelete', cartRouter);
app.post('/orderGetData', orderRouter);
app.post('/orderGetUser', orderRouter);
app.post('/getPrice', priceRouter);
app.post('/cardOrder', orderRouter);
app.post('/bankOrder', orderRouter);
app.post('/orderSuccessData', orderRouter);
app.post('/getNotice', noticeRouter);
app.post('/getBoardData', noticeRouter);
app.post('/getUser', mypageRouter);
app.post('/getOrderData', mypageRouter);
app.post('/orderCencel', mypageRouter);

app.post('/admin/getCategory', adminProductRouter);
app.post('/admin/getProduct', adminProductRouter);
app.post('/admin/deleteProduct', adminProductRouter);
app.post('/admin/getUpdateProduct', adminProductRouter);

app.post('/admin/setCategory', adminCategoryRouter);
app.post('/admin/category/updateAction', adminCategoryRouter);
app.post('/admin/category/nameUpdateAction', adminCategoryRouter);
app.post('/admin/category/deleteAction', adminCategoryRouter);

app.post('/admin/getOrder', adminOrderRouter);
app.post('/admin/deposit', adminOrderRouter);

app.post('/admin/getOrderCancel', adminOrderCencelRouter);

app.post('/admin/getUser', adminUserTableRouter);
app.post('/admin/deleteUser', adminUserTableRouter);
app.post('/admin/userTable/getOrder', adminUserTableRouter);



app.listen(port, (req, res) => {
    console.log(`${port} 나눔마트 서버가 열렸습니다.`);
});

