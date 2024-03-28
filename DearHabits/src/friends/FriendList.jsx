import Slot from '../utility/Slot.jsx'

const FriendList = ({friends, buttonFunc, ...props}) => {
    // List all friends and pending friends
    // Provide the option to remove an accepted friend
    // const hasFriends = friends.len() > 0;
    console.log("friends: ", friends);
    return (
        <>
        {friends.map(friend => {
            console.log("friend: ", friend)
            console.log("friend[0]: ", friend.at(0));
            console.log("friend[1]: ", friend.at(1));
                    return (
                    <Slot key={friend[0]} label={friend[0]}>
                        <button onClick={() => buttonFunc(friend[0])} disabled={(friend[1]) ? false : true}>{(friend[1]) ? "Remove" : "Pending"}</button>
                    </Slot>)
        })}
            {/* {hasFriends ? 
                friends.map(friend => {
                    return (
                    <Slot key={friend[0]} label={friend[0]}>
                        <button onClick={() => buttonFunc(friend[0])} disabled={(friend[1]) ? false : true}>{(friend[1]) ? "Remove" : "Pending"}</button>
                    </Slot>)
                })
            : <Slot></Slot>
            } */}
        </>
    )
};

export default FriendList