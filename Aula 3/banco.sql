-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mysqlMP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mysqlMP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mysqlMP` DEFAULT CHARACTER SET utf8 ;
USE `mysqlMP` ;

-- -----------------------------------------------------
-- Table `mysqlMP`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mysqlMP`.`usuarios` (
  `idusuarios` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(50) NOT NULL,
  `endereço` VARCHAR(200) NOT NULL,
  `telefone` CHAR(18) NOT NULL,
  `cpf` CHAR(11) NOT NULL,
  `Nome` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idusuarios`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
