-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: mysql-3cb28e9d-fitnessfirstapp.b.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '48603ca8-3501-11f1-bfb4-560bce3132e8:1-91';

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) DEFAULT 'General',
  `cover_image` varchar(500) DEFAULT NULL,
  `author` varchar(100) DEFAULT 'FitnessFirst Team',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,'5 Simple Habits to Transform Your Fitness Journey.','Starting a fitness journey can feel overwhelming, but the truth is, you don’t need extreme routines or complicated diets to see results. Small, consistent habits are what truly transform your body and mind.\n\nHere are 5 simple habits that can help you level up your fitness journey:\n\n1. Stay Consistent\nConsistency beats intensity. You don’t need to train for hours, just show up regularly. Even 30 minutes a day can make a huge difference over time.\n\n2. Focus on Proper Form\nGood form prevents injuries and ensures you’re targeting the right muscles. Take your time to learn each movement instead of rushing through workouts.\n\n3. Fuel Your Body Right\nYour body needs the right nutrients to perform and recover. Prioritize whole foods, stay hydrated, and avoid skipping meals.\n\n4. Get Enough Rest\nRecovery is just as important as training. Make sure you’re getting enough sleep and giving your muscles time to repair and grow.\n\n5. Track Your Progress\nKeep track of your workouts, strength, and endurance. Seeing progress, even small wins, keeps you motivated and focused.\n\nFinal Thoughts\nFitness is not about being perfect, it’s about being consistent. Start small, stay committed, and trust the process. Your future self will thank you.\n\nLet’s get stronger, healthier, and better, one step at a time.','General','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80','FitnessFirst Team','2026-04-09 20:42:17'),(2,'Beginner to Pro: The Ultimate Strength Training Guide','Strength training is one of the most effective ways to build muscle, burn fat, and improve overall health. Whether you\'re just starting out or looking to level up, this guide will help you train smarter and see real results.\n\n1. Start with the Basics\nFocus on compound exercises like squats, push-ups, deadlifts, and bench presses. These movements target multiple muscle groups and give you the best results.\n\n2. Master Your Form\nBefore increasing weight, make sure your form is correct. Poor technique can lead to injuries and slow progress.\n\n3. Progressive Overload\nTo build strength, you need to gradually increase the weight, reps, or intensity of your workouts. Challenge your muscles consistently.\n\n4. Don’t Skip Warm-Ups\nAlways start with a proper warm-up to prepare your body and reduce the risk of injury. A few minutes of light cardio and dynamic stretching is enough.\n\n5. Rest and Recover\nMuscles grow during recovery, not during workouts. Give each muscle group time to rest and aim for 7–8 hours of sleep.\n\n6. Stay Consistent\nResults don’t happen overnight. Stick to your routine, stay disciplined, and trust the process.\n\nFinal Thoughts\nStrength training is a journey. Focus on progress, not perfection. Stay committed, and you’ll become stronger, both physically and mentally.\n\nLet’s train hard and stay consistent!','Training','https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80','FitnessFirst Team','2026-04-10 10:30:25'),(3,'Why Recovery Is the Secret to Better Fitness Results','Many people focus only on workouts and nutrition, but recovery is just as important for achieving your fitness goals. Without proper recovery, your body cannot repair, grow, or perform at its best.\n\nHere’s why recovery should be a key part of your fitness routine:\n\n1. Muscle Growth Happens During Rest\nWhen you train, you create tiny tears in your muscles. Recovery allows those muscles to repair and grow stronger.\n\n2. Prevents Injuries\nOvertraining can lead to fatigue, poor performance, and injuries. Giving your body time to rest reduces the risk of burnout and strain.\n\n3. Improves Performance\nWell-rested muscles perform better. Taking recovery seriously helps you lift heavier, run faster, and train more effectively.\n\n4. Sleep Is Essential\nAim for 7–9 hours of quality sleep each night. Sleep is when your body does most of its repair work.\n\n5. Active Recovery Matters\nLight activities like walking, stretching, or yoga can help improve blood flow and speed up recovery without stressing the body.\n\n6. Hydration and Nutrition\nDrinking enough water and eating nutrient-rich foods supports muscle repair and replenishes energy levels.\n\nFinal Thoughts\nRecovery is not a sign of weakness, it’s a strategy for success. Listen to your body, take rest days seriously, and you’ll see better results in the long run.\n\nTrain hard, but recover smarter.','Recovery','https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=80','FitnessFirst Team','2026-04-10 10:32:39');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `trainer` varchar(100) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,NULL,'Jamal Musiala','jamalmusiala@gmail.com','Mike Kay','Hello, are you free next weekend, so I can have a session with you?','2026-04-06 17:53:10','approved'),(3,NULL,' Malo Gusto','malogusto@gmail.com','Sarah Williams',' Hello, are you free next weekend, so I can have a session with you?','2026-04-06 18:26:04','approved'),(4,NULL,' Federico Valverde','federicovalverde@gmail.com','Sarah Williams',' Hello, are you free next weekend, so I can have a session with you?','2026-04-06 18:27:14','approved'),(5,NULL,'Joao Pedro','joaopedro@gmail.com','Sarah Williams','Hello, when are you free so i can book a session with you?','2026-04-06 18:47:46','approved'),(7,NULL,'Cole Palmer','colepalmer@gmail.com','Jackie Jane','Hi! When are you free so we can have a session?','2026-04-07 18:58:28','approved'),(10,NULL,'Reece  James','reecejames@gmail.com','Sarah Williams','Hello, When are free?','2026-04-08 12:37:35','approved'),(14,20,'Ryan  Cherki','ryancherki@gmail.com','Sarah Williams','Hello, when are you free?','2026-04-10 17:55:23','approved'),(16,22,'Pedri Gonzalez','pedri@gmail.com','Mike Kay','Hello, when are you free, i wanna have a session with you.','2026-04-11 09:03:07','approved');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Malo Gusto','malogusto@gmail.com','Hey there, what\'s the mode of payment?','2026-04-02 12:16:47'),(2,'Enzo Fernandez','enzofernandez@gmail.com','Hello how can I update my acount?','2026-04-02 12:20:32'),(3,'Federico Valverde','federicovalverde@gmail.com','Hello, How can I update my account details?','2026-04-02 12:25:02'),(4,'Levi Colwil','levicolwil@gmail.com','Hello how can I update my accout details?','2026-04-02 18:18:54');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `workout_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_favourite` (`user_id`,`workout_id`),
  KEY `workout_id` (`workout_id`),
  CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (4,7,31,'2026-04-04 07:07:15'),(5,7,29,'2026-04-04 07:07:26'),(6,7,40,'2026-04-04 07:24:54'),(7,7,32,'2026-04-04 07:25:12'),(8,1,21,'2026-04-04 08:04:58'),(9,1,20,'2026-04-04 08:05:15'),(10,4,11,'2026-04-04 09:18:43'),(11,3,10,'2026-04-06 08:39:23'),(12,13,25,'2026-04-06 10:32:33'),(13,9,6,'2026-04-08 19:10:51');
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `workout_id` int NOT NULL,
  `completed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `workout_id` (`workout_id`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
INSERT INTO `progress` VALUES (1,1,37,'2026-04-04 08:01:09'),(2,1,5,'2026-04-04 08:02:25'),(3,1,21,'2026-04-04 08:05:04'),(4,1,20,'2026-04-04 08:05:20'),(5,9,38,'2026-04-05 20:34:02'),(6,13,25,'2026-04-06 10:32:37'),(7,15,38,'2026-04-07 19:08:40'),(8,9,5,'2026-04-08 19:11:09');
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress_photos`
--

DROP TABLE IF EXISTS `progress_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress_photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `progress_photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress_photos`
--

LOCK TABLES `progress_photos` WRITE;
/*!40000 ALTER TABLE `progress_photos` DISABLE KEYS */;
INSERT INTO `progress_photos` VALUES (1,7,'https://res.cloudinary.com/dllw2wxjs/image/upload/v1775822306/fitnessfirst/progress/w0heyrlkg4pzer25d6lq.webp',NULL,'2026-04-10 11:58:28');
/*!40000 ALTER TABLE `progress_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `rating` int NOT NULL,
  `review` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approved` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `testimonials_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,9,'Ada','Guler',4,'Hey guys I lost 7Kg within  a month, by using Fitness First app, It\'s a powerfull training app','2026-04-05 19:44:59',1),(2,21,'Rodrigo ','Hernandez',4,'Hello guys, Fitness First is a very powerful app tailored to your fitness needs.','2026-04-11 08:20:27',1),(3,22,'Pedri','Gonzalez',5,'Hello guys, Fitness First is a very powerful app tailored to your fitness needs, I have been using it.','2026-04-11 09:04:47',1);
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(20) DEFAULT 'trainee',
  `avatar_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'youngmike703@gmail.com','Young','Mike','0757813834','$2b$10$oYRmKucE/RVxvdDEzayMjeQ0zVmmmFyKkwPSk5gFyu6nwKZDwnnYq','2026-03-30 15:46:01','admin','https://res.cloudinary.com/dllw2wxjs/image/upload/v1775823779/fitnessfirst/avatars/ovpaxja1qddmvvu2wfyq.webp'),(2,'enzofernandez@gmail.com','Enzo','Fernandez','0455544556','$2b$10$EgWzKcvH2CjBknuIYfewQOdNknqBGxmO4TBniZAp5lybqCg9siQMy','2026-03-31 10:35:44','trainee',NULL),(3,'malogusto@gmail.com','Malo','Gusto','0234564323','$2b$10$5yaFudkgbZ02LWiKH6j4hex/nKhvR8ET879AgLKOUGRR5nwjJkOaW','2026-03-31 11:55:04','trainee',NULL),(4,'levicolwil@gmail.com','Levi','Colwil','0234323454','$2b$10$Xh6v5ZVDs8lySaxxyd9eKeytNFRTZQ2PHXqHXoc5pX40gUjCYzaRa','2026-03-31 17:40:49','trainee',NULL),(5,'jamalmusiala@gmail.com','Jamal','Musiala','0345432233','$2b$10$4Goz0FSvf/l00H60VTua0O/bn1rkjXsEjBrLNoacgphiRIGbBfHQm','2026-04-01 10:42:20','trainee',NULL),(6,'ngolokante@gmail.com','Ngolo','Kante','0433221123','$2b$10$BMb/fOLb2ptveclm.iUKJ.VfIpl8j5dkUkLT5IkgaUU/9tL9oCq76','2026-04-01 11:22:23','trainee',NULL),(7,'federicovalverde@gmail.com','Federico','Valverde','0912342123','$2b$10$K95MMcl5UUH3rMXPzRU3.uCqwYXlkqZTsu7gjm0KZ9hdyQL03G0be','2026-04-02 11:18:32','trainee',NULL),(8,'antoniorudiger@gmail.com','Antonio','Rudiger','0123456654','$2b$10$vhyzoLWKcNmBwiMDYq37LuqFXYf4HMI4bTruX1quX2x.OlQwJRp6C','2026-04-02 12:00:57','trainee',NULL),(9,'adaguler@gmail.com','Ada','Guler','0233432322','$2b$10$L27KXmDZHtAkN6X/VXqL9egvhz/4ams2s5MK3vWhC48vvoSXKO95m','2026-04-02 20:19:00','trainee',NULL),(10,'kenanyildiz@gmail.com','Kenan ','Yildiz','0344543212','$2b$10$noUGhxi.UdQocIvgq57Et.pqvVDXdyeFSflmMm2C3RnE2smwPeA3a','2026-04-02 20:25:00','trainee',NULL),(11,'edenhazard@gmail.com','Eden','Hazard','0344565543','$2b$10$cCFdicMFURAeS06QDXx4reExKrWc2kIiP4iwWFaLw8QCBKnrQxcxG','2026-04-03 09:41:39','trainer',NULL),(12,'youngmike7@gmail.com','Mike','Kay','0757813839','$2b$10$BHQXmkw9gV8hNwrkRZ3Ii.j/TvrnF52t/vIy0pV/vDGeWwEiuQne.','2026-04-04 14:31:32','admin',NULL),(13,'ngochi@gmail.com','Wilfred','Ngochi','0757832237','$2b$10$GbAiBvr1ohkC2DSNGsaThOpVHKarUiBT8auacNqq1FwsdPPYK0UcC','2026-04-06 10:31:43','trainee',NULL),(14,'joaopedro@gmail.com','Joao','Pedro',NULL,'$2b$10$saqhtD8VteZICAx5PHJu/.RJlWDJUBDX2ARu14RPBricemLljd0Ma','2026-04-06 18:46:18','trainee',NULL),(15,'colepalmer@gmail.com','Cole','Palmer',NULL,'$2b$10$LXnkC8kvVxWn0LEQ/l/CNOmPAFHVq5fVLK1dZnCSpSpY7MnqF5eTy','2026-04-07 18:57:17','trainee',NULL),(16,'reecejames@gmail.com','Reece ','James',NULL,'$2b$10$lvRDEUmM3Jny6uKi03U1HOl69nJsJDU.3DzYzRzXnd/qwjzgQ82/q','2026-04-07 19:27:23','trainee',NULL),(17,'sarah@gmail.com','Sarah ','Williams','0759813837','$2b$10$Y5y5OvXRDCTuwnTJNSURAevkGocdmjei6zxFshnfQ8iTlZDKhXxNu','2026-04-08 12:41:22','trainer',NULL),(18,'jackie@gmail.com','Jackie','Jane','0757812237','$2b$10$DqcBdf6T/qNbF1zYAERN2e3YqUqOlQo3bOSJUCD5/TmqD8Uyi5.x6','2026-04-08 12:42:57','trainer',NULL),(19,'chalobah@gmail.com','Trevah ','Chalobah','0433212345','$2b$10$Sk7BADuUDwj9lOTfxI7ANOcM9q1lyqfSHujpurs7whClC2LiQjzYC','2026-04-09 18:40:53','trainee',NULL),(20,'ryancherki@gmail.com','Ryan ','Cherki','0211234565','$2b$10$tMxqCMDYTJTvPe9QzdWH.Oxo2YnwsXlU1cMeZ59T5ge91rIR8N84m','2026-04-10 17:54:03','trainee',NULL),(21,'rodrigo@gmail.com','Rodrigo ','Hernandez',NULL,'$2b$10$sc5bXFNK9k5uvKfFwS36kOzg5jL9mwAwR26daogQ2MohqSKZ2xXYa','2026-04-11 07:54:11','trainee',NULL),(22,'pedri@gmail.com','Pedri','Gonzalez',NULL,'$2b$10$xMCTHcvxIY0az2i7VOIJ0.1z0ItrWnxDEgBu.xlPBeFoGp1vLgruq','2026-04-11 09:00:56','trainee',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_logs`
--

DROP TABLE IF EXISTS `workout_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `workout_id` int NOT NULL,
  `set_number` int NOT NULL,
  `reps` int NOT NULL,
  `weight` decimal(5,2) DEFAULT '0.00',
  `logged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `workout_id` (`workout_id`),
  CONSTRAINT `workout_logs_ibfk_1` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_logs`
--

LOCK TABLES `workout_logs` WRITE;
/*!40000 ALTER TABLE `workout_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `workout_logs` ENABLE KEYS */;
UNLOCK TABLES;
