import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { listarAbrigos, criarAbrigo } from '../Service/abrigoService';

export default function Abrigos() {
  const [abrigos, setAbrigos] = useState([]);
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [ocupacao, setOcupacao] = useState('');
  const [qtdAgua, setQtdAgua] = useState('');
  const [qtdRoupa, setQtdRoupa] = useState('');
  const [comidaPorPessoa, setComidaPorPessoa] = useState('');
  const [qtdDormitorio, setQtdDormitorio] = useState('');
  const [idLocal, setIdLocal] = useState('');

  async function carregarAbrigos() {
    try {
      const dados = await listarAbrigos();
      setAbrigos(dados.content || dados);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar abrigos');
    }
  }

  async function adicionarAbrigo() {
    if (!nome || !capacidade || !ocupacao || !qtdAgua || !qtdRoupa || !comidaPorPessoa || !qtdDormitorio || !idLocal) {
      return Alert.alert('Preencha todos os campos!');
    }
    try {
      await criarAbrigo({
        nome,
        capacidade: parseInt(capacidade),
        ocupacao: parseInt(ocupacao),
        qtd_agua: parseInt(qtdAgua),
        qtd_roupa: parseInt(qtdRoupa),
        comida_por_pessoa: parseInt(comidaPorPessoa),
        qtd_dormitorio: parseInt(qtdDormitorio),
        id_local: parseInt(idLocal),
      });
      setNome('');
      setCapacidade('');
      setOcupacao('');
      setQtdAgua('');
      setQtdRoupa('');
      setComidaPorPessoa('');
      setQtdDormitorio('');
      setIdLocal('');
      carregarAbrigos();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar o abrigo');
    }
  }

  useEffect(() => {
    carregarAbrigos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Abrigos</Text>

      <FlatList
        data={abrigos}
        keyExtractor={(item) => item.id_abrigo.toString()}
        renderItem={({ item }) => (
          <Text>{item.nome} - Capacidade: {item.capacidade} - Ocupação: {item.ocupacao}</Text>
        )}
      />

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Capacidade" value={capacidade} onChangeText={setCapacidade} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Ocupação" value={ocupacao} onChangeText={setOcupacao} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Água" value={qtdAgua} onChangeText={setQtdAgua} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Roupa" value={qtdRoupa} onChangeText={setQtdRoupa} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Comida por Pessoa" value={comidaPorPessoa} onChangeText={setComidaPorPessoa} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Dormitório" value={qtdDormitorio} onChangeText={setQtdDormitorio} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="ID Local" value={idLocal} onChangeText={setIdLocal} style={styles.input} keyboardType="numeric" />

      <Button title="Adicionar Abrigo" onPress={adicionarAbrigo} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
  },
});
