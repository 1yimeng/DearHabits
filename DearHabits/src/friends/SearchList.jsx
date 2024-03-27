import Slot from '../utility/Slot.jsx'

const SearchList = ({search, friends, buttonFunc, ...props}) => {
    // Remove User's who are already friends
    search = search.filter(s => !friends.includes(s));
    // List all User's who meet search criteria and provide the option to send a Friend Request
    return (
        <>
            {search.map(person => {
                return (
                    <Slot key={person} label={person}>
                        <button onClick={() => buttonFunc(person)}>Add</button>
                    </Slot>
                )
            })}
        </>
    )
};

export default SearchList