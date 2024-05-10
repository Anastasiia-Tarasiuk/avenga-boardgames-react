import { useSelector } from "react-redux";
import { GameData, IStore, ScoreData, Winner } from "../../../@types/types";
// import useReady from "../../hooks/useReady";
import StatsItem from "../StatsItem";


type ScoreObj = {
    [key: string]: ScoreData[];
}

const StatsList = ({games, playerId} :any) => {
    const scoreObj: ScoreObj = {};
    const winners: Winner = useSelector((state: IStore)=> state.players.winners);

    const items = games.map((game: GameData) => {
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

    return <ul>{items}</ul>
}

export default StatsList;