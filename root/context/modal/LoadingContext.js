import {createContext, useState} from "react";
import LoadingModal from "../../modal/LoadingModal";

const LoadingContext = createContext({
    show: () => {
    },
    close: () => {
    },
});


export default function LoadingProvider({children}) {
    const [isVisible, setVisibility] = useState(false)

    const value = {
        show: () => {
            setVisibility(true);
        },
        close: () => {
            setVisibility(false);
        },
    }

    return (
        <LoadingContext.Provider value={value}>
            <LoadingModal setVisible={setVisibility} visible={isVisible}/>
            {children}
        </LoadingContext.Provider>

    )
}

export  {
    LoadingContext
}
