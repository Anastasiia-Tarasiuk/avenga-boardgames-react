import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import PageHeading from "../../components/PageHeading";
import { GameData, IStore } from "../../../@types/types";
import ImageContainer from "../../components/ImageContainer";
import useReady from "../../hooks/useReady";
import { useDispatch, useSelector } from "react-redux";
import { setDate, addGame } from "../../store/actions";
import Text from "../../components/Text";
import css from "./Game.module.css";

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
        <div className={css["section-container"]}>
            <PageHeading children="Save game to list"/>
            <div className={css["block-container"]}>
                <ImageContainer url={data.image} alt={data.name} state={readyState}/>
                {data.description && <Text children={data.description}/>}
            </div>
            {data.playTime && <Text children={`Play time: ${data.playTime + " min"}`}/>}
            <Button onClick={onAddButtonClick} buttonType="button" children="Add game" disabled={desible}/>
            {desible && <Button onClick={onAddScoreButtonClick} buttonType="button" children="Add score" disabled={false}/>}
        </div>
    )
}

export default Game;