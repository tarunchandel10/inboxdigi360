import { createContext, useContext, useState } from 'react';

// Create a context to hold the selected creative type
const CreativeContext = createContext();

export const useCreativeContext = () => useContext(CreativeContext);

export const CreativeProvider = ({ children }) => {
    const [selectedCreative, setSelectedCreative] = useState(null);

    return (
        <CreativeContext.Provider value={{ selectedCreative, setSelectedCreative }}>
            {children}
        </CreativeContext.Provider>
    );
};