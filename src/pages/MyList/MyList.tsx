import { useNavigate } from "react-router-dom";
import { MouseEvent, useState } from "react";
import Text from "../../components/Text";
import SearchedList from "../../components/GameList";
import PageHeading from "../../components/PageHeading";
import { GameData } from "../../../@types/types";

const MyList = (): JSX.Element => {
    const gameList: GameData[] = JSON.parse(localStorage.getItem("gameList") || '[]');
    const navigate = useNavigate();
    
    function onAddScoreButtonClick(e: MouseEvent<HTMLButtonElement>): void {
        const id: string | undefined = e.currentTarget.dataset.id;
        const data: GameData[] = gameList.filter((game: GameData) => game.id === id);
        localStorage.setItem("gameData", JSON.stringify(data[0]));
        localStorage.setItem("date", JSON.stringify(Date.now()));
        navigate(`/score/${id}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="My list"/>
            {gameList.length > 0
                ? <SearchedList list={gameList} onClick={(e)=>onAddScoreButtonClick(e)} children="Add score"/>
                : <Text children="No items"/>}
        </>
    )
}

export default MyList;