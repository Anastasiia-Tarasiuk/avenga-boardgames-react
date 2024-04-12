const ListItem = ({onClick, children}: any) => {
    return (
        <li onClick={onClick}>{children}</li>
    )

}

export default ListItem;