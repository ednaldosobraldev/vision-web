import axios from "axios";
import { EscolaModel } from "../models/EscolaModel";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

class EscolasService {
  async listaEscolas(id_empresa: number) {
    let rs;
    try {
      const response = await api.get(`escolas/lista/${id_empresa}`);
      console.log("*********** listaEscolas(EscolasService) *****************");
      rs = {
        statusCode: response.status,
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

  async cadastrarEscola(escola: EscolaModel) {
    let rs;
    console.log(escola);

    try {
      rs = await api.post(`escolas/cadastrar`, escola, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(rs.data);
      /*const response = {
        dados: rs.data
      };*/
      return rs.data;
    } catch (e) {
      console.log(e);
    }
  }

  async atualizarEscola(escola: EscolaModel) {
    let rs;
    console.log(escola);

    try {
      rs = await api.post(`escolas/cadastrar`, escola, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(rs.data);
      /*const response = {
        dados: rs.data
      };*/
      return rs;
    } catch (e) {
      console.log(e);
    }
  }

  async desativarEscola(id: number) {
    try {
      let rs = await api.patch(`escolas/desativarEscola/${id}`);
      console.log(rs);
      return rs;
    } catch (e) {
      console.log(e);
    }
  }
  
  async deletarEscola(id: number) {
    let rs;
    try {
      rs = await api.delete(`escolas/${id}`);
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
    } catch (error) {}
  }
}

export default EscolasService;
