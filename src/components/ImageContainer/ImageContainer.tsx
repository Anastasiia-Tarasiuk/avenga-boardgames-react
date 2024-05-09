import no_item from "../../assets/no_image.jpg";
import Image from "../Image";

type Props = {
    url: string; 
    alt: string; 
    state: string; 
    isImagesLoaded?: boolean;
    className?: string;
}

const ImageContainer = ({url, alt, state, isImagesLoaded, className}: Props) => {
    return (
        isImagesLoaded 
        ? <>{isImagesLoaded 
            ? <Image className={className} url={url} name={alt} />
            : <Image className={className} url={no_item} name={alt} />}
        </>
        : <>{state ? <Image className={className} url={url} name={alt} /> : <Image className={className}  url={no_item} name={alt} />}</>
    )
}

export default ImageContainer;
