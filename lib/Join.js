const Mysql = require('../mysql/Mysql');
const date = require('../function/date');

class Join{
    constructor(body) {
        this.bcrypt = require('bcrypt-nodejs');
        this.db = new Mysql().db;
        this.body = body;
        this.users = {
            user_id:this.body.user_id,
            user_psw:this.body.user_psw,
            user_email:this.body.user_email,
            user_phone:this.body.user_phone,
            user_birth:this.body.user_birth,
            user_name:this.body.user_name,
            user_add:this.body.user_add,
            reg_dt:date.date(),
            chg_dt:"",
            oper_seq:""
        }
    }
    
    joinAction(){
        return new Promise(async(resolve, reject)=>{
            try{
                var sql1 = "alter table mt_user auto_increment = 1";
                var sql2 = "insert into mt_user set ?";
                this.pswHashing();
                this.addressSum();
                await this.usersOverlap();
                this.db.query(sql1);
                this.db.query(sql2,this.users,(err,rows)=>{
                    if(err){
                        console.log("joinAction : " + err);
                        return reject("데이터베이스 오류입니다.");
                    }
                    console.log(`${this.users.user_id} 계정으로 회원가입에 성공했습니다. ${date.date()}`);
                    resolve("회원가입 되었습니다.");
                });
            }catch(err){
                return reject(err);
            }
        });
    }

    pswHashing(){
        this.bcrypt.hash(this.users.user_psw,null,null,(err,hash)=>{
            if(err) return console.log(err);
            this.users.user_psw = hash;
        });
    }

    usersOverlap(){
        return new Promise((resolve, rejects)=>{
            const sql = "select user_id from mt_user where user_id = ?";
            this.db.query(sql,this.users.user_id,(err,rows)=>{
                if(err) return rejects(err);
                if(rows.length > 0) return rejects("아이디가 중복입니다.");
                else return resolve(true);
            });
        });
    }

    addressSum(){
        var resultAdd = "";
        for(var i = 0; i < this.users.user_add.length; i++){
            resultAdd += this.users.user_add[i];
        }
        this.users.user_add = resultAdd;
    }

}

module.exports = Join;