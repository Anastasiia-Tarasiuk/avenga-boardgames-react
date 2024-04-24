import { ChangeEvent, SyntheticEvent, useState } from "react";
import { MouseEvent } from "react";
import fetchAPI from "../../utils/gameFetch";
import Filter from "../../components/Filter";
import SearchedList from "../../components/SearchedList";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import { GameData } from "../../../@types/types";

const SearchGame = () => {
    const [value, setValue] = useState<string>("");
    const [games, setGames] = useState<GameData[] | []>([]);

    // const dataToStore: GameData[] = [];

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value)
    }

    function handleSubmit(e: SyntheticEvent): void {
        e.preventDefault();

        if (!value) {
            return;
        }
        setGames([]);

        const url: string = `https://boardgamegeek.com/xmlapi/search?search=${value}`;
        
        fetchAPI(url)
        .then(data => {
            data.forEach((item: any, index: number)=>{
                const url = `https://boardgamegeek.com/xmlapi/boardgame/${item._attributes.objectid}`;

                fetchAPI(url).then((game: any)=>{
                    data[index].image = game.image._text;

                    setGames(prevState => [...prevState, {...{
                        "name": data[index].name._text,
                        "id": data[index]._attributes.objectid,
                        "image": data[index].image
                    }}]);
                    setValue("");
                })
            })
        })
        .catch(error => {
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
            {games.length > 0 && <SearchedList onClick={(e) => gameItemHandleClick(e)} list={games} children="See more"/> }
        </>

    )
}

export default SearchGame;