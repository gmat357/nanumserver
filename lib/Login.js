const Mysql = require('../mysql/Mysql');
const date = require('../function/date');

class Login{
    constructor() {
        this.bcrypt = require('bcrypt-nodejs');
        this.db = new Mysql().db;
    }
    
    loginAction(id,psw,done){
        const sql = `select * from mt_user where user_id = '${id}'`;
        this.db.query(sql, (err,rows)=>{
            if(err) return done(null, false, {message : "데이터베이스 오류" + err});
            if(rows.length == 0) return done(null, false,{message:"등록된 계정이 없습니다."});
            if(this.bcrypt.compareSync(psw,rows[0].user_psw)){
                console.log(`${id} 으로 정상 로그인 하였습니다. ${date.date()}`);
                return done(null, rows[0]);
            }else{
                console.log("불일치");
                return done(null, false, {message : "비밀번호가 다릅니다."});
            }
        });
    }

    loginUserSelect(id){
        return new Promise((resolve, reject)=>{
            var sql = `select * from mt_user where user_id = '${id}'`;
            this.db.query(sql,(err,rows)=>{
                if(err) return rejects("데이터베이스 오류");
                if(rows.length == 0) return reject("해당하는 계정이없습니다.");
                else return resolve(rows[0]);
            });
        })
    }

}

module.exports = Login;