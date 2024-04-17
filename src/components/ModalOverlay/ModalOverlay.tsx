import { createPortal } from "react-dom";
import Button from "../Button";

type Props = {
    close: () => void;
    content: React.ReactNode;
}

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

const ModalOverlay = ({close, content}: Props) => {
    return (
        createPortal(
            <div>
                <div>
                    {content}
                    <Button buttonType="button" onClick={close} children="X"/>
                </div>
            </div>,
            modalRoot
        )
    )
}

export default ModalOverlay;