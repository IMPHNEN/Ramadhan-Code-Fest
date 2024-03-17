import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/navigation";

export const useAppNav = () => {

    return useNavigation<NavigationProp<RootStackParamList>>();
}











