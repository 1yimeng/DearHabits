import { useState } from 'react'

import FriendList from './FriendList'
import SearchList from './SearchList'
import RequestList from './RequestList'
import { Feed } from './HabitPost'
import Habit from '../habits/classes/Habit';
import HabitGrouping from '../habits/classes/HabitGrouping';

import './stylesheets/friends.css'

const FriendPage = ({friends, requests, ...props}) => {
    console.log(friends);
    // Show the User's friends
    const viewFriends = () => (<FriendList key={"FriendList"} friends={friends} buttonFunc={removeFriend}/>);
    // Remove a User from the User's friend list
    const removeFriend = friend => {
        // TODO: Remove friend from friend list in the database
        friends = friends.filter(cur => cur[0] != friend);
        setMode(() => viewFriends());
    }
    // Add a User to the User's friend list as a pending friend
    const addFriend = friend => {
        // TODO: Add friend to database as pending
        // TODO: Notify friend about request
        friends.push([friend, 0]);
        setMode(() => viewFriends());
    }
    // List all Users that match User's criteria
    const searchFriends = e => {
        // TODO: Get Users from database that match search and their 
        const search = ["Example1", "Example2", "Example3"]
        console.log(e.target.form[0].value);
        setMode(() => {
            return (
                <>
                    <SearchList search={search} friends={friends.map(friend => friend[0])} buttonFunc={addFriend}/>
                    <br />
                    <button onClick={() => setMode(() => viewFriends())}>Back</button>
                </>
            )
        })
        e.preventDefault();
    }

    // List all of the User's pending invites
    const viewRequests = () => (<RequestList key={"RequestList"} requests={requests} acceptFunc={acceptRequest} removeFunc={removeRequest}/>)
    // Remove a Request from the User's pending invites
    const removeRequest = request => {
        // TODO: Add database logic to remove request from database
        requests = requests.filter(r => r != request);
        setMode(() => viewFriends());
        setInvites(() => viewRequests());
    }
    // Add User to the User's friend list and remove them from the User's invites
    const acceptRequest = request => {
        friends.push([request, 1]);
        removeRequest(request);
    }

    const [mode, setMode] = useState(viewFriends());
    const [invites, setInvites] = useState(viewRequests());
    const [posts, setPosts] = useState([]);

    const getFeed = () => {
        // TODO : FIX with database call
        var grouping = new HabitGrouping("ye", "text");
        var grouping3 = new HabitGrouping("ye1", "text");
        var myhabit1 = new Habit("yes", "Daily", "Private");
        myhabit1.addGroup(grouping);
        myhabit1.addGroup(grouping3);
        setPosts([["yimeng", myhabit1], ["sony", myhabit1]]);  
        console.log(posts);
    }

    return (
      <section className="flex-friend">
        <section className="sidebar">
          <h2>Friends</h2>
          <form>
            <input name="searchField" placeholder="friend@gmail.com" />
            <button onClick={searchFriends}>Search</button>
          </form>
          <hr />
          {mode}
        </section>
        <section className="feed">
          <button className="feed-button" onClick={() => getFeed()}>Refresh</button>
          <Feed shared={posts} key={posts} className="feed-slot" />
        </section>
        <section className="sidebar">
          <h2>Invites</h2>
          {invites}
        </section>
      </section>
    );

}

export default FriendPage;