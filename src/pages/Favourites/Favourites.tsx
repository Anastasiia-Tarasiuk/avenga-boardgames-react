import { GameData } from "../../../@types/types";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import ListItem from "../../components/ListItem";
import useReady from "../../hooks/useReady";
import { useState } from "react";

const Favourites = () => {
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites") || '[]'))
    const {readyState} = useReady();

    function removeFromFavourites(id: string) {
        const filteredFavourites = favourites.filter((game: GameData)=>game.id !== id);
        setFavourites(filteredFavourites);
        localStorage.setItem("favourites", JSON.stringify(filteredFavourites))
    }

    const items = favourites.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        
        return <ListItem key={id} state={readyState} url={item.image} name={name} id={id} onClick={()=>removeFromFavourites(id)} children="Remove" item={item}/>
    })

    return (
        <>
        <PageHeading children="Favourites"/>
        {favourites.length > 0
            ? <div>{items}</div>
            : <Text children="No items"/>}
        </>
    )
}

export default Favourites;