import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import PageHeading from "../../components/PageHeading";

const Game = () => {
    const navigate = useNavigate();
    const gameList = JSON.parse(localStorage.getItem("gameList") || '[]');
    
    const { gameId } = useParams();

    const [desible, setDesible] = useState(gameList.some((item: any) => item.id === gameId));

    const data = JSON.parse(localStorage.getItem("gameData") || '{}');

    function onAddButtonClick() {
        gameList.push(data)
        localStorage.setItem("gameList", JSON.stringify(gameList));
        setDesible(true);
    }

    function onAddScoreButtonClick() {
        localStorage.setItem("gameData", JSON.stringify(data));
        localStorage.setItem("date", JSON.stringify(Date.now()));
        navigate(`/score/${gameId}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="Save game to list"/>
            <p>{data.name}</p>
            <img src={data.image} alt={data.name}/>
            <Button onClick={() => onAddButtonClick()} buttonType="button" children="Add game" disabled={desible}/>
            {desible && <Button onClick={() => onAddScoreButtonClick()} buttonType="button" children="Add score" disabled={false}/>}
        </>
        
    )
}

export default Game;