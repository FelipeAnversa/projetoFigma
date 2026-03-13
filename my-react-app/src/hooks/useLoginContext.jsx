import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export default function useLoginContext() {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('Não está dentro do Contexto!');
    }
    return context;
}