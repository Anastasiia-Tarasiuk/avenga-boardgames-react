import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import { GameData, ScoreData } from "../../../@types/types";
import Image from "../../components/Image";
import useReady from "../../hooks/useReady";

type ScoreObj = {
    [key: string]: ScoreData[];
}

type Winner = {
    [key: string]: ScoreData;
}

const Stats = (): JSX.Element => {
    const {playerId} = useParams<{playerId: string}>();
    const {readyState} = useReady();

    const winners: Winner = JSON.parse(localStorage.getItem("winners") || "{}");
    const games: GameData[] = JSON.parse(localStorage.getItem("gameList") || '[]');
    const scoreObj: ScoreObj = {};
    const items: JSX.Element[] = [];

    games.forEach((game: GameData) => {
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
            items.push(
                <li key={game.id}>
                    <Text children={game.name}/>
                    <Image url={game.image} alt={game.name} state={readyState}/>
                    <ul>{scoreObj[game.id].map((item: ScoreData) => {
                        return <li key={item.date}>
                            <p>{parseDate(item.date)} <span>{item.score}</span> {best === Number(item.score) &&  <span>Best score</span>} {winners[item.date]?.player === item.player && <span>The winner</span> }</p>
                        </li>
                    })}</ul>
                </li>
            )
        }
    })
    
    function parseDate(date: string) {
        return new Date(Number(date)).toLocaleDateString('en-GB', {  
            day:   'numeric',
            month: 'short',
            year:  'numeric',
        });
    }

    return (
        <>
        <PageHeading children={`Game stats of ${playerId}`}/>
        {items.length > 0 
            ? <ul>{items}</ul>
            : <Text children="No played games yet"/>}
        </>
    )
}

export default Stats;