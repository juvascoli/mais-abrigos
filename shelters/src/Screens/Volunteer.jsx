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
import {  criarVoluntarios } from '../Service/volunteerService';
import { listarAbrigos } from '../Service/abrigoService'; // <-- Supondo esse nome de service

export default function Voluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [abrigos, setAbrigos] = useState([]);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [ddd, setDdd] = useState('');
  const [numeroCel, setNumeroCel] = useState('');
  const [idAbrigo, setIdAbrigo] = useState('');

  useEffect(() => {
    carregarAbrigos();
  }, []);

  
  async function carregarAbrigos() {
    try {
      const dados = await listarAbrigos();
      setAbrigos(dados.content || dados);
      console.log('Abrigos carregados:', dados.content || dados);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar abrigos');
      console.log('Erro ao carregar abrigos:', err?.response?.data || err.message);
    }
  }

  async function adicionarVoluntario() {
    if (!id || !nome || !cpf || !ddd || !numeroCel || !idAbrigo) {
      return Alert.alert('Preencha todos os campos!');
    }

    const novoVoluntario = {
      id: parseInt(id),
      nome,
      cpf,
      ddd: parseInt(ddd),
      numeroCel,
      idAbrigo: parseInt(idAbrigo),
    };

    try {
      console.log('Enviando para API:', novoVoluntario);
      const response = await criarVoluntarios(novoVoluntario);
      console.log('Voluntário criado com sucesso:', response);
      limparFormulario();
      carregarVoluntarios();
    } catch (err) {
      console.log('Erro ao criar voluntário:', err?.response?.data || err.message);
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar o voluntário. Verifique os dados preenchidos ou tente novamente.'
      );
    }
  }

  function limparFormulario() {
    setId('');
    setNome('');
    setCpf('');
    setDdd('');
    setNumeroCel('');
    setIdAbrigo('');
  }

  const renderForm = () => (
    <View style={styles.form}>
      <Text style={styles.subtitle}>IDs dos abrigos disponíveis:</Text>
      {abrigos.map((abrigo) => (
        <Text key={abrigo.id} style={styles.abrigoItem}>
          {abrigo.id} - {abrigo.nome}
        </Text>
      ))}

      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="DDD"
        value={ddd}
        onChangeText={setDdd}
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
      />
      <TextInput
        placeholder="Número de Celular"
        value={numeroCel}
        onChangeText={setNumeroCel}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="ID do Abrigo"
        value={idAbrigo}
        onChangeText={setIdAbrigo}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Adicionar Voluntário" onPress={adicionarVoluntario} />
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={voluntarios}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Text style={styles.title}>Seja um voluntário:</Text>}
      renderItem={({ item }) => (
        <Text style={styles.item}>
          {item.nome} - CPF: {item.cpf} - Cel: ({item.ddd}) {item.numeroCel} - Abrigo: {item.idAbrigo}
        </Text>
      )}
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
  item: {
    marginBottom: 5,
  },
  abrigoItem: {
    fontSize: 14,
    marginBottom: 2,
  },
});
