import no_item from "../../assets/no_image.jpg";

type Props = {
    url: string | undefined; 
    alt: string; 
    state: string; 
    isImagesLoaded?: boolean;
}

const Image = ({url, alt, state, isImagesLoaded}: Props) => {
    return (
        isImagesLoaded 
        ? <>{isImagesLoaded 
            ? <img src={url} alt={alt}/>
            : <img src={no_item} alt={alt}/>}
        </>
        : <>{state ? <img src={url} alt={alt}/> : <img src={no_item} alt={alt}/>}</>
    )
}

export default Image;
