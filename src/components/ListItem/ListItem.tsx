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
    disabled?: boolean;
    item: GameData;
}

const ListItem = ({state, url = no_image, name, id, children, disabled, item, onClick}: Props): JSX.Element => {
    const isFavouritePage = document.URL.includes("favourites");
    const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');

    function saveToFavourites(e: MouseEvent, game: GameData) {
        e.currentTarget.setAttribute("disabled", "");
        favourites.push(game);
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    return (
        <li>
            <Image state={state} url={url} urlDefault={no_image} alt={name} />
            <Text children={name}/>
            <Button id={id} buttonType="button" onClick={(e)=>onClick(e)} children={children}/>
            {!isFavouritePage && <Button id={id} buttonType="button" onClick={(e)=>saveToFavourites(e, item)} children="<3" disabled={disabled}/>}
        </li>
    )
}

export default ListItem;


// return <ListItem key={id}>
// <Image state={readyState} url={item.image} urlDefault={no_image} alt={name} />
// <Text children={name}/>
// <Button id={id} buttonType="button" onClick={(e)=>onClick(e)} children={children}/>
// <Button id={id} buttonType="button" onClick={(e)=>saveToFavourites(e, item)} children="<3" disabled={isFavourite(id)}/>
// </ListItem>