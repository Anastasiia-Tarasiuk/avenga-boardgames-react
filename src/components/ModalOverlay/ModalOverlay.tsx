import { createPortal } from "react-dom";
import Button from "../Button";
import { ReactNode } from "react";

type Props = {
    close: () => void;
    content: ReactNode;
}

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

const ModalOverlay = ({close, content}: Props): JSX.Element=> {
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