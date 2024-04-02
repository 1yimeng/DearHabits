-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2024 at 01:30 AM
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
('test@gmail.com', 36, 'Weights2', 'Private', 'Daily', 1, 1),
('test@gmail.com', 37, 'Elliptical', 'Private', 'Daily', 1, 1),
('test@gmail.com', 38, 'Public', 'Public', 'Daily', 1, 1),
('test@gmail.com', 39, 'Test Habit', 'Private', 'Daily', 1, 1),
('test@gmail.com', 41, 'New new Test (new)', 'Public', 'Weekly', 1, 1);

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
(79, 37, 'Mood', 'Scale', '{\"2024-03-30\":\"1\"}', 'Bad', 'Good', 3, 0, 0, 0),
(80, 37, 'Time', 'Numerical', '{\"2024-03-30\":\"1.5\"}', '', '', 2, 0, 0, 0),
(82, 38, 'Test', 'Text', '{\"2024-03-30\":\"Test test test\"}', '', '', 2, 0, 0, 0),
(85, 39, 'Test 1', 'Text', '{\"2024-03-31\":\"Test Test\"}', '', '', 2, 0, 0, 0),
(86, 39, 'Test 2', 'Text', '{\"2024-03-31\":\"Test 2\"}', '', '', 2, 0, 0, 0),
(87, 36, 'Pounds', 'Numerical', '{\"2024-03-30\":\"255\"}', '', '', 2, 0, 0, 0),
(94, 41, 'Hello There', 'Text', '{\"2024-04-02\":\"Why Hello\"}', '', '', 2, 0, 1, 1);

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
(13, '2024-03-30', 38, 'test@gmail.com', '{\"1\":{\"emoji\":\"like\",\"by\":\"testemail@gmail.com\"}}'),
(17, '2024-04-02', 41, 'test@gmail.com', '{\"1\":{\"emoji\":\"angry\",\"by\":\"test@gmail.com\"}}');

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
('testemail@gmail.com', '12:00:00', 'Weekly');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `habit_groupings`
--
ALTER TABLE `habit_groupings`
  MODIFY `Gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `Pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
