/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - loginregisterdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`loginregisterdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `loginregisterdb`;

/*Table structure for table `citas` */

DROP TABLE IF EXISTS `citas`;

CREATE TABLE `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `tipo_cita` enum('Presencial','Virtual') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `citas` */

LOCK TABLES `citas` WRITE;

insert  into `citas`(`id`,`nombre`,`apellido`,`correo`,`fecha`,`hora_inicio`,`hora_fin`,`tipo_cita`) values 
(3,'dfsd','fsdefs','xd@gmail.com','2024-08-14','13:00:00','14:30:00','Presencial'),
(4,'dafrg','sgfsf','xcc@gmail.com','2024-08-14','11:30:00','13:00:00','Presencial'),
(5,'sdafr','erfref','xc@gmail.com','2024-08-17','07:30:00','09:00:00','Presencial');

UNLOCK TABLES;

/*Table structure for table `comentarios` */

DROP TABLE IF EXISTS `comentarios`;

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` text NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `autor_id` (`autor_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`autor_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `comentarios_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comentarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `comentarios` */

LOCK TABLES `comentarios` WRITE;

insert  into `comentarios`(`id`,`contenido`,`post_id`,`autor_id`,`fecha`,`parent_id`) values 
(1,'Hola',1,11,'2024-06-26 15:49:47',NULL),
(2,'Hola',2,11,'2024-06-26 15:50:06',NULL),
(3,'Hola',1,5,'2024-06-26 15:50:53',NULL),
(4,'Hola que tal',2,5,'2024-06-26 15:51:44',NULL),
(5,'Bunas tardes me paso lo mismo',1,1,'2024-06-27 15:35:59',NULL),
(6,'Que tal',3,11,'2024-07-01 13:11:33',NULL),
(7,'Muy bien',3,5,'2024-07-01 13:12:14',NULL);

UNLOCK TABLES;

/*Table structure for table `formcin` */

DROP TABLE IF EXISTS `formcin`;

CREATE TABLE `formcin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identificador` int(11) NOT NULL CHECK (`identificador` between 10000000 and 99999999),
  `respeto_mi_cuerpo` tinyint(4) NOT NULL CHECK (`respeto_mi_cuerpo` between 1 and 5),
  `me_siento_bien_con_mi_cuerpo` tinyint(4) NOT NULL CHECK (`me_siento_bien_con_mi_cuerpo` between 1 and 5),
  `siento_que_mi_cuerpo_tiene_buenas_cualidades` tinyint(4) NOT NULL CHECK (`siento_que_mi_cuerpo_tiene_buenas_cualidades` between 1 and 5),
  `actitud_positiva_hacia_mi_cuerpo` tinyint(4) NOT NULL CHECK (`actitud_positiva_hacia_mi_cuerpo` between 1 and 5),
  `atento_a_las_necesidades_de_mi_cuerpo` tinyint(4) NOT NULL CHECK (`atento_a_las_necesidades_de_mi_cuerpo` between 1 and 5),
  `siento_amor_por_mi_cuerpo` tinyint(4) NOT NULL CHECK (`siento_amor_por_mi_cuerpo` between 1 and 5),
  `valoro_caracteristicas_unicas_de_mi_cuerpo` tinyint(4) NOT NULL CHECK (`valoro_caracteristicas_unicas_de_mi_cuerpo` between 1 and 5),
  `comportamiento_refleja_actitud_positiva` tinyint(4) NOT NULL CHECK (`comportamiento_refleja_actitud_positiva` between 1 and 5),
  `me_siento_a_gusto_con_mi_cuerpo` tinyint(4) NOT NULL CHECK (`me_siento_a_gusto_con_mi_cuerpo` between 1 and 5),
  `me_siento_guapo_aunque_diferente_de_modelos` tinyint(4) NOT NULL CHECK (`me_siento_guapo_aunque_diferente_de_modelos` between 1 and 5),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `formcin` */

LOCK TABLES `formcin` WRITE;

insert  into `formcin`(`id`,`identificador`,`respeto_mi_cuerpo`,`me_siento_bien_con_mi_cuerpo`,`siento_que_mi_cuerpo_tiene_buenas_cualidades`,`actitud_positiva_hacia_mi_cuerpo`,`atento_a_las_necesidades_de_mi_cuerpo`,`siento_amor_por_mi_cuerpo`,`valoro_caracteristicas_unicas_de_mi_cuerpo`,`comportamiento_refleja_actitud_positiva`,`me_siento_a_gusto_con_mi_cuerpo`,`me_siento_guapo_aunque_diferente_de_modelos`) values 
(3,11175840,1,2,4,2,1,3,2,4,4,4);

UNLOCK TABLES;

/*Table structure for table `formdos` */

DROP TABLE IF EXISTS `formdos`;

CREATE TABLE `formdos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_apellidos` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `estado_civil` varchar(50) NOT NULL,
  `escolaridad` varchar(50) NOT NULL,
  `servicios_basicos` varchar(255) DEFAULT NULL,
  `lugar_nacimiento` varchar(255) NOT NULL,
  `estado_vives` varchar(255) NOT NULL,
  `municipio_vives` varchar(255) NOT NULL,
  `telefono_contacto` varchar(15) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `ocupacion` varchar(50) NOT NULL,
  `apoyo_gobierno` varchar(255) DEFAULT NULL,
  `grupo_etnico` varchar(255) DEFAULT NULL,
  `afiliacion_institucion` varchar(255) NOT NULL,
  `ingreso_mensual` decimal(10,2) NOT NULL,
  `egreso_mensual` decimal(10,2) NOT NULL,
  `estudios_jefe_hogar` varchar(50) NOT NULL,
  `numero_banos` varchar(10) NOT NULL,
  `numero_automoviles` varchar(10) NOT NULL,
  `internet_hogar` varchar(10) NOT NULL,
  `personas_trabajaron_mes` varchar(10) NOT NULL,
  `cuartos_para_dormir` varchar(10) NOT NULL,
  `familiar_vive_usa` varchar(255) DEFAULT NULL,
  `sabe_proyecto_vida` varchar(10) NOT NULL,
  `tiene_proyecto_vida` varchar(10) NOT NULL,
  `estilo_vida_sano` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `formdos` */

LOCK TABLES `formdos` WRITE;

insert  into `formdos`(`id`,`nombre_apellidos`,`fecha_nacimiento`,`sexo`,`estado_civil`,`escolaridad`,`servicios_basicos`,`lugar_nacimiento`,`estado_vives`,`municipio_vives`,`telefono_contacto`,`correo_electronico`,`religion`,`ocupacion`,`apoyo_gobierno`,`grupo_etnico`,`afiliacion_institucion`,`ingreso_mensual`,`egreso_mensual`,`estudios_jefe_hogar`,`numero_banos`,`numero_automoviles`,`internet_hogar`,`personas_trabajaron_mes`,`cuartos_para_dormir`,`familiar_vive_usa`,`sabe_proyecto_vida`,`tiene_proyecto_vida`,`estilo_vida_sano`) values 
(3,'Oscar Bello','2024-07-17','H','Casada','Básica (preescolar, primaria y secundaria)','Agua entubada, Electricidad','dfsdsdf','gdgfdg','grgdrg','23456','dthdhd@gmail.com','sfdsdf','Trabajo no pagado','sdfsd','fsdfdf','ISSSTE',324234.00,3123.00,'Secundaria incompleta','3','2','Si','4','5','Si','Si','No','Si'),
(4,'Oscar Bello','2024-07-02','H','Separada','Superior (Licenciatura)','Electricidad, Drenaje','Ciudad de Mexico','Estado de Mexico','Ocoyoacac','5561540770','oscar@gmail.com','Catolica','Trabajo no pagado','No','No','Solo cuando tengo una necesidad de salud lo pago de mi bolsillo',6000.00,2000.00,'Primaria completa','2','1','Si','4','4','No','Si','No','Si'),
(5,'dsfds','2024-07-03','H','Casada','Media superior (preparatoria, bachillerato o carre','Agua entubada, Electricidad, Drenaje','fsdfrfg','swerfse','esfsef','2133123','zscfddf@gmail.com','adawawd','Trabajo no pagado','ad','awd','ISSEMYM',132123.00,21333.00,'Primaria completa','2','3','Si','3','2','Si','No','Si','Si'),
(6,'dshgdrhds','2024-07-02','H','Casada','Básica (preescolar, primaria y secundaria)','Electricidad, Drenaje','srgsrr','gfdth','dthdt','324234','fsdfsdf@gmail.com','faef','Trabajo no pagado','adf','dsf','ISSSTE',313432.00,31232.00,'Secundaria incompleta','2','3','No','3','2','No','Si','Si','Si'),
(7,'aaDASF','2024-07-11','M','Casada','Básica (preescolar, primaria y secundaria)','Electricidad, Drenaje','awda','adwae','wada','324234','dsfdf2@gmail.com','adadf','Trabajo pagado','dsfsdf','fs','ISSSTE',1233423.00,3423432.00,'Primaria completa','2','3','No','2','1','No','Si','Si','Si');

UNLOCK TABLES;

/*Table structure for table `formfour` */

DROP TABLE IF EXISTS `formfour`;

CREATE TABLE `formfour` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `me_gusta_mi_vida` tinyint(4) NOT NULL CHECK (`me_gusta_mi_vida` between 1 and 6),
  `soy_una_persona_feliz` tinyint(4) NOT NULL CHECK (`soy_una_persona_feliz` between 1 and 6),
  `estoy_satisfecho` tinyint(4) NOT NULL CHECK (`estoy_satisfecho` between 1 and 6),
  `mi_vida_me_trae_alegria` tinyint(4) NOT NULL CHECK (`mi_vida_me_trae_alegria` between 1 and 6),
  `mi_vida_es_feliz` tinyint(4) NOT NULL CHECK (`mi_vida_es_feliz` between 1 and 6),
  `disfruto_de_mi_vida` tinyint(4) NOT NULL CHECK (`disfruto_de_mi_vida` between 1 and 6),
  `mi_vida_es_maravillosa` tinyint(4) NOT NULL CHECK (`mi_vida_es_maravillosa` between 1 and 6),
  `estoy_de_buenas` tinyint(4) NOT NULL CHECK (`estoy_de_buenas` between 1 and 6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `formfour` */

LOCK TABLES `formfour` WRITE;

insert  into `formfour`(`id`,`me_gusta_mi_vida`,`soy_una_persona_feliz`,`estoy_satisfecho`,`mi_vida_me_trae_alegria`,`mi_vida_es_feliz`,`disfruto_de_mi_vida`,`mi_vida_es_maravillosa`,`estoy_de_buenas`) values 
(1,1,1,1,1,1,1,1,1),
(2,1,2,3,4,5,6,5,4);

UNLOCK TABLES;

/*Table structure for table `formtres` */

DROP TABLE IF EXISTS `formtres`;

CREATE TABLE `formtres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta1` tinyint(4) NOT NULL CHECK (`pregunta1` between 1 and 6),
  `pregunta2` tinyint(4) NOT NULL CHECK (`pregunta2` between 1 and 6),
  `pregunta3` tinyint(4) NOT NULL CHECK (`pregunta3` between 1 and 6),
  `pregunta4` tinyint(4) NOT NULL CHECK (`pregunta4` between 1 and 6),
  `pregunta5` tinyint(4) NOT NULL CHECK (`pregunta5` between 1 and 6),
  `pregunta6` tinyint(4) NOT NULL CHECK (`pregunta6` between 1 and 6),
  `pregunta7` tinyint(4) NOT NULL CHECK (`pregunta7` between 1 and 6),
  `pregunta8` tinyint(4) NOT NULL CHECK (`pregunta8` between 1 and 6),
  `pregunta9` tinyint(4) NOT NULL CHECK (`pregunta9` between 1 and 6),
  `pregunta10` tinyint(4) NOT NULL CHECK (`pregunta10` between 1 and 6),
  `pregunta11` tinyint(4) NOT NULL CHECK (`pregunta11` between 1 and 6),
  `pregunta12` tinyint(4) NOT NULL CHECK (`pregunta12` between 1 and 6),
  `pregunta13` tinyint(4) NOT NULL CHECK (`pregunta13` between 1 and 6),
  `pregunta14` tinyint(4) NOT NULL CHECK (`pregunta14` between 1 and 6),
  `pregunta15` tinyint(4) NOT NULL CHECK (`pregunta15` between 1 and 6),
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `formtres` */

LOCK TABLES `formtres` WRITE;

insert  into `formtres`(`id`,`pregunta1`,`pregunta2`,`pregunta3`,`pregunta4`,`pregunta5`,`pregunta6`,`pregunta7`,`pregunta8`,`pregunta9`,`pregunta10`,`pregunta11`,`pregunta12`,`pregunta13`,`pregunta14`,`pregunta15`,`fecha_registro`) values 
(1,5,1,4,1,2,1,5,2,1,2,3,1,3,1,2,'2024-07-18 16:04:03'),
(2,5,1,1,1,4,1,1,4,1,1,2,1,1,1,1,'2024-07-22 13:36:18'),
(3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2024-07-22 17:44:55'),
(4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2024-07-24 15:56:18');

UNLOCK TABLES;

/*Table structure for table `formulariocontacto` */

DROP TABLE IF EXISTS `formulariocontacto`;

CREATE TABLE `formulariocontacto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_empresa_escuela` varchar(255) NOT NULL,
  `municipio` varchar(255) NOT NULL,
  `tema_platica` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `numero_telefono` varchar(20) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `formulariocontacto` */

LOCK TABLES `formulariocontacto` WRITE;

insert  into `formulariocontacto`(`id`,`nombre_empresa_escuela`,`municipio`,`tema_platica`,`direccion`,`correo_electronico`,`numero_telefono`,`mensaje`,`fecha`) values 
(1,'UTVT','Ocoyoacac','Nutricion en estudiantes','Calle X No. X, Col. X, UTVT, C.P. X','escuela@gmail.com','0000000000','Apoyo para una platica','2024-07-15 14:31:45'),
(2,'UAEMex','Ocoyoacac','Nutricion','Calle x','escuela@gmail.com','55000000','Necesito apoyo','2024-07-22 13:40:17');

UNLOCK TABLES;

/*Table structure for table `formuno` */

DROP TABLE IF EXISTS `formuno`;

CREATE TABLE `formuno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` timestamp NOT NULL DEFAULT current_timestamp(),
  `enfermedades_cronicas` enum('Sí','No') DEFAULT NULL,
  `embarazo` enum('Sí','No') DEFAULT NULL,
  `sobrepeso_obesidad` enum('Sí','No') DEFAULT NULL,
  `programa_actividad_fisica` enum('Sí','No') DEFAULT NULL,
  `programa_nutricion` enum('Sí','No') DEFAULT NULL,
  `contraindicacion_actividad_fisica` enum('Sí','No') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `formuno` */

LOCK TABLES `formuno` WRITE;

insert  into `formuno`(`id`,`fecha_ingreso`,`enfermedades_cronicas`,`embarazo`,`sobrepeso_obesidad`,`programa_actividad_fisica`,`programa_nutricion`,`contraindicacion_actividad_fisica`) values 
(2,'2024-07-17 15:36:14','No','Sí','No','Sí','Sí','No'),
(3,'2024-07-22 13:25:59','Sí','Sí','Sí','Sí','Sí','Sí'),
(4,'2024-07-22 13:33:24','Sí','Sí','Sí','Sí','Sí','Sí'),
(5,'2024-07-22 17:43:31','Sí','Sí','Sí','Sí','Sí','Sí'),
(6,'2024-07-24 15:35:53','Sí','Sí','Sí','Sí','Sí','Sí'),
(7,'2024-07-24 15:43:25','Sí','Sí','Sí','Sí','Sí','Sí'),
(8,'2024-07-24 15:55:06','Sí','Sí','Sí','Sí','Sí','Sí');

UNLOCK TABLES;

/*Table structure for table `posts` */

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `autor_id` (`autor_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `posts` */

LOCK TABLES `posts` WRITE;

insert  into `posts`(`id`,`titulo`,`contenido`,`autor_id`,`fecha`) values 
(1,'hola','xd',1,'2024-06-26 15:10:12'),
(2,'Hola','123',11,'2024-06-26 15:14:35'),
(3,'Mi experiencia','Me fue bien',1,'2024-07-01 13:10:46');

UNLOCK TABLES;

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `numero_telefono` varchar(15) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuario` */

LOCK TABLES `usuario` WRITE;

insert  into `usuario`(`id`,`nombre`,`apellidos`,`edad`,`correo`,`numero_telefono`,`imagen`,`contrasena`) values 
(1,'oscar','bello chino',19,'oscar@gmail.com','5561540770','uploads\\1718751369663.jpg','$2a$10$5xqIMr6AFV9pSfAenCGiweVvh0EE/dw.CzycABKQR2/NseOdnjnvO'),
(3,'alexis','almazan gabino',21,'almazan@gmail.com','5522220000','uploads\\1718754046049.jpg','$2a$10$Yjzosvufqmb1IHjxM7pmBujNU8GQhPhobEjG9drk8bvFQwHsjU3yq'),
(5,'sebas','bello chino',24,'sebas@gmail.com','5516170000','uploads\\1718760630141.jpg','$2a$10$H4Mtpeyvnkst9tVFmp7gYe6.Pg.942Xd8fSdmFYG4s3VHaaFCvVNa'),
(7,'Juan','Gutierrez Najera',20,'juan@gmail.com','7225896525','uploads\\1718761112925.jpg','$2a$10$qEmf5ttQQTIxbivit5JlXOFjkzOryIwq47au0p.vYOf1RQWittvme'),
(9,'Victor','Guzman Peral',19,'victor@gmail.com','7221243213','uploads\\1718761581781.jpg','$2a$10$JpP/a6FeWlBru2009izVVuHc.ezk7SEZ4XtuoE1aZZUQg8ujpvfEW'),
(11,'diego ','chimg cheng conging',56,'diego123@gmail.com','123456789','uploads\\1718824200118.jpg','$2a$10$4OmL/uTwxi4nH5sxSBBW1eKPEdX2s8mFMxvtJcEKKmLcxBylNaV3S');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
