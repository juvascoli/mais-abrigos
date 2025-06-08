import { StyleSheet, Text, View } from "react-native";
import Btn from "../Components/Button"; 

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mais Abrigos</Text>
      <Btn
        txt="Doações"
        pressFunc={() => navigation.navigate("DonorList")}
      />

      <Btn
        txt="Seja um voluntário"
        pressFunc={() => navigation.navigate("Volunteer")}
      />

      <Btn
        txt="Sobre"
        pressFunc={() => navigation.navigate("About")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#27445D",
    marginBottom: 30,
  },
});
