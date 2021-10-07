import { createContext } from "preact";
import { AppProps } from "../types";

export const PropContext = createContext(null as any as UpdateProp<AppProps>);

type UpdateProp<P> = {
    <K extends keyof P, T extends keyof P[K]>(parent: K, name: T, value: P[K][T]): void;
}
