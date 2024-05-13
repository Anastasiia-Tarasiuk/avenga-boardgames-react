import Text from "../Text";
import css from "./ImageCard.module.css";
import Image from "../Image/Image";

type Props = {
    url: string; 
    name: string; 
}

const ImageCard = ({url, name}: Props) => {
    return <div className={css["image-card"]}>
        <Image src={url} alt={name}/>
        <Text children={name}/>
    </div>
}

export default ImageCard;