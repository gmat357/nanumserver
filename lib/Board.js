// const Mysql = require("../mysql/mysql");
const getConnection = require('../mysql/Mysql');

class Board{
    constructor() {
    }
    
    getBoard(){
        return new Promise((resolve,reject)=>{
            var sql = `select * from mt_notice order by No desc`;
            getConnection((conn)=>{
                conn.query(sql, (error,rows)=>{
                    conn.release();
                    if(error) throw error;
                    if(rows.length == 0) return reject("게시물이 없습니다.");
                    return resolve(rows);     
                });
            });
        });
    }

    getBoardData(page){
        return new Promise((resolve,reject)=>{
            var sql = `select * from mt_notice where No = ${page}`;
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    conn.release();
                    if(error) throw error;
                    if(rows.length == 0) return reject("게시물이 없습니다.");
                    return resolve(rows);
                });
            });
        });
    }

    lookUpdate(page,look){
        var sql = `update mt_notice set ? where No = '${page}'`;
        getConnection((conn)=>{
            var query = {mt_look:Number(look) + 1};
            conn.query(sql,query, (error,rows)=>{
                conn.release();
                if(error) throw error;
                return true;
            });
        });
    }
    
}

module.exports = Board;