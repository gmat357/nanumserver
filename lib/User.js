const getConnection = require('../mysql/Mysql');

class User{
    constructor() {
        
    }

    getUser(){
        return new Promise((resolve, reject)=>{
            var sql = `select * from mt_user order by user_no desc`;
            getConnection((conn)=>{
                conn.query(sql,(err,rows)=>{
                    conn.release();
                    if(err) throw err;
                    if(rows.length == 0 ) return reject("유저가 없습니다.");
                    return resolve(rows);
                });
            });
        });
    }
    
    deleteUser(userNo){
        return new Promise((resolve,reject)=>{
            var sql = `delete from mt_user where user_no = ${userNo}`;
            getConnection((conn)=>{
                conn.query(sql,(err,rows)=>{
                    conn.release();
                    if(err) throw err;
                    return resolve(true);
                });
            });
        });
    }
}

module.exports = User;