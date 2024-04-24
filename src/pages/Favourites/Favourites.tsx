import { GameData } from "../../../@types/types";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import ListItem from "../../components/ListItem";
import Image from "../../components/Image";
import Button from "../../components/Button";
import no_image from "../../assets/no_image.jpg"
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
        
        return <ListItem key={id}>
            <Image state={readyState} url={item.image} urlDefault={no_image} alt={name} />
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={()=>removeFromFavourites(id)} children="Remove"/>
        </ListItem>
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