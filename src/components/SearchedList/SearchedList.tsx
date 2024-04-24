import ListItem from "../ListItem";
import Text from "../Text";
import Button from "../Button";
import Image from "../Image";
import { MouseEvent } from "react";
import { GameData } from "../../../@types/types";
import no_image from "../../assets/no_image.jpg"
import useReady from "../../hooks/useReady";

type Props = {
    list: GameData[];
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: string;
}

const SearchedList = ({list, onClick, children}: Props): JSX.Element => {
    const {readyState} = useReady();
    const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');

    function isFavourite(id: string): boolean {
        return favourites.some((favourite: GameData)=>{
            return favourite.id === id;
        })
    }

    function saveToFavourites(e: MouseEvent, game: GameData) {
        e.currentTarget.setAttribute("disabled", "");
        favourites.push(game);
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    const items = list.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        
        return <ListItem key={id}>
            <Image state={readyState} url={item.image} urlDefault={no_image} alt={name} />
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={(e)=>onClick(e)} children={children}/>
            {!isFavourite(id) && <Button id={id} buttonType="button" onClick={(e)=>saveToFavourites(e, item)} children="<3"/>}
        </ListItem>
    })

    return (
        <ul>{items}</ul>
    )
}

export default SearchedList;