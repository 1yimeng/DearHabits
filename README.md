# Before Running
1. In order to run the server and access the database, you will need to have the following installed on your computer:
    - NodeJS
    - NPM
    - [XAMPP](#installing-xampp-and-downloading-the-database)
2. Be sure to [create a local copy](#installing-xampp-and-downloading-the-database) of the MySQL [database](db/dear_habits.sql) on your computer.

# Run Instructions
1. Clone the repository to your local machine. Move into the [server](/server/) directory.
2. Run `npm install` in order to ensure that all the dependencies are installed.
    - If there are any issues with running or compiling, you can also try running `npm install` in both the inner DearHabits and root directories as well.
3. Run `npm run start` to start running the server.
4. Open your browser and navigate to [localhost:5001](http://localhost:5001) to see the application.
5. To shutdown the server use `Control C`

## Installing XAMPP and Downloading the Database
1. Download the XAMPP Installer from  the [XAMPP downloads page](https://www.apachefriends.org/download.html) 
    - Please note that this application was developed using **XAMPP for Windows Version 8.2.12 / PHP 8.2.12**
    - It is recommended that you download a similar version of XAMPP for your own computer to ensure that the versions are compatible
2. Follow the Installer instructions. Please ensure that MySQL and phpMyAdmin are included in your installed XAMPP Control Panel.
3. When the installation is complete, open the XAMPP Control Panel. Select "Start" for both Apache and MySQL.
    - Apache is used to connect localhost to your XAMPP files (including the installation of MySQL)
    - MySQL will be used to store our local database. The version run in XAMPP is actually MariaDB, an open-source version of MySQL
4. Open your browser and go to [localhost](http://localhost). You should see the XAMPP dashboard.
5. Select "phpMyAdmin" in the menu bar at the top of the screen. This will open the phpMyAdmin window - a software tool used to manage MySQL in a Web setting.
6. In the navigation menu on the left-hand side, select "New" to create a new database. Enter the database name "dear_habits" and hit "Create".
    - Please note that on some operating systems, MySQL database names are case sensitive. Be sure to enter the name **dear_habits** exactly to avoid any issues.
7. Now that your database has been created, select it in the left-hand navigation menu and go to "Import" in the menu bar on the top right.
8. Use the "Browse" option to input the file [dear_habits.sql](db/dear_habits.sql). Scroll down until you can hit the "Import" button.
9. phpMyAdmin will import all the relevant database tables and input some example data. Your local database is now ready.
10. Keep Apache and MySQL running in the XAMPP Control Panel and [start the server](#run-instructions). Your application will now be able to access a local version of the database, and any updates will be reflected in your local copy. These changes can be seen in your phpMyAdmin window.