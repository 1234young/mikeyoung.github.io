-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: fitnessapp
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,NULL,'Jamal Musiala','jamalmusiala@gmail.com','Mike Kay','Hello, are you free next weekend, so I can have a session with you?','2026-04-06 17:53:10','approved'),(3,NULL,' Malo Gusto','malogusto@gmail.com','Sarah Williams',' Hello, are you free next weekend, so I can have a session with you?','2026-04-06 18:26:04','approved'),(4,NULL,' Federico Valverde','federicovalverde@gmail.com','Sarah Williams',' Hello, are you free next weekend, so I can have a session with you?','2026-04-06 18:27:14','approved'),(5,NULL,'Joao Pedro','joaopedro@gmail.com','Sarah Williams','Hello, when are you free so i can book a session with you?','2026-04-06 18:47:46','approved'),(7,NULL,'Cole Palmer','colepalmer@gmail.com','Jackie Jane','Hi! When are you free so we can have a session?','2026-04-07 18:58:28','approved'),(10,NULL,'Reece  James','reecejames@gmail.com','Sarah Williams','Hello, When are free?','2026-04-08 12:37:35','approved');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,9,'Ada','Guler',4,'Hey guys I lost 7Kg within  a month, by using Fitness First app, It\'s a powerfull training app','2026-04-05 19:44:59',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'youngmike703@gmail.com','Young','Mike','0757813834','$2b$10$oYRmKucE/RVxvdDEzayMjeQ0zVmmmFyKkwPSk5gFyu6nwKZDwnnYq','2026-03-30 15:46:01','admin','https://res.cloudinary.com/dllw2wxjs/image/upload/v1775823779/fitnessfirst/avatars/ovpaxja1qddmvvu2wfyq.webp'),(2,'enzofernandez@gmail.com','Enzo','Fernandez','0455544556','$2b$10$EgWzKcvH2CjBknuIYfewQOdNknqBGxmO4TBniZAp5lybqCg9siQMy','2026-03-31 10:35:44','trainee',NULL),(3,'malogusto@gmail.com','Malo','Gusto','0234564323','$2b$10$5yaFudkgbZ02LWiKH6j4hex/nKhvR8ET879AgLKOUGRR5nwjJkOaW','2026-03-31 11:55:04','trainee',NULL),(4,'levicolwil@gmail.com','Levi','Colwil','0234323454','$2b$10$Xh6v5ZVDs8lySaxxyd9eKeytNFRTZQ2PHXqHXoc5pX40gUjCYzaRa','2026-03-31 17:40:49','trainee',NULL),(5,'jamalmusiala@gmail.com','Jamal','Musiala','0345432233','$2b$10$4Goz0FSvf/l00H60VTua0O/bn1rkjXsEjBrLNoacgphiRIGbBfHQm','2026-04-01 10:42:20','trainee',NULL),(6,'ngolokante@gmail.com','Ngolo','Kante','0433221123','$2b$10$BMb/fOLb2ptveclm.iUKJ.VfIpl8j5dkUkLT5IkgaUU/9tL9oCq76','2026-04-01 11:22:23','trainee',NULL),(7,'federicovalverde@gmail.com','Federico','Valverde','0912342123','$2b$10$K95MMcl5UUH3rMXPzRU3.uCqwYXlkqZTsu7gjm0KZ9hdyQL03G0be','2026-04-02 11:18:32','trainee',NULL),(8,'antoniorudiger@gmail.com','Antonio','Rudiger','0123456654','$2b$10$vhyzoLWKcNmBwiMDYq37LuqFXYf4HMI4bTruX1quX2x.OlQwJRp6C','2026-04-02 12:00:57','trainee',NULL),(9,'adaguler@gmail.com','Ada','Guler','0233432322','$2b$10$L27KXmDZHtAkN6X/VXqL9egvhz/4ams2s5MK3vWhC48vvoSXKO95m','2026-04-02 20:19:00','trainee',NULL),(10,'kenanyildiz@gmail.com','Kenan ','Yildiz','0344543212','$2b$10$noUGhxi.UdQocIvgq57Et.pqvVDXdyeFSflmMm2C3RnE2smwPeA3a','2026-04-02 20:25:00','trainee',NULL),(11,'edenhazard@gmail.com','Eden','Hazard','0344565543','$2b$10$cCFdicMFURAeS06QDXx4reExKrWc2kIiP4iwWFaLw8QCBKnrQxcxG','2026-04-03 09:41:39','trainer',NULL),(12,'youngmike7@gmail.com','Mike','Kay','0757813839','$2b$10$BHQXmkw9gV8hNwrkRZ3Ii.j/TvrnF52t/vIy0pV/vDGeWwEiuQne.','2026-04-04 14:31:32','admin',NULL),(13,'ngochi@gmail.com','Wilfred','Ngochi','0757832237','$2b$10$GbAiBvr1ohkC2DSNGsaThOpVHKarUiBT8auacNqq1FwsdPPYK0UcC','2026-04-06 10:31:43','trainee',NULL),(14,'joaopedro@gmail.com','Joao','Pedro',NULL,'$2b$10$saqhtD8VteZICAx5PHJu/.RJlWDJUBDX2ARu14RPBricemLljd0Ma','2026-04-06 18:46:18','trainee',NULL),(15,'colepalmer@gmail.com','Cole','Palmer',NULL,'$2b$10$LXnkC8kvVxWn0LEQ/l/CNOmPAFHVq5fVLK1dZnCSpSpY7MnqF5eTy','2026-04-07 18:57:17','trainee',NULL),(16,'reecejames@gmail.com','Reece ','James',NULL,'$2b$10$lvRDEUmM3Jny6uKi03U1HOl69nJsJDU.3DzYzRzXnd/qwjzgQ82/q','2026-04-07 19:27:23','trainee',NULL),(17,'sarah@gmail.com','Sarah ','Williams','0759813837','$2b$10$Y5y5OvXRDCTuwnTJNSURAevkGocdmjei6zxFshnfQ8iTlZDKhXxNu','2026-04-08 12:41:22','trainer',NULL),(18,'jackie@gmail.com','Jackie','Jane','0757812237','$2b$10$DqcBdf6T/qNbF1zYAERN2e3YqUqOlQo3bOSJUCD5/TmqD8Uyi5.x6','2026-04-08 12:42:57','trainer',NULL),(19,'chalobah@gmail.com','Trevah ','Chalobah','0433212345','$2b$10$Sk7BADuUDwj9lOTfxI7ANOcM9q1lyqfSHujpurs7whClC2LiQjzYC','2026-04-09 18:40:53','trainee',NULL);
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

--
-- Table structure for table `workouts`
--

DROP TABLE IF EXISTS `workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `significance` text,
  `video` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(100) DEFAULT NULL,
  `steps` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workouts`
--

LOCK TABLES `workouts` WRITE;
/*!40000 ALTER TABLE `workouts` DISABLE KEYS */;
INSERT INTO `workouts` VALUES (1,'Upper Body Push','Build chest, shoulders and triceps with these classic pressing movements.','Intermediate','https://www.youtube.com/embed/gRVjAtPip0Y','2026-03-31 11:44:03','Strength Training','[\"Warm up with 5 mins light cardio\",\"Bench Press: 4 sets x 8 reps\",\"Overhead Shoulder Press: 3 sets x 10 reps\",\"Incline Dumbbell Press: 3 sets x 12 reps\",\"Triceps Dips: 3 sets to failure\",\"Rest 60-90 seconds between sets\",\"Cool down with chest and shoulder stretches\"]'),(2,'Upper Body Pull','Strengthen your back and biceps with pulling exercises for balanced upper body development.','Intermediate','https://www.youtube.com/embed/UKgzXPsQ60g','2026-03-31 11:44:03','Strength Training','[\"Warm up with arm circles and band pull-aparts\",\"Pull-ups: 4 sets x max reps\",\"Bent-over Rows: 4 sets x 8 reps\",\"Lat Pulldown: 3 sets x 12 reps\",\"Bicep Curls: 3 sets x 12 reps\",\"Rest 60-90 seconds between sets\",\"Finish with lat and bicep stretches\"]'),(3,'Leg Day – Quad Focus','Dominate your quads with this squat-heavy leg session for size and strength.','Intermediate','https://www.youtube.com/embed/ultWZbUMPL8','2026-03-31 11:44:03','Strength Training','[\"Warm up with 5 mins cycling or leg swings\",\"Squats: 4 sets x 8 reps\",\"Leg Press: 4 sets x 10 reps\",\"Lunges: 3 sets x 12 reps each leg\",\"Leg Extensions: 3 sets x 15 reps\",\"Stretch quads and hip flexors to finish\"]'),(4,'Leg Day – Hamstring Focus','Target the posterior chain with deadlifts and hamstring-focused exercises.','Intermediate','https://www.youtube.com/embed/op9kVnSso6Q','2026-03-31 11:44:03','Strength Training','[\"Warm up with hip hinges and light deadlifts\",\"Deadlifts: 4 sets x 6 reps\",\"Romanian Deadlifts: 3 sets x 10 reps\",\"Hamstring Curls: 3 sets x 12 reps\",\"Glute Bridges: 3 sets x 15 reps\",\"Stretch hamstrings and glutes thoroughly\"]'),(5,'Full Body Strength','Hit every major muscle group in one efficient full-body session.','Beginner','https://www.youtube.com/embed/UBMk30rjy0o','2026-03-31 11:44:03','Strength Training','[\"Warm up with 5 mins light movement\",\"Squats: 3 sets x 10 reps\",\"Push-ups: 3 sets x 12 reps\",\"Rows: 3 sets x 10 reps\",\"Plank: 3 x 30-45 seconds\",\"Rest 60 seconds between exercises\",\"Full body cool-down stretch\"]'),(6,'Chest & Triceps','Isolate the pushing muscles of your upper body for maximum hypertrophy.','Intermediate','https://www.youtube.com/embed/NvA3IO44-4s','2026-03-31 11:44:03','Strength Training','[\"Warm up with light bench press sets\",\"Bench Press: 4 sets x 8 reps\",\"Chest Fly: 3 sets x 12 reps\",\"Skull Crushers: 3 sets x 10 reps\",\"Tricep Pushdowns: 3 sets x 15 reps\",\"Stretch chest and triceps to finish\"]'),(7,'Back & Biceps','A classic bodybuilding split targeting your entire back and biceps.','Intermediate','https://www.youtube.com/embed/7-UwutcdsgM','2026-03-31 11:44:03','Strength Training','[\"Warm up with resistance band rows\",\"Deadlifts: 3 sets x 6 reps\",\"Pull-ups: 3 sets x max reps\",\"Barbell Rows: 3 sets x 10 reps\",\"Hammer Curls: 3 sets x 12 reps\",\"Cool down with lat stretch and bicep stretch\"]'),(8,'Shoulders','Build broad, capped shoulders with this dedicated shoulder session.','Intermediate','https://www.youtube.com/embed/qEwKCR5JCog','2026-03-31 11:44:03','Strength Training','[\"Warm up with arm circles and band work\",\"Shoulder Press: 4 sets x 10 reps\",\"Lateral Raises: 3 sets x 15 reps\",\"Front Raises: 3 sets x 12 reps\",\"Shrugs: 3 sets x 15 reps\",\"Stretch neck and shoulders to finish\"]'),(9,'Power Strength','Develop explosive power and raw strength with Olympic-style compound movements.','Advanced','https://www.youtube.com/embed/H1F-UfC8Mb8','2026-03-31 11:44:03','Strength Training','[\"Thorough warm-up: dynamic stretches and light sets\",\"Power Cleans: 4 sets x 5 reps\",\"Deadlifts: 4 sets x 5 reps\",\"Squat Jumps: 3 sets x 8 reps\",\"Push Press: 3 sets x 6 reps\",\"Full cool-down with mobility work\"]'),(10,'Bodyweight Strength','Build serious strength using only your bodyweight — no equipment needed.','Beginner','https://www.youtube.com/embed/oAPCPjnU1wA','2026-03-31 11:44:03','Strength Training','[\"Warm up with jumping jacks and dynamic stretches\",\"Push-ups: 4 sets x 15 reps\",\"Pull-ups: 4 sets x max reps\",\"Dips: 3 sets x 12 reps\",\"Pistol Squats: 3 sets x 6 reps each leg\",\"Cool down with full body stretch\"]'),(11,'Core Strength','Build a rock-solid core with these challenging ab and stability exercises.','Intermediate','https://www.youtube.com/embed/AnYl6Nk9GOA','2026-03-31 11:44:03','Strength Training','[\"Warm up with cat-cow and pelvic tilts\",\"Hanging Leg Raises: 3 sets x 12 reps\",\"Russian Twists: 3 sets x 20 reps\",\"Plank: 3 x 45-60 seconds\",\"Ab Rollouts: 3 sets x 10 reps\",\"Stretch lower back and hip flexors\"]'),(12,'Strength Circuit','A continuous circuit combining the best compound movements for total body conditioning.','Advanced','https://www.youtube.com/embed/ml6cT4AZdqI','2026-03-31 11:44:03','Strength Training','[\"Warm up with 5 mins cardio\",\"Circuit (no rest between exercises):\",\"→ Squat: 10 reps\",\"→ Push-up: 10 reps\",\"→ Row: 10 reps\",\"→ Deadlift: 10 reps\",\"Rest 90 seconds then repeat 4 rounds\",\"Cool down and stretch all major muscles\"]'),(13,'Brisk Walking + Core','A gentle fat-burning session combining brisk walking with core finisher exercises.','Beginner','https://www.youtube.com/embed/WGyCjCrLcYA','2026-03-31 11:44:39','Fat Loss','[\"Walk briskly for 30 minutes maintaining elevated heart rate\",\"Core finisher: Plank 3 x 30s\",\"Core finisher: Crunches 3 x 20 reps\",\"Core finisher: Leg Raises 3 x 15 reps\",\"Cool down with a slow 5-min walk and stretch\"]'),(14,'Jog + Bodyweight Circuit','Combine steady-state jogging with a bodyweight circuit to maximize calorie burn.','Beginner','https://www.youtube.com/embed/MvFRdgY1udM','2026-03-31 11:44:39','Fat Loss','[\"Jog at moderate pace for 20 minutes\",\"Circuit x 3 rounds:\",\"→ Squats: 15 reps\",\"→ Push-ups: 10 reps\",\"→ Mountain Climbers: 20 reps\",\"→ Jumping Jacks: 30 reps\",\"Cool down jog then stretch\"]'),(15,'Cycling Intervals','Burn serious calories on the bike with alternating speed intervals.','Intermediate','https://www.youtube.com/embed/wBurKQX7h4Q','2026-03-31 11:44:39','Fat Loss','[\"Warm up: 5 mins easy cycling\",\"Interval: 30s hard sprint followed by 60s easy pace\",\"Repeat for 20 minutes\",\"Cool down: 5 mins easy cycling\",\"Stretch quads, hamstrings and calves\"]'),(16,'Jump Rope + Squats','A simple but highly effective fat burning combo using just a jump rope.','Beginner','https://www.youtube.com/embed/u3zgHI8QnqE','2026-03-31 11:44:39','Fat Loss','[\"Warm up with arm circles and light jumping\",\"3 rounds of:\",\"→ Jump Rope: 2 minutes\",\"→ Squats: 20 reps\",\"→ Rest: 30 seconds\",\"Cool down with leg and calf stretches\"]'),(17,'Stair Climbing Workout','Use stairs to torch calories, build leg endurance and improve cardiovascular fitness.','Beginner','https://www.youtube.com/embed/6mYp_BNYD5Y','2026-03-31 11:44:39','Fat Loss','[\"Warm up with light walking\",\"Climb stairs at a steady pace for 5 minutes\",\"Sprint up stairs x 10 sets with 30s rest\",\"Slow climb to cool down for 3 minutes\",\"Stretch calves, quads and glutes\"]'),(18,'Kettlebell Fat Burn','A high-energy kettlebell session designed to burn fat and build functional strength.','Intermediate','https://www.youtube.com/embed/sSESeQAir2M','2026-03-31 11:44:39','Fat Loss','[\"Warm up with mobility drills\",\"Kettlebell Swings: 4 sets x 20 reps\",\"Goblet Squats: 3 sets x 15 reps\",\"Kettlebell Deadlifts: 3 sets x 12 reps\",\"Single Arm Press: 3 sets x 10 each side\",\"Cool down and stretch\"]'),(19,'Rowing Machine Workout','The rowing machine delivers a full-body, low-impact fat-burning workout.','Intermediate','https://www.youtube.com/embed/H0r_ZPXJLtg','2026-03-31 11:44:39','Fat Loss','[\"Warm up: 3 mins easy rowing\",\"Rowing intervals: 250m hard, 1 min rest x 8 rounds\",\"Steady row for 5 minutes\",\"Cool down: 3 mins easy rowing\",\"Stretch back, shoulders and legs\"]'),(20,'Full Body Circuit – No Rest','A brutal no-rest circuit that keeps your heart rate sky-high for maximum fat burn.','Advanced','https://www.youtube.com/embed/ml6cT4AZdqI','2026-03-31 11:44:39','Fat Loss','[\"Warm up for 5 minutes\",\"Complete the circuit with NO rest between exercises:\",\"→ Burpees: 10 reps\",\"→ Jump Squats: 15 reps\",\"→ Push-ups: 12 reps\",\"→ High Knees: 30 seconds\",\"→ Lunges: 12 each leg\",\"Rest 90 seconds then repeat x 4\",\"Cool down and stretch fully\"]'),(21,'Resistance Bands Circuit','A full-body fat loss circuit using only resistance bands — great for home workouts.','Beginner','https://www.youtube.com/embed/IODxDxX7oi4','2026-03-31 11:44:39','Fat Loss','[\"Warm up with light band movements\",\"Band Squats: 3 x 15 reps\",\"Band Rows: 3 x 12 reps\",\"Band Chest Press: 3 x 12 reps\",\"Band Lateral Walks: 3 x 20 steps each way\",\"Band Bicep Curls: 3 x 15 reps\",\"Cool down and stretch\"]'),(22,'Shadow Boxing Workout','Burn calories and improve coordination with this boxing-inspired cardio session.','Beginner','https://www.youtube.com/embed/KidSVNv0WcY','2026-03-31 11:44:39','Fat Loss','[\"Warm up with light jogging on the spot\",\"3-minute rounds of shadow boxing x 6\",\"Between each round: 20 squat jumps\",\"Cool down with slow punches and deep breathing\",\"Stretch shoulders, arms and back\"]'),(23,'Low Impact Cardio + Core','A gentle, joint-friendly cardio session with a core finisher — perfect for all fitness levels.','Beginner','https://www.youtube.com/embed/nIiYquMguZM','2026-03-31 11:44:39','Fat Loss','[\"March on the spot for 5 minutes\",\"Side steps + arm raises: 5 minutes\",\"Step touches: 5 minutes\",\"Core: Plank 3 x 30 seconds\",\"Core: Seated leg raises 3 x 15\",\"Core: Superman holds 3 x 12\",\"Cool down with full body stretch\"]'),(24,'Circuit – Burpees, Lunges, Push-ups','Three of the best fat-burning exercises combined into a relentless calorie-torching circuit.','Intermediate','https://www.youtube.com/embed/O-LOB2vImpk','2026-03-31 11:44:39','Fat Loss','[\"Warm up with jumping jacks for 3 minutes\",\"5 rounds of:\",\"→ Burpees: 10 reps\",\"→ Alternating Lunges: 12 each leg\",\"→ Push-ups: 15 reps\",\"Rest 60 seconds between rounds\",\"Cool down and stretch all muscle groups\"]'),(25,'Sprint Intervals','30 seconds all-out sprint followed by 30 seconds walking — one of the most effective fat burners.','Intermediate','https://www.youtube.com/embed/cbKkB3POqaY','2026-03-31 11:45:05','HIIT','[\"Warm up: jog for 5 minutes\",\"Sprint at full effort for 30 seconds\",\"Walk for 30 seconds to recover\",\"Repeat for 10 rounds (10 minutes total)\",\"Cool down: walk for 5 minutes and stretch legs\"]'),(26,'Burpees + Rest Intervals','Max out with burpees then fully recover — a simple but savage HIIT format.','Intermediate','https://www.youtube.com/embed/dZgVxmf6jkA','2026-03-31 11:45:05','HIIT','[\"Warm up with light movement for 3 minutes\",\"Do as many burpees as possible in 40 seconds\",\"Rest for 20 seconds\",\"Repeat for 8-10 rounds\",\"Cool down with deep breathing and full body stretch\"]'),(27,'Tabata','The classic 20s on / 10s off Tabata protocol — 4 minutes that feel like forever.','Advanced','https://www.youtube.com/embed/bAV5rAPU1ic','2026-03-31 11:45:05','HIIT','[\"Choose one exercise (e.g. squats or push-ups)\",\"Go all out for 20 seconds\",\"Rest for exactly 10 seconds\",\"Repeat 8 rounds (4 minutes per exercise)\",\"Do 4-6 different exercises\",\"Cool down with light stretching\"]'),(28,'Jump Squats + Push-ups','Alternate explosive lower body and upper body exercises for a full-body HIIT burn.','Intermediate','https://www.youtube.com/embed/IfqrxS_-8oU','2026-03-31 11:45:05','HIIT','[\"Warm up with leg swings and arm circles\",\"40s Jump Squats → 20s rest\",\"40s Push-ups → 20s rest\",\"Repeat circuit 6 times\",\"Cool down with quad and chest stretches\"]'),(29,'Mountain Climbers Intervals','Drive your heart rate through the roof with non-stop mountain climbers.','Intermediate','https://www.youtube.com/embed/nmwgirgXLYM','2026-03-31 11:45:05','HIIT','[\"Warm up with a 3 min jog on the spot\",\"Mountain Climbers: 30s fast, 15s rest\",\"Repeat for 10 rounds\",\"Optional: add push-up at the end of each rest\",\"Cool down with hip flexor and shoulder stretch\"]'),(30,'High Knees + Plank','Combine explosive high knees cardio with core-stabilizing plank holds.','Beginner','https://www.youtube.com/embed/OAJ_J3EZkdY','2026-03-31 11:45:05','HIIT','[\"Warm up with light marching\",\"High Knees: 30 seconds fast\",\"Plank hold: 30 seconds\",\"Rest: 15 seconds\",\"Repeat for 8 rounds\",\"Cool down with core and hip flexor stretches\"]'),(31,'Sprint + Jump Rope','Combine outdoor sprints with jump rope for a two-mode cardio HIIT session.','Intermediate','https://www.youtube.com/embed/u3zgHI8QnqE','2026-03-31 11:45:05','HIIT','[\"Warm up: 5 mins easy jog\",\"Sprint 100m then immediately jump rope for 30s\",\"Rest 45 seconds\",\"Repeat 8-10 rounds\",\"Cool down walk and leg stretches\"]'),(32,'Box Jumps + Lunges','Develop explosive leg power and endurance with this lower-body HIIT combo.','Intermediate','https://www.youtube.com/embed/52r_Ul5k03g','2026-03-31 11:45:05','HIIT','[\"Warm up with leg swings and body squats\",\"Box Jumps: 10 reps\",\"Alternating Lunges: 12 each leg\",\"Rest 45 seconds\",\"Repeat for 5-6 rounds\",\"Cool down with quad and glute stretches\"]'),(33,'Battle Rope Intervals','Unleash power with battle rope slams and waves for a fierce upper body HIIT session.','Advanced','https://www.youtube.com/embed/R7qd3Moor-s','2026-03-31 11:45:05','HIIT','[\"Warm up with shoulder mobility drills\",\"Battle Rope Waves: 30s → 15s rest\",\"Battle Rope Slams: 30s → 15s rest\",\"Alternating Waves: 30s → 15s rest\",\"Repeat entire circuit 5 times\",\"Cool down with shoulder and arm stretches\"]'),(34,'Dumbbell HIIT Circuit','Use dumbbells to add resistance to your HIIT training for a metabolic strength session.','Intermediate','https://www.youtube.com/embed/AUPY0B7hL3Q','2026-03-31 11:45:05','HIIT','[\"Warm up with light dumbbell movements\",\"40s Dumbbell Thrusters → 20s rest\",\"40s Renegade Rows → 20s rest\",\"40s Dumbbell Swings → 20s rest\",\"40s Squat to Press → 20s rest\",\"Repeat circuit 4 times\",\"Cool down and stretch\"]'),(35,'Bike Sprint HIIT','Alternate between all-out bike sprints and easy recovery pedaling for maximum calorie burn.','Intermediate','https://www.youtube.com/embed/TBvUjD5iYto','2026-03-31 11:45:05','HIIT','[\"Warm up: 5 mins easy cycling\",\"Sprint at maximum resistance for 20 seconds\",\"Easy pedal for 40 seconds\",\"Repeat for 10-15 rounds\",\"Cool down: 5 mins easy cycling and leg stretches\"]'),(36,'Full Body HIIT','The ultimate full-body HIIT combining burpees, squats and push-ups back to back.','Advanced','https://www.youtube.com/embed/ml6cT4AZdqI','2026-03-31 11:45:05','HIIT','[\"Warm up for 5 minutes\",\"AMRAP (as many rounds as possible) in 20 minutes:\",\"→ Burpees: 5 reps\",\"→ Jump Squats: 10 reps\",\"→ Push-ups: 10 reps\",\"→ High Knees: 20 reps\",\"Rest only when needed\",\"Cool down with full body stretch\"]'),(37,'Full Body Stretch','A complete head-to-toe stretching routine to improve flexibility and reduce soreness.','Beginner','https://www.youtube.com/embed/g_tea8ZNk5A','2026-03-31 11:45:29','Yoga & Recovery','[\"Neck rolls: 5 each direction\",\"Shoulder cross stretch: 30s each arm\",\"Cat-cow stretch: 10 reps\",\"Hip flexor stretch: 45s each side\",\"Hamstring stretch: 45s each leg\",\"Quad stretch: 30s each leg\",\"Child pose: hold for 1 minute\",\"Breathe deeply throughout\"]'),(38,'Morning Yoga Flow','Wake up your body and mind with this energizing morning yoga sequence.','Beginner','https://www.youtube.com/embed/v7AYKMP6rOE','2026-03-31 11:45:29','Yoga & Recovery','[\"Start in child pose: 1 minute\",\"Sun Salutation A: 5 rounds\",\"Warrior 1 and 2: 45s each side\",\"Triangle pose: 45s each side\",\"Seated forward fold: 1 minute\",\"Finish in Savasana for 3 minutes\"]'),(39,'Evening Relaxation Yoga','Wind down before bed with gentle yoga poses to calm the nervous system.','Beginner','https://www.youtube.com/embed/BiWDsfZ3zbo','2026-03-31 11:45:29','Yoga & Recovery','[\"Seated breathing: 2 minutes\",\"Supine twist: 1 minute each side\",\"Legs up the wall: 3 minutes\",\"Butterfly pose: 2 minutes\",\"Reclined pigeon: 1 minute each side\",\"Savasana: 5 minutes with deep breathing\"]'),(40,'Deep Stretch – Hamstrings & Back','Target tight hamstrings and lower back with long, deep holds for lasting relief.','Beginner','https://www.youtube.com/embed/4pKly2JojMw','2026-03-31 11:45:29','Yoga & Recovery','[\"Warm up with light walking for 2 minutes\",\"Standing forward fold: 1 minute\",\"Seated forward fold: 1 minute each leg\",\"Supine hamstring stretch with strap: 90s each leg\",\"Cat-cow: 10 slow reps\",\"Child pose: 2 minutes\",\"Knees to chest: 1 minute\"]'),(41,'Hip Mobility Routine','Open up tight hips and improve your range of motion with this dedicated hip session.','Beginner','https://www.youtube.com/embed/WUKHM6-ekJM','2026-03-31 11:45:29','Yoga & Recovery','[\"Hip circles: 10 each direction\",\"90/90 hip stretch: 90s each side\",\"Pigeon pose: 90s each side\",\"Butterfly stretch: 1 minute\",\"Lateral lunge hold: 45s each side\",\"Deep squat hold: 1 minute\",\"Finish with hip flexor stretch\"]'),(42,'Shoulder Mobility Flow','Relieve shoulder tension and improve overhead mobility with this targeted flow.','Beginner','https://www.youtube.com/embed/UBMk30rjy0o','2026-03-31 11:45:29','Yoga & Recovery','[\"Arm circles forward and backward: 10 each\",\"Cross body shoulder stretch: 45s each\",\"Thread the needle: 45s each side\",\"Doorway chest stretch: 1 minute\",\"Wall slides: 10 slow reps\",\"Child pose with arms extended: 1 minute\",\"Breathe deeply into upper back\"]'),(43,'Foam Rolling Session','Use a foam roller to release muscle knots and speed up recovery between workouts.','Beginner','https://www.youtube.com/embed/Oz4xHEgMaLY','2026-03-31 11:45:29','Yoga & Recovery','[\"Foam roll quads: 60s each leg\",\"Foam roll IT band: 60s each side\",\"Foam roll calves: 60s each leg\",\"Foam roll upper back: 90s\",\"Foam roll glutes: 60s each side\",\"Foam roll lats: 60s each side\",\"Finish with static stretches for rolled areas\"]'),(44,'Breathwork + Stretching','Combine intentional breathing with gentle stretching to restore balance and reduce stress.','Beginner','https://www.youtube.com/embed/tybOi4hjZFQ','2026-03-31 11:45:29','Yoga & Recovery','[\"Box breathing: 4s in, 4s hold, 4s out, 4s hold — 5 rounds\",\"Neck stretches: 30s each direction\",\"Seated spinal twist: 45s each side\",\"Chest opener: 1 minute\",\"Diaphragmatic breathing in reclined position: 3 minutes\",\"Savasana: 5 minutes\"]'),(45,'Slow Flow Yoga','Move mindfully through classic yoga postures at a slow, intentional pace.','Beginner','https://www.youtube.com/embed/b1H3xO3x_Js','2026-03-31 11:45:29','Yoga & Recovery','[\"Begin in Mountain pose: 1 minute\",\"Forward fold to halfway lift: 5 rounds\",\"Low lunge both sides: 45s each\",\"Warrior 2 sequence: 45s each side\",\"Seated twist: 45s each side\",\"Bridge pose: 1 minute\",\"Savasana: 5 minutes\"]'),(46,'Balance & Stability Yoga','Strengthen stabilizer muscles and improve balance with these standing yoga poses.','Beginner','https://www.youtube.com/embed/WltkvVB_lfM','2026-03-31 11:45:29','Yoga & Recovery','[\"Mountain pose and breathing: 1 minute\",\"Tree pose: 60s each side\",\"Warrior 3: 45s each side\",\"Eagle pose: 45s each side\",\"Half moon pose: 45s each side\",\"Chair pose: 1 minute\",\"Cool down in child pose: 2 minutes\"]'),(47,'Recovery Walk + Stretch','An easy recovery day combining gentle walking with post-walk stretching.','Beginner','https://www.youtube.com/embed/Civgg3FVfw8','2026-03-31 11:45:29','Yoga & Recovery','[\"Walk at easy, comfortable pace for 20-30 minutes\",\"Post-walk: calf stretch 45s each leg\",\"Quad stretch: 45s each leg\",\"Standing hip flexor stretch: 45s each side\",\"Upper body shoulder stretch: 30s each\",\"Deep breathing for 2 minutes\",\"Full body shake out\"]'),(48,'Yin Yoga – Long Holds','Hold deep passive poses for 3-5 minutes each to target connective tissue and deep release.','Beginner','https://www.youtube.com/embed/sTANio_2E0Q','2026-03-31 11:45:29','Yoga & Recovery','[\"Dragon pose (hip flexor): 3 minutes each side\",\"Sleeping swan (pigeon): 4 minutes each side\",\"Caterpillar (forward fold): 4 minutes\",\"Twisted roots (supine twist): 3 minutes each side\",\"Supported fish (chest opener): 3 minutes\",\"Savasana: 5-10 minutes\",\"Breathe deeply and surrender into each pose\"]');
/*!40000 ALTER TABLE `workouts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-10 20:27:10
