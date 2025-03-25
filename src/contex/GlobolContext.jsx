import { createContext, useContext, useReducer } from "react";
import LikkedImages from "../pages/LikedImages";

export const GlobolContext = createContext()
    const changeState =(state,action) =>{
        const {type, payload} = action
    }
export function GlobalContextProvider({children}){
    const [state, dispatch] = useReducer(changeState ,{
        likedImages: [],
    });
    return(
    <GlobolContext.Provider value={{...state, dispatch}}>
        {children}
    </GlobolContext.Provider>
    );
}