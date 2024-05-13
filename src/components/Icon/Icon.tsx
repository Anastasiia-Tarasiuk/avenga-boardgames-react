import sprite from "../../assets/sprite.svg";

type Props = {
    state: string;
    size?: {
        width: string;
        height: string;
    }
}

const Icon = ({state, size={width: "20", height: "20"}}: Props) => {
    let path = null;

    switch (state) {
        case "medal":
            path = "#medal";
            break;
        case "best":
            path = "#best_score";
            break;
        case "heart":
            path = "#heart";
            break;    
        case "disabled_heart":
            path = "#disabled_heart";
            break;  
        default:
            path = null;
            break;
    }

    return (
        <svg width={size.width} height={size.height}>
            <use href={sprite + path}></use>
        </svg>
    )
}

export default Icon;