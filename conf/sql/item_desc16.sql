-- MySQL dump 10.13  Distrib 5.6.12, for osx10.7 (x86_64)
--
-- Host: localhost    Database: tm
-- ------------------------------------------------------
-- Server version	5.6.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `item_desc_0`
--

DROP TABLE IF EXISTS `item_desc_0`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_0` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_0`
--

LOCK TABLES `item_desc_0` WRITE;
/*!40000 ALTER TABLE `item_desc_0` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_0` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_1`
--

DROP TABLE IF EXISTS `item_desc_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_1` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_1`
--

LOCK TABLES `item_desc_1` WRITE;
/*!40000 ALTER TABLE `item_desc_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_2`
--

DROP TABLE IF EXISTS `item_desc_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_2` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_2`
--

LOCK TABLES `item_desc_2` WRITE;
/*!40000 ALTER TABLE `item_desc_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_3`
--

DROP TABLE IF EXISTS `item_desc_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_3` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_3`
--

LOCK TABLES `item_desc_3` WRITE;
/*!40000 ALTER TABLE `item_desc_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_3` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_4`
--

DROP TABLE IF EXISTS `item_desc_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_4` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_4`
--

LOCK TABLES `item_desc_4` WRITE;
/*!40000 ALTER TABLE `item_desc_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_4` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_5`
--

DROP TABLE IF EXISTS `item_desc_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_5` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_5`
--

LOCK TABLES `item_desc_5` WRITE;
/*!40000 ALTER TABLE `item_desc_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_5` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_6`
--

DROP TABLE IF EXISTS `item_desc_6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_6` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_6`
--

LOCK TABLES `item_desc_6` WRITE;
/*!40000 ALTER TABLE `item_desc_6` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_6` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_7`
--

DROP TABLE IF EXISTS `item_desc_7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_7` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_7`
--

LOCK TABLES `item_desc_7` WRITE;
/*!40000 ALTER TABLE `item_desc_7` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_7` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_8`
--

DROP TABLE IF EXISTS `item_desc_8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_8` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_8`
--

LOCK TABLES `item_desc_8` WRITE;
/*!40000 ALTER TABLE `item_desc_8` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_8` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_9`
--

DROP TABLE IF EXISTS `item_desc_9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_9` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_9`
--

LOCK TABLES `item_desc_9` WRITE;
/*!40000 ALTER TABLE `item_desc_9` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_9` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_10`
--

DROP TABLE IF EXISTS `item_desc_10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_10` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_10`
--

LOCK TABLES `item_desc_10` WRITE;
/*!40000 ALTER TABLE `item_desc_10` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_10` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_11`
--

DROP TABLE IF EXISTS `item_desc_11`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_11` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_11`
--

LOCK TABLES `item_desc_11` WRITE;
/*!40000 ALTER TABLE `item_desc_11` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_11` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_12`
--

DROP TABLE IF EXISTS `item_desc_12`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_12` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_12`
--

LOCK TABLES `item_desc_12` WRITE;
/*!40000 ALTER TABLE `item_desc_12` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_12` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_13`
--

DROP TABLE IF EXISTS `item_desc_13`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_13` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_13`
--

LOCK TABLES `item_desc_13` WRITE;
/*!40000 ALTER TABLE `item_desc_13` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_13` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_14`
--

DROP TABLE IF EXISTS `item_desc_14`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_14` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_14`
--

LOCK TABLES `item_desc_14` WRITE;
/*!40000 ALTER TABLE `item_desc_14` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_14` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `item_desc_15`
--

DROP TABLE IF EXISTS `item_desc_15`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_desc_15` (
  `numIid` bigint(20) NOT NULL,
  `detail` longtext,
  `links` longtext,
  `picUrl` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `title` varchar(63) NOT NULL DEFAULT '',
  `ts` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`numIid`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_desc_15`
--

LOCK TABLES `item_desc_15` WRITE;
/*!40000 ALTER TABLE `item_desc_15` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_desc_15` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-11-27 13:44:00
