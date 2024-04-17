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
                if (!player.hidden) {
                    player.hidden = true;
                }
                return player;
            })))
        };
    }, []);

    const data: { image: { _text: string }; searchName: string } = JSON.parse(localStorage.getItem("gameData") || '{}');

    const url: string = data.image._text;
    const name: string = data.searchName;

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

            players.forEach(player => {
                if (player.name === currentPlayer) {
                    player.score = e.currentTarget.value;
                }
            })

            localStorage.setItem("gameList", JSON.stringify(gameList));
    }

    function addPlayerName(e: ChangeEvent<HTMLSelectElement>) {
        setNewPlayer(e.currentTarget.value);
    }

    function onSavePlayerButtonClick() {
        setCurrentPlayer(newPlayer);
        const newPlayerObj = {"name": newPlayer, "hidden": false, score: 0};
        setShowModal(false);
        setPlayers(prevState => [...prevState, {...newPlayerObj}]);
        setNewPlayer("");
    }

    function onInputClick(name: any) {
        setCurrentPlayer(name);
        setScore("");
    }
    
    return (
        <>
            <PageHeading children="Set score"/>
            <div>
                <Text children={name}/>
                <img src={url} alt={name}/>
            </div>
            <PlayerSelect players={players} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectClick(e)}/>
            <PlayerScore onClick={(name:any)=>onInputClick(name)} players={players} currentPlayer={currentPlayer} score={score} onChange={(e: ChangeEvent<HTMLSelectElement>)=>addScore(e)}/>
            {showModal && <ModalOverlay close={() => setShowModal(false)} content={<AddPlayerContent value={newPlayer} onChange={(e: ChangeEvent<HTMLSelectElement>)=>addPlayerName(e)} onClick={()=>{onSavePlayerButtonClick()}}/>} />}
        </>
    )
    
}

export default Score;