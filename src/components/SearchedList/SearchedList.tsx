import ListItem from "../ListItem";
import { MouseEvent } from "react";
import { GameData } from "../../../@types/types";
import useReady from "../../hooks/useReady";

type Props = {
    list: GameData[];
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: string
}

const SearchedList = ({list, onClick, children}: Props): JSX.Element => {
    const {readyState} = useReady();
    const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');

    function isFavourite(id: string): boolean {
        return favourites.some((favourite: GameData)=>{
            return favourite.id === id;
        })
    }

    const items = list.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        
        return <ListItem key={id} state={readyState} url={item.image} name={name} id={id} children={children} disabled={isFavourite(id)} item={item} onClick={onClick}/>
    })

    return (
        <ul>{items}</ul>
    )
}

export default SearchedList;