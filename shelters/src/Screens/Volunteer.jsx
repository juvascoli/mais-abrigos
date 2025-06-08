import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  listarVoluntarios,
  criarVoluntarios,
  atualizarVoluntario,
  removerVoluntario as deletarVoluntario,
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

  const [modalVisivel, setModalVisivel] = useState(false);
  const [textoModal, setTextoModal] = useState('');

  useEffect(() => {
    carregarAbrigos();
    carregarVoluntarios();
  }, []);

  function exibirModal(mensagem) {
    setTextoModal(mensagem);
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
  }

  async function carregarAbrigos() {
    try {
      const dados = await listarAbrigos();
      setAbrigos(dados.content || dados);
    } catch (err) {
      console.log('Erro ao carregar abrigos:', err?.response?.data || err.message);
      exibirModal('Erro ao carregar abrigos.');
    }
  }

  async function carregarVoluntarios() {
    try {
      const dados = await listarVoluntarios();
      setVoluntarios(dados.content || dados);
    } catch (err) {
      console.log('Erro ao carregar voluntários:', err?.response?.data || err.message);
      exibirModal('Erro ao carregar voluntários.');
    }
  }

  async function salvarVoluntario() {
    if (!id || !nome || !cpf || !ddd || !numeroCel || !idAbrigo) {
      exibirModal('Preencha todos os campos!');
      return;
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
        exibirModal('Voluntário atualizado com sucesso!');
      } else {
        await criarVoluntarios(voluntario);
        exibirModal('Voluntário cadastrado com sucesso!');
      }
      limparFormulario();
      carregarVoluntarios();
    } catch (err) {
      console.log('Erro ao salvar voluntário:', err?.response?.data || err.message);
      exibirModal('Erro ao salvar voluntário.');
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

  async function excluirVoluntario(id) {
    try {
      await deletarVoluntario(id);
      exibirModal('Voluntário excluído com sucesso!');
      carregarVoluntarios();
    } catch (err) {
      console.log('Erro ao excluir voluntário:', err?.response?.data || err.message);
      exibirModal('Erro ao excluir voluntário.');
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemTitle}>{item.nome}</Text>
      <Text style={styles.itemText}>CPF: {item.cpf}</Text>
      <Text style={styles.itemText}>Celular: ({item.ddd}) {item.numeroCel}</Text>
      <Text style={styles.itemText}>ID do Abrigo: {item.idAbrigo}</Text>
      <View style={styles.buttonRow}>
        <Button title="Editar" onPress={() => editarVoluntario(item)} color="#A4CCD9" />
        <View style={{ width: 10 }} />
        <Button title="Excluir" onPress={() => excluirVoluntario(item.id)} color="#ff4d4d" />
      </View>
    </View>
  );

  const renderForm = () => (
    <View style={styles.form}>
      <Text style={styles.subtitle}>Cadastrar Voluntário</Text>
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
      <Button title={editando ? 'Salvar Alterações' : 'Adicionar Voluntário'} color="#27445D" onPress={salvarVoluntario} />
      {editando && (
        <View style={{ marginTop: 10 }}>
          <Button title="Cancelar Edição" onPress={limparFormulario} color="#888" />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voluntários</Text>
      <FlatList
        data={voluntarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderForm}
      />

      <Modal animationType="slide" transparent visible={modalVisivel} onRequestClose={fecharModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{textoModal}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={fecharModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#EEEEEE',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A4CCD9',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemText: {
    color: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  form: {
    marginTop: 20,
  },
  abrigoItem: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#A4CCD9',
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    textAlign: 'center',
    color: '#121212',
    fontWeight: 'bold',
  },
});
