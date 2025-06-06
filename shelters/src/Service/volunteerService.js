import api from './api';



export async function criarVoluntarios(voluntarios) {
  try {
    const response = await api.post('/voluntarios', voluntarios);
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


export async function listarVoluntarios() {
  const response = await api.get('/voluntarios');
  return response.data;
}

export async function buscarVoluntario(id) {
  const response = await api.get(`/voluntarios/${id}`);
  return response.data;
}


export async function atualizarVoluntario(id, voluntario) {
  const response = await api.put(`/oluntarios/${id}`, Voluntario);
  return response.data;
}


export async function removerVoluntario(id) {
  await api.delete(`/voluntarios/${id}`);
}
