import { createContext, useContext, useReducer } from "react";

export const GlobalContext = createContext();

const changeState = (state, action) => {
    switch (action.type) {
        case "LIKE_IMAGE":
            return { ...state, likedImages: [...state.likedImages, action.payload] };
        case "UNLIKE_IMAGE":
            return { ...state, likedImages: state.likedImages.filter(id => id !== action.payload) };
        default:
            return state;
    }
};

export function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(changeState, { likedImages: [] });

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);