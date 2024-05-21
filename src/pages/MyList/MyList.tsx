import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import Text from "../../components/Text";
import GameList from "../../components/GameList";
import PageHeading from "../../components/PageHeading";
import { GameData, IStore } from "../../../@types/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGame, setDate, setHottest } from "../../store/actions";
import fetchAPI from "../../utils/gameFetch";
import SliderList from "../../components/SliderList";
import css from "./MyList.module.css";

const MyList = (): JSX.Element => {
    const url: string = "https://www.boardgamegeek.com/xmlapi2/hot?boardgame";
    const gameList: GameData[] = useSelector((state: IStore)=> state.games.games);
    const hottest = useSelector((state: IStore) => state.hottest.hottest);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onAddScoreButtonClick(e: MouseEvent<HTMLButtonElement>): void {
        const id: string | undefined = e.currentTarget.dataset.id;
        const data: GameData[] = gameList.filter((game: GameData) => game.id === id);
        dispatch(setCurrentGame(data[0]));
        dispatch(setDate(Date.now().toString()));
        navigate(`/score/${id}`, { replace: false });
    }

    if (hottest.length === 0) {
        fetchAPI(url).then((data: any) => {
            dispatch(setHottest(data));
        })
    }

    function seeHottestGame(id: string, item: any) {
        const game: GameData = {
            id: item._attributes.id,
            image:  item.thumbnail._attributes.value,
            name: item.name._attributes.value,
            description: "",
            playTime: "",
            isFavourite: false,
        };

        dispatch(setCurrentGame(game));
        navigate(`/game/${id}`, { replace: false });
    }

    return (
        <>
            <div className={`${css["section-container"] + " " + css["slider-section-container"]}`}>
                <SliderList className={css.slider} list={hottest} onClick={(id: string, item: any)=>seeHottestGame(id, item)}/> 
            </div>
            <div className={css["section-container"]}>
                <PageHeading children="My list"/>
                {gameList.length > 0
                    ? <GameList className={css.list} list={gameList} onClick={(e)=>onAddScoreButtonClick(e)} children="Add score"/>
                    : <Text children="No items"/>}
            </div>
        </>
    )
}

export default MyList;