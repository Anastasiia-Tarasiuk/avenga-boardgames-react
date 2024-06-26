import { MouseEvent } from "react";
import GameList from "../../components/GameList";
import { useNavigate, useOutletContext } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import { GameData } from "../../../@types/types";
import Text from "../../components/Text";
import { setCurrentGame } from "../../store/actions";
import { useDispatch } from "react-redux";
import css from "./SearchGame.module.css";

const SearchGame = () => {
    const [searchGames, isLoading, isImagesLoaded, error] = useOutletContext<any[]>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function gameItemHandleClick(e: MouseEvent<HTMLButtonElement>): void {
        const id: string | undefined = e.currentTarget.dataset.id;
        const data: GameData[] = searchGames.filter((game: GameData) => game.id === id);
        dispatch(setCurrentGame(data[0]));
        navigate(`/game/${id}`, { replace: false });
    }

    return (
        <div className={css["section-container"]}>
            <PageHeading children="Search results"/>
            {isLoading && <Text children="Loading..." />}
            {error 
            ? <Text children={error}/>
            : <GameList className={css.list} onClick={(e) => gameItemHandleClick(e)} list={searchGames} isImagesLoaded={isImagesLoaded} children="See more" isLoading={isLoading}/> }
        </div>
    )
}

export default SearchGame;