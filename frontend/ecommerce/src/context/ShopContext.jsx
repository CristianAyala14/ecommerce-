import { createContext } from "react";
import OFERTAS from "../assets/ofertasProductsMockUp"

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const contextValue = {OFERTAS};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
            
        
    )
}

export default ShopContextProvider;