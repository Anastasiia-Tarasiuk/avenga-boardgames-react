import { ChangeEvent, SyntheticEvent, useState } from "react";
import fetchAPI from "../../utils/gameFetch";
import Filter from "../../components/Filter";
import SearchedList from "../../components/SearchedList";
import { useNavigate } from "react-router-dom";

const SearchGame = () => {
    const [value, setValue] = useState("");
    const [games, setGames] = useState([]);

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (!value) {
            return;
        }
        const url = `https://boardgamegeek.com/xmlapi/search?search=${value}`;
        
        fetchAPI(url)
        .then(data => {
            setGames(data);
            setValue("");
        })
        .catch(error => {
            console.error(error);
        })
    }

    function gameItemHandleClick(_: any, id: string, name: string) {
        const url = `https://boardgamegeek.com/xmlapi/boardgame/${id}`;
        fetchAPI(url)
        .then(data => {
            data.searchName = name;
            data.id = id;
            localStorage.setItem("gameData", JSON.stringify(data));
            navigate(`/game/${id}`, { replace: false });
        })
    }

    return (
        <>
            <h2>Add game</h2>
            <Filter onSubmit={e => handleSubmit(e)} inputType="text" buttonType="submit" name="search" value={value} onChange={e => handleChange(e)} children="Type game name"/>
            {games.length > 0 && <SearchedList onClick={(e: any, id: string, name: string) => gameItemHandleClick(e, id, name)} list={games} children="See more"/> }
        </>

    )
}

export default SearchGame;