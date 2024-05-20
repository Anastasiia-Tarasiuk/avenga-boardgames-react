import { PlayerData } from "../../../@types/types";
import PlayerItem from "../PlayerItem";

type Props = {
    onClick: (name: string) => void;
    list: PlayerData[];
    className?: string;
}

const PlayerList = ({onClick, list, className}: Props) => {
    return (
        <ul className={className}>
            {list.map((player: PlayerData)=> {
                const name = player.name;
                const url = "https://picsum.photos/300";
                return <PlayerItem key={name} name={name} url={url} onClick={onClick}/>
            })}
        </ul>
    )
}

export default PlayerList;