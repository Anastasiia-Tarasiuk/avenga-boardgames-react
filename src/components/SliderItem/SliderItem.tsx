import useReady from "../../hooks/useReady";
import ImageContainer from "../ImageContainer";

const SliderItem = ({id, onClick, url, name, item}: any) => {
    const {readyState} = useReady();
    
    return (
        <li key={id} onClick={()=>onClick(id, item)}><ImageContainer url={url} alt={name} state={readyState}/></li>
    )
}

export default SliderItem;