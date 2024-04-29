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

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value)
    }

    function handleSubmit(e: SyntheticEvent): void {
        e.preventDefault();
        setLoader(true);

        if (!value) {
            return;
        }

        setGames([]);

        const url: string = `https://boardgamegeek.com/xmlapi/search?search=${value}`;
        
        fetchAPI(url)
        .then((data: any) => {
            console.log(data)
            data.forEach ((game: any) => {
                setGames(prevState => [...prevState, {...{
                    "name": game.name._text,
                    "id": game._attributes.objectid,
                    "image": no_image
                }}]);
            } )

            const promises = data.map((item: any, index: number)=>{
                const url = `https://boardgamegeek.com/xmlapi/boardgame/${item._attributes.objectid}`;

                return new Promise((resolve)=>{
                    resolve(fetchAPI(url));
                })
            })

            Promise.all(promises).then((newGames) => {            
                // console.log(newGames)    
                // console.log(games) 
                setIsImagesLoaded(true);
                // newGames.forEach((newGame, index)=> {
                //     games[index].image=newGame.image._text;
                // })
                // setGames(games)
                
            });


            setValue("");
            setLoader(false);
            
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
            {loader && <Text children="Loading..." />}
            {games.length > 0 && <SearchedList onClick={(e) => gameItemHandleClick(e)} list={games} isImagesLoaded={isImagesLoaded} children="See more"/> }
        </>

    )
}

export default SearchGame;