import ListItem from "../ListItem";
import Text from "../Text";
import Button from "../Button";

type Props = {
    list: any[];
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, name: string) => void;
    children: string;
}

const SearchedList = ({list, onClick, children}: Props) => {
    const items = list.map((item: any) => {
        const id = item._attributes.objectid || item.id;
        const name = item.name._text || item.searchName;
        return <ListItem key={id}>
            {item.image?._text && <img src={item.image._text} alt={item.searchName}/>}
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={(e)=>onClick(e, id, name)} children={children}/>
        </ListItem>
    })

    return (
        <ul>{items}</ul>
    )
}

export default SearchedList;