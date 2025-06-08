import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  listarAbrigos,
  criarAbrigo,
  atualizarAbrigo,
  removerAbrigo,
} from '../Service/abrigoService';

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
  const [modalVisivel, setModalVisivel] = useState(false);
  const [abrigoExcluir, setAbrigoExcluir] = useState(null);

  // Estado para animação da mensagem
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    carregarAbrigos();
  }, []);

  // Animação para exibir e sumir a mensagem automaticamente
  useEffect(() => {
    if (mensagem !== '') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setMensagem('');
          setTipoMensagem('');
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mensagem]);

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
    setIdLocal(String(item.localizacao?.id));
    setEditando(true);
  }

  function confirmarExcluir(item) {
    setAbrigoExcluir(item);
    setModalVisivel(true);
  }

  async function removerAbrigos() {
    if (!abrigoExcluir) return;

    try {
      await removerAbrigo(abrigoExcluir.id);
      setMensagem('Abrigo removido com sucesso!');
      setTipoMensagem('sucesso');
      carregarAbrigos();
    } catch (err) {
      setMensagem('Erro ao remover abrigo');
      setTipoMensagem('erro');
      console.log('Erro ao deletar:', err?.response?.data || err.message);
    } finally {
      setModalVisivel(false);
      setAbrigoExcluir(null);
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
      <Text style={styles.label}>
        {editando ? 'Editar Abrigo' : 'Cadastrar Abrigo'}
      </Text>
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        placeholderTextColor="#bbb" 
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Nome"
        value={nome}
        placeholderTextColor="#bbb" 
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Capacidade"
        value={capacidade}
        placeholderTextColor="#bbb" 
        onChangeText={setCapacidade}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Ocupação"
        value={ocupacao}
        placeholderTextColor="#bbb" 
        onChangeText={setOcupacao}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Qtd Água"
        value={qtdAgua}
        placeholderTextColor="#bbb" 
        onChangeText={setQtdAgua}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Qtd Roupa"
        value={qtdRoupa}
        placeholderTextColor="#bbb" 
        onChangeText={setQtdRoupa}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Comida por Pessoa"
        value={comidaPorPessoa}
        placeholderTextColor="#bbb" 
        onChangeText={setComidaPorPessoa}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Qtd Dormitório"
        value={qtdDormitorio}
        placeholderTextColor="#bbb" 
        onChangeText={setQtdDormitorio}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="ID Local"
        value={idLocal}
        placeholderTextColor="#bbb" 
        onChangeText={setIdLocal}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={salvarAbrigo}>
        <Text style={styles.buttonText}>
          {editando ? 'Salvar Alterações' : 'Adicionar Abrigo'}
        </Text>
      </TouchableOpacity>
      {editando && (
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={limparFormulario}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>
            Cancelar Edição
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardText}>Capacidade: {item.capacidade}</Text>
      <Text style={styles.cardText}>Ocupação: {item.ocupacao}</Text>
      <Text style={styles.cardText}>
        ID Local: {item.localizacao?.id || 'Não informado'}
      </Text>
      <View style={styles.cardButtons}>
        <TouchableOpacity
          style={[styles.cardButton, styles.editButton]}
          onPress={() => editarAbrigo(item)}
        >
          <Text style={styles.cardButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cardButton, styles.deleteButton]}
          onPress={() => confirmarExcluir(item)}
        >
          <Text style={styles.cardButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Mensagem fixa no topo */}
      {mensagem !== '' && (
        <Animated.View
          style={[
            styles.mensagemContainer,
            tipoMensagem === 'erro' ? styles.mensagemErro : styles.mensagemSucesso,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.mensagemTexto}>{mensagem}</Text>
        </Animated.View>
      )}

      <FlatList
        data={abrigos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Text style={styles.title}>Abrigos</Text>}
        renderItem={renderItem}
        ListFooterComponent={renderForm}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: mensagem !== '' ? 60 : 0 }}
      />

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir o abrigo "{abrigoExcluir?.nome}"?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.cancelModalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteModalButton]}
                onPress={removerAbrigos}
              >
                <Text style={styles.deleteModalButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 12,
    color: 'white',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4da6ff',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#888',
  },
  cancelButtonText: {
    color: '#eee',
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#eee',
  },
  cardText: {
    color: '#ccc',
    marginTop: 5,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cardButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },

  // Estilos da mensagem fixa no topo
  mensagemContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 8,
    zIndex: 1000,
    alignItems: 'center',
  },
  mensagemSucesso: {
    backgroundColor: '#4caf50', // verde
  },
  mensagemErro: {
    backgroundColor: '#f44336', // vermelho
  },
  mensagemTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#222',
    padding: 25,
    borderRadius: 12,
    width: '85%',
  },
  modalText: {
    color: '#eee',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelModalButton: {
    backgroundColor: '#555',
  },
  deleteModalButton: {
    backgroundColor: '#f44336',
  },
  cancelModalButtonText: {
    color: '#eee',
    fontWeight: 'bold',
  },
  deleteModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
