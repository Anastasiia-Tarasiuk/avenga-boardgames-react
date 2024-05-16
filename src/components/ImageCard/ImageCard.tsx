import Text from "../Text";
import Image from "../Image/Image";

type Props = {
    url: string; 
    name: string; 
}

const ImageCard = ({url, name}: Props) => {
    return <div>
        <Image src={url} alt={name}/>
        <Text children={name}/>
    </div>
}

export default ImageCard;