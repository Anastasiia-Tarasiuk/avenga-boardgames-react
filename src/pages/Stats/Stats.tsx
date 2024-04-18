import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";

const Stats = () => {
    const { playerId } = useParams();

    const games = JSON.parse(localStorage.getItem("gameList") || '[]');
    const scoreObj: any = {};

    const items = games.map((game: any) => {
        let best = 0;

        if (!scoreObj.hasOwnProperty(game.id)) {
            scoreObj[game.id] = [];
        }
       
        if (game.score) {
            game.score.forEach((score: any) => {
                if (score.player === playerId) {
                    scoreObj[game.id].push(score);

                    if (best <  Number(score.score)) {
                        best =  Number(score.score);
                    }
                }
            })
        }

        return scoreObj[game.id].length >0 && <li key={game.id}>
            <Text children={game.searchName}/>
            <img src={game.image._text} alt={game.searchName}/>
            <ul>{scoreObj[game.id].map((item: any) => {
                return <li key={item.date}>
                    <p>{ parseDate(item.date)} <span>{item.score}</span> <span>{best === Number(item.score) ? "best" : ""}</span></p>
                </li>
            })}</ul>
        </li>
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