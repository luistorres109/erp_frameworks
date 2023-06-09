-- MySQL Script generated by MySQL Workbench
-- Wed Apr 26 17:37:51 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ERP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `office`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `office` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(60) NULL,
  `id_office` INT NOT NULL,
  `login` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `isinactive` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  INDEX `fk_user_id_office_idx` (`id_office` ASC) VISIBLE,
  CONSTRAINT `fk_user_id_office`
    FOREIGN KEY (`id_office`)
    REFERENCES `office` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `path` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `userPermission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `userPermission` (
  `user_uuid` CHAR(36) NOT NULL,
  `permission_id` INT NOT NULL,
  `query` TINYINT(1) NOT NULL DEFAULT 0,
  `register` TINYINT(1) NOT NULL DEFAULT 0,
  `edit` TINYINT(1) NOT NULL DEFAULT 0,
  `delete` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_uuid`, `permission_id`),
  INDEX `uspr_permission_idx` (`permission_id` ASC) INVISIBLE,
  CONSTRAINT `uspr_user`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `user` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `uspr_permission`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `option`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `option` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(200) NULL,
  `isinactive` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NULL,
  `decription` TEXT NULL,
  `barcode` BIGINT NULL,
  `medida` INT NOT NULL,
  `price` FLOAT NULL,
  `isinactive` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_product_medida_idx` (`medida` ASC) VISIBLE,
  CONSTRAINT `fk_product_medida`
    FOREIGN KEY (`medida`)
    REFERENCES `option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `client` (
  `uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(80) NULL,
  `document` BIGINT NULL,
  `phone` BIGINT NULL,
  `address` VARCHAR(80) NULL,
  `district` VARCHAR(80) NULL,
  `city` VARCHAR(80) NULL,
  `state` VARCHAR(2) NULL,
  `num_address` SMALLINT NULL,
  `cep` BIGINT NULL,
  `isinactive` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_uuid` CHAR(36) NOT NULL,
  `user_uuid` CHAR(36) NOT NULL,
  `sale_date` DATETIME NULL,
  `total_price` FLOAT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `orde_user_idx` (`user_uuid` ASC) VISIBLE,
  INDEX `orde_client_idx` (`client_uuid` ASC) VISIBLE,
  INDEX `fk_orders_status_idx` (`status` ASC) VISIBLE,
  CONSTRAINT `fk_orders_id_user`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `user` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_id_client`
    FOREIGN KEY (`client_uuid`)
    REFERENCES `client` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_status`
    FOREIGN KEY (`status`)
    REFERENCES `option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `orderItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orderItem` (
  `order_id` INT NOT NULL,
  `sequence` INT NOT NULL,
  `product_id` INT NOT NULL,
  `amount` FLOAT NULL,
  `total_price` FLOAT NULL,
  `un_price` FLOAT NULL,
  PRIMARY KEY (`order_id`, `sequence`),
  INDEX `fk_orditen_id_product_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_orditen_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orditen_id_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `officePermissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `officePermissions` (
  `office_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  `query` TINYINT(1) NULL,
  `register` TINYINT(1) NULL,
  `edit` TINYINT(1) NULL,
  `delete` TINYINT(1) NULL,
  PRIMARY KEY (`office_id`, `permission_id`),
  INDEX `fk_ofpm_id_permission_idx` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `fk_id_office`
    FOREIGN KEY (`office_id`)
    REFERENCES `office` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_permission`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `optionLocation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `optionLocation` (
  `id` INT NOT NULL,
  `option_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `isinactive` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `option_id`),
  INDEX `fk_oplc_id_idx` (`option_id` ASC) VISIBLE,
  CONSTRAINT `fk_oplc_id`
    FOREIGN KEY (`option_id`)
    REFERENCES `option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cep` (
  `id` INT NOT NULL COMMENT 'Código do IBGE',
  `code` BIGINT NULL COMMENT 'CEP DO ENDEREÇO',
  `state` VARCHAR(2) NULL COMMENT 'ESTADO',
  `city` VARCHAR(80) NULL,
  `district` VARCHAR(80) NULL,
  `address` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
