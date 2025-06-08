import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function Btn({ txt, pressFunc }) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pressFunc} style={styles.button}>
      <Text style={styles.buttonText}>{txt}</Text>
       </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
    button: {   
         backgroundColor: "#27445D",
          width: 250,           
          height: 50,           
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,    
        },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    }
});
