import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackRoute";

export default function Routes(){
    return(
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}