import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mais Abrigos</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Abrigos")}
      >
        <Text style={styles.textoBotao}>Abrigos</Text>
      </TouchableOpacity>

          <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Abrigos")}
      >
        <Text style={styles.textoBotao}>Doação</Text>
      </TouchableOpacity>

    <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Abrigos")}
      >
        <Text style={styles.textoBotao}>Quem Somos?</Text>
      </TouchableOpacity>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00c851",
    marginBottom: 30,
  },
  botao: {
    backgroundColor: "#2e2e2e",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
  },
  textoBotao: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
