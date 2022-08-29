import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './scr/Pages/HomeCards.js';
import CreateEdit from './scr/Pages/EditAndCreateCard.js';
import DatailCard from './scr/Pages/DetailCard.js'

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={styles.nav}>
      <Stack.Screen name="HomeCards" component={Home} options={{ title: "Home Cards" }} />
      <Stack.Screen name="CreateEdit" component={CreateEdit} options={({ route }) => ({
        title: route.params !== undefined ? "Edit Card" : "Create Card"
      })} />
      <Stack.Screen name="DatailCard" component={DatailCard} options={{ title: "Card details" }} />
    </Stack.Navigator>
  </NavigationContainer>
)


const Stack = createNativeStackNavigator();

const styles = {
  nav: {
    headerStyle: {
      backgroundColor: '#8B18D3',
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 22,
    },
    headerTitleAlign: 'center',
    statusBarColor: '#8B18D3',
    statusBarStyle: 'light',
  }
}

export default App;