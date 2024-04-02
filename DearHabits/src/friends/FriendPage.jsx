import { useState, useEffect } from 'react'

import FriendList from './FriendList.jsx'
import SearchList from './SearchList.jsx'
import RequestList from './RequestList.jsx'
import { Feed } from './HabitPost.jsx'

import axios from 'axios';
import { auth } from "../firebase.jsx";
import Habit from '../habits/classes/Habit.jsx';
import HabitGrouping from '../habits/classes/HabitGrouping.jsx';

import './stylesheets/friends.css'

// Backend portion to retrieve all of Users and their friends posts (FR16)
const getPosts = async (users) => {
    const posts = [];
    // ${users.reduce((sum, cur) => `${sum} ${cur}`)}`, {emails:users}
    await axios.get(`http://localhost:5001/api/habits/read/posts/${users}`)
    .then(res => {
        console.log("res: ", res);
        res.data.forEach(result => {
            const storedReactions = (result.Reactions) ? JSON.parse(result.Reactions) : {}
            const reactions = Object.keys(storedReactions).map(key => storedReactions[key]);
            posts.push([result.Hid, result.Pid, reactions, result.Time.split("T")[0]]);
    })})
    .catch(err => console.log(err));

    if (posts.length > 0) {
        const shared = [];
        await axios.get(`http://localhost:5001/api/habits/read/habits/${posts.reduce((sum, cur) => `${sum}+${cur[0]}`)}`)
                    .then(res => {
                        res.data.forEach(result => {
                            shared.push([result.User_Name, new Habit(
                                result.Name, 
                                result.Frequency, 
                                result.Privacy, 
                                result.Streak_Num, 
                                (result.Is_Completed) ? true : false,
                                result.id)]);
                        })
                    })
                    .catch(err => console.log(err));
    
        const groupings = [];
        await axios.get(`http://localhost:5001/api/habits/read/groupings/${posts.reduce((sum, cur) => `${sum}+${cur[0]}`)}`)
                    .then(res => {
                        res.data.forEach(result => {
                        const group = new HabitGrouping(
                            result.Label,
                            result.Type,
                            result.Upper_Bound,
                            result.Lower_Bound,
                            result.Num_Intervals,
                            result.Hid,
                        );
                        (result.Value) ? group.JSONValue(JSON.parse(result.Value)) : group.values = [];
                        group.stats = [result.Streak_Num, result.Longest_Streak];
                        groupings.push(group)
                        })
                    })
                    .catch(err => console.log(err))
    
        return shared.map(habit => {
            groupings.forEach(group => (habit[1].id === group.hid) ? habit[1].addGroup(group) : null);
            posts.forEach(id => {
                if (id[0] === habit[1].id) { 
                    habit.push(id[2], id[1]);
                    habit[1].group.forEach(g => {
                        const json = g.valueJSON();
                        (g.values.length > 0) ? g.values = [id[3].split("T")[0], json[id[3].split("T")[0]]] : g.values = [];
                    })
                }
            });
            return habit;
        });
    } else {
        return [];
    }
};

const getFriendsAndPending = async (user) => {
    const friends = [];

    await axios.get(`http://localhost:5001/api/friends/${user}`)
        .then(res => {
            res.data.forEach( item => {
                friends.push(item);
            });
        })
        .catch(err => console.log(err));
    
    const pending = [];
    await axios.get(`http://localhost:5001/api/friends/${user}/requests/sent`)
    .then(res => {
        res.data.forEach( item => {
            pending.push(item);
        });
    })
    .catch(err => console.log(err));        
    
    let results = [];
    if (friends.length == 0) {
        results = pending;
    } else {
        results = friends.concat(pending);
    }
    return results;
};

const getRecvRequests = async (user) => {
    const received = [];

    await axios.get(`http://localhost:5001/api/friends/${user}/requests/received`)
        .then(res => {
            res.data.forEach( item => {
                received.push(item);
            });
        })
        .catch(err => console.log(err));
    return received;
};

// FR4. Search Friends, FR5. Send Friends Request, FR6. Decide Friends Request, FR7. Remove Friend, FR16. View Feed,
// FR17. React to Friend's Post
const FriendPage = (props) => {
    const [all_friends, setFriends] = useState([]);
    const [posts, setPosts] = useState([]);
    const [recvReqs, setRecvReqs] = useState([]);
    const [post_users, setPostUsers] = useState([auth.currentUser.email]);
    const [mode, setMode] = useState(null);
    const [invites, setInvites] = useState(null);

    // FR7. Remove Friend
    // Shows the button to use FR7
    // Show the User's friends
    const viewFriends = (friends) => {
            return (<FriendList key={"FriendList"} friends={friends} buttonFunc={removeFriend}/>);
    };

    // FR7. Remove Friend
    // Handles the backend portion of FR7
    // Remove a User from the User's friend list
    const removeFriend = async friend => {
        await axios.delete(`http://localhost:5001/api/friends/delete/${auth.currentUser.email}/${friend[0]}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setFriends(oldFriends => {
            const newFriends = [...oldFriends];
            newFriends.filter(cur => cur[0] != friend);
            return newFriends;
        });

        setPostUsers(oldPostUsers => {
            const newPostUsers = [...oldPostUsers];
            newPostUsers.filter(curr => curr[0] != friend);
            return newPostUsers;
        });

        setMode(() => viewFriends(all_friends));
        setPosts(() => getPosts(post_users));
    };

    // FR5. Send Friends Request
    // Handles the backend portion of FR5
    // Add a User to the User's friend list as a pending friend
    const addFriend = async friend => {
        // TODO: Notify friend about request
        await axios.post(`http://localhost:5001/api/friends/requests/${auth.currentUser.email}/${friend}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setFriends(oldFriends => {
            const newFriends = [...oldFriends];
            newFriends.push([friend, 0]);
            return newFriends;
        });
        setMode(() => viewFriends(all_friends));
    };

    // FR4. Search Friends
    // Handles the backend portion of FR4
    // List all Users that match User's criteria
    const searchFriends = e => {
        // TODO: Get Users from database that match search and their 
        const search = ["Example1", "Example2", "Example3"]
        setMode(() => {
            return (
                <>
                    <SearchList search={search} friends={all_friends.map(friend => friend[0])} buttonFunc={addFriend}/>
                    <br />
                    <button onClick={() => setMode(() => viewFriends())}>Back</button>
                </>
            )
        })
        e.preventDefault();
    };

    // FR6. Decide Friends Request
    // List all of the User's pending invites
    const viewRequests = (requests) => { 
        return (<RequestList key={"RequestList"} requests={requests} acceptFunc={acceptRequest} removeFunc={removeRequest}/>);
    };
    // FR6. Decide Friends Request
    // Handles the backend portion to remove a friend request (FR6)
    // Remove a Request from the User's pending invites
    const removeRequest = async request => {
        await axios.delete(`http://localhost:5001/api/friends/requests/${request}/${auth.currentUser.email}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setRecvReqs(oldReqs => {
            const newReqs = [...oldReqs];
            newReqs.filter(r => r != request);
            return newReqs;
        });

        setInvites(() => viewRequests(recvReqs));
    };
    // FR6. Decide Friends Request
    // Handles the backend portion to accept a friend request (FR6)
    // Add User to the User's friend list and remove them from the User's invites
    const acceptRequest = async request => {
        removeRequest(request);
        // add new friend relationship
        await axios.post(`http://localhost:5001/api/friends/${auth.currentUser.email}/${request}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setFriends(oldFriends => {
            const newFriends = [...oldFriends];
            newFriends.push([request, 1]);
            return newFriends;
        });

        setPostUsers(oldPostUsers => {
            const newPostUsers = [...oldPostUsers];
            newPostUsers.push(request);
            return newPostUsers;
        });

        setMode(() => viewFriends(all_friends));
        setPosts(() => getPosts(post_users));
    }

    // Button refresh the Posts from the database (FR16)
    const getFeed = async () => {
        const response = await getPosts(post_users);
        setPosts(response);  
    };

    useEffect(() => {
        const retrieve = async () => {
            let friends = await getFriendsAndPending(auth.currentUser.email);
            setFriends(() => friends);
            setMode(()=> viewFriends(friends));

            // Get all the relevant posts (FR16)
            const posters = [auth.currentUser.email];
            friends.forEach(friend => (friend[1] === 1) ? posters.push(friend[0]) : null);
            setPostUsers(() => posters);

            // Get the requests sent to the User so they can decide to accept or reject them for FR6
            let received_reqs = await getRecvRequests(auth.currentUser.email);
            setRecvReqs(() => received_reqs);
            setInvites(()=>viewRequests(received_reqs));

            let response = await getPosts(posters);
            setPosts(() => response);
        }
        retrieve();
    }, []);

    return (
      <section className="flex-friend">
        <section className="sidebar">
          <h2>Friends</h2>
          {/* Search bar required for FR4. Search Friends */}
          <form>
            <input name="searchField" placeholder="friend@gmail.com" />
            <button onClick={searchFriends}>Search</button>
          </form>
          <hr />
          {/* Output for FR4. Search Friends, button for FR5. Send Friends Request, and button for FR7. Remove Friend*/}
          {mode}
        </section>
        <section className="feed">
          {/* Display all Posts and reactions from the User and their friends (FR16 and FR17) */}
          <button className="feed-button" onClick={() => getFeed()}>Refresh</button>
          <Feed shared={posts} key={posts} className="feed-slot" />
        </section>
        <section className="sidebar">
          <h2>Invites</h2>
          {/* Show all available requests for users and option to decide on requests for FR6 */}
          {invites}
        </section>
      </section>
    );

}

export default FriendPage;