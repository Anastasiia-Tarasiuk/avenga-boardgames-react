import ListItem from "../ListItem";
import Text from "../Text";
import Button from "../Button";

const SearchedList = ({list, onClick, children}: any) => {
    const items = list.map((item: any) => {
        const id = item._attributes.objectid || item.id;
        const name = item.name._text || item.searchName;
        return <ListItem  key={id}><Text children={name}/><Button id={id} buttonType="button" onClick={(e)=>onClick(e, id, name)} children={children}/>
        </ListItem>
    })

    return (
        <ul>{items}</ul>
    )
}

export default SearchedList;