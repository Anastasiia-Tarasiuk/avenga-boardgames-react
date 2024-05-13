import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Filter from "../Filter";
import css from "./SharedLayout.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { GameData } from "../../../@types/types";
import fetchAPI from "../../utils/gameFetch";
import no_image from "../../assets/no_image.jpg";
import Image from "../Image";
import logo from "../../assets/logo.png";

const SharedLayout = (): JSX.Element => {
    const navigate = useNavigate();
    const [value, setValue] = useState<string>("");
    const [searchGames, setSearchGames] = useState<GameData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const isAddGame: boolean = document.URL.includes("add_game");

    function onItemClick() {
        if (!isAddGame) {
            navigate(`/add_game`, { replace: false });
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setIsLoading(true);

        if (!value) {
            return;
        }

        setSearchGames([]);
        setError("");
        const url: string = `https://boardgamegeek.com/xmlapi/search?search=${value}`;

        const fetchPromise = new Promise((resolve) =>{
            return resolve(fetchAPI(url));
        })

        fetchPromise.then((data: any) => {
            if (!data) {
                throw new Error(`No game called ${value}`)
            }

            let defaultGames: any[] = [];

            if (!Array.isArray(data)) {
                defaultGames.push ({
                    "name": data.name._text,
                    "id": data._attributes.objectid,
                    "description": "",
                    "playTime": ""
                })
            } else {
                defaultGames = data.map((game:any) => ({
                    "name": game.name._text,
                    "id": game._attributes.objectid,
                    "image": no_image,
                    "description": "",
                    "playTime": ""
                }))
            }

            setSearchGames(defaultGames);
            setIsImagesLoaded(true);
            return defaultGames;
        }).then((defaultGames) => {
            setIsImagesLoaded(false);
            const promises = defaultGames.map((item: any)=>{
                const url = `https://boardgamegeek.com/xmlapi/boardgame/${item.id}`;

                return new Promise((resolve)=>{
                    resolve(fetchAPI(url));
                })
            })

            Promise.all(promises).then((newGames) => {
                newGames.forEach((newGame: any, index: number)=> {
                    const description = getText(newGame.description._text);
                    defaultGames[index].image = newGame.image._text;
                    defaultGames[index].description = description.replaceAll("<br/><br/>", "<br/>").replaceAll("<br/>", " ");
                    defaultGames[index].playTime = newGame.maxplaytime._text;
                })
                setIsImagesLoaded(true);
                setSearchGames(defaultGames);
            });

            setValue("");
            setIsLoading(false);
        }).catch((error: ErrorEvent)=> {
            setError(error.message);
            setIsLoading(false);
            setValue("");
        })
    }

    function getText(text: string): string{
        const divContainer = document.createElement("div");
        divContainer.innerHTML = text;
        return divContainer.innerText || "";
    }

    return (
        <div>
            <header className={css.header}>
                <NavLink to="/"><Image className={css.logo} src={logo} alt="Logo"/></NavLink>
                <nav>
                    <ul className={css["header-menu"]}>
                        <li><NavLink to="/"> My list</NavLink></li>
                        <li onClick={onItemClick} className="pointer">
                            { isAddGame 
                                ? <Filter onSubmit={e => handleSubmit(e)} inputType="text" name="search"
                                 value={value} onChange={e => handleChange(e)} placeholder="Type game name"
                                 children=""/>
                                : "Add game"
                            }</li>
                        <li><NavLink to="/favourites">Favourites</NavLink></li>
                        <li><NavLink to="/players">Players</NavLink></li>
                        {/* <li><NavLink to="/settings">Settings</NavLink></li> */}
                    </ul>
                </nav>
            </header>
            <main >
                <Outlet context={[searchGames, isLoading, isImagesLoaded, error]}/>
            </main>
        </div>
    )

}

export default SharedLayout;

