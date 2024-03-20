import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './Screens/main';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/navigation';


function App(): React.JSX.Element {

  return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center'
    }
});

export default App;
