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
import Settings from './pages/dashboard/Settings';
import Events from './pages/dashboard/Events';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const tabBarScreenOptions = ({route}) => ({
  tabBarStyle: {
    position: 'absolute',
    marginHorizontal: 70,
    marginBottom: 30,
    paddingBottom: 0,
    borderTopWidth: 0,
    borderColor: '#fff',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  tabBarShowLabel: false,
  tabBarIcon: ({focused}) => {
    const color = focused ? '#f26619' : 'grey';
    const name = route.name == 'ProfilStack' ? 'person' : 'calendar-today';
    return (<Icon name={name} color={color} size={40}/>);
  },
  headerShown: false
});

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
  const [updateApp, setUpdateApp] = useState(false);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        if (authToken) {
          const headers = {authorization: `Barer ${authToken}`};
          axios.get('http://128.53.5.198:3000/api/users/', {headers})
          .then((res) => {
            setUser(res.data.user);
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
  }, [updateApp]);

  const ProfileStackScreen = () => (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Profil" options={{headerShown: false}}>
        {props => <Profile {...props} user={user} updateApp={updateApp} setUpdateApp={setUpdateApp}/>}
      </Stack.Screen>
      <Stack.Screen name="Paramètres" options={options}>
        {props => <Settings {...props} setIsLoggedIn={setIsLoggedIn} user={user}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer theme={navTheme}>
      {isLoggedIn ?
      <Tab.Navigator screenOptions={tabBarScreenOptions}>
        <Tab.Screen name="ProfilStack" component={ProfileStackScreen}/>
        <Tab.Screen name="Événements">
          {props => <Events loggedUser={user} updateApp={updateApp} setUpdateApp={setUpdateApp}/>}
        </Tab.Screen>
      </Tab.Navigator> :
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Identification"
          options={options}>
          {props => <SignIn {...props} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
        </Stack.Screen>
        <Stack.Screen
          name='Confirmation email'
          options={options}>
          {props => <ConfirmEmail {...props} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
        </Stack.Screen>
        <Stack.Screen
          name='Mot de passe oublié'
          component={ForgotPassword}
          options={options}
        />
        <Stack.Screen
          name='Nouveau mot de passe'
          options={options}>
          {props => <ResetPassword {...props} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
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
