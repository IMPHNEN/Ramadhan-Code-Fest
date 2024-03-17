import { NavigatorScreenParams } from "@react-navigation/native";
import Main from "../Screens/main";
import Setter from "../Screens/Setter";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
}

export type OnboardingStackParamList = {
    Main: undefined;
    Setter: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>()

const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator>
            <OnboardingStack.Screen name="Main" component={Main} />
            <OnboardingStack.Screen name="Setter" component={Setter} /> 
        </OnboardingStack.Navigator>
    )
}


export const RootNavigator = () => {
    return(
        <RootStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        </RootStack.Navigator>
    )
}




