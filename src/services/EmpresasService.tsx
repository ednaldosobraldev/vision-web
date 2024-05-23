import axios from "axios";
import { EmpresaModel } from "../models/Empresa";


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*',
  },
});

const pre_url = 'empresas'

class EmpresasService {
  async listarEmpresas(id_empresa: number) {
    let rs;
    try {
      const response = await api.get(`${pre_url}/listar/${1}`);
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

  async cadastrarEmpresa(perfil: EmpresaModel) {
    let rs;
    try {
      rs = await api.post(`${pre_url}/cadastrar`, perfil, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(rs.data);
      return rs.data;
    } catch (e) {
      console.log(e);
    }
  }

  async atualizarEmpresa(perfil: EmpresaModel) {
    let rs;
    console.log(perfil);

    try {
      rs = await api.put(`${pre_url}/atualizar`, perfil, {
        headers: { "Content-Type": "application/json" },
      });
      return rs.data;
    } catch (e) {
      //console.log(e);
    }
  }

  async desativarEmpresa(id: number) {
    try {
      let rs = await api.patch(`${pre_url}/desativarperfil/${id}`);
      console.log(rs);
      return rs
    } catch (e) {
      console.log(e);
    }
  }

  async deletarEmpresa(id: number) {
    let rs;
    try {
      rs = await api.delete(`${pre_url}/${id}`);
      console.log(rs.data);
      return rs;
    } catch (e) {
      //console.log(e);
    }
  }

  async next(id: number, idEmpresa: number) {
    let rs;
    try {
      rs = await api.get(`${pre_url}/${id}/${idEmpresa}`);
      console.log(rs.data);
      return rs;
    } catch (e) {
      //console.log(e);
    }
  }

  async previous(id: number, idEmpresa: number) {
    let rs;
    try {
      rs = await api.get(`${pre_url}/${id}/${idEmpresa}`);
      console.log(rs.data);
      return rs;
    } catch (e) {
      //console.log(e);
    }
  }

  async buscaCep(cep: number) {
    try {
      const rs = await api.get(`consultacep/${cep}`);
      return rs.data;
    } catch (error) { }
  }
}

export default EmpresasService;
