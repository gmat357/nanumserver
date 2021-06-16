const express = require('express');
const router = express.Router();

// function
const Menu = require('../../lib/Menu');

router.post('/getMenu',async (req,res)=>{
    try{
        var menu = await new Menu().selectMenu();
        res.json(menu);
    }catch(err){
        console.log("/getMenu : " + err);
    }
})

module.exports = router;