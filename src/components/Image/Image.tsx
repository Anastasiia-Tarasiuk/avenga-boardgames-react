import { ImageData } from "../../../@types/types";

const Image = ({src, alt}: ImageData) => {
    return <img src={src} alt={alt}/>
}

export default Image;