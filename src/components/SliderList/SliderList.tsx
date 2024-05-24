import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import css from "./SliderList.module.css";
import { MouseEvent } from "react";
import SliderItem from "../SliderItem";
import Icon from "../Icon";
import { HottestData } from "../../../@types/types";

type Props = {
    list: HottestData[];
    onClick: (id: string, item: HottestData) => void;
    className: string;
}

const SliderList = ({list, onClick, className}: Props) => {
    const [shownIndex, setShownIndex] = useState<number>(0);
    const [slidesNumber, setSlidesNumber] = useState<number>(7);
    const [width, setwidth] = useState(0);

    const sliderRef = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        const slider = sliderRef.current;
        const observer = new ResizeObserver(entries => {
            setwidth(entries[0].contentRect.width)
        })

        if (slider) {
            observer.observe(slider);
        }

        if (width >= 1580) { //5
            setSlidesNumber(9)
        } else if (1260 <= width && width < 1580) { //4
            setSlidesNumber(7)
        } else if (940 <= width && width < 1260) { //3
            setSlidesNumber(5)
        } else if (620 <= width && width < 940) { //2
            setSlidesNumber(3)  
        } else { // 1
            setSlidesNumber(1) 
        }

        return () => {
            if (slider) {
                observer.unobserve(slider)
            };
        };
        
    }, [width])

    function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
        const id: string | undefined = e.currentTarget.dataset.id;

        switch (id) {
            case "next":
                setShownIndex(prevState => prevState - slidesNumber);
                break;
            case "prev":
                setShownIndex(prevState => prevState + slidesNumber);
                break;        
            default:
                break;
        }
    }

    function filterArray(list: HottestData[]) {
        const filtered = [];

        for (let index = 0; index < list.length; index++) {
            const item = list[index];

            if (index >= shownIndex && index < shownIndex + slidesNumber) {
                filtered.push(item);
            } 
        }

        return filtered;
    }

    return (
        <>
            {list.length> 0 && 
            <div className={css.container} ref={sliderRef}>
                {shownIndex === 0 
                    ? <Button id="next" buttonType="button" children={<Icon className={css.arrow} state="arrow"/>} onClick={(e) => handleButtonClick(e)} disabled={true}/>
                    : <Button id="next" buttonType="button" children={<Icon className={css.arrow} state="arrow"/>}onClick={(e) => handleButtonClick(e)} disabled={false}/>
                }
                
                <ul className={className}>
                    {
                        filterArray(list).map(((item: HottestData) => {
                            const id: string = item._attributes.id;
                            const name: string = item.name._attributes.value;
                            const url: string = item.thumbnail._attributes.value;
                            return <SliderItem key={id} onClick={onClick} url={url} item={item} alt={name} id={id}/>
                        }))
                    }
                </ul>

                {list.length - shownIndex < slidesNumber
                    ? <Button id="prev" buttonType="button" children={<Icon state="arrow"/>} onClick={(e) => handleButtonClick(e)} disabled={true}/>
                    : <Button id="prev" buttonType="button" children={<Icon state="arrow"/>} onClick={(e) => handleButtonClick(e)} disabled={false}/>
                }
            </div>}
        </>
    )
}

export default SliderList;