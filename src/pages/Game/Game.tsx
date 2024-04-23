import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import PageHeading from "../../components/PageHeading";
import { GameData } from "../../../@types/types";
import Image from "../../components/Image";
import useReady from "../../hooks/useReady";
import no_image from "../../assets/no_image.jpg";


const Game = (): JSX.Element => {
    const {readyState} = useReady();
    
    const navigate = useNavigate();
    const gameList: GameData[] = JSON.parse(localStorage.getItem("gameList") || '[]');
    
    const { gameId } = useParams<{gameId: string}>();

    const [desible, setDesible] = useState<boolean>(gameList.some((item: GameData) => item.id === gameId));

    const data: GameData = JSON.parse(localStorage.getItem("gameData") || '{}');

    function onAddButtonClick(): void {
        gameList.push(data)
        localStorage.setItem("gameList", JSON.stringify(gameList));
        setDesible(true);
    }

    function onAddScoreButtonClick(): void {
        localStorage.setItem("gameData", JSON.stringify(data));
        localStorage.setItem("date", JSON.stringify(Date.now()));
        navigate(`/score/${gameId}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="Save game to list"/>
            <p>{data.name}</p>
            <Image url={data.image} alt={data.name} urlDefault={no_image} state={readyState}/>
            <Button onClick={onAddButtonClick} buttonType="button" children="Add game" disabled={desible}/>
            {desible && <Button onClick={onAddScoreButtonClick} buttonType="button" children="Add score" disabled={false}/>}
        </>
        
    )
}

export default Game;