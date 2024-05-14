import { useState } from "react";
import useReady from "../../hooks/useReady";
import Button from "../Button";
import ImageContainer from "../ImageContainer";
import css from "./SliderList.module.css";
import { MouseEvent } from "react";

const SliderList = ({list, onClick, children=""}: any) => {
    const {readyState} = useReady();
    const [shownIndex, setShownIndex] = useState<number>(0);

    console.log(list)

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
                        list.map(((item: any, index: number) => {
                            if (index >= shownIndex && index < shownIndex + 5) {
                                const id:string = item._attributes.id;
                                const name = item.name._attributes.value;
                                const url = item.thumbnail._attributes.value;
                                return (<li key={id} onClick={()=>onClick(id, item)}><ImageContainer url={url} alt={name} state={readyState}/></li>)
                            } else {
                                return <></>
                            }
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