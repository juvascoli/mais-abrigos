import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Modal, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { listarVoluntarios, criarVoluntarios, atualizarVoluntario, removerVoluntario 
} from '../Service/volunteerService';
import { listarAbrigos } from '../Service/abrigoService';
import Btn from '../Components/Button';

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
    setIdAbrigo(String(item.idAbrigo || (item.abrigo && item.abrigo.id) || ''));
    setEditando(true);
  }

  async function excluirVoluntario(id) {
    try {
      await removerVoluntario(id);
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
      <Text style={styles.itemText}>
        ID do Abrigo: {item.idAbrigo || (item.abrigo && item.abrigo.id) || 'Não informado'}
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.buttonEditar}
          onPress={() => editarVoluntario(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonExcluir}
          onPress={() => excluirVoluntario(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
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
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="DDD"
        value={ddd}
        onChangeText={setDdd}
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Número de Celular"
        value={numeroCel}
        onChangeText={setNumeroCel}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="ID do Abrigo"
        value={idAbrigo}
        onChangeText={setIdAbrigo}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <Btn txt={editando ? 'Salvar Alterações' : 'Adicionar Voluntário'} pressFunc={salvarVoluntario}/>
      {editando && (
        <Btn txt="Cancelar Edição" pressFunc={limparFormulario}/>
)}

    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Voluntários</Text>
        <FlatList
          data={voluntarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderForm}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }} 
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingBottom: 40,
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
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  buttonEditar: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonExcluir: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    marginTop: 20,
  },
  abrigoItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
  submitButton: {
    backgroundColor: '#27445D',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#888',
    paddingVertical: 12,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
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
