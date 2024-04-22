import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import PlayerSelect from "../../components/PlayerSelect";
import PlayerScore from "../../components/PlayerScore";
import { ChangeEvent, useEffect, useState } from "react";
import ModalOverlay from "../../components/ModalOverlay";
import AddPlayerContent from "../../components/AddPlayerContent";

type Player = {
    name: string;
    score: any;
    hidden: boolean;
};

type ScoreObj = {
    date: string | null;
    player: string | null;
    score: string;
};

const Score = () => {
    const initialPlayer = '[{"name": "You", "hidden": "true", "score": "0"}]';
    const { gameId } = useParams();
    const [players, setPlayers] = useState<Player[]>(JSON.parse(localStorage.getItem("players") || initialPlayer));
    const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
    const [score, setScore] = useState<string>("0");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newPlayer, setNewPlayer] = useState<string>("");

    useEffect(() => {
        return () => {
            const playersFromStorage = JSON.parse(localStorage.getItem("players") || initialPlayer);
            localStorage.setItem("players", JSON.stringify(playersFromStorage.map((player: any) => {
                player.hidden = true;
                player.score = "0";
                return player;
            })))
        };
    }, []);

    const data: { image:  string ; name: string, id: string } = JSON.parse(localStorage.getItem("gameData") || '{}');

    const gameList = JSON.parse(localStorage.getItem("gameList") || '[]');

    function handleSelectClick(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value;

        if (value === "new-player") {
            setShowModal(true);
        } else {
            if (value !== ""){
                setCurrentPlayer(value);
                showPlayer(value);
                setScore("0");
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

    function addScore(e: ChangeEvent<HTMLInputElement>) {
        setScore(e.currentTarget.value);
        const date = localStorage.getItem("date") || Date.now().toString();

            gameList.forEach((game: any) => {
                if (game.id === gameId) {
                    if (!game.score) {
                        game.score = [];
                    }

                    if (!game.score[date]) {
                        game.score[date] = [];
                    }

                    const scoreObj: ScoreObj = {
                        date,
                        player: currentPlayer,
                        score: e.currentTarget.value
                    }

                    const index = game.score.findIndex((score: any)=> score.date === date && score.player === currentPlayer);

                    if (index === -1) {
                        game.score.push(scoreObj);
                    } else {
                        game.score.splice(index, 1, scoreObj)
                    }

                    saveWinner(date, Number(e.currentTarget.value), currentPlayer);
                }
            })

            players.forEach(player => {
                if (player.name === currentPlayer) {
                    player.score = e.currentTarget.value;
                }
            })

            localStorage.setItem("gameList", JSON.stringify(gameList));
    }

    function addPlayerName(e: ChangeEvent<HTMLInputElement>) {
        setNewPlayer(e.currentTarget.value);
    }

    function onSavePlayerButtonClick() {
        const index = players.findIndex(player => player.name.toLowerCase() === newPlayer.toLowerCase())

        if (index !== -1) {
            // handle case
            return;
        }

        setScore("0");
        setCurrentPlayer(newPlayer);
        const newPlayerObj = {"name": newPlayer, "hidden": false, score: 0};
        setShowModal(false);
        setPlayers(prevState => [...prevState, {...newPlayerObj}]);
        setNewPlayer("");
    }

    function onInputClick(name: string) {
        setCurrentPlayer(name);
        setScore("");
    }

    function saveWinner(date: string, score: number, player: any) {
        const winners = JSON.parse(localStorage.getItem("winners") || "{}");

        if (!winners.hasOwnProperty(date)) {
            winners[date] = {date, score, player};
        } else {
            if (winners[date].score < score) {
                winners[date].score = score;
                winners[date].player = player;
            } 
        }
        localStorage.setItem("winners", JSON.stringify(winners));
    }
    
    return (
        <>
            <PageHeading children="Set score"/>
            <div>
                <Text children={data.name}/>
                <img src={data.image} alt={data.name}/>
            </div>
            <PlayerSelect players={players} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectClick(e)}/>
            <PlayerScore onClick={(name: string)=>onInputClick(name)} players={players} currentPlayer={currentPlayer} score={score} onChange={(e: ChangeEvent<HTMLInputElement>)=>addScore(e)}/>
            {showModal && <ModalOverlay close={() => setShowModal(false)} content={<AddPlayerContent value={newPlayer} onChange={(e: ChangeEvent<HTMLInputElement>)=>addPlayerName(e)} onClick={()=>{onSavePlayerButtonClick()}}/>} />}
        </>
    )
    
}

export default Score;