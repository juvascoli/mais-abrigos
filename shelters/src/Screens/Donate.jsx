import { useState } from 'react';
import {View,Text,TextInput,Button,Modal,TouchableOpacity,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '../Components/Button';
export default function Donate() {
  const [nomeDoador, setNomeDoador] = useState('');
  const [tipoDoacao, setTipoDoacao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [textoModal, setTextoModal] = useState('');

  const salvarDoacao = async () => {
    if (!nomeDoador.trim() || !tipoDoacao.trim() || !quantidade.trim()) {
      exibirModal('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const novaDoacao = {
      nomeDoador: nomeDoador.trim(),
      tipoDoacao: tipoDoacao.trim(),
      quantidade: quantidade.trim(),
      dataRegistro: new Date().toISOString(),
    };

    try {
      const dados = await AsyncStorage.getItem('doacoes');
      const doacoes = dados ? JSON.parse(dados) : [];

      doacoes.push(novaDoacao);
      await AsyncStorage.setItem('doacoes', JSON.stringify(doacoes));

      exibirModal('Doação registrada com sucesso.');
      setNomeDoador('');
      setTipoDoacao('');
      setQuantidade('');
    } catch (error) {
      exibirModal('Erro ao registrar a doação. Tente novamente.');
    }
  };

  const exibirModal = (mensagem) => {
    setTextoModal(mensagem);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Doação</Text>

      <TextInput
        placeholder="Adicione seu nome aqui doador :)"
        value={nomeDoador}
        onChangeText={setNomeDoador}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Tipo de Doação (ex: roupas, alimentos)"
        value={tipoDoacao}
        onChangeText={setTipoDoacao}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <View style={styles.botao}>
        <Btn txt='Salvar' pressFunc={salvarDoacao} />
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisivel}
        onRequestClose={fecharModal}
      >
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EEEEEE',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 12,
  },
  botao: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
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
