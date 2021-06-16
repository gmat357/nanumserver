const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Menu = require('../../lib/Menu');
const Product = require('../../lib/Product');
const date = require('../../function/date');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// multer setting
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/client/upload/product"));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename("product", ext) + new Date().valueOf() + ext);
    }
})

var upload = multer({ storage: storage });

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/admin/html/add_item.html"));
});

async function randomNum() {
    var orderNumRandom = Math.floor(Math.random() * 1000000000);
    var overlap = await new Product().getNumOverlap(orderNumRandom);
    if (!overlap) return orderNumRandom;
    else return randomNum();
}

router.post('/admin/productInsert', upload.single('item_img'), async (req, res) => {
    try {
        var body = req.body;
        var name = body.item_name;
        var price = body.item_price;

        var standard = body.item_standard;
        var origin = body.item_origin;
        var patch = body.item_patch == undefined ? "" : JSON.stringify(body.item_patch);
        var patchResult = "";

        if (patch.match("신상품")) {
            patchResult += `<img src="/public/client/img/new_item.png" alt="patch item">`
        }

        if (patch.match("할인")) {
            patchResult += `<img src="/public/client/img/sale_item.png" alt="patch item">`
        }

        if (patch == "") {
            patchResult = ``;
        }

        var contents = body.item_contents;
        var category = body.category;
        var img = req.file == undefined ? "" : "/public/client/upload/product/" + req.file.filename;
        var sql = {
            product_seq: await randomNum(),
            product_nm: name,
            product_pr: price,
            product_img: img,
            product_st: standard,
            product_og: origin,
            product_icon: patchResult,
            product_text: contents,
            reg_dt: date.date(),
            product_sold: 0,
            menu_seq: category
        }
        // 할인 신제품 기능제작 필요
        await new Product().insertProduct(sql);
        res.send(`
        <script>
            alert("상품이 등록됐습니다.");
            location.href="/admin";
        </script>
    `);
        return;
    } catch (err) {
        console.log(err);
        res.send(`
            <script>
                alert("상품등록에 실패했습니다.");
                history.back();
            </script>
        `);
        return;
    }
});

router.post('/admin/productImg', upload.single('upload'), (req, res) => {
    var filePath = `/public/client/upload/product/${req.file.filename}`;
    res.send(`{"filename":"imgDefaultName", "uploaded" : 1 , "url":"${filePath}"}`);
});

router.post('/admin/getCategory', async (req, res) => {
    try {
        var menu = await new Menu().selectMenu();
        res.json(menu);
    } catch (err) {
        console.log(err);
    }
});

router.get('/admin/product', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/admin/html/item_list.html"));
});

router.post('/admin/getProduct', async (req, res) => {
    var product = await new Product().selectProduct();
    var menu = await new Menu().selectMenu();
    res.json([product, menu]);
});

router.post('/admin/deleteProduct', async (req, res) => {
    try {
        var seq = JSON.parse(req.body.seq);
        for (var i = 0; i < seq.length; i++) {
            await new Product().deleteProduct(seq[i]);
        }
        res.json(true);
    } catch (err) {
        console.log(err);
        res.json(false);
    }
});

router.get('/admin/productUpdate/:page', (req, res) => {
    var page = req.params.page;
    res.sendFile(path.join(__dirname, "../../public/admin/html/replace_item.html"));
});

router.post('/admin/getUpdateProduct', async (req, res) => {
    try {
        var seq = JSON.parse(req.body.seq);
        var product = await new Product().getUpdateProduct(seq);
        res.json(product);
    } catch (err) {
        console.log(err);
    }
});

router.post('/admin/productUpdateAction/:page', upload.single('item_img'), async (req, res) => {
    try {

        var page = req.params.page;
        var body = req.body;
        var name = body.item_name;
        var price = body.item_price;
        var standard = body.item_standard;
        var origin = body.item_origin;
        var patch = body.item_patch == undefined ? "" : JSON.stringify(body.item_patch);
        var category = body.category;
        var text = body.item_contents;
        var prevImg = body.item_prev_img;
        var sumImg = req.file == undefined ? body.item_prev_img : "/public/client/upload/product/" + req.file.filename;

        var product = new Product();
        var getPrevText = await product.getUpdateProduct(page);

        var prevText = getPrevText[0].product_text.split(" ").filter(e => e.match("src"));

        for (var i = 0; i < prevText.length; i++) {
            prevText[i] = prevText[i].replace(/'|src|=|"/gi, "");
        }

        var filterText = text.split(" ").filter(e => e.match("src"));
        for (var i = 0; i < filterText.length; i++) {
            filterText[i] = filterText[i].replace(/'|src|=|"/gi, "");
        }

        var deletePrevText = [];
        for (var i = 0; i < prevText.length; i++) {
            var isCnt = false;
            for (var j = 0; j < filterText.length; j++) {
                if (prevText[i] == filterText[j]) {
                    isCnt = true;
                    continue;
                }
            }
            if (!isCnt) {
                deletePrevText.push(prevText[i]);
            }
        }

        if (req.file) {
            product.productImgDelete([prevImg]);
        }
        product.productImgDelete(deletePrevText);
        var patchResult = "";

        if (patch.match("신상품")) {
            patchResult += `<img src="/public/client/img/new_item.png" alt="patch item">`
        }

        if (patch.match("할인")) {
            patchResult += `<img src="/public/client/img/sale_item.png" alt="patch item">`
        }

        if (patch == "") {
            patchResult = ``;
        }

        var sql = {
            product_nm: name,
            product_pr: price,
            product_st: standard,
            product_og: origin,
            product_icon: patchResult,
            menu_seq: category,
            product_img: sumImg,
            product_text: text,
            chg_dt: require("../../function/date").date()
        }

        product.updateProduct(page, sql);

        res.send(`
        <script>
        alert("수정되었습니다.");
        location.href="/admin/product";
        
        </script>
        `)
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;