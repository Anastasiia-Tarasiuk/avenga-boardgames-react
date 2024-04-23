import { useEffect, useState } from "react";

const useReady = () => {
    const [readyState, setReadyState] = useState<string>("");

    useEffect(()=> {
        function checkLoaded(): void {
            if (document.readyState === "complete") { 
                setReadyState("ready")
            } else { 
              setTimeout(checkLoaded, 500); 
            } 
        }

        checkLoaded();
    }, [])


    return {readyState}
}

export default useReady;