import { HottestData } from "../../../@types/types";
import useReady from "../../hooks/useReady";
import ImageContainer from "../ImageContainer";

type Props = {
    id: string;
    onClick: (id: string, item: HottestData) => void;
    url: string;
    alt: string; 
    item: HottestData
}

const SliderItem = ({id, onClick, url, alt, item}: Props) => {
    const {readyState} = useReady();

    return (
        <li onClick={()=>onClick(id, item)}><ImageContainer  url={url} alt={alt} state={readyState}/></li>
    )
}

export default SliderItem;