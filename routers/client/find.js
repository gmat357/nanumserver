const express = require('express');
const Find = require('../../lib/Find');
const router = express.Router();
const path = require('path');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/findId', async(req,res)=>{
    try{
        var inputData = JSON.parse(req.body.info);
        var find = await new Find().findId(inputData[0],inputData[1]);
        res.json(find.user_id);
    }catch(err){
        res.json(false);
        return;
    }
});

router.post('/findPsw', async (req,res)=>{
    try{
        var inputData = JSON.parse(req.body.info);
        var find = await new Find().findPsw(inputData[0],inputData[1]);
        if(find.user_id != undefined){
            res.json(find);
        }
    }catch(err){
        res.json(false);
        return;
    }
});

router.post('/findChangePsw',async(req,res)=>{
    try{
        var info = JSON.parse(req.body.info);
        var find = await new Find().findChangePsw(info[0],info[1]);
        res.json(find);
    }catch(err){
        res.json(err);
    }
});

module.exports = router;