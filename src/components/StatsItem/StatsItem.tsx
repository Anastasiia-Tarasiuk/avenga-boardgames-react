import useReady from "../../hooks/useReady";
import { GameData, ScoreData, ScoreObj, Winner } from "../../../@types/types";
import ImageContainer from "../ImageContainer";
import ScoreList from "../ScoreList";
import ScoreItem from "../ScoreItem";

type Props = {
    game: GameData;
    best: number;
    winners: Winner;
    scoreObj: ScoreObj
}

const StatsItem = ({game, best, winners, scoreObj}: Props) => {
    const {readyState} = useReady();

    return (
        <li>
            <ImageContainer url={game.image} alt={game.name} state={readyState}/>
            <ScoreList children={scoreObj[game.id].map((item: ScoreData) => {
                return <ScoreItem key={item.date} item={item} best={best} winners={winners}/>
            })}/>
        </li>
    )
}

export default StatsItem;