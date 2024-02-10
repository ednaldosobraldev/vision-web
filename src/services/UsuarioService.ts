//const api = require('../api').api;

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  }, 
});

class UsuariosService {
  async listaUsuarios(id_empresa: number) {
    let rs;
    try {
      const response = await api.get(`usuarios/lista/${id_empresa}`);
      
      console.log("*********** listaUsuarios *****************");
      rs = {
        statusCode: 200,
        data: response.data,
      };
    } catch (error) {
      console.error("Error na requisição");
      rs = {
        status: 401,
        msg: "Erro na requisição",
      };
    }
    return rs;
  }

  async login(login: string, senha: string) {
    let dados = { login: login, senha: senha };
    let rs;
    try {
      rs = await api.post("usuarios/login", dados);
      //console.log(rs.data);
      const response = {
        dados: rs.data,
        status: rs.status,
      };
      return rs;
    } catch (e) {
      //console.log(e);
    }

    //console.log(rs);
    //console.log(rs?.status);

    return rs;
    //console.log('login', url);
  }
}

export default UsuariosService;
