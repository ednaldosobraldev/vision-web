import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UserProvider = ({ children }) => {
  const [nome, setNome] = useState("");
  const [token, setToken] = useState("");
  const [logado, setLogado] = useState(false);
  const [remember, setRemember] = useState(false);
  const [id_empresa, setIdEmpresa] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [idNivel, setIdNIvel] = useState(null);


  return (
    <UsuarioContext.Provider
      value={{
        nome,
        setNome,
        token,
        setToken,
        logado,
        setLogado,
        remember,
        setRemember,
        id_empresa,
        setIdEmpresa,
        idUsuario,
        setIdUsuario,
        idNivel,
        setIdNIvel
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
