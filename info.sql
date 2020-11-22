CREATE TABLE `UnityGround`.`info_table` (
  `infoid` INT NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(45) NULL,
  `user_score` INT NULL,
  `user_kill` INT NULL,
  PRIMARY KEY (`infoid`));


CREATE TABLE `UnityGround`.`user_table` (
  `userid` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`userid`));


ALTER TABLE `UnityGround`.`info_table` 
ADD INDEX `User_FK_idx` (`userid` ASC) VISIBLE;
;
ALTER TABLE `UnityGround`.`info_table` 
ADD CONSTRAINT `User_FK`
  FOREIGN KEY (`userid`)
  REFERENCES `UnityGround`.`user_table` (`userid`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
