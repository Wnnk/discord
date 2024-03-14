/*
SQLyog Trial v13.1.8 (64 bit)
MySQL - 8.0.33 : Database - eggzoneframe
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`eggzoneframe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `eggzoneframe`;

/*Table structure for table `email` */

DROP TABLE IF EXISTS `email`;

CREATE TABLE `email` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receiver_uuid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sender_uuid` varchar(32) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `email` */

insert  into `email`(`id`,`receiver_uuid`,`sender_uuid`,`status`,`content`,`title`,`type`,`create_time`) values 
(4,'20230627200416867249','20230619224042592858',0,'邀请好友','title',0,'2024-03-05 14:03:21'),
(5,'20230627200416867249','20230619224042592858',0,'邀请好友','title',0,'2024-03-05 14:04:02'),
(6,'20230627200416867249','20230619224042592858',0,'邀请好友','title',0,'2024-03-05 14:04:51'),
(7,'20230627200416867249','20230619224042592858',0,'邀请好友','title',0,'2024-03-05 14:05:34'),
(8,'20230619224042592858','20230627200416867249',0,'测试邮件','test',0,'2024-03-06 20:07:16');

/*Table structure for table `email-code` */

DROP TABLE IF EXISTS `email-code`;

CREATE TABLE `email-code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `expiration_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `email-code` */

insert  into `email-code`(`id`,`email`,`code`,`expiration_time`,`create_time`) values 
(6,'bimigas836@lendfash.com','38131','2024-02-21 12:45:25','2024-02-21 12:40:25');

/*Table structure for table `friend` */

DROP TABLE IF EXISTS `friend`;

CREATE TABLE `friend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_uuid` varchar(255) DEFAULT NULL,
  `friend_uuid` varchar(255) DEFAULT NULL,
  `relationship` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `friend` */

insert  into `friend`(`id`,`user_uuid`,`friend_uuid`,`relationship`) values 
(2,'20230619224042592858','20230627200527563719',1),
(3,'20230619224042592858','20230627200546097387',0),
(4,'20230619224042592858','20230627200601394613',-1),
(5,'20230619224042592858','20230627200616634772',1),
(6,'20230627200527563719','20230619224042592858',1),
(21,'20230619224042592858','20230627200416867249',0),
(22,'20230627200416867249','20230619224042592858',0);

/*Table structure for table `group` */

DROP TABLE IF EXISTS `group`;

CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) DEFAULT NULL,
  `group_owner` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` datetime NOT NULL,
  `iconpath` varchar(255) NOT NULL,
  `default_channel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `group` */

insert  into `group`(`id`,`group_name`,`group_owner`,`create_time`,`iconpath`,`default_channel`) values 
(41,'Midjourney','20230619224042592858','2023-08-16 21:29:15','http://127.0.0.1:7001/guild/1692192605424.png','20230816213005446054'),
(42,'Honkai: Star Rail Official','20230619224042592858','2023-08-16 21:38:36','http://127.0.0.1:7001/guild/1692193132151.jpg','20230816213852177226'),
(43,'城市服务','20230619224042592858','2023-12-27 20:45:41','http://127.0.0.1:7001/guild/1703683793603.jpg','20231227212953627494'),
(44,'雪地探险','20230619224042592858','2023-12-27 20:45:41','http://127.0.0.1:7001/guild/1703683844816.jpg','20231227213044837625'),
(45,'Genshin Impact Official','20230619224042592858','2023-12-27 20:45:41','http://127.0.0.1:7001/guild/1703683883850.png','20231227213123864302'),
(46,'AI生成','20230619224042592858','2023-12-27 20:45:41','http://127.0.0.1:7001/guild/1703683912515.png','20231227213152528914');

/*Table structure for table `group-channel` */

DROP TABLE IF EXISTS `group-channel`;

CREATE TABLE `group-channel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `channel_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parvate_channel` int NOT NULL,
  `channel_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `group-channel` */

insert  into `group-channel`(`id`,`group_id`,`channel_id`,`parvate_channel`,`channel_name`) values 
(4,41,'20230816213005446054',0,'常规'),
(5,42,'20230816213852177226',0,'常规1'),
(6,43,'20231227212953627494',0,'常规'),
(7,44,'20231227213044837625',0,'常规'),
(8,45,'20231227213123864302',0,'常规'),
(9,46,'20231227213152528914',0,'常规');

/*Table structure for table `group-chat` */

DROP TABLE IF EXISTS `group-chat`;

CREATE TABLE `group-chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `sender_id` varchar(36) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `channel_id` varchar(255) DEFAULT NULL,
  `message_type` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `group-chat` */

insert  into `group-chat`(`id`,`group_id`,`sender_id`,`message`,`create_time`,`channel_id`,`message_type`) values 
(1,41,'20230619224042592858','发送信息','2023-08-22 19:12:47','20230816213005446054',0),
(5,41,'20230619224042592858','发送信息1','2023-08-22 20:10:45','20230816213005446054',0),
(6,41,'20230619224042592858','发送信息2','2023-08-24 20:10:48','20230816213005446054',0),
(7,41,'20230619224042592858','发送信息3','2023-08-24 20:10:52','20230816213005446054',0),
(8,41,'20230619224042592858','测试','2023-08-24 21:24:23','20230816213005446054',0),
(9,41,'20230619224042592858','测试','2023-08-24 21:24:25','20230816213005446054',0),
(10,41,'20230619224042592858','测试','2023-08-24 21:24:26','20230816213005446054',0),
(11,41,'20230619224042592858','测试','2023-08-24 21:24:28','20230816213005446054',0),
(12,41,'20230619224042592858','测试','2023-08-24 21:24:31','20230816213005446054',0),
(13,41,'20230619224042592858','测试','2023-08-24 21:24:33','20230816213005446054',0),
(15,42,'20230619224042592858','参考信息','2023-08-30 21:20:22','20230816213852177226',0),
(28,42,'20230619224042592858','http://127.0.0.1:7001/guildChat/1693491528105.jpg','2023-08-31 22:14:10','20230816213852177226',1),
(35,41,'20230627200527563719','16','2023-09-26 21:44:21','20230816213005446054',0),
(36,41,'20230619224042592858','da','2023-09-26 21:54:23','20230816213005446054',0),
(37,41,'20230619224042592858','da1','2023-09-26 21:58:28','20230816213005446054',0),
(38,41,'20230619224042592858','fsdgs','2023-09-26 21:58:53','20230816213005446054',0),
(39,41,'20230619224042592858','dadadaf','2023-09-26 22:01:38','20230816213005446054',0),
(40,41,'20230619224042592858','111111','2023-09-26 22:02:52','20230816213005446054',0),
(41,41,'20230619224042592858','222','2023-09-26 22:03:37','20230816213005446054',0),
(42,41,'20230619224042592858','211','2023-09-26 22:06:07','20230816213005446054',0),
(43,41,'20230619224042592858','333','2023-09-26 22:06:07','20230816213005446054',0),
(44,41,'20230619224042592858','444','2023-09-26 22:10:35','20230816213005446054',0),
(45,41,'20230619224042592858','555','2023-09-26 22:10:49','20230816213005446054',0),
(46,41,'20230627200527563719','666','2023-09-26 22:12:06','20230816213005446054',0),
(47,41,'20230619224042592858','1','2023-10-11 21:17:11','20230816213005446054',0),
(48,41,'20230619224042592858','2','2023-10-16 21:32:04','20230816213005446054',0),
(49,41,'20230619224042592858','3','2023-10-16 21:32:04','20230816213005446054',0),
(50,43,'20230619224042592858','http://127.0.0.1:7001/guildChat/1704281399303.jpg','2024-01-03 19:06:49','20231227212953627494',1),
(51,44,'20230619224042592858','?','2024-01-09 19:48:17','20231227213044837625',0),
(52,43,'20230619224042592858','da?daf?','2024-01-09 19:48:17','20231227212953627494',0);

/*Table structure for table `group-member` */

DROP TABLE IF EXISTS `group-member`;

CREATE TABLE `group-member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `member_id` varchar(36) DEFAULT NULL,
  `type` int DEFAULT NULL COMMENT '成员权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `group-member` */

insert  into `group-member`(`id`,`group_id`,`member_id`,`type`) values 
(7,41,'20230619224042592858',1),
(8,42,'20230619224042592858',1),
(9,41,'20230627200527563719',0),
(11,43,'20230619224042592858',1),
(12,44,'20230619224042592858',1),
(13,45,'20230619224042592858',1),
(14,46,'20230619224042592858',1);

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_uuid` varchar(36) DEFAULT NULL,
  `receiver_uuid` varchar(36) DEFAULT NULL,
  `contain` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `read` int DEFAULT NULL,
  `is_deleted` tinyint DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `message_type` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `message` */

insert  into `message`(`id`,`sender_uuid`,`receiver_uuid`,`contain`,`create_time`,`read`,`is_deleted`,`attachment`,`message_type`) values 
(1,'20230619224042592858','20230627200527563719','你好，初次见面 1-2','2023-07-04 21:13:57',1,0,NULL,0),
(2,'20230627200527563719','20230619224042592858','你好!!!  2-1','2023-07-04 21:14:44',0,0,NULL,0),
(3,'20230619224042592858','20230627200527563719','网络错误信息，应该看不见 1-2','2023-07-04 21:15:16',-1,0,NULL,0),
(4,'20230619224042592858','20230627200546097387','1 -- 3信息','2023-07-04 21:41:22',0,0,NULL,0),
(5,'20230627200601394613','20230627200546097387','4 -- 3 信息','2023-07-05 21:50:11',1,0,NULL,0),
(84,'20230619224042592858','20230627200527563719','1111','2023-07-27 20:06:46',0,0,NULL,0),
(85,'20230619224042592858','20230627200527563719','http://127.0.0.1:7001/upload/1690801321898.jpg','2023-07-31 19:01:17',0,0,NULL,1),
(86,'20230619224042592858','20230627200527563719','1','2023-07-31 19:01:17',0,0,NULL,0),
(87,'20230627200527563719','20230619224042592858','http://127.0.0.1:7001/upload/1690801513393.png','2023-07-31 19:01:17',0,0,NULL,1),
(88,'20230619224042592858','20230627200527563719','http://127.0.0.1:7001/upload/1690801517801.jpg','2023-07-31 19:01:17',0,0,NULL,1),
(89,'20230619224042592858','20230627200527563719','http://127.0.0.1:7001/upload/1691590614971.png','2023-08-09 20:41:37',0,0,NULL,1),
(90,'20230619224042592858','20230627200416867249','http://127.0.0.1:7001/1691666104711.jpg','2023-08-10 19:08:00',0,0,NULL,1),
(91,'20230619224042592858','20230627200416867249','http://127.0.0.1:7001/1691666177459.png','2023-08-10 19:08:00',0,0,NULL,1),
(92,'20230619224042592858','20230627200527563719','http://127.0.0.1:7001/upload/1691673701820.png','2023-08-10 21:21:37',0,0,NULL,1),
(93,'20230619224042592858','20230627200527563719','http://127.0.0.1:7001/upload/1691673964939.jpg','2023-08-10 21:21:37',0,0,NULL,1),
(94,'20230619224042592858','20230627200601394613','更低功耗鞥六年','2023-08-23 20:01:31',0,0,NULL,0),
(95,'20230619224042592858','20230627200527563719','1111111111','2023-09-27 21:21:13',0,0,NULL,0),
(96,'20230619224042592858','20230627200416867249','go了','2024-01-02 20:09:34',0,0,NULL,0),
(97,'20230619224042592858','20230627200546097387','?','2024-01-08 20:17:21',0,0,NULL,0);

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` varchar(20) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `view_count` int DEFAULT NULL,
  `reply_count` int DEFAULT NULL,
  `last_reply_user_id` int DEFAULT NULL,
  `last_reply_time` datetime DEFAULT NULL,
  `is_top` tinyint(1) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `post` */

insert  into `post`(`id`,`title`,`content`,`create_time`,`update_time`,`user_id`,`category_id`,`view_count`,`reply_count`,`last_reply_user_id`,`last_reply_time`,`is_top`,`is_deleted`) values 
('20240214130003906659','测试标题','测试帖子','2024-02-14 05:00:03',NULL,'20230619224042592858',NULL,3,1,NULL,NULL,0,0),
('20240214132200050896','新帖子','111111','2024-02-14 05:22:00',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240214132324651954','22','2222222','2024-02-14 05:23:24',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240214142517462966','长长长','123456789461616516516516fdsfsgfsagdgkdlgnlkdnglkdngljdngldjgndjksghjfdghignidnbdfjbndjkfgbnjkdbngjkdgbkdjsgbkdjgbdkjgbskdgbdskgjbdkjgbdskgjbdskgjsdkdgbdskgbdskgbdskgjdsbgksdgbdskgbdskgbkdsgbdskgkdsjgbkdsgsdk','2024-02-14 06:25:17',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240214155806875127','ces','测试','2024-02-14 07:58:06',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240217141812954075','1111111111','111111111111111','2024-02-17 06:18:12',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240217144411043264','22222','2222222222222222222222222222222222','2024-02-17 06:44:11',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240227202340966649','测试滚动','测试滚动','2024-02-27 12:23:40',NULL,'20230619224042592858',NULL,1,0,NULL,NULL,0,0),
('20240227202347245453','测试滚动1','测试滚动1','2024-02-27 12:23:47',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240227202351257117','测试滚动12','测试滚动12','2024-02-27 12:23:51',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240227204831182092','测试触底刷新','测试触底刷新','2024-02-27 12:48:31',NULL,'20230619224042592858',NULL,0,0,NULL,NULL,0,0),
('20240227204836050964','测试触底刷新11','测试触底刷新11','2024-02-27 12:48:36',NULL,'20230619224042592858',NULL,2,0,NULL,NULL,0,0);

/*Table structure for table `reply` */

DROP TABLE IF EXISTS `reply`;

CREATE TABLE `reply` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `post_id` varchar(20) DEFAULT NULL,
  `parent_reply_id` varchar(20) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `reply` */

insert  into `reply`(`id`,`content`,`create_time`,`update_time`,`user_id`,`post_id`,`parent_reply_id`,`is_deleted`) values 
('20230619224042592858','回复测试','2024-02-16 15:15:29',NULL,'20230619224042592858','20240214130003906659','20230627200416867249',0),
('20230619224042592859','回复测试111','2024-02-17 13:11:51','2024-02-18 13:36:43','20230619224042592858','20240214130003906659',NULL,0),
('20230619224042592860','父id','2024-02-16 13:44:18','2024-02-17 13:44:10','20230627200416867249','20240214130003906659',NULL,0),
('20230619224042592861','11111','2024-02-17 14:17:38',NULL,'20230627200416867249','20240214130003906659',NULL,0),
('20240229212930674253','dasfsfdada','2024-02-29 13:29:30',NULL,'20230619224042592858','20240214130003906659','20230619224042592861',0),
('20240229213143956208','fasfsaf','2024-02-29 13:31:43',NULL,'20230619224042592858','20240214130003906659','20230619224042592858',0),
('20240229214220152997','dad','2024-02-29 13:42:20',NULL,'20230619224042592858','20240214130003906659',NULL,0),
('20240229214359112146','dda','2024-02-29 13:43:59',NULL,'20230619224042592858','20240214130003906659',NULL,0);

/*Table structure for table `sequelizemeta` */

DROP TABLE IF EXISTS `sequelizemeta`;

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

/*Data for the table `sequelizemeta` */

insert  into `sequelizemeta`(`name`) values 
('20230612120544-init-user.js'),
('20230615114849-init-userLogin.js'),
('20230626122129-init-friend.js'),
('20230626122941-init-message.js'),
('20230731111602-init-group.js'),
('20230731111623-init-group-member.js'),
('20230731111632-init-group-chat.js'),
('20230810141427-init-group-channel.js'),
('20231009110103-init-sheet.js'),
('20231009110242-init-work-book.js'),
('20231009110302-init-sheet-data.js'),
('20231024125920-init-workbook-member.js'),
('20240213030709-post.js'),
('20240213030731-reply.js'),
('20240221112442-init-email-code.js'),
('20240305130817-email.js');

/*Table structure for table `sheet` */

DROP TABLE IF EXISTS `sheet`;

CREATE TABLE `sheet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `workbook_id` int NOT NULL,
  `option` json DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sheet` */

insert  into `sheet`(`id`,`workbook_id`,`option`,`create_time`,`update_time`) values 
(20,35,'{\"row\": 36, \"hide\": 0, \"name\": \"Cell\", \"chart\": [], \"color\": \"\", \"image\": [], \"index\": \"b7YeUdifKBJSwjcPjnAlmKBOWre71JgS\", \"order\": 0, \"column\": 18, \"config\": {\"merge\": {}, \"rowlen\": {}, \"authority\": {}, \"borderInf\": {}, \"colhidden\": {}, \"columnlen\": {}, \"rowhidden\": {}}, \"filter\": null, \"frozen\": {}, \"status\": 1, \"celldata\": [], \"calcChain\": [], \"scrollTop\": 0, \"zoomRatio\": 1, \"pivotTable\": {}, \"scrollLeft\": 0, \"isPivotTable\": false, \"filter_select\": {}, \"showGridLines\": 1, \"defaultColWidth\": 73, \"dataVerification\": {}, \"defaultRowHeight\": 19, \"luckysheet_select_save\": [], \"luckysheet_alternateformat_save\": [], \"luckysheet_conditionformat_save\": {}, \"luckysheet_alternateformat_save_modelCustom\": []}','2023-10-24 20:10:01','2023-10-24 20:10:01'),
(23,35,'{\"row\": 18, \"name\": \"Sheet3\", \"color\": \"\", \"index\": \"Sheet_TrmLl36ean6l_1698232031658\", \"order\": 2, \"column\": 18, \"config\": {}, \"status\": \"0\", \"celldata\": [], \"pivotTable\": null, \"isPivotTable\": false}','2023-10-25 19:00:24','2023-10-25 19:00:24'),
(54,56,'{\"name\": \"名字1\", \"index\": \"5c22mh4ELopVM3jb2cVPVJpUuA9TwmGe\", \"order\": \"0\", \"status\": \"0\", \"defaultColWidth\": 72, \"defaultRowHeight\": 18}','2023-10-31 21:27:34','2023-10-31 21:27:34'),
(55,56,'{\"name\": \"名字2\", \"index\": \"bj920k7OxEN5O1njis4hNMqm74BtcYTh\", \"order\": \"1\", \"status\": \"1\", \"defaultColWidth\": 72, \"defaultRowHeight\": 18}','2023-10-31 21:27:34','2023-10-31 21:27:34');

/*Table structure for table `sheet-data` */

DROP TABLE IF EXISTS `sheet-data`;

CREATE TABLE `sheet-data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sheet_Id` int NOT NULL,
  `r` int NOT NULL,
  `c` int NOT NULL,
  `v` json DEFAULT NULL,
  `index` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4665 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sheet-data` */

insert  into `sheet-data`(`id`,`sheet_Id`,`r`,`c`,`v`,`index`) values 
(4339,20,0,0,'{\"m\": \"31312\", \"v\": 31312, \"ct\": {\"t\": \"n\", \"fa\": \"General\"}}','b7YeUdifKBJSwjcPjnAlmKBOWre71JgS'),
(4340,20,1,0,'{\"m\": \"1234\", \"v\": 1234, \"ct\": {\"t\": \"n\", \"fa\": \"General\"}}','b7YeUdifKBJSwjcPjnAlmKBOWre71JgS'),
(4661,54,4,1,'{\"v\": \"测试1\", \"qp\": 1, \"tb\": 1}','5c22mh4ELopVM3jb2cVPVJpUuA9TwmGe'),
(4662,54,0,0,'{\"m\": \"1\", \"v\": 1, \"ct\": {\"t\": \"n\", \"fa\": \"General\"}, \"tb\": 1}','bj920k7OxEN5O1njis4hNMqm74BtcYTh'),
(4663,54,1,1,'{\"m\": \"2\", \"v\": 2, \"ct\": {\"t\": \"n\", \"fa\": \"General\"}, \"tb\": 1}','bj920k7OxEN5O1njis4hNMqm74BtcYTh'),
(4664,54,2,2,'{\"m\": \"3\", \"v\": 3, \"ct\": {\"t\": \"n\", \"fa\": \"General\"}, \"tb\": 1}','bj920k7OxEN5O1njis4hNMqm74BtcYTh');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  `avator_url` varchar(255) DEFAULT NULL,
  `login_num` int DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`uuid`,`user_name`,`user_email`,`user_type`,`avator_url`,`login_num`,`create_time`,`last_login_time`,`note`,`status`,`nickname`) values 
(6,'20230619224042592858','管理者','deremal666@hdrlog.com',0,'src/assets/images/avatar.jpg',621,'2023-06-19 22:40:42','2024-03-14 11:49:54','自我~~~',0,'昵称啦~~~99'),
(8,'20230620203120108012','1111','157726880@qq.com',0,'src/assets/images/avatar.jpg',NULL,'2023-06-20 20:31:20',NULL,NULL,1,NULL),
(9,'20230627200416867249','11@qq.com','1@qq.com',0,'src/assets/images/avatar.jpg',8,'2023-06-27 20:04:16','2024-03-14 11:52:08',NULL,1,NULL),
(10,'20230627200527563719','2','2@qq.com',0,'src/assets/images/avatar.jpg',6,'2023-06-27 20:05:27','2023-09-26 12:41:28','2号的自我介绍!!!!',1,NULL),
(11,'20230627200546097387','3333333333333','3@qq.com',0,'src/assets/images/avatar.jpg',NULL,'2023-06-27 20:05:46',NULL,'3号自我介绍',0,NULL),
(12,'20230627200601394613','4444444','4@qq.com',0,'src/assets/images/avatar.jpg',NULL,'2023-06-27 20:06:01',NULL,'4号自我介绍',0,NULL),
(13,'20230627200616634772','555555','5@qq.com',0,'src/assets/images/avatar.jpg',NULL,'2023-06-27 20:06:16',NULL,NULL,1,NULL),
(20,'20240221204052993033','bimigas836@lendfash.com','bimigas836@lendfash.com',0,NULL,NULL,'2024-02-21 12:40:52',NULL,NULL,NULL,NULL);

/*Table structure for table `user_login` */

DROP TABLE IF EXISTS `user_login`;

CREATE TABLE `user_login` (
  `uuid` varchar(36) NOT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_login` */

insert  into `user_login`(`uuid`,`user_password`,`user_email`,`salt`) values 
('20230619224042592858','$2a$10$TG1Bx3DyTWN71nNGvWKKoOgCEM9jgsyGIvZ/b8Y0f5LoQnSIDTeha','deremal666@hdrlog.com','$2a$10$TG1Bx3DyTWN71nNGvWKKoO'),
('20230620203120108012','$2a$10$2H5degKas5Oy98xj6BfJeuY8aldzPBgU3Tqfnyj5gSD6rlA6YHUOu','157726880@qq.com','$2a$10$2H5degKas5Oy98xj6BfJeu'),
('20230627200416867249','$2a$10$KDnM4jXIrgzPJklt43H2v.XOalUX7Ab4mOTYY/whIm58ki2cTFfgi','1@qq.com','$2a$10$KDnM4jXIrgzPJklt43H2v.'),
('20230627200527563719','$2a$10$lbXYlmP51wrQNS2i0I0VTOwuQx2r7Gb9WjRFhMouQgQrA4BKsX4/u','2@qq.com','$2a$10$lbXYlmP51wrQNS2i0I0VTO'),
('20230627200546097387','$2a$10$5vvSgbMxhbhuEz67DR0h8.yP1F12U51JmU2/zjxzLhiBq5bglR5.u','3@qq.com','$2a$10$5vvSgbMxhbhuEz67DR0h8.'),
('20230627200601394613','$2a$10$bLKJB7dJ.JrmaSJq8bJgQOlfzSAHQRWR6g8m36SzMLOH93Oq6CjF2','4@qq.com','$2a$10$bLKJB7dJ.JrmaSJq8bJgQO'),
('20230627200616634772','$2a$10$0MjBpM6c2yv2Xp8oyhGw0eDihjdo.2KLdpmF.SlmoUSKZu8Bpo/Ka','5@qq.com','$2a$10$0MjBpM6c2yv2Xp8oyhGw0e');

/*Table structure for table `work-book` */

DROP TABLE IF EXISTS `work-book`;

CREATE TABLE `work-book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT 'Sheet1',
  `owner` varchar(255) NOT NULL,
  `option` json DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `work-book` */

insert  into `work-book`(`id`,`name`,`owner`,`option`,`create_time`,`update_time`) values 
(35,'Sheet1','20230619224042592858','{\"row\": 18, \"lang\": \"zh\", \"title\": \"Demo\", \"column\": 18, \"gridKey\": \"20231024201018631079\", \"loadUrl\": \"http://127.0.0.1:7001/loadUrl\", \"container\": \"luckysheet\", \"allowUpdate\": false, \"myFolderUrl\": \"/#/luckysheet\"}','2023-10-24 20:10:01','2023-10-24 20:10:01'),
(56,'导入','20230619224042592858','{\"row\": 18, \"lang\": \"zh\", \"title\": \"Demo\", \"column\": 18, \"gridKey\": \"20231031212743637167\", \"loadUrl\": \"http://127.0.0.1:7001/loadUrl\", \"container\": \"luckysheet\", \"allowUpdate\": false, \"myFolderUrl\": \"/#/luckysheet\"}','2023-10-31 21:27:34','2023-10-31 21:27:34');

/*Table structure for table `workbook-member` */

DROP TABLE IF EXISTS `workbook-member`;

CREATE TABLE `workbook-member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `workbook_id` int NOT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `workbook-member` */

insert  into `workbook-member`(`id`,`workbook_id`,`uuid`) values 
(1,35,'20230619224042592858'),
(2,35,'20230627200416867249'),
(18,56,'20230619224042592858');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
