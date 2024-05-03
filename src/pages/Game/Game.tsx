import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import PageHeading from "../../components/PageHeading";
import { GameData, IStore } from "../../../@types/types";
import Image from "../../components/Image";
import useReady from "../../hooks/useReady";
import { useDispatch, useSelector } from "react-redux";
import { setDate, addGame } from "../../store/actions";

const Game = (): JSX.Element => {
    const {readyState} = useReady();
    const navigate = useNavigate();
    const gameList: GameData[] = useSelector((state: IStore)=> state.games.games);
    const data: GameData = useSelector((state: IStore)=> state.games.currentGame);
    const { gameId } = useParams<{gameId: string}>();
    const [desible, setDesible] = useState<boolean>(gameList.some((item: GameData) => item.id === gameId));
    const dispatch = useDispatch();
    
    function onAddButtonClick(): void {
        dispatch(addGame(data));
        setDesible(true);
    }

    function onAddScoreButtonClick(): void {
        dispatch(setDate(Date.now().toString()));
        navigate(`/score/${gameId}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="Save game to list"/>
            <p>{data.name}</p>
            <Image url={data.image} alt={data.name} state={readyState}/>
            <Button onClick={onAddButtonClick} buttonType="button" children="Add game" disabled={desible}/>
            {desible && <Button onClick={onAddScoreButtonClick} buttonType="button" children="Add score" disabled={false}/>}
        </>
        
    )
}

export default Game;