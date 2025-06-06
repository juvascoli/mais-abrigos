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

  useEffect(() => {
    carregarAbrigos();
  }, []);

  async function carregarAbrigos() {
    try {
      const dados = await listarAbrigos();
      setAbrigos(dados.content || dados);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar abrigos');
      console.log('Erro ao carregar abrigos:', err?.response?.data || err.message);
    }
     setAbrigos(dados.content || dados);
     console.log('Dados dos abrigos:', dados.content || dados);
 
  }

 

  async function adicionarAbrigo() {
    if (
      !nome ||
      !capacidade ||
      !ocupacao ||
      !qtdAgua ||
      !qtdRoupa ||
      !comidaPorPessoa ||
      !qtdDormitorio ||
      !idLocal
    ) {
      return Alert.alert('Preencha todos os campos!');
    }

    const novoAbrigo = {
      nome,
      capacidade: parseInt(capacidade),
      ocupacao: parseInt(ocupacao),
      qtd_agua: parseInt(qtdAgua),
      qtd_roupa: parseInt(qtdRoupa),
      comida_por_pessoa: parseInt(comidaPorPessoa),
      qtd_dormitorio: parseInt(qtdDormitorio),
      id_local: parseInt(idLocal),
    };

    try {
      const response = await criarAbrigo(novoAbrigo);
      console.log('Abrigo criado com sucesso:', response);
      limparFormulario();
      carregarAbrigos();
    } catch (err) {
      console.log('Erro ao criar abrigo:', err?.response?.data || err.message);
      Alert.alert(
        'Erro',
        'Não foi possível criar o abrigo. Verifique os dados preenchidos ou tente novamente.'
      );
    }
  }

  function limparFormulario() {
    setNome('');
    setCapacidade('');
    setOcupacao('');
    setQtdAgua('');
    setQtdRoupa('');
    setComidaPorPessoa('');
    setQtdDormitorio('');
    setIdLocal('');
  }

  const renderForm = () => (
    <View style={styles.form}>
      <Text style={styles.title}>Cadastrar novo abrigo</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Capacidade" value={capacidade} onChangeText={setCapacidade} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Ocupação" value={ocupacao} onChangeText={setOcupacao} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Água" value={qtdAgua} onChangeText={setQtdAgua} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Roupa" value={qtdRoupa} onChangeText={setQtdRoupa} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Comida por Pessoa" value={comidaPorPessoa} onChangeText={setComidaPorPessoa} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Qtd Dormitório" value={qtdDormitorio} onChangeText={setQtdDormitorio} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="ID Local" value={idLocal} onChangeText={setIdLocal} style={styles.input} keyboardType="numeric" />
      <Button title="Adicionar Abrigo" onPress={adicionarAbrigo} />
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={abrigos}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Text style={styles.title}>Abrigos</Text>}
      renderItem={({ item }) => (
        <Text style={styles.item}>
          {item.nome} - Capacidade: {item.capacidade} - Ocupação: {item.ocupacao}
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
});
