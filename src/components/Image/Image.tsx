import Text from "../Text";
import css from "./Image.module.css";

type Props = {
    url: string; 
    name: string; 
    className?: string;
}

const Image = ({url, name, className}: Props) => {
    return <div className={css["image-container"]}>
        <img className={`${css.image + " " +  className}`} src={url} alt={name}/>
        <Text children={name}/>
    </div>
}

export default Image;