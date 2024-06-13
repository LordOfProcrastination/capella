-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: adventurepathdb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `allies`
--

DROP TABLE IF EXISTS `allies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allies` (
  `choice_id` char(1) DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `allies` varchar(100) DEFAULT NULL,
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allies`
--

LOCK TABLES `allies` WRITE;
/*!40000 ALTER TABLE `allies` DISABLE KEYS */;
INSERT INTO `allies` VALUES ('d',2,'Woodland Creature',1),('c',3,'troll',2);
/*!40000 ALTER TABLE `allies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` int NOT NULL,
  `chapter` varchar(255) DEFAULT NULL,
  `scene` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,'Chapter 1: The Mysterious Map','As Erik prepared for his journey, the village elder handed him a mysterious map. The map was said to guide him to the Horn of Jotunheim, hidden deep within the treacherous mountains.'),(2,'Chapter 2: The Enchanted Forest','Following the path marked on the map, Erik enters the heart of an enchanted forest, where the trees whisper secrets and shadows dance mysteriously.'),(3,'Chapter 3: The Bridge of Trolls','After days of travel through the forest, Erik arrives at a rickety old bridge guarded by two menacing trolls. The trolls demand a toll for safe passage.'),(4,'Chapter 4: The Mountain Pass','Having crossed the bridge, Erik faces the steep and perilous climb up the Mountain of Giants, where the Horn of Jotunheim is said to be hidden.'),(5,'Chapter 5: The Guardian of the Horn','At the summit, Erik finds the entrance to a cave guarded by a fearsome dragon, the final challenge before reaching the Horn of Jotunheim.');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characterallies`
--

DROP TABLE IF EXISTS `characterallies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characterallies` (
  `ally` varchar(50) DEFAULT NULL,
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characterallies`
--

LOCK TABLES `characterallies` WRITE;
/*!40000 ALTER TABLE `characterallies` DISABLE KEYS */;
/*!40000 ALTER TABLE `characterallies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characteritems`
--

DROP TABLE IF EXISTS `characteritems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characteritems` (
  `item` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characteritems`
--

LOCK TABLES `characteritems` WRITE;
/*!40000 ALTER TABLE `characteritems` DISABLE KEYS */;
/*!40000 ALTER TABLE `characteritems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characterstats`
--

DROP TABLE IF EXISTS `characterstats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characterstats` (
  `understanding` int DEFAULT NULL,
  `time` int DEFAULT NULL,
  `supplies` int DEFAULT NULL,
  `recklessness` int DEFAULT NULL,
  `injuries` int DEFAULT NULL,
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characterstats`
--

LOCK TABLES `characterstats` WRITE;
/*!40000 ALTER TABLE `characterstats` DISABLE KEYS */;
INSERT INTO `characterstats` VALUES (0,2,3,0,0,1);
/*!40000 ALTER TABLE `characterstats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choices`
--

DROP TABLE IF EXISTS `choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choices` (
  `id` varchar(255) DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `text` text,
  KEY `question_id` (`question_id`),
  KEY `idx_choices_id` (`id`),
  CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices`
--

LOCK TABLES `choices` WRITE;
/*!40000 ALTER TABLE `choices` DISABLE KEYS */;
INSERT INTO `choices` VALUES ('a',1,'Follow the path marked on the map.'),('b',1,'Use his intuition to find the way.'),('c',1,'Seek advice from the elder about the journey ahead.'),('d',1,'Leave immediately, relying on his instincts.'),('a',2,'Follow the path marked on the map.'),('b',2,'Listen to the whispers of the trees for guidance.'),('c',2,'Use his intuition to find the way.'),('d',2,'Seek help from a woodland creature he encounters.'),('a',3,'Offer them a portion of his provisions.'),('b',3,'Challenge them to a battle.'),('c',3,'Attempt to trick them with a riddle.'),('d',3,'Find another way around the bridge.'),('a',4,'Climb carefully and methodically.'),('b',4,'Look for hidden paths and shortcuts.'),('c',4,'Take a longer and safer route up the mountain.'),('d',4,'Rely on his strength and endurance to scale the mountain.'),('a',5,'Engage the dragon in combat.'),('b',5,'Get help from your allies to distract the dragon.'),('c',5,'Use a magical charm given by the elder.'),('d',5,'Speak to the dragon and try to reason with it.');
/*!40000 ALTER TABLE `choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consequences`
--

DROP TABLE IF EXISTS `consequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consequences` (
  `choice_id` varchar(255) DEFAULT NULL,
  `text` text,
  `question_id` int DEFAULT NULL,
  KEY `idx_choice_question` (`choice_id`,`question_id`),
  CONSTRAINT `consequences_ibfk_1` FOREIGN KEY (`choice_id`) REFERENCES `choices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consequences`
--

LOCK TABLES `consequences` WRITE;
/*!40000 ALTER TABLE `consequences` DISABLE KEYS */;
INSERT INTO `consequences` VALUES ('a','Erik gains a deeper understanding of the terrain, helping him navigate better later.',1),('b','Erik has more resources for the journey but spends more time preparing.',1),('c','Erik receives a magical charm that may aid him.',1),('d','Erik starts quickly but lacks preparation.',1),('a','Erik stays on course but encounters traps.',2),('b','Erik avoids traps but may be led into danger.',2),('c','Eriks path is unpredictable, leading to both opportunities and risks.',2),('d','Erik gains an ally in the creature but must share his provisions.',2),('a','Erik secures safe passage but reduces his supplies.',3),('b','Erik defeats the trolls, gaining their respect but sustaining injuries.',3),('c','Erik outsmarts the trolls, gaining safe passage and their help.',3),('d','Erik finds a longer but safer route, delaying his journey.',3),('a','Erik conserves energy but takes longer to reach the top.',4),('b','Erik reaches the summit faster but he stubbed his toes.',4),('c','Erik meets a dwarf on the way that gives him valuable guidance.',4),('d','Erik reaches the top quickly but is exhausted.',4),('a','Erik uses his skills and remaining strength to fight the dragon.',5),('b','Erik uses his allies to distract the dragon while taking the horn.',5),('c','Erik uses his magical charm to get the dragon under your control.',5),('d','Erik uses his allies and the knowledge gathered on the trip to reason with the dragon.',5);
/*!40000 ALTER TABLE `consequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `choice_id` char(1) DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `item` varchar(50) DEFAULT NULL,
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('c',1,'Magical Charm',1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL,
  `chapter_id` int DEFAULT NULL,
  `question` text,
  PRIMARY KEY (`id`),
  KEY `chapter_id` (`chapter_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'What does Erik do first?'),(2,2,'How does Erik navigate the forest?'),(3,3,'How does Erik deal with the trolls?'),(4,4,'How does Erik approach the climb?'),(5,5,'How does Erik confront the dragon?');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `question_id` int DEFAULT NULL,
  `choice_id` varchar(255) DEFAULT NULL,
  `understanding` int DEFAULT NULL,
  `supply` int DEFAULT NULL,
  `time` int DEFAULT NULL,
  `recklessness` int DEFAULT NULL,
  `injury` int DEFAULT NULL,
  KEY `choice_id` (`choice_id`,`question_id`),
  CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`choice_id`, `question_id`) REFERENCES `consequences` (`choice_id`, `question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'a',1,0,0,0,0),(1,'b',0,1,-1,0,0),(1,'c',0,0,0,0,0),(1,'d',0,0,1,1,0),(2,'a',0,0,-1,0,1),(2,'b',2,0,0,0,0),(2,'c',0,1,0,1,0),(2,'d',0,-1,0,0,0),(3,'a',1,-1,0,0,0),(3,'b',0,0,0,3,2),(3,'c',2,0,0,0,0),(3,'d',1,-1,-1,-1,0),(4,'a',1,0,0,-1,0),(4,'b',0,0,1,1,1),(4,'c',2,0,-1,0,0),(4,'d',0,0,2,0,2),(5,'a',0,0,0,0,0),(5,'b',0,0,0,0,0),(5,'c',0,0,0,0,0),(5,'d',0,0,0,0,0);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jaruwan Potter','jaruwan.essen@gmail.com','capella',1);
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

-- Dump completed on 2024-06-13 11:14:38
