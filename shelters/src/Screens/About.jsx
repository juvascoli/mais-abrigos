
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Sobre() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Sobre o Projeto</Text>

      <Text style={styles.texto}>
      O Mais Abrigo é um aplicativo desenvolvido com o propósito de oferecer suporte eficiente e humano às vítimas de desastres naturais, com foco especial em enchentes urbanas, um problema recorrente na cidade de São Paulo.
      </Text>

      <Text style={styles.texto}>
        Visando ajudar a população atingida por esses trágicos incidentes, o Mais Abrigo tem como principal objetivo ser um polo de incentivo à doação. Ele conta com funcionalidades que permitem:
      </Text>

      <Text style={styles.lista}>
        • Disponibilizar a localização dos abrigos mais próximos{"\n"}
        • Indicar os recursos disponíveis em cada abrigo{"\n"}
        • Facilitar doações de roupas, leitos, alimentos e água{"\n"}
        • Registrar e informar o que já foi doado
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 15,
    lineHeight: 24,
  },
  destaque: {
    color: '#4da6ff',
    fontWeight: 'bold',
  },
  lista: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 20,
    lineHeight: 24,
    paddingLeft: 10,
  },
});
