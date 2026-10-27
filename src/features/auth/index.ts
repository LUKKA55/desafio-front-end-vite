import { createContext } from "react-router-dom";

export interface IAuth {

}

export const authContext = createContext<IAuth | null>(null);