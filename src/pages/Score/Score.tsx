import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import PlayerSelect from "../../components/PlayerSelect";
import PlayerScore from "../../components/PlayerScore";
import { ChangeEvent, useEffect, useState } from "react";
import ModalOverlay from "../../components/ModalOverlay";
import AddPlayerContent from "../../components/AddPlayerContent";
import { GameData, IStore, PlayerData } from "../../../@types/types";
import { ScoreData } from "../../../@types/types";
import ImageContainer from "../../components/ImageContainer";
import useReady from "../../hooks/useReady";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer, setWinners, updateGames, updatePlayers } from "../../store/actions";

const Score = (): JSX.Element => {
    const { gameId } = useParams<{gameId: string}>();
    const [players, setPlayers] = useState<PlayerData[]>(useSelector((store: IStore) => store.players.players));
    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [score, setScore] = useState<string>("0");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newPlayer, setNewPlayer] = useState<string>("");
    const {readyState} = useReady();
    const dispatch = useDispatch();

    const data = useSelector((store: IStore) => store.games.currentGame);
    const gameList = useSelector((store: IStore) => store.games.games);
    const winners = useSelector((store: IStore) => store.players.winners);
    const date = useSelector((store: IStore) => store.games.date);

    useEffect(() => {
        return () => {
            if (!document.URL.includes("score")) {
                const updatedPlayers = players.map((player: PlayerData) => {
                    player.hidden = true;
                    player.score = 0;
                    return player;
                })
    
                dispatch(updatePlayers(updatedPlayers));
            }
        };
    }, [dispatch, players]);

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
        const newPlayers = players.map((player: PlayerData) => {

            if (player.name.toLowerCase() === value.toLowerCase()) {
                player.hidden = false;
            }

            return player;
        })
        setPlayers(newPlayers);
    }

    function addScore(e: ChangeEvent<HTMLInputElement>) {
        const currentScore = e.currentTarget.value;
        setScore(currentScore);

        gameList.forEach((game: GameData) => {
            if (game.id === gameId) {
                if (!game.score) {
                    game.score = [];
                }

                const scoreObj: ScoreData = {
                    date,
                    player: currentPlayer,
                    score: currentScore
                }

                const index = game.score.findIndex((score: ScoreData)=> score.date === date && score.player === currentPlayer);

                if (index === -1) {
                    game.score.push(scoreObj);
                } else {
                    game.score.splice(index, 1, scoreObj)
                }

                saveWinner(date, currentScore, currentPlayer);
            }
        })

        players.forEach(player => {
            if (player.name === currentPlayer) {
                player.score = currentScore;
            }
        })

        dispatch(updateGames(gameList));
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
        dispatch(addPlayer(newPlayerObj))
        setShowModal(false);
        setPlayers(prevState => [...prevState, {...newPlayerObj}]);
        setNewPlayer("");
    }

    function onInputClick(name: string) {
        setCurrentPlayer(name);
        setScore("");
    }

    function saveWinner(date: string, score: string, player: string) {
        if (!winners.hasOwnProperty(date)) {
            winners[date] = {date, score, player};
        } else {
            if (Number(winners[date].score) < Number(score)) {
                winners[date].score = score;
                winners[date].player = player;
            } 
        }
        dispatch(setWinners(winners));
    }
    
    return (
        <>
            <PageHeading children="Set score"/>
            <ImageContainer className="static-image" url={data.image} alt={data.name} state={readyState}/>
            <PlayerSelect players={players} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectClick(e)}/>
            <PlayerScore onClick={(name: string)=>onInputClick(name)} players={players} currentPlayer={currentPlayer} score={score} onChange={(e: ChangeEvent<HTMLInputElement>)=>addScore(e)}/>
            {showModal && <ModalOverlay close={() => setShowModal(false)} content={<AddPlayerContent value={newPlayer} onChange={(e: ChangeEvent<HTMLInputElement>)=>addPlayerName(e)} onClick={()=>{onSavePlayerButtonClick()}}/>} />}
        </>
    )
    
}

export default Score;