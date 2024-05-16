import { useSelector } from "react-redux";
import { GameData, IStore, ScoreData, ScoreObj, Winner } from "../../../@types/types";
import StatsItem from "../StatsItem";
import { forwardRef } from "react";

type Props = {
    games: GameData[];
    playerId: string | undefined;
}

const StatsList = forwardRef(({games, playerId}: Props, ref: any) => {
    const filtered: any[] = []
    const scoreObj: ScoreObj = {};
    const winners: Winner = useSelector((state: IStore)=> state.players.winners);

    games.forEach((game) => {
        let best: number = 0;

        if (!scoreObj.hasOwnProperty(game.id)) {
            scoreObj[game.id] = [];
        }
        
        if (game.score) {
            game.score.forEach((score: ScoreData) => {
                if (score.player === playerId) {
                    scoreObj[game.id].push(score);

                    if (best <  Number(score.score)) {
                        best =  Number(score.score);
                    }
                }
            }) 
        }

        if (scoreObj[game.id].length > 0) {
            filtered.push({game, best})
        } 
    })

    return (
        <ul ref={ref}>{
            filtered.map(item => {
                return <StatsItem key={item.game.id} game={item.game} best={item.best} winners={winners} scoreObj={scoreObj}/>
            })}
        </ul>
    )
})

export default StatsList;