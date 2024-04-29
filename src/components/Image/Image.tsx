import no_item from "../../assets/no_image.jpg";

type Props = {
    url: string | undefined; 
    alt: string; 
    state: string; 
    urlDefault: string; 
    isImagesLoaded?: any;
}

const Image = ({url = no_item, alt, state, urlDefault, isImagesLoaded}: Props) => {
    return (
        // isImagesLoaded 
        // ? <>{state ? <img src={url}  alt={alt}/> : <img src={urlDefault} alt={alt}/>}</>
        // : <img src={urlDefault} alt={alt}/>
        
        <>{state ? <img src={url}  alt={alt}/> : <img src={urlDefault} alt={alt}/>}</>

    )
}

export default Image;
