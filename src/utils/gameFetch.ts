import convert from "xml-js";

async function fetchAPI(url: string) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        const xmlString = await response.text();
        
        if (url.includes("xmlapi2")) {
            const {items} = JSON.parse(convert.xml2json(xmlString, {compact: true, spaces: 4}));
            return items.item;
        } else {
            const {boardgames} = JSON.parse(convert.xml2json(xmlString, {compact: true, spaces: 4}));
            return boardgames.boardgame;
        }

    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}

export default fetchAPI;