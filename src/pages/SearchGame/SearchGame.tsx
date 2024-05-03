import { ChangeEvent, SyntheticEvent, useState } from "react";
import { MouseEvent } from "react";
import fetchAPI from "../../utils/gameFetch";
import Filter from "../../components/Filter";
import SearchedList from "../../components/GameList";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import { GameData } from "../../../@types/types";
import Text from "../../components/Text";
import no_image from "../../assets/no_image.jpg";
import { useDispatch } from "react-redux";
import { setCurrentGame } from "../../store/actions";

const SearchGame = () => {
    const [value, setValue] = useState<string>("");
    const [games, setGames] = useState<GameData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function handleSubmit(e: SyntheticEvent): void {
        e.preventDefault();
        setIsLoading(true);

        if (!value) {
            return;
        }

        setGames([]);
        setError("");
        const url: string = `https://boardgamegeek.com/xmlapi/search?search=${value}`;

        const fetchPromise = new Promise((resolve) =>{
            return resolve(fetchAPI(url));
        })

        fetchPromise.then((data: any) => {
            if (!data) {
                throw new Error(`No game called ${value}`)
            }

            let defaultGames: any[] = [];

            if (!Array.isArray(data)) {
                defaultGames.push ({
                    "name": data.name._text,
                    "id": data._attributes.objectid,
                })
            } else {
                defaultGames = data.map((game:any) => ({
                    "name": game.name._text,
                    "id": game._attributes.objectid,
                    "image": no_image,
                }))
            }

            setGames(defaultGames);
            setIsImagesLoaded(true);
            return defaultGames;
        }).then((defaultGames) => {
            setIsImagesLoaded(false);
            const promises = defaultGames.map((item: any)=>{
                const url = `https://boardgamegeek.com/xmlapi/boardgame/${item.id}`;

                return new Promise((resolve)=>{
                    resolve(fetchAPI(url));
                })
            })

            Promise.all(promises).then((newGames) => {
                newGames.forEach((newGame: any, index: number)=> {
                    defaultGames[index].image = newGame.image._text;
                })
                setIsImagesLoaded(true);
                setGames(defaultGames);
            });

            setValue("");
            setIsLoading(false);
        }).catch((error: ErrorEvent)=> {
            setError(error.message);
            setIsLoading(false);
            setValue("");
        })
    }

    function gameItemHandleClick(e: MouseEvent<HTMLButtonElement>): void {
        const id: string | undefined = e.currentTarget.dataset.id;
        const data: GameData[] = games.filter((game: GameData) => game.id === id);
        dispatch(setCurrentGame(data[0]));
        navigate(`/game/${id}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="Add game"/>
            <Filter onSubmit={e => handleSubmit(e)} inputType="text" name="search" value={value} onChange={e => handleChange(e)} children="Type game name"/>
            {isLoading && <Text children="Loading..." />}
            {error 
            ? <Text children={error}/>
            : <SearchedList onClick={(e) => gameItemHandleClick(e)} list={games} isImagesLoaded={isImagesLoaded} children="See more"/> }
        </>
    )
}

export default SearchGame;