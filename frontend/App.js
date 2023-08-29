import axios from 'axios';
import SignIn from './pages/auth/SignIn';
import SignUpFirstStep from './pages/auth/SignUpFirstStep';
import SignUpSecondStep from './pages/auth/SignUpSecondStep';
import SignUpActivities from './pages/auth/SignUpActivities';
import SignUpLocation from './pages/auth/SinUpLocation';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import Profile from './pages/dashboard/Profile';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};
const options = {
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTintColor: 'black',
};
const screenOptions = {
  headerBackTitle: ""
};

export default function App() {
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        if (authToken) {
          const headers = {authorization: `Barer ${authToken}`};
          axios.get('http://192.168.1.17:3000/api/users/', {headers})
          .then((res) => {
            setIsLoggedIn(true);
          })
          .catch((err) => {
            setIsLoggedIn(false);
          });
        }
      } catch (e) {
        console.log('App.js => Asyncstorage getItem(): ' + e);
      };
    }
    getAuthToken();
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      {isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} user={user}/> :
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Identification"
          options={options}>
          {props => <SignIn {...props} setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>
        <Stack.Screen
          name='Confirmation email'
          options={options}>
          {props => <ConfirmEmail {...props} setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>
        <Stack.Screen
          name='Mot de passe oublié'
          component={ForgotPassword}
          options={options}
        />
        <Stack.Screen
          name='Nouveau mot de passe'
          options={options}>
          {props => <ResetPassword {...props} setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>
        <Stack.Screen
          name='Première étape'
          component={SignUpFirstStep}
          options={options}
        />
        <Stack.Screen
          name='Seconde étape'
          component={SignUpSecondStep}
          options={options}
        />
        <Stack.Screen
          name='Troisième étape'
          component={SignUpActivities}
          options={options}
        />
        <Stack.Screen
          name='Dernière étape'
          options={options}>
          {props => <SignUpLocation {...props} setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>
      </Stack.Navigator>
    }
    </NavigationContainer>
  );
}
