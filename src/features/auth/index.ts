import { createContext } from "react-router";

export interface IAuth {

}

export const authContext = createContext<IAuth | null>(null);