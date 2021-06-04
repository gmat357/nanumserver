module.exports = {
    mt_user:"CREATE TABLE `mt_user` ("
        +"`user_no` INT PRIMARY KEY AUTO_INCREMENT,"
        +"`user_id` VARCHAR(50) UNIQUE,"
        +"`user_psw` LONGTEXT NOT NULL,"
        +"`user_email` VARCHAR(100) NOT NULL,"
        +"`user_phone` VARCHAR(20) NOT NULL,"
        +"`user_tel` VARCHAR(20) NOT NULL,"
        +"`user_name` VARCHAR(20) NOT NULL,"
        +"`reg_dt` DATETIME NOT NULL,"
        +"`chg_dt` DATETIME NOT NULL,"
        +"`oper_seq` VARCHAR(20) NOT NULL"
        +")",

    mt_menu:"CREATE TABLE `mt_menu` ("
    +"`menu_seq` BIGINT PRIMARY KEY,"
    +"`menu_nm` VARCHAR(50) NOT NULL,"
    +"`menu_path` VARCHAR(100) NOT NULL,"
    +"`menu_ord` INT NOT NULL,"
    +"`reg_dt` DATETIME NOT NULL,"
    +"`chg_dt` DATETIME NOT NULL"
    +")",

    mt_sub:"CREATE TABLE `mt_sub` ("
    +"`menu_seq` BIGINT UNIQUE,"
    +"`upr_menu_seq` BIGINT PRIMARY KEY,"
    +"`menu_nm` VARCHAR(100) NOT NULL,"
    +"`menu_path` VARCHAR(100) NOT NULL,"
    +"`menu_ord` INT NOT NULL,"
    +"`reg_dt` DATETIME NOT NULL,"
    +"`chg_dt` DATETIME NOT NULL"
    +")",

    mt_product:"CREATE TABLE `mt_product` ("
    +"`product_seq` BIGINT PRIMARY KEY,"
    +"`product_nm` VARCHAR(100) NOT NULL,"
    +"`product_pr` VARCHAR(100) NOT NULL,"
    +"`product_img` LONGTEXT NOT NULL,"
    +"`product_path` LONGTEXT NOT NULL,"
    +"`product_text` LONGTEXT NOT NULL,"
    +"`product_so` INT NOT NULL,"
    +"`product_new` INT NOT NULL,"
    +"`product_pp` INT NOT NULL,"
    +"`reg_dt` DATETIME NOT NULL,"
    +"`chg_dt` DATETIME NOT NULL"
    +")",
}