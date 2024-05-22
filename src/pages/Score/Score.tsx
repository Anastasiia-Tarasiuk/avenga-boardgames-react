import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import PlayerSelect from "../../components/PlayerSelect";
import PlayerScore from "../../components/PlayerScore";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ModalOverlay from "../../components/ModalOverlay";
import AddPlayerContent from "../../components/AddPlayerContent";
import { GameData, IStore, PlayerData, Winner } from "../../../@types/types";
import { ScoreData } from "../../../@types/types";
import ImageContainer from "../../components/ImageContainer";
import useReady from "../../hooks/useReady";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer, resetPlayers, setWinners, updateGames, updateScore, updateVisibility } from "../../store/actions";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import css from "./Score.module.css";

const Score = (): JSX.Element => {
    const { gameId } = useParams<{gameId: string}>();
    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [score, setScore] = useState<string>("0");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newPlayer, setNewPlayer] = useState<string>("");
    const {readyState} = useReady();
    const dispatch = useDispatch();

    const players: PlayerData[] = useSelector((store: IStore) => store.players.players);
    const gameData: GameData = useSelector((store: IStore) => store.games.currentGame);
    const gameList: GameData[] = useSelector((store: IStore) => store.games.games);
    const winners: Winner = useSelector((store: IStore) => store.players.winners);
    const date = useSelector((store: IStore) => store.games.date);

    useEffect(() => {
        return () => {dispatch(resetPlayers())};
    }, [dispatch]);

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

    function showPlayer(playerName: string) {
        dispatch(updateVisibility({playerName, hidden: false}))
    }

    function addScore(currentScore: string, playerName: string) {
        const updatedGameList = gameList.map((game: GameData) => {
            if (game.id === gameId) {
                if (!game.score) {
                    game.score = [];
                }

                const scoreObj: ScoreData = {
                    date,
                    player: playerName,
                    score: currentScore
                }

                const index = game.score.findIndex((score: ScoreData)=> score.date === date && score.player === playerName);

                if (index === -1) {
                    game.score.push(scoreObj);
                    toast.success(`The score was added for ${playerName}`)
                } else {
                    game.score.splice(index, 1, scoreObj);
                    toast.info(`The score was changed for ${playerName}`)
                }

                saveWinner(date, currentScore, playerName);
            }
            
            return game;
        })

        dispatch(updateScore({playerName, score: currentScore}));
        dispatch(updateGames(updatedGameList));
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
                <ImageContainer url={gameData.image} alt={gameData.name} state={readyState}/>
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