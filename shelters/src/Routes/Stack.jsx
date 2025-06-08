import Donate from "../Screens/Donate";
import DonorList from "../Screens/DonorList";
import TabNavigator from "./BottonRoute";
import {  Image, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Voluntarios from "../Screens/Volunteer";
import About from "../Screens/About";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator 
    screenOptions={{ headerTitle: () => (
      <Image
        source={require('../../assets/logo.png')}
        style={styles.headerLogo}
      /> 
    ),
    headerTitleAlign: 'center'}}> 
      <Stack.Screen name="stackHome" component={TabNavigator}/>
      <Stack.Screen name="Donate" component={Donate} />
      <Stack.Screen name="DonorList" component={DonorList} />
      <Stack.Screen name="Volunteer" component={Voluntarios} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  headerLogo:{
    width:120,
    height: 50,
    resizeMode: 'contain'

  }

})