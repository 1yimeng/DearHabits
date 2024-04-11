-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2024 at 01:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dear_habits`
--

-- --------------------------------------------------------

--
-- Table structure for table `habits`
--

CREATE TABLE `habits` (
  `User_Name` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Privacy` enum('Public','Private') NOT NULL,
  `Frequency` enum('Daily','Weekly','Monthly') NOT NULL,
  `Streak_Num` int(11) NOT NULL DEFAULT 0,
  `Is_Completed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `habits`
--

INSERT INTO `habits` (`User_Name`, `id`, `Name`, `Privacy`, `Frequency`, `Streak_Num`, `Is_Completed`) VALUES
('user-4@gmail.com', 43, 'School', 'Public', 'Daily', 1, 1),
('user-2@gmail.com', 44, 'Meals', 'Public', 'Daily', 1, 1),
('user-1@gmail.com', 45, 'Exercise', 'Public', 'Daily', 3, 1),
('user-1@gmail.com', 46, 'Sleep', 'Private', 'Daily', 1, 1),
('user-1@gmail.com', 47, 'Mood', 'Private', 'Daily', 1, 1),
('user-2@gmail.com', 48, 'Read Books', 'Public', 'Weekly', 1, 1),
('user-3@gmail.com', 49, 'Quitting Smoking', 'Public', 'Daily', 1, 1),
('test02@gmail.com', 50, 'Test01', 'Private', 'Monthly', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `habit_groupings`
--

CREATE TABLE `habit_groupings` (
  `Gid` int(11) NOT NULL,
  `Hid` int(11) NOT NULL,
  `Label` varchar(255) NOT NULL,
  `Type` enum('Text','Numerical','Scale','Checkmark') NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Upper_Bound` varchar(255) DEFAULT NULL,
  `Lower_Bound` varchar(255) DEFAULT NULL,
  `Num_Intervals` int(11) DEFAULT 1,
  `Is_Completed` tinyint(1) NOT NULL,
  `Streak_Num` int(11) DEFAULT 0,
  `Longest_Streak` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `habit_groupings`
--

INSERT INTO `habit_groupings` (`Gid`, `Hid`, `Label`, `Type`, `Value`, `Upper_Bound`, `Lower_Bound`, `Num_Intervals`, `Is_Completed`, `Streak_Num`, `Longest_Streak`) VALUES
(101, 43, 'ECE 493', 'Text', '{\"2024-04-03\":\"Completed the Weekly Report\"}', '', '', 2, 0, 1, 1),
(102, 43, 'ENGG 400', 'Checkmark', '{\"2024-04-03\":1}', '', '', 2, 0, 1, 1),
(119, 46, 'Hours', 'Numerical', '{\"2024-04-03\":\"7.5\"}', '', '', 2, 0, 1, 1),
(120, 46, 'Restful?', 'Checkmark', '{\"2024-04-03\":1}', '', '', 2, 0, 1, 1),
(126, 47, 'How Am I Feeling?', 'Scale', '{\"2024-04-03\":\"2\"}', 'Good', 'Bad', 3, 0, 1, 1),
(127, 47, 'Thoughts?', 'Text', '{\"2024-04-03\":\"Anxious about school.\"}', '', '', 2, 0, 1, 1),
(131, 45, 'Weights', 'Text', '{\"2024-04-01\":\"5x5 at 255lbs\",\"2024-04-02\":\"5x5 at 255lbs\",\"2024-04-03\":\"5x5 at 255lbs\"}', '', '', 2, 0, 3, 3),
(132, 45, 'Cardio (min)', 'Numerical', '{\"2024-04-01\":\"60\",\"2024-04-02\":\"55\",\"2024-04-03\":\"61\"}', '', '', 2, 0, 3, 3),
(133, 45, 'Fatigue', 'Scale', '{\"2024-04-01\":\"4\",\"2024-04-02\":\"5\",\"2024-04-03\":\"3\"}', 'High', 'Low', 5, 0, 3, 3),
(134, 44, 'Breakfast', 'Checkmark', '{\"2024-04-03\":1}', '', '', 2, 0, 1, 1),
(135, 44, 'Lunch', 'Checkmark', '{\"2024-04-03\":1}', '', '', 2, 0, 1, 1),
(136, 44, 'Dinner', 'Checkmark', '{\"2024-04-03\":1}', '', '', 2, 0, 1, 1),
(138, 48, 'Chapters', 'Numerical', '{\"2024-04-03\":\"3\"}', '', '', 2, 0, 1, 1),
(140, 49, 'Cigarettes ', 'Numerical', '{\"2024-04-03\":\"10\"}', '', '', 2, 0, 1, 1),
(157, 50, 'Activity1', 'Text', '{\"2024-02-01\":\"Test 1\",\"2024-03-01\":\"Test 2\",\"2024-04-01\":\"Test 3\"}', '', '', 2, 0, 3, 3),
(158, 50, 'Activity2', 'Numerical', '{\"2024-02-01\":\"5\",\"2024-03-01\":\"1\",\"2024-04-01\":\"9.9\"}', '', '', 2, 0, 3, 3),
(159, 50, 'Activity3', 'Scale', '{\"2024-02-01\":1,\"2024-03-01\":\"3\",\"2024-04-01\":\"5\"}', '5', '1', 5, 0, 3, 3),
(160, 50, 'Activity4', 'Checkmark', '{\"2024-02-01\":1,\"2024-03-01\":\"\",\"2024-04-01\":1}', '', '', 2, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `Pid` int(11) NOT NULL,
  `Time` date NOT NULL,
  `Hid` int(11) NOT NULL,
  `User_email` varchar(255) NOT NULL,
  `Reactions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Reactions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`Pid`, `Time`, `Hid`, `User_email`, `Reactions`) VALUES
(3, '0000-00-00', 27, 'test@gmail.com', '{\"1\":{\"emoji\":\"love\",\"by\":\"test@gmail.com\"},\"2\":{\"emoji\":\"like\",\"by\":\"testemail@gmail.com\"}}'),
(4, '2024-03-28', 28, 'test@gmail.com', '{\"1\":{\"emoji\":\"wow\",\"by\":\"test@gmail.com\"}}'),
(5, '2024-03-28', 29, 'test@gmail.com', '{\"1\":{\"emoji\":\"love\",\"by\":\"test@gmail.com\"}}'),
(6, '2024-03-29', 19, 'test@gmail.com', '{}'),
(7, '2024-03-29', 23, 'test@gmail.com', '{}'),
(8, '2024-03-29', 27, 'test@gmail.com', '{}'),
(9, '2024-03-29', 27, 'test@gmail.com', '{}'),
(10, '2024-03-29', 27, 'test@gmail.com', '{}'),
(11, '2024-03-30', 34, 'ralph.w.milford@gmail.com', '{}'),
(12, '2024-03-30', 35, 'testemail@gmail.com', '{}'),
(18, '2024-04-03', 43, 'user-4@gmail.com', '{}'),
(19, '2024-04-03', 45, 'user-1@gmail.com', '{\"1\":{\"emoji\":\"like\",\"by\":\"user-2@gmail.com\"}}'),
(20, '2024-04-03', 45, 'user-1@gmail.com', '{\"1\":{\"emoji\":\"like\",\"by\":\"user-2@gmail.com\"}}'),
(21, '2024-04-03', 48, 'user-2@gmail.com', '{\"1\":{\"emoji\":\"love\",\"by\":\"user-1@gmail.com\"}}'),
(22, '2024-04-03', 49, 'user-3@gmail.com', '{\"1\":{\"emoji\":\"sad\",\"by\":\"user-3@gmail.com\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Email` varchar(255) NOT NULL,
  `Notif_Time` time NOT NULL DEFAULT '12:00:00',
  `Notif_Frequency` enum('Daily','Weekly','Monthly') NOT NULL DEFAULT 'Weekly'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Email`, `Notif_Time`, `Notif_Frequency`) VALUES
('Jordan@email.com', '12:30:00', 'Daily'),
('ralph.w.milford@gmail.com', '12:00:00', 'Daily'),
('test@gmail.com', '12:00:00', 'Weekly'),
('test02@gmail.com', '12:00:00', 'Weekly'),
('test3@gmail.com', '12:00:00', 'Weekly'),
('testemail@gmail.com', '12:00:00', 'Weekly'),
('user-1@gmail.com', '12:00:00', 'Weekly'),
('user-2@gmail.com', '12:00:00', 'Weekly'),
('user-3@gmail.com', '12:00:00', 'Weekly'),
('user-4@gmail.com', '12:00:00', 'Weekly');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `habits`
--
ALTER TABLE `habits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_name` (`User_Name`);

--
-- Indexes for table `habit_groupings`
--
ALTER TABLE `habit_groupings`
  ADD PRIMARY KEY (`Gid`,`Hid`),
  ADD UNIQUE KEY `Gid_is_unique` (`Gid`) USING BTREE,
  ADD KEY `fk_habit_id` (`Hid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`Pid`,`User_email`),
  ADD KEY `fk_user_email` (`User_email`),
  ADD KEY `fk_habit_id` (`Hid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `habits`
--
ALTER TABLE `habits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `habit_groupings`
--
ALTER TABLE `habit_groupings`
  MODIFY `Gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `Pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `habits`
--
ALTER TABLE `habits`
  ADD CONSTRAINT `fk_user_name` FOREIGN KEY (`User_Name`) REFERENCES `users` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `habit_groupings`
--
ALTER TABLE `habit_groupings`
  ADD CONSTRAINT `fk_habit_id` FOREIGN KEY (`Hid`) REFERENCES `habits` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_user_email` FOREIGN KEY (`User_email`) REFERENCES `users` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
