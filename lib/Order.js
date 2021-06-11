// const Mysql = require("../mysql/mysql");
const getConnection = require('../mysql/Mysql');

class Order{
    constructor() {
        this.date = require('../function/date');
    }
    

    orderGetData(seq){
        return new Promise((resolve, reject)=>{
            var sql = "select * from mt_product where product_seq = ?";
            getConnection((conn)=>{
                conn.query(sql,seq,(err,rows)=>{
                    conn.release();
                    if(err) throw err;
                    resolve(rows);
                });
            });
        });
    }

    cardOrderInsert(seq,productLength,userInfo,price,orderNum,userId){
        return new Promise((resolve, reject)=>{
            var sql1 = `alter table mt_order auto_increment = 1`;
            var sql2 = `insert into mt_order set ?`;
            var dbInfo = {
                order_nm:userInfo.name,
                order_ph:userInfo.phone.replace(/,/gi,"-"),
                order_add:userInfo.address.replace(/,/gi," "),
                order_email:userInfo.email,
                order_date:this.date.date(),
                order_memo:userInfo.memo,
                order_use:"card",
                order_price:price,
                order_seq:JSON.stringify(seq),
                order_len:JSON.stringify(productLength),
                order_bank:"",
                order_bn:"",
                order_mp:"",
                order_busi:"",
                order_con:"결제완료",
                order_state:"배송준비중",
                order_num:orderNum,
                order_id:userId
            };
            getConnection((conn)=>{
                conn.query(sql1);
                conn.query(sql2,dbInfo,(error,rows)=>{
                    conn.release();
                    if(error) return reject(error);
                    resolve("등록완료");
                });
            });
        });
    }
    
    moneyOrderInsert(dbInfo){
        return new Promise((resolve, reject)=>{
            var sql1 = `alter table mt_order auto_increment = 1`;
            var sql2 = `insert into mt_order set ?`;
            getConnection((conn)=>{
                conn.query(sql1);
                conn.query(sql2,dbInfo,(error,rows)=>{
                    conn.release();
                    if(error) return reject(error);
                    resolve("등록완료");
                });
            });
        });
    }

    async getPrice(seq,len){
        var result = 0;
        for(var i = 0; i < seq.length; i++){
            var product = await this.getProduct(seq[i]);
            result += Number(product) * Number(len[i]);
        }
        return result;
    }

    getProduct(seq){
        return new Promise((resolve, reject)=>{
            var sql = `select product_pr from mt_product where product_seq = ${seq}`;
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    conn.release();
                    if(error) return reject(error);
                    if(rows.length == 0) return reject("상품이 없습니다.");
                    return resolve(rows[0].product_pr);
                });
            });
        });
    }

    getNumOverlap(randomNum){
        return new Promise((resolve, reject)=>{
            var sql = `select order_num from mt_order where order_num = ${randomNum}`;
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    conn.release();
                    if(error) return reject(error);
                    if(rows.length == 0) return resolve(false);
                    return resolve(true);
                });
            });
        });
    }

    getSuccessData(orderNum){
        return new Promise((resolve, reject)=>{
            var sql = `select * from mt_order where order_num = '${orderNum}'`;
            getConnection((conn)=>{
                conn.query(sql,(err,rows)=>{
                    conn.release();
                    if(err) throw err;
                    if(rows.length == 0) return reject("상품이 없습니다.");
                    return resolve(rows[0]);
                });
            });
        });
    }

    userOrderSelect(userId){
        return new Promise((resolve,reject)=>{
            var sql = `select order_num from mt_user where user_id = '${userId}'`;
            getConnection((conn)=>{
                conn.query(sql,(err,rows)=>{
                    conn.release();
                    if(err) throw err;
                    if(rows.length == 0) return console.log("주문내역이 없습니다.");
                    return resolve(rows[0].order_num);
                });
            });
        });
    }

    userOrderUpdate(userId,orderNum){
        return new Promise(async(resolve, reject)=>{
            try{
                var userOrder = await this.userOrderSelect(userId);
                var userOrderResult = "";
                userOrder == "" ? userOrderResult = orderNum : userOrderResult = userOrder+","+orderNum;
                var sql = `update mt_user set ? where user_id = '${userId}'`;
                getConnection((conn)=>{
                    conn.query(sql,{order_num:userOrderResult},(err,rows)=>{
                        conn.release();
                        if(err) throw err;
                        resolve(true);
                    });
                });
            }catch(err){
                console.log(err);
                reject(false);
            }
        });
    }

}

module.exports = Order;