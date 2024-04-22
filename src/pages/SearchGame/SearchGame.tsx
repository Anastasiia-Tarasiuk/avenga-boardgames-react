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

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value)
    }

    function handleSubmit(e: SyntheticEvent): void {
        e.preventDefault();

        if (!value) {
            return;
        }

        const url: string = `https://boardgamegeek.com/xmlapi/search?search=${value}`;
        
        fetchAPI(url)
        .then(data => {
            const dataToStore: GameData[] = data.map((item: any) => ({
                "name": item.name._text,
                "id": item._attributes.objectid})
            )

            setGames(dataToStore);
            setValue("");
        })
        .catch(error => {
            console.error(error);
        })
    }

    function gameItemHandleClick(_: MouseEvent<HTMLButtonElement>, id: string, name: string): void {
        const url = `https://boardgamegeek.com/xmlapi/boardgame/${id}`;
        fetchAPI(url)
        .then((data: any) => {
            console.log(data)
            localStorage.setItem("gameData", JSON.stringify({name, id, "image": data.image._text}));
            navigate(`/game/${id}`, { replace: false });
        })
    }

    return (
        <>
            <PageHeading children="Add game"/>
            <Filter onSubmit={e => handleSubmit(e)} inputType="text" name="search" value={value} onChange={e => handleChange(e)} children="Type game name"/>
            {games.length > 0 && <SearchedList onClick={(e, id, name) => gameItemHandleClick(e, id, name)} list={games} children="See more"/> }
        </>

    )
}

export default SearchGame;