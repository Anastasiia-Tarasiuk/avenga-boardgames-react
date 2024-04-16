import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import PlayerSelect from "../../components/PlayerSelect";
import PlayerScore from "../../components/PlayerScore";
import { ChangeEvent, useState } from "react";

type Player = {
    name: string;
    hidden: boolean;
};

type ScoreObj = {
    date: string | null;
    player: string | null;
    score: string;
};


const Score = () => {
    const { gameId } = useParams();
    const [players, setPlayers] = useState<Player[]>(JSON.parse(localStorage.getItem("players") ||  '[{"name": "You", "hidden": "true"}]'));
    const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
    const [score, setScore ] = useState<string>("0");

    const data: { image: { _text: string }; searchName: string } = JSON.parse(localStorage.getItem("gameData") || '{}');

    const url: string = data.image._text;
    const name: string = data.searchName;

    const gameList = JSON.parse(localStorage.getItem("gameList") || '[]');

    function handleSelectClick(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value;

        if (value === "new-player") {
            console.log("new-player");
        } else {
            if (value !== ""){
                setCurrentPlayer(value);
                showPlayer(value);
            }
        }
    }

    function showPlayer(value: string) {
        const newPlayers = players.map((player: any) => {
            if (player.name.toLowerCase() === value.toLowerCase()) {
                player.hidden = false;
            }
            return player;
        })
        setPlayers(newPlayers);
    }

    function addScore(e: ChangeEvent<HTMLSelectElement>) {
        setScore(e.currentTarget.value);

            gameList.forEach((game: any) => {
                if (game.id === gameId) {
                    if (!game.score) {
                        game.score = [];
                    }

                    const scoreObj: ScoreObj = {
                        date: localStorage.getItem("date"),
                        player: currentPlayer,
                        score: e.currentTarget.value
                    }

                    const index = game.score.findIndex((score: any)=> score.date === localStorage.getItem("date") && score.player === currentPlayer);

                    if (index === -1) {
                        game.score.push(scoreObj);
                    } else {
                        game.score.splice(index, 1, scoreObj)
                    }
                }
            })
            localStorage.setItem("gameList", JSON.stringify(gameList));
    }

    
    return (
        <>
            <PageHeading children="Set score"/>
            <div>
                <Text children={name}/>
                <img src={url} alt={name}/>
            </div>
            <PlayerSelect onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectClick(e)}/>
            <PlayerScore players={players} score={score} onChange={(e: ChangeEvent<HTMLSelectElement>)=>addScore(e)}/>
        </>
    )
    
}

export default Score;