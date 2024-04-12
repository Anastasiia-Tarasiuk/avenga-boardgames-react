
import convert from "xml-js";


async function fetchAPI(url: string) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        const xmlString = await response.text();
        const {boardgames} = JSON.parse(convert.xml2json(xmlString, {compact: true, spaces: 4}));

        return boardgames.boardgame;

    } catch (error) {
        // gameListEl.innerHTML = `<p>Oops... Something went wrong</p>`
        console.error("There has been a problem with your fetch operation:", error);
    }
}




export default fetchAPI;


















// import convert from "xml-js";
// import defaultImage from "../assets/no_image.jpg";

// type AttributesId = {
//     objectid: string;
// }

// type AttributesName = {
//     primary: string;
// }

// type Yearpublished = {
//     _text: string;
// }

// type Name = {
//     _text: string;
//     _attributes: AttributesName;
// }

// type GameObject = {
//     name: Name;
//     yearpublished: Yearpublished;
//     _attributes: AttributesId; 
// }
// type GameData = {
//     id: string;
//     name: string;
//     year: string;
//     url: string;
//     // category: string[];
//     description: string;
//     // otherNames: string[];
//     hidden: boolean;
// };


// // const gameData: any = {};
// const gameData: any = [];

// async function gameSearch(name: string) {
//     const url = `https://boardgamegeek.com/xmlapi/search?search=${name}`;
//     const {boardgames} = await fetchAPI(url);

//     if (!boardgames.boardgame) {
//         // handleWrongSearchRequest(name);
//     } else {
//         getGameByName(boardgames.boardgame);
//         return gameData;
//     }
// }

// async function fetchAPI(url: string) {
//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error("Network response was not OK");
//         }

//         const xmlString = await response.text();
//         return JSON.parse(convert.xml2json(xmlString, {compact: true, spaces: 4}));
//     } catch (error) {
//         // gameListEl.innerHTML = `<p>Oops... Something went wrong</p>`
//         console.error("There has been a problem with your fetch operation:", error);
//     }
// }


// async function getGameByName(games: GameObject[] ) {
//     // spinner = new Spinner(opts).spin(target);
//     // submitButtonEl.setAttribute("disabled", "true");
//     // gameListEl.innerHTML = "";

//     if (games.length) {
//         games.forEach(async (item: GameObject) => {
//             const id = await handleGameData(item);
//             // renderGames(gameData[id], games.length);
//         });
//     // } else {
//     //     const id = await handleGameData(games);
//         // renderGames(gameData[id], 1);
//     }
// }

// async function getGameById(id: string) {
//     const url = `https://boardgamegeek.com/xmlapi/boardgame/${id}`;
//     const {boardgames} = await fetchAPI(url);

//     return ({
//         url: boardgames.boardgame.image?._text || defaultImage,
//         // category: boardgames.boardgame.boardgamecategory || [],
//         description: boardgames.boardgame.description._text || "No description",
//         // otherNames: boardgames.boardgame.name,
//         hidden: false
//     })
// }

// async function handleGameData(game: GameObject) {
//     const name = game.name._text;
//     const year = game.yearpublished?._text || "";
//     const id = game._attributes.objectid;
//     const {url,description, hidden} = await getGameById(id);
//     gameData.push({ id, name, year, url, description, hidden });
//     return id;
// }



// export default gameSearch;