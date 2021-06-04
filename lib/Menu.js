const Mysql = require('../mysql/Mysql');

class Menu{
    constructor() {
        this.db = new Mysql().db;
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
            this.db.query(sql,(err,rows)=>{
                if(err) reject("selectMenu : " + err);
                if(rows == undefined) reject("메뉴없음");
                resolve(rows);
            });
        });
    }

}

module.exports = Menu;