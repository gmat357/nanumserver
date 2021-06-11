// const Mysql = require("../mysql/mysql");
const getConnection = require('../mysql/Mysql');

class Price{
    constructor() {
    }
    
    getPrice(seq){
        return new Promise((resolve, reject)=>{
            var sql = `select product_pr from mt_product where product_seq = '${seq}'`;
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    conn.release();
                    if(error) throw error;
                    if(rows.length == 0)return reject("상품이 없습니다.");
                    return resolve(rows);
                });
            });
        });
    }

}

module.exports = Price;