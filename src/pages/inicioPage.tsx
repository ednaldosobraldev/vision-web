import { useContext, useEffect } from "react";
import { UsuarioContext } from "../context/useContext";
import HomePage from "./home";
import LoginPage from "./login";


export default function InicioPage() {
    const { logado, setLogado } = useContext(UsuarioContext);

    useEffect(() =>{
        console.log("Inicio")
    })
    return (
        <>
        {logado ? <HomePage/> : <LoginPage/>}
        </>
    )
}
