const mysql = require('mysql');
const config = require('./config');
const schema = require('./schema');

class Mysql{
    constructor() {
        this.mysql = {
            host:config.host,
            user:config.user,
            password:config.password,
            database:config.database,
        }
        this.db;
        this.connection();
    }

    connection(){
        this.db = mysql.createConnection(this.mysql);
        console.log("connection : 커넥션 완료");
    }

    selectTable(){
        this.db.query(`SHOW TABLE STATUS FROM ${config.database}`,(err,rows)=>{
            if(err) console.log("selectTable : "+err);
            if(rows.length == undefined){
                this.createTable();
            }else{
                return;
            }
        });
        
    }
    
    createTable(){
        this.db.query(schema.mt_user,(err)=>{if(err) console.log("createTable : " + err);});
        this.db.query(schema.mt_menu,(err)=>{if(err) console.log("createTable : " + err);});
        this.db.query(schema.mt_sub,(err)=>{if(err) console.log("createTable : " + err);});
        this.db.query(schema.mt_product,(err)=>{if(err) console.log("createTable : " + err);});
    }

}

module.exports = Mysql;