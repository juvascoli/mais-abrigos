import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./Stack";

export default function Routes(){
    return(
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}