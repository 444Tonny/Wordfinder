CREATE TABLE `word49`.`texts` ( `id_text` VARCHAR(15) NOT NULL , `content` TEXT NOT NULL , UNIQUE `unique` (`id_text`(15))); 

CREATE TABLE `texts_knight` 
( 
    `id_text` VARCHAR(15) NOT NULL ,
    `content` TEXT NOT NULL , 
    UNIQUE `unique` (`id_text`(15))
); 

INSERT INTO `texts_knight` (`id_text`, `content`) values ('text1', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text2', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text3', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text4', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text5', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text6', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text7', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text8', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text9', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text10', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text11', "");
INSERT INTO `texts_knight` (`id_text`, `content`) values ('text12', "");

-- ENGINE = InnoDB;