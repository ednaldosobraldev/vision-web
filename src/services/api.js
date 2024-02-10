import axios from "axios";

//axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1/",
});
export default http;
