# Functional Requirements
## FR1. Registration - The system shall provide the option of registering a new uwer, i.e., a new email address, redirecting to the registration form on request.
This requirement is accomplished in the DearHabits/src/pages/registration.jsx file by the Registration component. This is where users can input data to register and user is added to the databases. This component is presented to users through the DearHabits/src/App.jsx file through the App component.

## FR2. Login - The system shall check if the provided Username and Password are matched with the registered users.
This requirement is accomplished in the DearHabits/src/pages/login.jsx file by the Login component. Here is where users have the ability to enter their information to login. This component is presented to users through the DearHabits/src/App.jsx file through the App component.

## FR3. Password Update - The system shall allow the user to change the password upon request and update it in the database.
This requirement is accomplished in the DearHabits/src/components/changePasswordButton.jsx file by the changePasswordButton component. This component is presented to users through the DearHabits/src/profile/Profile.jsx file by the Profile component. The Profile component is
called by the DearHabits/src/Hotbar.jsx file through the Hotbar component.

## FR4. Search Friends - The system shall allow the user to search for users based on their usernames.
This requirement is accomplished in the DearHabits/src/friends/FriendPage.jsx file by the FriendPage component and the DearHabits/src/friends/SearchList.jsx file by the SearchList component. The SearchList component is used in the FriendPage component to display the list of users matching the search criteria. FriendPage is presented to users through the DearHabits/src/Hotbar.jsx file through the Hotbar component.

## FR5. Send Friends Request - The system shall allow the user to send friend requests to other users. A friend request is represented as a directed edge between the two users in the social graph, i.e., user1 - "Request" -> user2.
This requirement is accomplished in the DearHabits/src/friends/FriendPage.jsx file by the FriendPage component and the DearHabits/src/friends/SearchList.jsx file by the SearchList component. The FriendPage component uses the SearchList component to display searched users and offer them a button to send a friend request. The FriendPage component is presented to users through the DearHabits/src/Hotbar.jsx file through the Hotbar component.

## FR6. Decide Friends Request - The system shall allow the user to accept or reject incoming friend requests. When accepting a new friend request, a new undirected edge between the two users is added to the social graph, i.e., user1 - "Friends" -> user2. Whether the request is accepted or rejected, the directed "Request" edge between the users is removed.
This requirement is accomplished in the DearHabits/src/friends/FriendPage.jsx file by the FriendPage component using the RequestList component from DearHabits/src/friends/RequestList.jsx file. The RequestList component shows a list of pending requests and provides the user a buttons to either accept or remove the friend request. The FriendPage component is presented to users through the DearHabits/src/Hotbar.jsx file through the Hotbar component.

## FR7. Remove Friend - The system shall allow the user to remove an accepted friend from their friend list. This will remove the undirected "Friends" edge between the two users in the social graph.
This requirement is accomplished in the DearHabits/src/friends/FriendPage.jsx file by the FriendPage component. The FriendPage component is presented to users through the DearHabits/src/Hotbar.jsx file through the Hotbar component. The Friendpage component uses the DearHabits/src/FriendList file for the FriendList component in order to show a list of the User's friend and the button needed to remove them. 

## FR8. Creat Habit Grouping - The system will be able to provide the user with the ability to create custom tasks that they can associate with their new habit. This includes a label for the tasks as well as a variety of options for tracking. The user can create up to 20 Habit Groupings for every habit. The options for Habit Groupings will include:
- Text - a collection of strings that the user can input (up to a maximum character limit of 65,535)
- Numerical - an integer that the user can input (starting from 0)
- Scale - an interval between points inputted by the user. With the distance and order of the points being dictated by the user.
- Checkmark - a binary toggle between True and False that the user can switch between.
This requirement is accomplished in the DearHabits/src/habits/Createhabit.jsx file using the components MainCreate and GroupingCreate. The MainCreate component uses the GroupingCreate component in order to allow users to create their groupings. The MainCreate component is presented to users through the DearHabits/src/HabitPage.jsx file using the HabitPage components. Additionally we accomplish this task by using the HabitGrouping class found in DearHabits/src/habits/classes/HabitGrouping.jsx

## FR9. Create Habit - The system will be able to provide logged-in users the option of creating a new habit. A new habit requires the following information:
- Name of Habit
- Frequency of Habit - how often the user wishes to perform habit - Daily/Weekly/Monthly
- Privacy Setting
- Habit Grouping - the task(s) the user wishes to associate with the habit
When the user finishes completing their habit, the system checks that all fields have been properly filled. If any field is invalid the system will inform the user. Otherwise, the habit will be added to their account in the database.

This requirement is accomplished in the DearHabits/src/habits/Createhabit.jsx file using the components MainCreate and HabitCreate. The MainCreate component uses the HabitCreate component in order to allow users to create their habit. The MainCreate component is presented to users through the DearHabits/src/HabitPage.jsx file using the HabitPage component. Additionally we accomplish this task by using the Habit class found in DearHabits/src/habits/classes/Habit.jsx

## FR10. View Habit - The system will enable logged-in users to review the details of pre-existing Habit. The system will also show the user's selected statistic(s) and the selected visualization(s) for each of the Habit Grouping(s).
This requirement is accomplished in the DearHabits/src/habits/ViewHabit.jsx file using the MainView and ViewMode components. The MainView component component uses the ViewMode component to present the user their selected habit. The MainView componenet is presented to users through the DearHabits/src/HabitPage.jsx file using the HabitPage component. The statistic and visualization components are accomplished in DearHabits/src/habits/Calculations.jsx file using the Stats, Visual and Text components to display the necessary data. These components are called in the ViewMode component. While the ability to select a habit is implemented using the DearHabit/src/habits/ListHabits.jsx file using the ListHabits component.

## FR11. Delete Habit - The system will enable logged-in users to delete one of their pre-exisiting Habits after confirmation from the user.
This requirement is accomplished in the DearHabits/src/habits/ViewMode.jsx file using the MainView and EditMode component. The EditMode component offers the user a button which will delete the habit after confirmation. The EditMode component is displayed through the MainView component which in turn is displayed through the DearHabits/src/HabitPage.jsx file using the HabitPage component. 

## FR12. Edit Habit - The system will enable logged-in users to change one of the required fields of a pre-existing Habit (Name, Frequency, Privacy, or Habit Grouping).
This requirement is accomplished in the DearHabits/src/habits/ViewMode.jsx file using the MainView and EditMode component. When using the EditMode component it allows the user to change the habit and habit grouping details. The EditMode component is displayed through the MainView component which in turn is displayed through the DearHabits/src/HabitPage.jsx file using the HabitPage component. 

## FR13. Toggle Statistics - The system will enable logged-in users to select which statistics are displayed for a selected Habit Grouping. Some statistics are determined by the type of Habit Grouping, only valid statistics will be available for a user to select. The types of statistics are:
- Longest Streak (All groups)
- Highest (Numerical, Scale)
- Lowest (Numerical, Scale)
- Average (Numerical, Scale)
This requirement is accomplished in the DearHabits/src/habits/Calculations.jsx file using the Stats component. This component offers the user a dropdown menu to select what type of statistic to view (dependent on habit grouping type). This component is displayed through the ViewMode component in the DearHabits/src/habits/ViewHabit.jsx file. Which in turn is displayed through the DearHabits/src/HabitPage.jsx file using the HabitPage component. 

## FR14. Select Visualization - The system will enable logged-in users to select which visualization is displayed for a selected Habit Grouping. The user can also select which time range the visualization represent (daily, weekly, or monthly). Visualization options are determined by the type of Habit Grouping:
- Line (Numerical, Scale, Checkmark)
- Bar (Numerical, Scale)
- Pie (Scale)
This requirement is accomplished in the DearHabits/src/habits/Calculations.jsx file using the Visuals component. This component offers the user a dropdown menu to select what type of visualization to view (dependent on habit grouping type) and the ability to change the time frame. This component is displayed through the ViewMode component in the DearHabits/src/habits/ViewHabit.jsx file. Which in turn is displayed through the DearHabits/src/HabitPage.jsx file using the HabitPage component.

## FR15. Share Public Habit with Friends - The system shall allow users to set the privacy of their Habits to 'public' or 'private'. Public Habits are shared on the social feed page with the user's friends. Updates to the habits, including a new completion, will update the post in the feed as well.
This requirement is accomplished in the DearHabits/src/habit/HabitPage.jsx file through the HabitPage component. This ability is used when users either edits or completes a habit through the DearHabits/src/habit/ViewHabit.jsx file using either the EditMode or ViewMode component. 

## FR16. View Feed - The system shall allow the user to view the publicly available accomplishements of their friends, arranged in chronological order, on the 'Feed' page. The user's own publicly shared posts are also present on this page.
This requirement is accomplished in the DearHabits/src/friends/HabitPost.jsx file using the components Feed and HabitPost. The Feed component lists all of the Posts while HabitPost displays the data for a post. Both components are displayed through DearHabits/src/friends/FriendPage.jsx FriendPage component.

## FR17. React to Friend's Post - The system shall allow the user to select one of the finite array of reactions icons to leave a reaction on a friend's habit in the feed. This original poster wil lbe notified of the reaction.
This requirement is accomplished in the DearHabits/src/friends/ReactionCounter.jsx file using the Facebook component. This component is displayed to users through the Feed component in DearHabits/src/friends/HabitPost.jsx file. All of which is shown through DearHabits/src/friends/FriendPage.jsx FriendPage component.

## FR18. Update Streak - The system will record when the authorized user continues to progress their habits. The streak will start when the user has recorded a habit 3 times consecutively. It will increase that habit’s streak counter for each consecutive time the habit has progressed. The streak will reset to zero if the completion time passes without the habit progressing. A streak will be denoted to the user by the displayed streak counter.
This requriement is accomplished through two files. DearHabits/src/habits/ViewHabit.jsx using the ViewMode component shows the Users current streak for a habit and increments its Streak when the habit is completed. server/schedule.js will use scheduled tasks (using cron) to reset streaks for incomplete habits.

## FR19. Send Notifications - The system will send an email notification at a consistent time that is designed to remind the user about completing their habits.
This requirement is accomplished through the server/scheduling.js file by using scheduled (cron) tasks and by using the email service library Nodemailer.

## FR20. Set Notifications - The system will allow the users to determine the frequency of notification emails that the system sends them.
The file DearHabits/src/profile/Profile.jsx contains the Profile component. The Profile component uses the NotificationDropdown component from DearHabits/src/components/notificationDropdown.jsx to accomplish this requirement. The Profile component is called by the DearHabits/src/Hotbar.jsx file through the Hotbar component.