import axios from "axios";

export const api = axios.create({
  baseURL: "https://sistema.com.br", //trocar para url da api do sistema
});
