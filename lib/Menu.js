// const Mysql = require('../mysql/Mysql');
const getConnection = require('../mysql/Mysql');

class Menu {
    constructor() {
    }

    insertMenu(data) {
        return new Promise((resolve, reject) => {
            var sql = `insert into mt_menu set ?`;
            getConnection((conn) => {
                conn.query(sql, data, (err, rows) => {
                    if (err) return console.log(err);
                    return resolve(true);
                });
            });
        });
    }

    updateMenu(menuSeq, ord) {
        return new Promise((resolve, reject) => {
            var sql = `update mt_menu set ? where menu_seq = ${menuSeq}`;
            getConnection((conn) => {
                conn.query(sql, { menu_ord: ord }, (err, rows) => {
                    if (err) return console.log(err);
                    return resolve(true);
                });
            });
        });
    }

    nameUpdateMenu(menuSeq, name) {
        return new Promise((resolve, reject) => {
            var sql = `update mt_menu set ? where menu_seq = ${menuSeq}`;
            getConnection((conn) => {
                conn.query(sql, { menu_nm: name }, (err, rows) => {
                    if (err) return console.log(err);
                    return resolve(true);
                });
            });
        });
    }

    deleteMenu(menuSeq) {
        return new Promise((resolve, reject) => {
            var sql = `delete from mt_menu where menu_seq = ${menuSeq}`;
            getConnection((conn) => {
                conn.query(sql, (err, rows) => {
                    if (err) return console.log(err);
                    return resolve(true);
                });
            });
        });
    }

    selectMenu() {
        return new Promise((resolve, reject) => {
            var sql = "select * from mt_menu order by menu_ord asc";
            getConnection((conn) => {
                conn.query(sql, (error, rows) => {
                    conn.release();
                    if (error) reject("selectMenu : " + error);
                    if (rows == undefined) reject("메뉴없음");
                    resolve(rows);
                });
            });
        });
    }

    menuNumOverlap(menuNum) {
        return new Promise((resolve, reject) => {
            var sql = `select * from mt_menu where menu_seq = ${menuNum}`;
            getConnection((conn) => {
                conn.query(sql, (error, rows) => {
                    conn.release();
                    if (error) return reject(error);
                    if (rows.length == 0) return resolve(false);
                    return resolve(true);
                });
            });
        });
    }

}

module.exports = Menu;