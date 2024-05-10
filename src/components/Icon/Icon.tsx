import sprite from "../../assets/sprite.svg";

const Icon = ({state}: any) => {
    let path = null;

    switch (state) {
        case "medal":
            path = "#medal";
            break;
        case "best":
            path = "#best_score";
            break;
        default:
            path = null;
            break;
    }

    return (
        <svg width="20" height="20">
            <use href={sprite + path}></use>
        </svg>
    )
}

export default Icon;