// const Mysql = require("../mysql/Mysql");
const getConnection = require('../mysql/Mysql');
const fs = require('fs');
const path = require('path');

class Product {
    constructor() {
    }

    insertProduct(query) {
        return new Promise((resolve, reject) => {
            var sql1 = `alter table mt_product auto_increment = 1`;
            var sql2 = `insert into mt_product set ?`;
            getConnection((conn) => {
                conn.query(sql1);
                conn.query(sql2, query, (err, rows) => {
                    conn.release();
                    if (err) return reject(err);
                    resolve(true);
                });
            });
        });
    }

    getNumOverlap(randomNum) {
        return new Promise((resolve, reject) => {
            var sql = `select product_seq from mt_product where product_seq = ${randomNum}`;
            getConnection((conn) => {
                conn.query(sql, (error, rows) => {
                    conn.release();
                    if (error) return reject(error);
                    if (rows.length == 0) return resolve(false);
                    return resolve(true);
                });
            });
        });
    }

    getUpdateProduct(productSeq) {
        return new Promise((resolve, reject) => {
            var sql = `select * from mt_product where product_seq = ${productSeq}`;
            getConnection((conn) => {
                conn.query(sql, (err, rows) => {
                    conn.release();
                    if (err) return console.log(err);
                    if (rows.length == 0) return reject("상품이 없습니다.");
                    return resolve(rows);
                });
            });
        });
    }

    productImgDelete(imgPath) {
        for (var i = 0; i < imgPath.length; i++) {
            fs.unlink(path.join(__dirname, `../${imgPath[i]}`), (err) => {
                return;
            });
        }
    }

    updateProduct(productSeq, data) {
        return new Promise((resolve, reject) => {
            var sql = `update mt_product set ? where product_seq = ${productSeq}`;
            getConnection((conn) => {
                conn.query(sql, data, (err, rows) => {
                    conn.release();
                    if (err) return console.log(err);
                    return resolve(true);
                });
            });
        });
    }

    deleteProduct(productSeq) {
        return new Promise((resolve, reject) => {
            var sql = `delete from mt_product where product_seq = ${productSeq}`;
            getConnection((conn) => {
                conn.query(sql, (err, rows) => {
                    conn.release();
                    if (err) return reject(false);
                    return resolve(true);
                });
            });
        });
    }

    selectProduct() {
        return new Promise((resolve, reject) => {
            var sql = "select * from mt_product where product_sold = '0' order by No desc";
            getConnection((conn) => {
                conn.query(sql, (error, rows) => {
                    conn.release();
                    if (error) reject(error);
                    if (rows.length == undefined) return resolve("상품이 없습니다.");
                    return resolve(rows);
                });
            });
        });
    }

    searchProduct(searchText) {
        return new Promise((resolve, reject) => {
            var sql = `select * from mt_product where product_sold = '0' and product_nm REGEXP "${this.searchTextResult(searchText)}"`;
            getConnection((conn) => {
                conn.query(sql, (error, rows) => {
                    conn.release();
                    if (error) reject(error);
                    if (rows.length == 0) {
                        resolve(rows);
                        console.log("검색결과가 없습니다.");
                    }
                    resolve(rows);
                });
            });
        });
    }

    searchTextResult(searchText) {
        var textResult = searchText + "| or ";
        for (var i = 0; i < searchText.length; i++) {
            if (i == searchText.length - 1) textResult += (searchText[i]);
            else textResult += (searchText[i] + "| and ");
        }
        return textResult;
    }

    selectProductSubData(page) {
        return new Promise((resolve, reject) => {
            var sql = `select * from mt_product where product_seq = '${Number(page)}'`;
            getConnection((conn) => {
                conn.query(sql, (error, rows) => {
                    conn.release();
                    if (error) return reject(error);
                    return resolve(rows);
                });
            });
        });
    }

    categoryProduct(menuSeq) {
        return new Promise((resolve, reject) => {
            var sql = `select * from mt_product where menu_seq = ${menuSeq}`;
            getConnection((conn) => {
                conn.query(sql, (err, rows) => {
                    conn.release();
                    if (err) throw err;
                    if (rows.length == 0) return resolve(false);
                    return resolve(rows);
                });
            });
        });
    }

    searchCategoryProduct(page, searchText) {
        return new Promise((resolve, reject) => {
            var sql = `select * from mt_product where menu_seq = '${page}' and product_nm REGEXP "${this.searchTextResult(searchText)}"`;
            getConnection((conn) => {
                conn.query(sql, (error, rows) => {
                    conn.release();
                    if (error) reject(error);
                    if (rows.length == 0) {
                        resolve(rows);
                        console.log("검색결과가 없습니다.");
                    }
                    resolve(rows);
                });
            })
        });
    }

}

module.exports = Product;