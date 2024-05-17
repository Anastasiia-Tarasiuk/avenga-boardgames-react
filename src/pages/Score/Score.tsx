import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import PlayerSelect from "../../components/PlayerSelect";
import PlayerScore from "../../components/PlayerScore";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ModalOverlay from "../../components/ModalOverlay";
import AddPlayerContent from "../../components/AddPlayerContent";
import { GameData, IStore, PlayerData } from "../../../@types/types";
import { ScoreData } from "../../../@types/types";
import ImageContainer from "../../components/ImageContainer";
import useReady from "../../hooks/useReady";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer, setWinners, updateGames, updatePlayers } from "../../store/actions";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import css from "./Score.module.css";

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

    const debouncedFunc = useRef(
        debounce(async (value: string, player: string) => {
            addScore(value, player);
        }, 500)
    ).current;

    useEffect(() => {
        return () => {
            debouncedFunc.cancel();
        };
    }, [debouncedFunc]);

    function handleSelectClick(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value;

        if (value === "new-player") {
            setShowModal(true);
            e.currentTarget.options[0].selected = true;
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

    function addScore(currentScore: string, player: string) {
        gameList.forEach((game: GameData) => {
            if (game.id === gameId) {
                if (!game.score) {
                    game.score = [];
                }

                const scoreObj: ScoreData = {
                    date,
                    player: player,
                    score: currentScore
                }

                const index = game.score.findIndex((score: ScoreData)=> score.date === date && score.player === player);

                if (index === -1) {
                    game.score.push(scoreObj);
                    toast.success(`The score was added for ${player}`)
                } else {
                    game.score.splice(index, 1, scoreObj);
                    toast.info(`The score was changed for ${player}`)
                }

                saveWinner(date, currentScore, player);
            }
        })

        players.forEach(statePlayer => {
            if (statePlayer.name === player) {
                statePlayer.score = currentScore;
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
            toast.error("Such player already exists");
            return;
        } else {
            toast.success("New player was added");
        }

        setScore("0");
        setCurrentPlayer(newPlayer);
        const newPlayerObj = {"name": newPlayer, "hidden": false, score: 0};
        dispatch(addPlayer(newPlayerObj));
        setShowModal(false);
        setPlayers(prevState => [...prevState, {...newPlayerObj}]);
        setNewPlayer("");
    }

    function onInputClick(name: string) {
        if (currentPlayer !== name) {
            setCurrentPlayer(name);
        }

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

    function setInputValue(e: ChangeEvent<HTMLInputElement>){
        const value = e.currentTarget.value;
        setScore(value);
        debouncedFunc(value, currentPlayer);
    }
    
    return (
        <div className={css["section-container"]}>
            <PageHeading children="Set score"/>
            <div className={css["select-container"]}>
                <ImageContainer url={data.image} alt={data.name} state={readyState}/>
                <div>
                    <PlayerSelect players={players} onChange={(e) => handleSelectClick(e)}/>
                    <PlayerScore onClick={(name: string)=>onInputClick(name)} players={players} currentPlayer={currentPlayer} score={score} onChange={(e: ChangeEvent<HTMLInputElement>)=>setInputValue(e)}/>
                </div>
            </div>
            {showModal && <ModalOverlay close={() => setShowModal(false)} content={<AddPlayerContent value={newPlayer} onChange={(e: ChangeEvent<HTMLInputElement>)=>addPlayerName(e)} onClick={()=>{onSavePlayerButtonClick()}}/>} />}
        </div>
    )
    
}

export default Score;