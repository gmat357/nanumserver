const mysql = require('mysql');
const config = require('./config');

let pool = mysql.createPool(config);

async function getConnection(callback){
    pool.getConnection(function (err,conn){
        if(!err){
            callback(conn);
        }
    });
}

module.exports = getConnection;
// class Mysql{
//     constructor() {
//         this.mysql = {
//             connectionLimit:50,
//             host:config.host,
//             user:config.user,
//             password:config.password,
//             database:config.database,
//             waitForConnections:true,
//         }
//     }

//     getConnection(callback){
//         mysql.createPool.getConnection
//     }

//     connection(){
//         return mysql.createPool(this.mysql);
//     }

//     selectTable(){

//         this.connection().getConnection
//         this.db.getConnection(function(err,conn){
//             if(!err){
//                 conn.query(`SHOW TABLE STATUS FROM ${config.database}`,(err,rows)=>{
//                     if(err) console.log("selectTable : "+err);
//                     if(rows.length == undefined){
//                         this.createTable();
//                     }else{
//                         return;
//                     }
//                 });
//             }
//             conn.release();
//         })
        
//     }
    
//     createTable(){
//         this.db.query(schema.mt_user,(err)=>{if(err) console.log("createTable : " + err);});
//         this.db.query(schema.mt_menu,(err)=>{if(err) console.log("createTable : " + err);});
//         this.db.query(schema.mt_sub,(err)=>{if(err) console.log("createTable : " + err);});
//         this.db.query(schema.mt_product,(err)=>{if(err) console.log("createTable : " + err);});
//     }

// }

// module.exports = Mysql;