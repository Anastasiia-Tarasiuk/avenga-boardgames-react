import no_item from "../../assets/no_image.jpg";
import Image from "../Image";

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
            ? <Image url={url} name={alt} />
            : <Image url={no_item} name={alt} />}
        </>
        : <>{state ? <Image url={url} name={alt} /> : <Image url={no_item} name={alt} />}</>
    )
}

export default ImageContainer;
