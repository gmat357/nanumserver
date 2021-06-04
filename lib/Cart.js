const Mysql = require("../mysql/mysql");

class Cart{
    constructor(productId,userId) {
        this.db = new Mysql().db;
        this.productId = productId;
        this.userId = userId;
    }
    
    cartInsert(){
        return new Promise( async (resolve, reject)=>{
            try{
                var sql = `update mt_user set ? where user_id = '${this.userId}'`;
                var overlap = await this.cartOverlap();
                if(overlap) return reject("이미 장바구니에 담겨있습니다.");
                var resultData = await this.cartProductChange();
                this.db.query(sql,{cart_seq:resultData},(err,rows)=>{
                    if(err) return reject(err);
                    return resolve(rows);
                });
            }catch(err){
                reject(err);
            }
        });
    }

    cartProductChange(){
        return new Promise(async(resolve, reject)=>{
            try{
                var selectData = await this.cartSelect();
                if(selectData == "") return resolve(this.productId);
                else return resolve(selectData + "," + this.productId);
            }catch(err){
                console.log(err);
                return reject(err);
            }
        });
    }

    cartSelect(){
        return new Promise((resolve,reject)=>{
            var sql = `select cart_seq from mt_user where user_id = '${this.userId}'`;
            this.db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows[0].cart_seq);
            });
        });
    }

    cartOverlap(){
        return new Promise((resolve, reject)=>{
            var sql = `select cart_seq from mt_user where user_id = '${this.userId}'`;
            this.db.query(sql, (err,rows)=>{
                if(err) return reject(err);
                if(rows.length == 0) return resolve(false);
                if(rows[0].cart_seq == null) return resolve(false);
                var cartArr = rows[0].cart_seq.split(",");
                for(var i = 0; i < cartArr.length; i++){
                    if(cartArr[i] == this.productId){
                        return resolve(true);
                    }
                }
                return resolve(false);
            });
        });
    }

    cartGetSelect(){
        return new Promise((resolve,reject)=>{
            var sql = `select * from mt_product where product_seq = '${this.productId}'`;
            this.db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    }

    cartDelete(){
        return new Promise( async(resolve, reject)=>{
            var cartData = await this.cartDeleteData();
            console.log(cartData);
            var sql = `update mt_user set ? where user_id = '${this.userId}'`;
            this.db.query(sql,{cart_seq:cartData},(err,rows)=>{
                if(err) return reject(err);
                resolve({message:"삭제되었습니다."});
            });
        });
    }

    cartDeleteData(){
        return new Promise( async(resolve, reject)=>{
            try{
                var selectData = await this.cartSelect();
                var dataArr = [];
                var dataResult = "";
                if(selectData.match(",")){
                    dataArr = selectData.split(",");
                }
                for(var i = 0; i < dataArr.length; i++){
                    if(dataArr[i] != this.productId){
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