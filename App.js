import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './scr/Pages/HomeCards.js';
import CreateEdit from './scr/Pages/EditAndCreateCard.js';
import DatailCard from './scr/Pages/DetailCard.js'

import styles from './scr/Pages/Styles.js';

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

export default App;