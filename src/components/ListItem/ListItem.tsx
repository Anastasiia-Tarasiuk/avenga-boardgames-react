import { MouseEvent } from "react";
import Image from "../Image";
import Text from "../Text";
import Button from "../Button";
import no_image from "../../assets/no_image.jpg";
import { GameData } from "../../../@types/types";

type Props = {
    state: string;
    url: string;
    name: string;
    id: string;
    onClick: (e: MouseEvent<HTMLButtonElement>)=> void;
    children: string;
    item: GameData;
}

const ListItem = ({state, url = no_image, name, id, children, item, onClick}: Props): JSX.Element => {
    const isFavouritePage: boolean = document.URL.includes("favourites");
    const favourites: GameData[] = JSON.parse(localStorage.getItem("favourites") || '[]');
    const gameList: GameData[] = JSON.parse(localStorage.getItem("gameList") || '[]');

    function saveItem(e: MouseEvent, item: GameData, list: GameData[], name: string): void {
        e.currentTarget.setAttribute("disabled", "");
        list.push(item);
        localStorage.setItem(name, JSON.stringify(list));
    }

    function isDesabled(id: string, list: GameData[]): boolean {
        return list.some((item: GameData)=>{
            return item.id === id;
        })
    }

    return (
        <li>
            <Image state={state} url={url} urlDefault={no_image} alt={name} />
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={(e)=>onClick(e)} children={children}/>
            {!isFavouritePage && <Button id={id} buttonType="button" onClick={(e)=>saveItem(e, item, favourites, "favourites")} children="<3" disabled={isDesabled(id, favourites)}/>}
            {isFavouritePage && <Button id={id} buttonType="button" onClick={(e)=>saveItem(e, item, gameList, "gameList")} children="Add to list" disabled={isDesabled(id, gameList)}/>}
        </li>
    )
}

export default ListItem;