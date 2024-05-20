import useReady from "../../hooks/useReady";
import { Stats } from "../../../@types/types";
import ImageContainer from "../ImageContainer";
import Icon from "../Icon";

const StatsItem = ({game, date, best, totalPlays, name, timesWon}: Stats) => {
    const {readyState} = useReady();

    function parseDate(date: string) {
        return new Date(Number(date)).toLocaleDateString('en-GB', {  
            day:   'numeric',
            month: 'short',
            year:  'numeric',
        });
    }

    return (
        <li>
            <ImageContainer url={game.image} alt={game.name} state={readyState}/>
            <p><Icon state="best"/> The best score was {best} ({parseDate(date)})</p>
            <p><Icon state="medal"/> {name} won {timesWon} times</p>
            <p><Icon state="total"/> Played {totalPlays} times</p>
        </li>
    )
}

export default StatsItem;