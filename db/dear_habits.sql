-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2024 at 12:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `habits`
--

INSERT INTO `habits` (`User_Name`, `id`, `Name`, `Privacy`, `Frequency`, `Streak_Num`, `Is_Completed`) VALUES
('test@gmail.com', 19, 'TestName', 'Private', 'Daily', 0, 0),
('test@gmail.com', 23, 'TestName2', 'Private', 'Daily', 0, 0),
('testemail@gmail.com', 26, 'TestHabit', 'Private', 'Daily', 0, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `habit_groupings`
--

INSERT INTO `habit_groupings` (`Gid`, `Hid`, `Label`, `Type`, `Value`, `Upper_Bound`, `Lower_Bound`, `Num_Intervals`, `Is_Completed`, `Streak_Num`, `Longest_Streak`) VALUES
(24, 19, 'Test', 'Text', '{}', '', '', 2, 0, 0, 0),
(45, 23, 'Test1', 'Text', '{}', '', '', 2, 0, 0, 0),
(48, 26, 'Test', 'Text', '{}', '', '', 2, 0, 0, 0),
(49, 26, 'Test1', 'Numerical', '{}', '', '', 2, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `Pid` int(11) NOT NULL,
  `Time` datetime NOT NULL,
  `Text` text NOT NULL,
  `User_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Email` varchar(255) NOT NULL,
  `Password_Hash` varchar(255) NOT NULL,
  `Notif_Time` time NOT NULL DEFAULT '12:00:00',
  `Notif_Frequency` enum('Daily','Weekly','Monthly') NOT NULL DEFAULT 'Weekly'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Email`, `Password_Hash`, `Notif_Time`, `Notif_Frequency`) VALUES
('Jordan@email.com', 'jordanpass', '12:30:00', 'Daily'),
('test@gmail.com', 'testtest', '12:00:00', 'Weekly'),
('testemail@gmail.com', 'testpassword', '12:00:00', 'Weekly');

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
  ADD KEY `fk_user_email` (`User_email`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `habit_groupings`
--
ALTER TABLE `habit_groupings`
  MODIFY `Gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

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
