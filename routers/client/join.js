const express = require('express');
const router = express.Router();
const path = require('path');
const Join = require('../../lib/Join');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/join',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/client/html/join.html"));
});

router.post('/joinAction', async (req,res)=>{
    
    try{
        var join = await new Join(req.body).joinAction();
        res.send(`
            <script>
                alert("${join}");
                location.href="/login";
            </script>
        `);
        return;
    }catch(err){
        res.send(`
            <script>
                alert("${err}");
                history.back();
            </script>
        `);
        return;
    }
});

module.exports = router;