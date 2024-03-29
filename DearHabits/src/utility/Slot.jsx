const Slot = ({label, children}) => {
    return (
        <>
            {label}
            <label>
                {children}
            </label>
            <hr />
        </>
    )
};

export default Slot;