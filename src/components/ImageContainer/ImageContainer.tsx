import no_item from "../../assets/no_image.jpg";
import ImageCard from "../ImageCard";

type Props = {
    url: string; 
    alt: string; 
    state: string; 
    isImagesLoaded?: boolean;
}

const ImageContainer = ({url, alt, state, isImagesLoaded}: Props) => {
    return (
        isImagesLoaded 
        ? <>{isImagesLoaded 
            ? <ImageCard url={url} name={alt} />
            : <ImageCard url={no_item} name={alt} />}
        </>
        : <>{state ? <ImageCard url={url} name={alt} /> : <ImageCard url={no_item} name={alt} />}</>
    )
}

export default ImageContainer;
