import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";

const Game = () => {
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

    return (
        <>
            <p>{name}</p>
            <img src={url} alt={name}/>
            <Button onClick={() => onAddButtonClick()} buttonType={"button"} children={"Add game"} disabled={desible}/>
        </>
        
    )
}

export default Game;