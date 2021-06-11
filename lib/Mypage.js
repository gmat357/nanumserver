// const Mysql = require("../mysql/mysql");
const getConnection = require('../mysql/Mysql');

class Mypage{
    constructor() {
        this.bcrypt = require('bcrypt-nodejs');
    }

    pswChange(id,psw){
        return new Promise(async(resolve,reject)=>{
            try{
                var pswhash = await this.pswHashing(psw);
                var sql = `update mt_user set ? where user_id = '${id}'`;
                getConnection((conn)=>{
                    conn.query(sql,{user_psw:pswhash},(error,rows)=>{
                        if(error) throw error;
                        return resolve(true);
                    });
                    conn.release();
                });
            }catch(err){
                return reject(false);
            }
        });
    }

    pswHashing(psw){
        return new Promise((resolve, reject)=>{
            this.bcrypt.hash(psw,null,null,(err,hash)=>{
                if(err) return reject(err);
                return resolve(hash);
            });
        });
    }

    phoneChange(id,phone){
        return new Promise(async (resolve,reject)=>{
            try{
                var sql = `update mt_user set ? where user_id = '${id}'`;
                getConnection((conn)=>{
                    conn.query(sql,{user_phone:phone},(error,rows)=>{
                        if(error) throw error;
                        return resolve(true);
                    });
                conn.release();
                });
            }catch(err){
                return reject(false);
            }
        });
    }

    addressChange(id,address){
        return new Promise(async (resolve,reject)=>{
            try{
                var sql = `update mt_user set ? where user_id = '${id}'`;
                getConnection((conn)=>{
                    conn.query(sql,{user_add:address},(error,rows)=>{
                        if(error) throw error;
                        return resolve(true);
                    });
                    conn.release();
                });
            }catch(err){
                return reject(false);
            }
        });
    }
    
    getOrderList(userId){
        return new Promise((resolve, reject)=>{
            var sql = `select * from mt_user where user_id = '${userId}'`;
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    if(error) throw error;
                    if(rows.length == 0) return reject("주문내역이 없습니다.");
                    return resolve(rows);
                });
                conn.release();
            });
        });
    }

    getSeqList(seq){
        return new Promise((resolve, reject)=>{
            var sql = `select * from mt_order where order_num = '${seq}' and order_cencel = '0'`;
            getConnection((conn)=>{
                    conn.query(sql,(error,rows)=>{
                        if(error) throw error;
                        if(rows.length == 0) return resolve(false);
                        return resolve(rows[0]);
                    });
                // console.log(err);
                conn.release();
            });
        });
    }

    getProductList(seq){
        return new Promise((resolve, reject)=>{
            var sql = `select * from mt_product where product_seq = '${seq}'`;
            getConnection((conn)=>{
                    conn.query(sql,(error,rows)=>{
                        if(error) throw error;
                        if(rows.length == 0) return reject("상품이 없습니다.");
                        return resolve(rows[0]);
                    });
                conn.release();
            });
        });
    }

    orderCencel(orderNum){
        return new Promise((resolve, reject)=>{
            var sql = `update mt_order set ? where order_num = '${orderNum}'`;
            getConnection((conn)=>{
                    conn.query(sql,{order_cencel:1},(error,rows)=>{
                        if(error) throw error;
                        resolve(true);
                    });
                conn.release();
            });
        });
    }

}

module.exports = Mypage;