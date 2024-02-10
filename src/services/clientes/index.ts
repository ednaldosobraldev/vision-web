import http from "../api";

export default  {
  async getClientes(url: string) {
    try {
      const response = http.get(url);
      console.log("get ok");
      const rs = {
        statusCode: 200,
        usuarios: response,
      };
      return rs;
    } catch (error) {
      console.error("Error na requisição");

      const rs = {
        status: 401,
        msg: "Erro na requisição",
      };
      return rs;
    }
  },
};
