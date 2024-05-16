import GameItem from "../GameItem/GameItem";
import { MouseEvent } from "react";
import { GameData } from "../../../@types/types";
import useReady from "../../hooks/useReady";
import Text from "../Text";

type Props = {
    list: GameData[];
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: string;
    isImagesLoaded?: boolean;
    isLoading?: boolean;
    className?: string
}

const GameList = ({list, onClick, children, isImagesLoaded, isLoading, className}: Props): JSX.Element => {
    const {readyState} = useReady();

    const items = list.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        return <GameItem key={id} state={readyState} url={item.image} name={name} id={id} children={children} item={item} onClick={onClick} isImagesLoaded={isImagesLoaded}/>
    })

    return (
        <ul className={className}>{!isLoading && <>{items.length > 0 ? items : <Text children="Type game name to search"/>}</>}</ul>
    )
}

export default GameList;