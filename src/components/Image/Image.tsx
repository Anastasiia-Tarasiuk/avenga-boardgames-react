import Text from "../Text";
import css from "./Image.module.css";

type Props = {
    url: string; 
    name: string; 
}

const Image = ({url, name}: Props) => {
    return <div className={css["image-container"]}>
        <img className={css.image} src={url} alt={name}/>
        <Text children={name}/>
    </div>
}

export default Image;