import ListItem from "../GameItem/GameItem";
import { MouseEvent } from "react";
import { GameData } from "../../../@types/types";
import useReady from "../../hooks/useReady";

type Props = {
    list: GameData[];
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: string;
    isImagesLoaded?: any;
}

const SearchedList = ({list, onClick, children, isImagesLoaded}: Props): JSX.Element => {
    const {readyState} = useReady();

    const items = list.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        
        return <ListItem key={id} state={readyState} url={item.image} name={name} id={id} children={children} item={item} onClick={onClick} isImagesLoaded={isImagesLoaded}/>
    })

    return (
        <ul>{items}</ul>
    )
}

export default SearchedList;