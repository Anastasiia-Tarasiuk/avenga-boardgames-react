import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";

const Game = () => {

    const navigate = useNavigate();
    const gameList = JSON.parse(localStorage.getItem("gameList") || '[]');

    const { gameId } = useParams();

    const [desible, setDesible] = useState(gameList.some((item: any) => item.id === gameId));

    const data = JSON.parse(localStorage.getItem("gameData") || '{}');
    
    const url = data.image._text;
    const name = data.searchName;

    function onAddButtonClick() {
        gameList.push(data)
        localStorage.setItem("gameList", JSON.stringify(gameList));
        setDesible(true);
    }

    function onAddScoreButtonClick() {
        navigate(`/score/${gameId}`, { replace: false });
    }

    return (
        <>
            <p>{name}</p>
            <img src={url} alt={name}/>
            <Button onClick={() => onAddButtonClick()} buttonType={"button"} children={"Add game"} disabled={desible}/>
            {desible && <Button onClick={() => onAddScoreButtonClick()} buttonType={"button"} children="Add score" disabled={false}/>}
        </>
        
    )
}

export default Game;