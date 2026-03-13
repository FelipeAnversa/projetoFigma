import { useContext } from "react";
import { PaginaContext } from "../context/PaginaContext";

export default function usePaginaContext() {
    const context = useContext(PaginaContext);
    if (context === undefined) {
        throw new Error('Não está dentro do Contexto!');
    }
    return context;
}