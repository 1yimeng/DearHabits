import { useEffect, useState } from 'react'
import { auth } from "../firebase.jsx";
import axios from 'axios';

import FriendList from './FriendList.jsx'
import SearchList from './SearchList.jsx'
import RequestList from './RequestList.jsx'
import { Feed } from './HabitPost.jsx'
import Habit from '../habits/classes/Habit.jsx';
import HabitGrouping from '../habits/classes/HabitGrouping.jsx';

import './stylesheets/friends.css'

const getFriends = async (user) => {
    const friends = [];
    const sent = [];

    await axios.get(`http://localhost:5001/api/friends/${user}`)
        .then(res => {
            res.data.forEach( item => {
                friends.push(item);
            });
        })
        .catch(err => console.log(err));

    if (friends.length == 0) {
        return [];
    } else {
        await axios.get(`http://localhost:5001/api/friends/${user}/requests/sent`)
        .then(res => {
            res.data.forEach( item => {
                sent_reqs.push(item);
            });
        })
        .catch(err => console.log(err));        
    }
    
    return friends.concat(sent);
};

// const getSentRequests = async (user) => {
//     const sent_reqs = [];

//     await axios.get(`http://localhost:5001/api/friends/${user}/requests/sent`)
//         .then(res => {
//             res.data.forEach( item => {
//                 sent_reqs.push(item);
//             });
//         })
//         .catch(err => console.log(err));

//     return sent_reqs;
// };

const getRecvRequests = async (user) => {
    const recv_reqs = [];

    await axios.get(`http://localhost:5001/api/friends/${user}/requests/received`)
        .then(res => {
            res.data.forEach( item => {
                recv_reqs.push(item);
            });
        })
        .catch(err => console.log(err));

    return recv_reqs;
};

const FriendPage = (props) => {
    // console.log(friends);
    // Show the User's friends
    const viewFriends = (friend_list) => {
        if (friend_list.length > 0) {
            return (<FriendList key={"FriendList"} friends={friend_list} buttonFunc={removeFriend}/>);
        } else {
            return (<></>);
        }
    };
    // Remove a User from the User's friend list
    const removeFriend = friend => {
        // TODO: Remove friend from friend list in the database
        friends = friends.filter(cur => cur[0] != friend);
        // setMode(() => viewFriends());
    }
    // Add a User to the User's friend list as a pending friend
    const addFriend = friend => {
        // TODO: Add friend to database as pending
        // TODO: Notify friend about request
        friends.push([friend, 0]);
        // setMode(() => viewFriends());
    }
    // List all Users that match User's criteria
    const searchFriends = e => {
        // TODO: Get Users from database that match search and their 
        const search = ["Example1", "Example2", "Example3"]
        console.log(e.target.form[0].value);
        setMode(() => {
            return (
                <>
                    {/* <SearchList search={search} friends={all_friends.map(friend => friend[0])} buttonFunc={addFriend}/>
                    <br />
                    <button onClick={() => setMode(() => viewFriends(all_friends))}>Back</button> */}
                </>
            )
        })
        e.preventDefault();
    }

    // List all of the User's pending invites
    const viewRequests = (req_list) => {
        if (req_list.length > 0) {
            return (<RequestList key={"RequestList"} requests={req_list} acceptFunc={acceptRequest} removeFunc={removeRequest}/>);
        } else {
            return (<></>);
        }
    };
    // Remove a Request from the User's pending invites
    const removeRequest = request => {
        // TODO: Add database logic to remove request from database
        requests = requests.filter(r => r != request);
        // setMode(() => viewFriends());
        // setInvites(() => viewRequests());
    }
    // Add User to the User's friend list and remove them from the User's invites
    const acceptRequest = request => {
        friends.push([request, 1]);
        removeRequest(request);
    }

    const [mode, setMode] = useState(null);
    const [all_friends, setFriends] = useState([]);
    const [invites, setInvites] = useState(null);
    const [posts, setPosts] = useState([]);
    const [recvReqs, setRecvReqs] = useState([]);

    useEffect(() => {
        const retrieveFriends = async () => {
            let friends = await getFriends(auth.currentUser.email);
            console.log("client friends: ", friends);
            // let sent_requests = await getSentRequests(auth.currentUser.email);
            // console.log("client sent_requests: ", sent_requests);
            // let combined_list = confirmed_friends.concat(sent_requests);
            setFriends(() => friends);
            setMode(()=> viewFriends(all_friends));
        };

        const retrieveInvites = async () => {
            let received_reqs = await getRecvRequests(auth.currentUser.email);
            console.log("client received_reqs: ", received_reqs);
            setRecvReqs(() => received_reqs);
            setInvites(()=>viewRequests(recvReqs));
        };
        retrieveFriends();
        retrieveInvites();
    }, []);

    const getFeed = () => {
        // TODO : FIX with database call
        var grouping = new HabitGrouping("ye", "text");
        var grouping3 = new HabitGrouping("ye1", "text");
        var myhabit1 = new Habit("yes", "Daily", "Private");
        const reacts1 = [
        {
            emoji: "like",
            by: "Case",
        },
        {
            emoji: "like",
            by: "Henry",
        }];

        const reacts2 = [
        {
            emoji: "love",
            by: "yimeng",
        },
        {
            emoji: "haha",
            by: "jr",
        },
        ];

        myhabit1.addGroup(grouping);
        myhabit1.addGroup(grouping3);
        setPosts([["yimeng", myhabit1, reacts1], ["sony", myhabit1, reacts2]]);  
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