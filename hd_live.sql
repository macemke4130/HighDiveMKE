-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: highdive
-- ------------------------------------------------------
-- Server version	5.7.32-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(120) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `eventdate` date DEFAULT NULL,
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL,
  `price` varchar(120) DEFAULT NULL,
  `eventlink` varchar(1000) DEFAULT NULL,
  `ticketlink` varchar(1000) DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Lucas Birthday','He lived another year! Some bands will play! Everyone will have fun!','2021-08-30','21:00:00','02:00:00','10','facebook','tickets','2021-08-18 14:42:02'),(2,'Jason\'s Birthday 2020','He lived another year! Some bands will play','2020-12-15','02:59:00','19:30:00','10','Facebook Link','Ticket Link','2021-08-18 14:45:58'),(5,'Riverwest 24','It\'s not a race, it\'s a ride!','2022-07-29','19:00:00',NULL,'0','Facebook Link','Ticket Link','2021-08-26 03:01:59'),(6,'adsfa','','2021-08-18','20:54:00','00:00:00','4','','','2021-08-28 01:51:38'),(8,'fake 5','','2021-08-24','12:56:00','23:56:00','3','','','2021-08-28 03:56:18'),(9,'fake 10','','2021-08-28','13:10:00',NULL,'1','','','2021-08-28 04:10:24');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ontap`
--

DROP TABLE IF EXISTS `ontap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ontap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `tapname` varchar(64) NOT NULL,
  `brewer` varchar(64) NOT NULL,
  `price` varchar(10) NOT NULL,
  `size` tinyint(4) DEFAULT NULL,
  `abv` decimal(3,2) DEFAULT NULL,
  `ibu` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ontap`
--

LOCK TABLES `ontap` WRITE;
/*!40000 ALTER TABLE `ontap` DISABLE KEYS */;
INSERT INTO `ontap` VALUES (1,1,'Riverwest Stein','Lakefront Brewery','5.50',12,6.00,24,'2021-08-16 23:39:16'),(2,1,'Fixed Gear','Lakefront','5',NULL,6.50,54,'2021-08-16 23:39:17'),(3,0,'High Life','Miller','4',NULL,3.20,25,'2021-08-17 03:47:27'),(4,0,'PBR','Miller','3',NULL,NULL,NULL,'2021-08-17 03:49:33'),(5,1,'Louie’s Demise','MKE Brewing','6',NULL,5.50,24,'2021-08-18 02:06:35');
/*!40000 ALTER TABLE `ontap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jason','666',1,'2021-08-15 18:20:37'),(2,'lucas','666',0,'2021-08-15 18:20:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-01 21:53:10
