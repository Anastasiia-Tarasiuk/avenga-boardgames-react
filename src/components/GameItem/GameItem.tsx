import { MouseEvent } from "react";
import ImageContainer from "../ImageContainer";
import Text from "../Text";
import Button from "../Button";
import { GameData, IStore } from "../../../@types/types";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, addGame } from "../../store/actions";

type Props = {
    state: string;
    url: string;
    name: string;
    id: string;
    onClick: (e: MouseEvent<HTMLButtonElement>)=> void;
    children: string;
    item: GameData;
    isImagesLoaded?: any;
}

const GameItem = ({state, url, name, id, children, item, onClick, isImagesLoaded}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const isFavouritePage: boolean = document.URL.includes("favourites");
    const favourites: GameData[] = useSelector((state:IStore) => state.favourites.favourites);
    const gameList: GameData[] = useSelector((state:IStore) => state.games.games);

    function saveItem(e: MouseEvent, item: GameData, name: string): void {
        e.currentTarget.setAttribute("disabled", "");

        switch (name) {
            case "favourites":
                dispatch(addFavourite(item));
                break;
            case "gameList":
                dispatch(addGame(item))
                break;
            default:
                break;
        }
    }

    function isDisabled(id: string, list: GameData[]): boolean {
        return list.some((item: GameData)=>{
            return item.id === id;
        })
    }

    return (
        <li>
            <ImageContainer state={state} url={url} alt={name} isImagesLoaded={isImagesLoaded}/>
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={(e)=>onClick(e)} children={children}/>
            {!isFavouritePage && <Button id={id} buttonType="button" onClick={(e)=>saveItem(e, item, "favourites")} children="<3" disabled={isDisabled(id, favourites)}/>}
            {isFavouritePage && <Button id={id} buttonType="button" onClick={(e)=>saveItem(e, item, "gameList")} children="Add to list" disabled={isDisabled(id, gameList)}/>}
        </li>
    )
}

export default GameItem;