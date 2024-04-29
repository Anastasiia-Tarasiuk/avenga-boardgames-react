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

const SearchGame = () => {
    const [value, setValue] = useState<string>("");
    const [games, setGames] = useState<GameData[] | []>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>("");

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function handleSubmit(e: SyntheticEvent): void {
        e.preventDefault();
        setLoader(true);

        if (!value) {
            return;
        }

        setGames([]);
        setIsError("");
        const url: string = `https://boardgamegeek.com/xmlapi/search?search=${value}`;

        const fetchPromise = new Promise((resolve) =>{
            return resolve(fetchAPI(url));
        })

        fetchPromise.then((data: any) => {
            if (!data) {
                throw new Error(`No game with name ${value}`)
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
            setLoader(false);
        }).catch((error: any)=> {
            setIsError(error.message);
            setLoader(false);
            setValue("");
            console.error(error);
        })
    }

    function gameItemHandleClick(e: MouseEvent<HTMLButtonElement>): void {
        const id: string | undefined = e.currentTarget.dataset.id;
        const data: GameData[] = games.filter((game: GameData) => game.id === id);
        localStorage.setItem("gameData", JSON.stringify(data[0]));
        navigate(`/game/${id}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="Add game"/>
            <Filter onSubmit={e => handleSubmit(e)} inputType="text" name="search" value={value} onChange={e => handleChange(e)} children="Type game name"/>
            {loader && <Text children="Loading..." />}
            {isError 
            ? <Text children={isError}/>
            : <SearchedList onClick={(e) => gameItemHandleClick(e)} list={games} isImagesLoaded={isImagesLoaded} children="See more"/> }
        </>
    )
}

export default SearchGame;