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

# References
1. “Getting Started | Vite.” Vite, Vite, vitejs.dev/guide/. Accessed Mar. 2024. 
2. Schwarzmüller, Maximilian. “REACT 16: The Complete Course (Incl.. React Router 4 & Redux) | Udemy.” React - The Complete Guide 2024 (Incl. React Router & Redux), Udemy, www.udemy.com/course/react-the-complete-guide-incl-redux/. Accessed Jan. 2024. 
3. Code With Yousaf. “React + Node JS + Mysql - Crud Operations | Crud Rest API with Node and Express.” React + Node Js + MySQL - CRUD Operations | CRUD Rest API with Node and Express, YouTube, 28 Mar. 2023, www.youtube.com/watch?v=y5NvOade3sk. Accessed 25 Mar. 2024.
4. MozDevNet. “JSON - Javascript: MDN.” MDN Web Docs, Mozilla, developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON. Accessed 25 Mar. 2024. 
5. MySQL Tutorial, w3schools, www.w3schools.com/MySQL/default.asp. Accessed 21 Mar. 2024. 
6. “Node-Cron.” Npm, npm, www.npmjs.com/package/node-cron. Accessed 28 Mar. 2024. 
7. “Node.Js Send an Email.” Node.Js Email, w3schools, www.w3schools.com/nodejs/nodejs_email.asp. Accessed 28 Mar. 2024. 
8. “React USEEFFECT Hooks.” React useEffect, w3schools, www.w3schools.com/react/react_useeffect.asp. Accessed 26 Mar. 2024. 
9. Maduabuchi, Chinwike. “Using Chart.Js in React.” LogRocket Blog, LogRocket, 6 Mar. 2023, blog.logrocket.com/using-chart-js-react/. Accessed Mar. 2024.
10. Javascript Date Reference, w3schools, www.w3schools.com/jsref/jsref_obj_date.asp. Accessed Mar. 2024. 
11. “Getting Started with Neo4j and Express - Developer Guides.” Neo4j Graph Data Platform, neo4j.com/developer/js-movie-app/. Accessed 5 Apr. 2024. 
12. Maillard, Valentine. “Implementing Cors in Your Node/Express App.” Medium, Medium, 25 June 2020, medium.com/@valentinemaillard1/implementing-cors-in-your-node-express-app-1bdffc4eaa48. Accessed 5 Apr. 2024. 
13. Silva, Esau. “How to Use Webpack with React: An in-Depth Tutorial.” freeCodeCamp.Org, freeCodeCamp.org, 9 Apr. 2020, www.freecodecamp.org/news/learn-webpack-for-react-a36d4cac5060/. Accessed 5 Apr. 2024.