// const Mysql = require("../mysql/mysql");
const getConnection = require('../mysql/Mysql');

class Cart{
    constructor() {
    }
    
    cartInsert(productId,userId){
        return new Promise(async(resolve, reject)=>{
            try{
                var sql = `update mt_user set ? where user_id = '${userId}'`;
                var overlap = await this.cartOverlap();
                if(overlap) return reject("이미 장바구니에 담겨있습니다.");
                var resultData = await this.cartProductChange(productId,userId);
                getConnection((conn)=>{
                    conn.query(sql,{cart_seq:resultData},(error,rows)=>{
                        if(error) return reject(error);
                        return resolve(rows);
                    });
                    conn.release();
                });
            }catch(err){
                reject(err);
            }
        });
    }

    cartProductChange(productId,userId){
        return new Promise(async (resolve, reject)=>{
            try{
                var selectData = await this.cartSelect(userId);
                if(selectData == "") return resolve(productId);
                else return resolve(selectData + "," + productId);
            }catch(err){
                console.log(err);
                return reject(err);
            }
        });
    }

    cartSelect(userId){
        return new Promise((resolve,reject)=>{
            var sql = `select cart_seq from mt_user where user_id = '${userId}'`;
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    if(error) return reject(error);
                    return resolve(rows[0].cart_seq);
                });
                conn.release();
            });
        });
    }

    cartOverlap(productId,userId){
        return new Promise((resolve, reject)=>{
            var sql = `select cart_seq from mt_user where user_id = '${userId}'`;
            getConnection((conn)=>{
                conn.query(sql, (error,rows)=>{
                    if(error) return reject(error);
                    if(rows.length == 0) return resolve(false);
                    if(rows[0].cart_seq == null) return resolve(false);
                    var cartArr = rows[0].cart_seq.split(",");
                    for(var i = 0; i < cartArr.length; i++){
                        if(cartArr[i] == productId){
                            return resolve(true);
                        }
                    }
                    return resolve(false);
                });
                conn.release();
            });
        });
    }

    cartGetSelect(productId){
        return new Promise((resolve,reject)=>{
            var sql = `select * from mt_product where product_seq = '${productId}'`;
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    if(error) return reject(error);
                    return resolve(rows);
                });
                conn.release();
            });
        });
    }

    cartDelete(seq,userId){
        return new Promise(async(resolve, reject)=>{
            var cartData = await this.cartDeleteData(seq,userId);
            var sql = `update mt_user set ? where user_id = '${userId}'`;
            getConnection((conn)=>{
                conn.query(sql,{cart_seq:cartData},(error,rows)=>{
                    if(error) return reject(error);
                    resolve({message:"삭제되었습니다."});
                });
                conn.release();
            });
        });
    }

    cartDeleteData(productId,userId){
        return new Promise(async(resolve, reject)=>{
            try{
                var selectData = await this.cartSelect(userId);
                var dataArr = [];
                var dataResult = "";
                if(selectData.match(",")){
                    dataArr = selectData.split(",");
                }
                for(var i = 0; i < dataArr.length; i++){
                    if(dataArr[i] != productId){
                        dataResult += (dataArr[i] + ",");
                    }
                }
                if(dataResult[dataResult.length - 1] == ","){
                    dataResult = dataResult.substring(0,dataResult.length - 1);
                }
                resolve(dataResult);
            }catch(err){
                console.log(err);
                reject(err);
            }
        });
    }

}

module.exports = Cart;