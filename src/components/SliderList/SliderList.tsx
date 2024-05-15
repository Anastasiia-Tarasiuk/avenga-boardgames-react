import { useState } from "react";
import useReady from "../../hooks/useReady";
import Button from "../Button";
import ImageContainer from "../ImageContainer";
import css from "./SliderList.module.css";
import { MouseEvent } from "react";
import SliderItem from "../SliderItem";

const SliderList = ({list, onClick}: any) => {
    const {readyState} = useReady();
    const [shownIndex, setShownIndex] = useState<number>(0);
    

    function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
        const id: string | undefined = e.currentTarget.dataset.id;

        switch (id) {
            case "next":
                setShownIndex(prevState => prevState - 5);
                break;
            case "prev":
                setShownIndex(prevState => prevState + 5);
                break;        
            default:
                break;
        }
    }

    function filterArray(list: any) {
        const filtered = [];

        for (let index = 0; index < list.length; index++) {
            const item = list[index];
            if (index >= shownIndex && index < shownIndex + 5) {
                filtered.push(item);
            } 
        }

        return filtered;
    }

    return (
        <>
            {list.length> 0 && 
            <div className={css.container}>
                {shownIndex === 0 
                    ? <Button id="next" buttonType="button" children="<=" onClick={(e) => handleButtonClick(e)} disabled={true}/>
                    : <Button id="next" buttonType="button" children="<=" onClick={(e) => handleButtonClick(e)} disabled={false}/>
                }
                
                <ul className={css["slider_list"]}>
                    {
                        filterArray(list).map(((item: any) => {
                            const id: string = item._attributes.id;
                            const name: string = item.name._attributes.value;
                            const url: string = item.thumbnail._attributes.value;
                            return <SliderItem id={id} onClick={onClick} url={url} item={item} alt={name} />
                        }))
                    }
                </ul>

                {shownIndex === list.length - 5
                    ? <Button id="prev" buttonType="button" children="=>" onClick={(e) => handleButtonClick(e)} disabled={true}/>
                    : <Button id="prev" buttonType="button" children="=>" onClick={(e) => handleButtonClick(e)} disabled={false}/>
                }
            </div>}
        </>
    )
}

export default SliderList;