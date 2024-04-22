import ListItem from "../ListItem";
import Text from "../Text";
import Button from "../Button";
import { MouseEvent } from "react";
import { GameData } from "../../../@types/types";

type Props = {
    list: GameData[];
    onClick: (e: MouseEvent<HTMLButtonElement>, id: string, name: string) => void;
    children: string;
}

const SearchedList = ({list, onClick, children}: Props): JSX.Element => {
    const items = list.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
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