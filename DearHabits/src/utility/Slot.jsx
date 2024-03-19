const Slot = ({label, children}) => {
    return (
        <>
            <label>
                {children}
            </label>
            {label}
            <hr />
        </>
    )
};

export default Slot;