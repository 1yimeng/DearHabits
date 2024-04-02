import Slot from '../utility/Slot.jsx'

// FR6. Decide Friends Request
const RequestList = ({requests, acceptFunc, removeFunc, ...props}) => {
    // List all pending invites that the User has
    // Provide the option to either Accept the invite or Remove the invite
    return (
        <>
            {requests.map(request => {
                return (
                <Slot key={request} label={request}>
                    {/* Buttons to either accept or remove a friend request (FR6) */}
                    <button onClick={() => acceptFunc(request)}>Accept</button>
                    <button onClick={() => removeFunc(request)}>Remove</button>
                </Slot>)
            })}
        </>
    )
};

export default RequestList;