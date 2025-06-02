import AsyncStorage from '@react-native-async-storage/async-storage';
import  { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet,Text,TouchableOpacity,View} from 'react-native';

export default function DonorListScreen( { navigation }) {
  const [doacoes, setDoacoes] = useState([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [textoModal, setTextoModal] = useState('');

  const [doacaoParaRemover, setDoacaoParaRemover] = useState(null);
  const [modalConfirmVisivel, setModalConfirmVisivel] = useState(false);

  const exibirModalInfo = (mensagem) => {
    setTextoModal(mensagem);
    setModalVisivel(true);
  };

  const fecharModalInfo = () => {
    setModalVisivel(false);
  };

  const abrirModalConfirmacao = (doacao) => {
    setDoacaoParaRemover(doacao);
    setModalConfirmVisivel(true);
  };

  const fecharModalConfirmacao = () => {
    setDoacaoParaRemover(null);
    setModalConfirmVisivel(false);
  };

  const carregarDoacoes = async () => {
    try {
      const dados = await AsyncStorage.getItem('doacoes');
      if (dados) {
        setDoacoes(JSON.parse(dados));
      } else {
        setDoacoes([]);
      }
    } catch (error) {
      exibirModalInfo('Erro ao carregar os dados.');
    }
  };

  useEffect(() => {
    carregarDoacoes();
  }, []);

  const confirmarRemocao = async () => {
    if (!doacaoParaRemover) return;

    try {
      const novasDoacoes = doacoes.filter(
        (d) => d.dataRegistro !== doacaoParaRemover.dataRegistro
      );
      await AsyncStorage.setItem('doacoes', JSON.stringify(novasDoacoes));
      setDoacoes(novasDoacoes);
      exibirModalInfo('Doação removida com sucesso!');
    } catch (error) {
      exibirModalInfo('Erro ao remover a doação.');
    }

    fecharModalConfirmacao();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Doadores</Text>

      {doacoes.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma doação registrada.</Text>
      ) : (
        <FlatList
          data={doacoes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>Doador: {item.nomeDoador}</Text>
              <Text style={styles.tipo}>Tipo: {item.tipoDoacao}</Text>
              <Text style={styles.valor}>Valor: {item.valor}</Text>
              {item.observacoes ? (
                <Text style={styles.observacoes}>Obs: {item.observacoes}</Text>
              ) : null}
              <TouchableOpacity
                onPress={() => abrirModalConfirmacao(item)}
                style={styles.botaoRemover}
              >
                <Text style={styles.textoRemover}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}


      <Modal transparent visible={modalVisivel} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{textoModal}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={fecharModalInfo}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={modalConfirmVisivel} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {doacaoParaRemover && (
              <>
                <Text style={styles.modalText}>
                  Deseja remover a doação de {doacaoParaRemover.nomeDoador}?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#666' }]}
                    onPress={fecharModalConfirmacao}
                  >
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { marginLeft: 10 }]}
                    onPress={confirmarRemocao}
                  >
                    <Text style={styles.modalButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27445D',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  nome: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  tipo: { fontSize: 14, color: '#ccc' },
  valor: { fontSize: 14, color: '#fff' },
  observacoes: { fontSize: 14, color: '#ccc' },
  botaoRemover: {
    marginTop: 8,
    backgroundColor: '#d32f2f',
    paddingVertical: 6,
    borderRadius: 8,
  },
  textoRemover: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  vazio: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    textAlign: 'center',
    color: '#121212',
    fontWeight: 'bold',
  },
});
