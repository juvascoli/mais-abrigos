import React, { useEffect, useState } from 'react';
import { View,Text,TextInput,Button,FlatList,StyleSheet,Alert} from 'react-native';
import { listarAbrigos, criarAbrigo } from '../Service/abrigoService';

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

  useEffect(() => {
    carregarAbrigos();
  }, []);

  async function carregarAbrigos() {
    try {
      const dados = await listarAbrigos();
      setAbrigos(dados.content || dados);
      console.log('Dados dos abrigos:', dados.content || dados);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar abrigos');
      console.log('Erro ao carregar abrigos:', err?.response?.data || err.message);
    }
  }

  async function adicionarAbrigo() {
    if (
      !id ||
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
      console.log('Enviando para API:', novoAbrigo);
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
    setId('');
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
      <Text style={styles.title}>Cadastrar Abrigo</Text>
      <TextInput placeholder="ID" value={id} onChangeText={setId} style={styles.input} keyboardType="numeric" />
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemTitle}>{item.nome}</Text>
      <Text style={styles.itemText}>Capacidade: {item.capacidade}</Text>
      <Text style={styles.itemText}>Ocupação: {item.ocupacao}</Text>
      <Text style={styles.itemText}>ID Local: {item.idLocal}</Text>
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
});
