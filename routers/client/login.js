const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const Login = require('../../lib/Login');
const login = new Login();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(cookieParser('keyboard cat'));
router.use(session({secret:'keyboard cat', resave:true, saveUninitialized:false}));
router.use(flash());

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user,done)=>{
    done(null, user.user_id);
});

passport.deserializeUser(async (id,done)=>{
    try{
        var userInfo;
        const loginAction = await login.loginUserSelect(id);
        var json = JSON.stringify(loginAction);
        userInfo = JSON.parse(json);
        done(null, userInfo);
    }catch(loginErr){
        throw loginErr;
    }
});

passport.use(new LocalStrategy({
    usernameField:'id',
    passwordField:'psw'
},
(id,psw,done)=>{
    try{
        login.loginAction(id,psw,done);
    }catch(loginErr){
        return done(false,{message:loginErr});
    }
}));

router.post('/loginAction',passport.authenticate('local',{failureRedirect:'/failedLogin',failureFlash:true}),(req,res)=>{
        if(req.body.id_keep) res.cookie('nanumLoginId',req.body.id);
        else res.cookie('nanumLoginId',"");
        res.send(`
        <script>
        alert("정상 로그인 되었습니다.");
        location.href="/";
        </script>
        `);
});

router.post('/admin/loginAction',passport.authenticate('local',{failureRedirect:'/admin/failedLogin',failureFlash:true}),(req,res)=>{
    if(req.user.user_use != 1){
        res.send(`
            <script>
                alert("관리자만 접속 가능합니다.");
                history.back();
            </script>
        `)
        return;
    }
    res.send(`
    <script>
    alert("정상 로그인 되었습니다.");
    location.href="/admin";
    </script>
    `);
});

router.get('/failedLogin',(req,res)=>{
    var fmsg = req.flash();
    var feedback = "";
    if(fmsg.error){
        feedback = fmsg.error[0];
        res.send(`
            <script>
                alert("${feedback}");
                location.href="/login";
            </script>
        `);
        return;
    }
});

router.get('/login',(req,res)=>{
    if(req.user){
        res.send(`
            <script>
                alert("이미 로그인 되어있습니다.");
                history.back();
            </script>
        `);
        return;
    }
    if(req.cookies.nanumLoginId == undefined){
        res.cookie('nanumLoginId',"");
    }
    res.sendFile(path.join(__dirname,"../../public/client/html/login.html"));
});

router.get('/admin/failedLogin',(req,res)=>{
    var fmsg = req.flash();
    var feedback = "";
    if(fmsg.error){
        feedback = fmsg.error[0];
        res.send(`
            <script>
                alert("${feedback}");
                location.href="/admin/login";
            </script>
        `);
        return;
    }
});

router.get('/logout',(req,res)=>{
    if(!req.user){
        res.send(`
            <script>
                alert("세션이 없습니다.");
                location.href="/login";
            </script>
        `);
        return;
    }
    req.logOut();
    res.redirect('/login');
});

router.get('/admin/logout',(req,res)=>{
    if(!req.user){
        res.send(`
            <script>
                alert("세션이 없습니다.");
                location.href="/admin/login";
            </script>
        `);
        return;
    }
    req.logOut();
    res.redirect('/admin/login');
});

router.post("/getSession",(req,res)=>{
    if(req.user) return res.json({user:true});
    else return res.json({user:false});
});

module.exports = router;
