import ListItem from "../ListItem";
import Text from "../Text";
import Button from "../Button";
import Image from "../Image";
import { MouseEvent } from "react";
import { GameData } from "../../../@types/types";
import no_image from "../../assets/no_image.jpg"

import useReady from "../../hooks/useReady";

type Props = {
    list: GameData[];
    onClick: (e: MouseEvent<HTMLButtonElement>, id: string, name: string) => void;
    children: string;
}


const SearchedList = ({list, onClick, children}: Props): JSX.Element => {
    const {readyState} = useReady();

    const items = list.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        return <ListItem key={id}>
            {item.image && <Image state={readyState} url={item.image} urlDefault={no_image} alt={name} />}
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={(e)=>onClick(e, id, name)} children={children}/>
        </ListItem>
    })

    return (
        <ul>{items}</ul>
    )
}

export default SearchedList;