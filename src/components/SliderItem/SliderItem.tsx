import useReady from "../../hooks/useReady";
import ImageContainer from "../ImageContainer";

const SliderItem = ({id, onClick, url, alt, item}: any) => {
    const {readyState} = useReady();

    return (
        <li onClick={()=>onClick(id, item)}><ImageContainer  url={url} alt={alt} state={readyState}/></li>
    )
}

export default SliderItem;