import ListItem from "../ListItem";
import Text from "../Text";
import Button from "../Button";

type Game = {
    id: string;
    image?: string;
    name: string;
}

type Props = {
    list: Game[];
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, name: string) => void;
    children: string;
}

const SearchedList = ({list, onClick, children}: Props) => {
    const items = list.map((item: any) => {
        const id = item.id || item._attributes.objectid;
        const name = item.name._text || item.name;
        return <ListItem key={id}>
            {item.image && <img src={item.image} alt={name}/>}
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={(e)=>onClick(e, id, name)} children={children}/>
        </ListItem>
    })

    return (
        <ul>{items}</ul>
    )
}

export default SearchedList;