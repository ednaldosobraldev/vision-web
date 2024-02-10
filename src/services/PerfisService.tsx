import axios from "axios";
import Perfis from '../models/Perfil';


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*',
  },
});

class PerfisService {
  async listarPerfis(id_empresa: number) {
    let rs;
    try {
      const response = await api.get(`perfis/listar/${id_empresa}`);
      console.log("*********** listaPrefis *****************");
      //console.log(response.data)
      rs = {
        statusCode: 200,
        data: response.data,
        //tamanho: response.data.tamanho,
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
  async cadastrarPerfil(perfil: Perfis) {
    let rs;
    try {
      rs = await api.post(`perfis/cadastrar`, perfil, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(rs.data);
      return rs.data;
    } catch (e) {
      console.log(e);
    }
  }
  async atualizarPerfil(perfil: Perfis) {
    let rs;
    console.log(perfil);

    try {
      rs = await api.post(`perfis/atualizar`, perfil, {
        headers: { "Content-Type": "application/json" },
      });
      return rs.data;
    } catch (e) {
      //console.log(e);
    }
  }
  async desativarPerfil(id: number) {
    try {
      let rs = await api.patch(`perfis/desativarperfil/${id}`);
      console.log(rs);
      return rs
    } catch (e) {
      console.log(e);
    }
  }
  async deletarPerfil(id: number){
    let rs;
    try {
      rs = await api.delete(`perfis/${id}`);
      console.log(rs.data);
      return rs;
    } catch (e) {
      //console.log(e);
    }
  }
}

export default PerfisService;
