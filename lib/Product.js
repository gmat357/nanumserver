// const Mysql = require("../mysql/Mysql");
const getConnection = require('../mysql/Mysql');

class Product{
    constructor() {
    }

   insertProduct(){
       return new Promise((resolve, reject)=>{

       });
   } 

   updateProduct(){
       return new Promise((resolve, reject)=>{

       });
   }

   deleteProduct(){
       return new Promise((resolve, reject)=>{

       });
   }

   selectProduct(){
       return new Promise((resolve, reject)=>{
           var sql = "select * from mt_product order by No desc";
           getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    conn.release();
                    if(error) reject(error);
                    if(rows.length == undefined) reject("상품이 없습니다.");
                    resolve(rows);
                });
            });
       });
   }

   searchProduct(searchText){
       return new Promise((resolve, reject)=>{
           var sql = `select * from mt_product where product_nm REGEXP "${this.searchTextResult(searchText)}"`;
           getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    conn.release();
                    if(error) reject(error);
                    if(rows.length == 0){
                        resolve(rows);
                        console.log("검색결과가 없습니다.");
                    }
                    resolve(rows);
                });
            });
       });
   }

   searchTextResult(searchText){
    var textResult = searchText + "| or ";
    for(var i = 0; i < searchText.length; i++){
        if(i == searchText.length - 1) textResult += (searchText[i]);
        else textResult += (searchText[i] + "| and ");
    }
    return textResult;
   }

   selectProductSubData(page){
    return new Promise((resolve, reject)=>{
        var sql = `select * from mt_product where product_seq = ${page}`;
        getConnection((conn)=>{
            conn.query(sql,(error,rows)=>{
                if(error) return reject(error);
                if(rows.length == 0) return reject("데이터가 없습니다.");
                return resolve(rows);
            });
        });
    });
   }

   categoryProduct(menuSeq){
       return new Promise((resolve, reject)=>{
           var sql = `select * from mt_product where menu_seq = ${menuSeq}`;
           getConnection((conn)=>{
                conn.query(sql,(err,rows)=>{
                    conn.release();
                    if(err) throw err;
                    if(rows.length == 0) reject("상품이 없습니다.");
                    return resolve(rows);
                });
            });
       });
   }

   searchCategoryProduct(page,searchText){
    return new Promise((resolve, reject)=>{
        var sql = `select * from mt_product where menu_seq = '${page}' and product_nm REGEXP "${this.searchTextResult(searchText)}"`;
        getConnection((conn)=>{
            conn.query(sql,(error,rows)=>{
                conn.release();
                if(error) reject(error);
                if(rows.length == 0){
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