import React, { useEffect, useState } from 'react';
import { listarAbrigos } from './abrigoService'; 
function ListarAbrigos() {
  const [abrigos, setAbrigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarAbrigos() {
      try {
        const dados = await listarAbrigos();
        setAbrigos(dados);
      } catch (error) {
        setErro('Erro ao carregar abrigos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarAbrigos();
  }, []);

  if (loading) return <p>Carregando abrigos...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <h2>Lista de Abrigos</h2>
      {abrigos.length === 0 ? (
        <p>Nenhum abrigo encontrado.</p>
      ) : (
        <ul>
          {abrigos.map((abrigo) => (
            <li key={abrigo.id}>
              <strong>Nome:</strong> {abrigo.nome} <br />
              <strong>Capacidade:</strong> {abrigo.capacidade} <br />
              <strong>Endereço:</strong> {abrigo.endereco}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListarAbrigos;
