type Props = {
    url: string | undefined; 
    alt: string; 
    state: string; 
    urlDefault: string; 
}

const Image = ({url, alt, state, urlDefault}: Props) => {
    return (
        state ? <img src={url} alt={alt}/> : <img src={urlDefault} alt={alt}/>
    )
}

export default Image;
