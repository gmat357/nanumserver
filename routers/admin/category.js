const express = require('express');
const router = express.Router();
const path = require('path');
const date = require('../../function/date');
const Menu = require('../../lib/Menu');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

async function randomNum() {
    var menuNumRandom = Math.floor(Math.random() * 1000000000);
    var overlap = await new Menu().menuNumOverlap(menuNumRandom);
    if (!overlap) return menuNumRandom;
    else return randomNum();
}

router.get('/admin/category', (req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/admin/html/category.html"));
});

router.post('/admin/setCategory', async (req, res) => {
    try {

        var name = req.body.name;
        var menuNum = await randomNum();
        var sql = {
            menu_nm: name,
            menu_seq: menuNum,
            reg_dt: date.date(),
            menu_ord: 100000,
        };
        var menu = await new Menu().insertMenu(sql);
        res.json(true);
    } catch (err) {
        return console.log(err);
    }
});

router.post('/admin/category/nameUpdateAction', async (req, res) => {
    try {
        var infoArr = JSON.parse(req.body.info);
        if(!infoArr) return;
        await new Menu().nameUpdateMenu(infoArr[0].seq, infoArr[0].name);
        res.json(true);
    } catch (err) {
        return console.log(err);
    }
});

router.post('/admin/category/updateAction', async (req, res) => {
    try {
        var infoArr = JSON.parse(req.body.info);
        for (var i = 0; i < infoArr.length; i++) {
            await new Menu().updateMenu(infoArr[i].seq, infoArr[i].ord);
        }
        res.json(true);
    } catch (err) {
        return console.log(err);
    }
});

router.post('/admin/category/deleteAction', async (req, res) => {
    try {
        var seq = req.body.seq;
        await new Menu().deleteMenu(seq);
        res.json(true);
    } catch (err) {
        return console.log(err);
    }
});

module.exports = router;