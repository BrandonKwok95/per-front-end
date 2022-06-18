CREATE SCHEMA `easyapp_test` DEFAULT CHARACTER SET utf8mb4;
USE `easyapp_test`;
DROP TABLE IF EXISTS `schedule_list`;
CREATE TABLE `schedule_list`
(
    create_by  varchar(100)     NOT NULL COMMENT '创建人',
    update_by  varchar(100)     NOT NULL COMMENT '更新人'
);
BEGIN;
INSERT INTO `schedule_list` VALUES('guoha043', 'guohao043');
COMMIT;