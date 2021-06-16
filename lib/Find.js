// const Mysql = require("../mysql/mysql");
const getConnection = require('../mysql/Mysql');

class Find{
    constructor() {
        this.bcrypt = require('bcrypt-nodejs');
    }
    
    findId(id,email){
        return new Promise((resolve, reject)=>{
            getConnection((conn)=>{
                var sql = `select user_id from mt_user where user_name = '${id}' and user_email = '${email}'`;
                conn.query(sql, (error,rows)=>{
                    conn.release();
                    if(error) throw error;
                    if(rows.length == 0) return reject("계정이 없습니다.");
                    return resolve(rows[0]);
                });
            });
        });
    }

    findPsw(id,email){
        return new Promise((resolve, reject)=>{
            getConnection((conn)=>{
                var sql = `select user_id from mt_user where user_id = '${id}' and user_email = '${email}'`;
                conn.query(sql, (error,rows)=>{
                    conn.release();
                    if(error) throw error;
                    if(rows.length == 0) return reject("계정이 없습니다.");
                    return resolve(rows[0]);
                });
            });
        });
    }

    findChangePsw(id,psw){
        return new Promise(async(resolve,reject)=>{
            try{
                var pswhash = await this.pswHashing(psw);
                var sql = `update mt_user set ? where user_id = '${id}'`;
                getConnection((conn)=>{
                    conn.query(sql,{user_psw:pswhash},(error,rows)=>{
                        conn.release();
                        if(error) throw error;
                        return resolve(true);
                    });
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

}

module.exports = Find;