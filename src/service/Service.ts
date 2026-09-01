import axios from "axios";
 
// Conexão com o backend
const api = axios.create({
  baseURL: "https://farmacia-ug0p.onrender.com/",
});
 
// Buscar dados
export const buscar = async (
  url: string,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.get(url, header);
 
  setDados(resposta.data);
};
 
// Cadastrar
export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.post(
    url,
    dados,
    header
  );
 
  setDados(resposta.data);
};
 
// Atualizar
export const atualizar = async (
  url: string,
  dados: Object,
  header: Object
) => {
  const resposta = await api.put(
    url,
    dados,
    header
  );
 
  return resposta.data;
};
 
// Deletar
export const deletar = async (
  url: string,
  header: Object
) => {
  await api.delete(url, header);
};