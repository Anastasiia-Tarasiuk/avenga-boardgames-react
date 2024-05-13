import { ImageData } from "../../../@types/types";
import css from "./Image.module.css";

const Image = ({src, alt, className}: ImageData) => {
    return <img className={className || css.image} src={src} alt={alt}/>
}

export default Image;