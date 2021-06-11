const express = require('express');
const router = express.Router();
const path = require('path');
const Board = require('../lib/Board');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/notice',(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/notice.html"));
});

router.post('/getNotice', async (req,res)=>{
    try{
        var board = await new Board().getBoard();
        res.json(board);
    }catch(err){
        console.log(err);
        res.json(err);
    }
});

router.get('/notice/:query',(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/notice_view.html"));
});

router.post('/getBoardData', async (req,res)=>{
    try{
        var page = JSON.parse(req.body.page)[0];
        var board = await new Board().getBoardData(page);
        new Board().lookUpdate(board[0].No,board[0].mt_look);
        res.json(board);
    }catch(err){
        console.log(err);
        res.json(err);
    }
});

module.exports = router;
