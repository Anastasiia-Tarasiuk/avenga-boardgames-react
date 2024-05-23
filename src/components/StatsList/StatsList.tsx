import { useSelector } from "react-redux";
import { GameData, IStore, ScoreData, ScoreObj, Stats, Winner } from "../../../@types/types";
import StatsItem from "../StatsItem";
import { forwardRef } from "react";

type Props = {
    games: GameData[];
    playerId: string | undefined;
    className: string;
}

const StatsList = forwardRef(({games, playerId, className}: Props, ref: any) => {
    const filtered: Stats[] = []
    const scoreObj: ScoreObj = {};
    const winners: Winner = useSelector((state: IStore)=> state.players.winners);

    games.forEach((game) => {
        let best: number = 0;
        let date: string = '';
        let totalPlays: number = 0;
        let timesWon: number = 0;

        if (!scoreObj.hasOwnProperty(game.id)) {
            scoreObj[game.id] = [];
        }
        
        if (game.score) {
            game.score.forEach((score: ScoreData) => {
                if (score.player === playerId) {
                    totalPlays ++;
                    scoreObj[game.id].push(score);

                    if (best <  Number(score.score)) {
                        best =  Number(score.score);
                        date = score.date; 
                    }

                    console.log(winners[score.date])
                    if (winners[score.date].player === playerId) {
                        timesWon ++;
                    }

                }

            }) 
        }

        if (scoreObj[game.id].length > 0) {
            filtered.push({game, best, date, totalPlays, timesWon})
        } 
    })

    return (
        <ul className={className} ref={ref}>{
            filtered.map(item => {
                return <StatsItem timesWon={item.timesWon} name={playerId} key={item.game.id} game={item.game} totalPlays={item.totalPlays} best={item.best} date={item.date}/>
            })}
        </ul>
    )
})

export default StatsList;