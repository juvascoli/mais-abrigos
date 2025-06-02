import Us from "../Telas/Us";
import Produto from "../Telas/Produto";
import TabNavigator from "./BottonRoute";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator}
        options={{
          headerTitle: '', 
          headerLeft: () => (
            <Feather 
              name="shopping-bag" 
              size={22} 
              color="black"
              style={{ marginLeft: 10 }} 
            />
          ),
        }}
      />
      <Stack.Screen name="Us" component={Us} />
      <Stack.Screen name="Produto" component={Produto} />
    </Stack.Navigator>
  );
}