import {createContext} from "react";

export const DataContext = createContext({
    content: [],
    cities: [],
    isLoading: true,
    error: null,
});

