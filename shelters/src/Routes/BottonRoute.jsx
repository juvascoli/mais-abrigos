import Us from '../Telas/Us';
import Home from '../Telas/Home';

import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function TabNavigator({route}){
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}
            initialRouteName={route?.params?.initialRouteName || "Home"}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Feather name='home' size={20} />,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen name="Us" component={Us} 
        options={{
            tabBarIcon: () => <Feather name='shopping-cart' size={20} />,
            tabBarLabel: "Us"
        }}
      />


    </Tab.Navigator>
    );
}