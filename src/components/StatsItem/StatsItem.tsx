import useReady from "../../hooks/useReady";
import { ScoreData } from "../../../@types/types";
import ImageContainer from "../ImageContainer";
import ScoreList from "../ScoreList";
import ScoreItem from "../ScoreItem";

const StatsItem = ({game, best, winners, scoreObj} :any) => {
    const {readyState} = useReady();
    return (
        <li key={game.id}>
            <ImageContainer url={game.image} alt={game.name} state={readyState}/>
            <ScoreList children={scoreObj[game.id].map((item: ScoreData) => {
                return <ScoreItem item={item} best={best} winners={winners}/>
            })}/>
        </li>
    )
}

export default StatsItem;