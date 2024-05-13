import ListItem from "../GameItem/GameItem";
import { MouseEvent } from "react";
import { GameData } from "../../../@types/types";
import useReady from "../../hooks/useReady";
import css from "./GameList.module.css";
import Text from "../Text";

type Props = {
    list: GameData[];
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: string;
    isImagesLoaded?: boolean;
    isLoading?: boolean;
}

const GameList = ({list, onClick, children, isImagesLoaded, isLoading}: Props): JSX.Element => {
    const {readyState} = useReady();

    const items = list.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        return <ListItem key={id} state={readyState} url={item.image} name={name} id={id} children={children} item={item} onClick={onClick} isImagesLoaded={isImagesLoaded}/>
    })

    return (
        <ul className={css["game-list"]}>{!isLoading && <>{items.length > 0 ? items : <Text children="Type game name to search"/>}</>}</ul>
    )
}

export default GameList;