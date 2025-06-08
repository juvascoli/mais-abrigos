import api from './api';


export async function criarAbrigo(abrigo) {
  try {
    const response = await api.post('/abrigos', abrigo);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Erro da API:', error.response.data);
    } else {
      console.log('Erro desconhecido:', error.message);
    }
    throw error; 
  }
}


export async function listarAbrigos() {
  const response = await api.get('/abrigos');
  return response.data;
}


export async function buscarAbrigo(id) {
  const response = await api.get(`/abrigos/${id}`);
  return response.data;
}




export async function atualizarAbrigo(id, abrigo) {
  const response = await api.put(`/abrigos/${id}`, abrigo);
  return response.data;
}

// Remove um abrigo
export async function removerAbrigo(id) {
  await api.delete(`/abrigos/${id}`);
}
