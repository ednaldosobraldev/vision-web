import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UserProvider = ({ children }) => {
  const [nome, setNome] = useState("");
  const [token, setToken] = useState("");
  const [logado, setLogado] = useState(false);
  const [remember, setRemember] = useState(false);
  const [id_empresa, setIdEmpresa] = useState(null);
  const [id_usuario, setIdUsuario] = useState(null);

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
        id_usuario,
        setIdUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
