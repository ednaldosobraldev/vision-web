import axios from "axios";
import { EmpresaModel } from "../models/EmpresaModel";


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*',
  },
});

const pre_url = 'marcas'

class MarcasService {
    async desativarMarca(id_marca: number) {

    }
    async deletarMarca(id_marca: number) {
    }
    async listarMarcas(id_empresa: number) {
        let rs;
        try {
          const response = await api.get(`${pre_url}/listar/${1}`);
          console.log("*********** listaMarcas *****************");
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
}



export default MarcasService;
