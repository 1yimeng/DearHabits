const Slot = ({label, children}) => {
    return (
        <>
            {label}
            <label>
                {children}
            </label>
            {label}
            <hr />
        </>
    )
};

export default Slot;