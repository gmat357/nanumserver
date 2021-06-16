const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/admin/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/admin/html/adminLogin.html"));
});

module.exports = router;