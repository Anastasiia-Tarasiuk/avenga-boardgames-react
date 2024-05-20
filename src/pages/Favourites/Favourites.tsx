import { GameData, IStore } from "../../../@types/types";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import { useDispatch, useSelector } from "react-redux";
import { updateFavourite } from "../../store/actions";
import GameList from "../../components/GameList";
import { MouseEvent } from "react";
import { toast } from "react-toastify";
import css from "./Favourites.module.css";

const Favourites = () => {
    const favourites: GameData[] = useSelector((state: IStore) => state.favourites.favourites);
    const dispatch = useDispatch();

    function removeFromFavourites(e: MouseEvent<HTMLButtonElement>) {
        const id: string | undefined = e.currentTarget.dataset.id;
        dispatch(updateFavourite(id));
        toast.success("The game was removed from Favourites");
    }

    return (
        <div className={css["section-container"]}>
        <PageHeading children="Favourites"/>
        {favourites.length > 0
            ? <GameList className={css.list} list={favourites} onClick={(e)=>removeFromFavourites(e)} children="Remove"/>
            : <Text children="No items"/>}
        </div>
    )
}

export default Favourites;