import sprite from "../../assets/sprite.svg";

type Props = {
    state: string;
}

const Icon = ({state}: Props) => {
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
        <svg width="20" height="20" >
            <use href={sprite + path}></use>
        </svg>
    )
}

export default Icon;