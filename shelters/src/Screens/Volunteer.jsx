import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  listarVoluntarios,
  criarVoluntarios,
  atualizarVoluntario,
  removerVoluntario,
} from '../Service/volunteerService';
import { listarAbrigos } from '../Service/abrigoService';

export default function Voluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [abrigos, setAbrigos] = useState([]);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [ddd, setDdd] = useState('');
  const [numeroCel, setNumeroCel] = useState('');
  const [idAbrigo, setIdAbrigo] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    carregarAbrigos();
    carregarVoluntarios();
  }, []);

  async function carregarAbrigos() {
    try {
      const dados = await listarAbrigos();
      setAbrigos(dados.content || dados);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar abrigos');
      console.log('Erro ao carregar abrigos:', err?.response?.data || err.message);
    }
  }

  async function carregarVoluntarios() {
    try {
      const dados = await listarVoluntarios();
      setVoluntarios(dados.content || dados);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar voluntários');
      console.log('Erro ao carregar voluntários:', err?.response?.data || err.message);
    }
  }

  async function salvarVoluntario() {
    if (!id || !nome || !cpf || !ddd || !numeroCel || !idAbrigo) {
      return Alert.alert('Preencha todos os campos!');
    }

    const voluntario = {
      id: parseInt(id),
      nome,
      cpf,
      ddd: parseInt(ddd),
      numeroCel,
      idAbrigo: parseInt(idAbrigo),
    };

    try {
      if (editando) {
        await atualizarVoluntario(id, voluntario);
        Alert.alert('Sucesso', 'Voluntário atualizado!');
      } else {
        await criarVoluntarios(voluntario);
        Alert.alert('Sucesso', 'Voluntário cadastrado!');
      }
      limparFormulario();
      carregarVoluntarios();
    } catch (err) {
      console.log('Erro ao salvar voluntário:', err?.response?.data || err.message);
      Alert.alert('Erro', 'Falha ao salvar voluntário.');
    }
  }

  function editarVoluntario(item) {
    setId(String(item.id));
    setNome(item.nome);
    setCpf(item.cpf);
    setDdd(String(item.ddd));
    setNumeroCel(item.numeroCel);
    setIdAbrigo(String(item.idAbrigo));
    setEditando(true);
  }

  async function removerVoluntario(id) {
    try {
      await removerVoluntario(id);
      Alert.alert('Sucesso', 'Voluntário excluído!');
      carregarVoluntarios();
    } catch (err) {
      console.log('Erro ao deletar voluntário:', err?.response?.data || err.message);
      Alert.alert('Erro', 'Erro ao remover voluntário');
    }
  }

  function limparFormulario() {
    setId('');
    setNome('');
    setCpf('');
    setDdd('');
    setNumeroCel('');
    setIdAbrigo('');
    setEditando(false);
  }

  const renderForm = () => (
    <View style={styles.form}>
      <Text style={styles.subtitle}>IDs dos abrigos disponíveis:</Text>
      {abrigos.map((abrigo) => (
        <Text key={abrigo.id} style={styles.abrigoItem}>
          {abrigo.id} - {abrigo.nome}
        </Text>
      ))}
      <TextInput placeholder="ID" value={id} onChangeText={setId} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="DDD" value={ddd} onChangeText={setDdd} style={styles.input} keyboardType="numeric" maxLength={2} />
      <TextInput placeholder="Número de Celular" value={numeroCel} onChangeText={setNumeroCel} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="ID do Abrigo" value={idAbrigo} onChangeText={setIdAbrigo} style={styles.input} keyboardType="numeric" />
      <Button title={editando ? 'Salvar Alterações' : 'Adicionar Voluntário'} onPress={salvarVoluntario} />
      {editando && (
        <View style={{ marginTop: 10 }}>
          <Button title="Cancelar Edição" onPress={limparFormulario} color="gray" />
        </View>
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemTitle}>{item.nome}</Text>
      <Text style={styles.itemText}>CPF: {item.cpf}</Text>
      <Text style={styles.itemText}>Cel: ({item.ddd}) {item.numeroCel}</Text>
      <Text style={styles.itemText}>Abrigo ID: {item.idAbrigo}</Text>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Button title="Editar" onPress={() => editarVoluntario(item)} />
        <View style={{ width: 10 }} />
        <Button title="Excluir" onPress={() => removerVoluntario(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={voluntarios}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Text style={styles.title}>Cadastro de Voluntários</Text>}
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
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
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemText: {
    fontSize: 14,
  },
  abrigoItem: {
    fontSize: 14,
    marginBottom: 2,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});
