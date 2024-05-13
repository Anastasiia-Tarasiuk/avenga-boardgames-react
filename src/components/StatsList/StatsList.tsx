import { useSelector } from "react-redux";
import { GameData, IStore, ScoreData, ScoreObj, Winner } from "../../../@types/types";
import StatsItem from "../StatsItem";
import { forwardRef } from "react";

type Props = {
    games: GameData[];
    playerId: string | undefined;
}

const StatsList = forwardRef(({games, playerId}: Props, ref: any) => {
   
    const scoreObj: ScoreObj = {};
    const winners: Winner = useSelector((state: IStore)=> state.players.winners);

    const items = games.map((game) => {
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
            return <StatsItem key={game.id} game={game} best={best} winners={winners} scoreObj={scoreObj}/>
        } else {
            return <></>
        }
    })

    return <ul ref={ref}>{items}</ul>
})

export default StatsList;