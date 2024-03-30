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

const getPosts = async (users) => {
    const posts = [];
    console.log("getPosts users: ", users);
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
    console.log("posts: ", posts);

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
                        g.values = [id[3].split("T")[0], json[id[3].split("T")[0]]];
                    })
                }
            });
            console.log(habit);
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
    console.log("post get friends: ", friends);
    
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
    console.log("getAllFriendsAndPending results: ", results);
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
    console.log("getRecvRequests received: ", received);
    return received;
};

const FriendPage = (props) => {
    const [all_friends, setFriends] = useState([]);
    const [posts, setPosts] = useState([]);
    const [recvReqs, setRecvReqs] = useState([]);
    const [post_users, setPostUsers] = useState([auth.currentUser.email]);
    const [mode, setMode] = useState(null);
    const [invites, setInvites] = useState(null);

    // Show the User's friends
    const viewFriends = (friends) => {
        // if (all_friends.length > 0) {
            console.log("viewFriends : ", friends);
            return (<FriendList key={"FriendList"} friends={friends} buttonFunc={removeFriend}/>);
        // } else {
        //     return (<></>);
        // }
    };

    // Remove a User from the User's friend list
    const removeFriend = async friend => {
        // TODO: Remove friend from friend list in the database
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
        // friends = friends.filter(cur => cur[0] != friend);
        // setMode(() => viewFriends());
    };

    // Add a User to the User's friend list as a pending friend
    const addFriend = async friend => {
        // TODO: Add friend to database as pending
        // TODO: Notify friend about request
        await axios.post(`http://localhost:5001/api/friends/requests/${auth.currentUser.email}/${friend}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setFriends(oldFriends => {
            const newFriends = [...oldFriends];
            newFriends.push([friend, 0]);
            return newFriends;
        });
        // friends.push([friend, 0]);
        setMode(() => viewFriends(all_friends));
    };

    // List all Users that match User's criteria
    const searchFriends = e => {
        // TODO: Get Users from database that match search and their 
        const search = ["Example1", "Example2", "Example3"]
        console.log(e.target.form[0].value);
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

    // List all of the User's pending invites
    const viewRequests = (requests) => { return (<RequestList key={"RequestList"} requests={requests} acceptFunc={acceptRequest} removeFunc={removeRequest}/>);
        // if (recvReqs.length > 0) {
        //     return (<RequestList key={"RequestList"} requests={recvReqs} acceptFunc={acceptRequest} removeFunc={removeRequest}/>);
        // } else {
        //     return (<></>);
        // }
    };
    // Remove a Request from the User's pending invites
    const removeRequest = async request => {
        // TODO: Add database logic to remove request from database
        await axios.delete(`http://localhost:5001/api/friends/requests/${request}/${auth.currentUser.email}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setRecvReqs(oldReqs => {
            const newReqs = [...oldReqs];
            newReqs.filter(r => r != request);
            return newReqs;
        });

        setInvites(() => viewRequests(recvReqs));
        // requests = requests.filter(r => r != request);
        // setMode(() => viewFriends());
        // setInvites(() => viewRequests());
    };

    // Add User to the User's friend list and remove them from the User's invites
    const acceptRequest = async request => {
        // delete request relationship
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
            // const confirmedFriends = all_friends.filter(f =>  f[1] == 1);
            // return newPostUsers.concat(confirmedFriends);
            return newPostUsers;
        });

        setMode(() => viewFriends(all_friends));
        setPosts(() => getPosts(post_users));
        // friends.push([request, 1]);
        // removeRequest(request);
    }

    // useEffect(() => {
    //     const retrieveFriends = async () => {
    //         let friends = await getFriendsAndPending(auth.currentUser.email);
    //         console.log("client friends: ", friends);
    //         setFriends(() => friends);
    //         setMode(()=> viewFriends(friends));
    //     };
    //     retrieveFriends();
    // }, []);

    // useEffect(() => {
    //     const retrieveInvites = async () => {
    //         let received_reqs = await getRecvRequests(auth.currentUser.email);
    //         console.log("client received_reqs: ", received_reqs);
    //         setRecvReqs(() => received_reqs);
    //         setInvites(()=>viewRequests(received_reqs));
    //     };
    //     retrieveInvites();
    // }, []);

    const getFeed = async () => {
        // ["test@gmail.com", "testemail@gmail.com"]
        const response = await getPosts(post_users);
        setPosts(response);  
    };

    useEffect(() => {
        const retrieve = async () => {
            let friends = await getFriendsAndPending(auth.currentUser.email);
            setFriends(() => friends);
            setMode(()=> viewFriends(friends));

            const posters = [auth.currentUser.email];
            friends.forEach(friend => (friend[1] === 1) ? posters.push(friend[0]) : null);
            setPostUsers(() => posters);

            let received_reqs = await getRecvRequests(auth.currentUser.email);
            setRecvReqs(() => received_reqs);
            setInvites(()=>viewRequests(received_reqs));

            console.log(friends);
            let response = await getPosts(posters);
            setPosts(() => response);
        }
        retrieve();
    }, []);

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