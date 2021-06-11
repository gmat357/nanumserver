// const Mysql = require('../mysql/Mysql');
const getConnection = require('../mysql/Mysql');

class Menu{
    constructor() {
    }
    
    insertMenu(){
        return new Promise((resolve, reject)=>{
            
        });
    }

    updateMenu(){
        return new Promise((resolve, reject)=>{

        });
    }

    deleteMenu(){
        return new Promise((resolve, reject)=>{
            
        });
    }

    selectMenu(){
        return new Promise((resolve, reject)=>{
            var sql = "select * from mt_menu order by menu_ord asc";
            getConnection((conn)=>{
                conn.query(sql,(error,rows)=>{
                    conn.release();
                    if(error) reject("selectMenu : " + error);
                    if(rows == undefined) reject("메뉴없음");
                    resolve(rows);
                });
            });
        });
    }

}

module.exports = Menu;