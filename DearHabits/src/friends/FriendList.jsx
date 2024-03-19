import Slot from '../utility/Slot.jsx'

const FriendList = ({friends, buttonFunc, ...props}) => {
    // List all friends and pending friends
    // Provide the option to remove an accepted friend
    return (
        <>
            {friends.map(friend => {
                return (
                <Slot key={friend[0]} label={friend[0]}>
                    <button onClick={() => buttonFunc(friend[0])} disabled={(friend[1]) ? false : true}>{(friend[1]) ? "Remove" : "Pending"}</button>
                </Slot>)
            })}
        </>
    )
};

export default FriendList