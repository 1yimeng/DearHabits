import Slot from '../utility/Slot.jsx'

// FR4. Search Friends, FR5. Send Friends Request
const SearchList = ({search, friends, buttonFunc, ...props}) => {
    // Remove User's who are already friends
    search = search.filter(s => !friends.includes(s));
    // List all User's who meet search criteria and provide the option to send a Friend Request
    return (
        <>
            {search.map(person => {
                return (
                    <Slot key={person} label={person}>
                        {/* Button to add a friend (FR5) */}
                        <button onClick={() => buttonFunc(person)}>Add</button>
                    </Slot>
                )
            })}
        </>
    )
};

export default SearchList