import api from './api';

// Lista todos os abrigos
export async function listarAbrigos() {
  const response = await api.get('/abrigos');
  return response.data;
}

// Busca um abrigo específico pelo ID
export async function buscarAbrigo(id) {
  const response = await api.get(`/abrigos/${id}`);
  return response.data;
}

// Cria um novo abrigo
export async function criarAbrigo(abrigo) {
  const response = await api.post('/abrigos', abrigo);
  return response.data;
}

// Atualiza um abrigo existente
export async function atualizarAbrigo(id, abrigo) {
  const response = await api.put(`/abrigos/${id}`, abrigo);
  return response.data;
}

// Remove um abrigo
export async function removerAbrigo(id) {
  await api.delete(`/abrigos/${id}`);
}
