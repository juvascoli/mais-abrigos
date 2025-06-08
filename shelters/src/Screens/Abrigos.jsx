import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet,
} from 'react-native';
import { listarAbrigos, criarAbrigo, atualizarAbrigo, removerAbrigo} from '../Service/abrigoService';

export default function Abrigos() {
  const [abrigos, setAbrigos] = useState([]);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [ocupacao, setOcupacao] = useState('');
  const [qtdAgua, setQtdAgua] = useState('');
  const [qtdRoupa, setQtdRoupa] = useState('');
  const [comidaPorPessoa, setComidaPorPessoa] = useState('');
  const [qtdDormitorio, setQtdDormitorio] = useState('');
  const [idLocal, setIdLocal] = useState('');
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); 

  useEffect(() => {
    carregarAbrigos();
  }, []);

  async function carregarAbrigos() {
    try {
      const dados = await listarAbrigos();
      setAbrigos(dados.content || dados);
    } catch (err) {
      setMensagem('Erro ao carregar abrigos');
      setTipoMensagem('erro');
      console.log('Erro ao carregar abrigos:', err?.response?.data || err.message);
    }
  }

  async function salvarAbrigo() {
    if (
      !id || !nome || !capacidade || !ocupacao || !qtdAgua ||
      !qtdRoupa || !comidaPorPessoa || !qtdDormitorio || !idLocal
    ) {
      setMensagem('Preencha todos os campos!');
      setTipoMensagem('erro');
      return;
    }

    const abrigoData = {
      id: parseInt(id),
      nome,
      capacidade: parseInt(capacidade),
      ocupacao: parseInt(ocupacao),
      qtdAgua: parseInt(qtdAgua),
      qtdRoupa: parseInt(qtdRoupa),
      comidaPorPessoa: parseInt(comidaPorPessoa),
      qtdDormitorio: parseInt(qtdDormitorio),
      idLocal: parseInt(idLocal),
    };

    try {
      if (editando) {
        await atualizarAbrigo(id, abrigoData);
        setMensagem('Abrigo atualizado com sucesso!');
      } else {
        await criarAbrigo(abrigoData);
        setMensagem('Abrigo criado com sucesso!');
      }
      setTipoMensagem('sucesso');
      limparFormulario();
      carregarAbrigos();
    } catch (err) {
      console.log('Erro ao salvar abrigo:', err?.response?.data || err.message);
      setMensagem('Não foi possível salvar o abrigo.');
      setTipoMensagem('erro');
    }
  }

  function editarAbrigo(item) {
    setId(String(item.id));
    setNome(item.nome);
    setCapacidade(String(item.capacidade));
    setOcupacao(String(item.ocupacao));
    setQtdAgua(String(item.qtdAgua));
    setQtdRoupa(String(item.qtdRoupa));
    setComidaPorPessoa(String(item.comidaPorPessoa));
    setQtdDormitorio(String(item.qtdDormitorio));
    setIdLocal(String(item.idLocal));
    setEditando(true);
  }

  async function removerAbrigos(id) {
    try {
      await removerAbrigo(id);
      setMensagem('Abrigo removido com sucesso!');
      setTipoMensagem('sucesso');
      carregarAbrigos();
    } catch (err) {
      setMensagem('Erro ao remover abrigo');
      setTipoMensagem('erro');
      console.log('Erro ao deletar:', err?.response?.data || err.message);
    }
  }

  function limparFormulario() {
    setId('');
    setNome('');
    setCapacidade('');
    setOcupacao('');
    setQtdAgua('');
    setQtdRoupa('');
    setComidaPorPessoa('');
    setQtdDormitorio('');
    setIdLocal('');
    setEditando(false);
  }

  const renderForm = () => (
    <View style={styles.form}>
      <Text style={styles.title}>
        {editando ? 'Editar Abrigo' : 'Cadastrar Abrigo'}
      </Text>
      <TextInput placeholder="ID" value={id} onChangeText={setId} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Capacidade" value={capacidade} onChangeText={setCapacidade} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Ocupação" value={ocupacao} onChangeText={setOcupacao} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Água" value={qtdAgua} onChangeText={setQtdAgua} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Roupa" value={qtdRoupa} onChangeText={setQtdRoupa} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Comida por Pessoa" value={comidaPorPessoa} onChangeText={setComidaPorPessoa} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Dormitório" value={qtdDormitorio} onChangeText={setQtdDormitorio} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="ID Local" value={idLocal} onChangeText={setIdLocal} style={styles.input} keyboardType="numeric" />
      <Button title={editando ? 'Salvar Alterações' : 'Adicionar Abrigo'} onPress={salvarAbrigo} />
      {editando && (
        <View style={{ marginTop: 10 }}>
          <Button title="Cancelar Edição" onPress={limparFormulario} color="gray" />
        </View>
      )}
      {mensagem !== '' && (
        <Text style={[styles.feedback, tipoMensagem === 'erro' ? styles.erro : styles.sucesso]}>
          {mensagem}
        </Text>
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemTitle}>{item.nome}</Text>
      <Text style={styles.itemText}>Capacidade: {item.capacidade}</Text>
      <Text style={styles.itemText}>Ocupação: {item.ocupacao}</Text>
      <Text style={styles.itemText}>ID Local: {item.idLocal}</Text>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Button title="Editar" onPress={() => editarAbrigo(item)} />
        <View style={{ width: 10 }} />
        <Button title="Excluir" onPress={() => removerAbrigos(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={abrigos}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Text style={styles.title}>Abrigos</Text>}
      renderItem={renderItem}
      ListFooterComponent={renderForm}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  form: {
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
  },
  feedback: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  sucesso: {
    color: 'green',
    backgroundColor: '#e6ffe6',
  },
  erro: {
    color: 'red',
    backgroundColor: '#ffe6e6',
  },
});
