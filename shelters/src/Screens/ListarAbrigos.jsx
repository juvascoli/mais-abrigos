import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { listarAbrigos } from './abrigoService'; 

export default function ListarAbrigos() {
  const [abrigos, setAbrigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarAbrigos() {
      try {
        const dados = await listarAbrigos();
        setAbrigos(dados);
      } catch (error) {
        setErro('Erro ao carregar abrigos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarAbrigos();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#27445D" />
        <Text style={styles.loadingText}>Carregando abrigos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Abrigos</Text>
      {abrigos.length === 0 ? (
        <Text style={styles.noData}>Nenhum abrigo encontrado.</Text>
      ) : (
        <FlatList
          data={abrigos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.abrigoItem}>
              <Text style={styles.abrigoText}><Text style={styles.label}>Nome:</Text> {item.nome}</Text>
              <Text style={styles.abrigoText}><Text style={styles.label}>Capacidade:</Text> {item.capacidade}</Text>
              <Text style={styles.abrigoText}><Text style={styles.label}>Endereço:</Text> {item.endereco}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#EEE',
    marginTop: 10,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  noData: {
    color: '#EEE',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#EEE',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  abrigoItem: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  abrigoText: {
    color: '#DDD',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#A4CCD9',
  },
});
