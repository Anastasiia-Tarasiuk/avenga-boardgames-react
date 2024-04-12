import ListItem from "../ListItem"

const List = ({list, onClick}: any) => {
    const items = list.map((item: any) => {
        const id = item._attributes.objectid;
        const name = item.name._text;
        return <ListItem onClick={()=>onClick(id, name)} key={id}>{name}</ListItem>
    })

    return (
        <ul>{items}</ul>
    )
}

export default List;