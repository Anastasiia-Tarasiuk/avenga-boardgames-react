import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import Text from "../../components/Text";
import GameList from "../../components/GameList";
import PageHeading from "../../components/PageHeading";
import { GameData, IStore } from "../../../@types/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGame, setDate } from "../../store/actions";

const MyList = (): JSX.Element => {
    const gameList: GameData[] = useSelector((state: IStore)=> state.games.games);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function onAddScoreButtonClick(e: MouseEvent<HTMLButtonElement>): void {
        const id: string | undefined = e.currentTarget.dataset.id;
        const data: GameData[] = gameList.filter((game: GameData) => game.id === id);
        dispatch(setCurrentGame(data[0]));
        dispatch(setDate(Date.now().toString()));
        navigate(`/score/${id}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="My list"/>
            {gameList.length > 0
                ? <GameList list={gameList} onClick={(e)=>onAddScoreButtonClick(e)} children="Add score"/>
                : <Text children="No items"/>}
        </>
    )
}

export default MyList;