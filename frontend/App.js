import SignIn from './pages/auth/SignIn';
import SignUpFirstStep from './pages/auth/SignUpFirstStep';
import SignUpSecondStep from './pages/auth/SignUpSecondStep';
import ForgotPassword from './pages/auth/ForgotPassword';
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
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Identification"
          component={SignIn}
          options={options}
        />
        <Stack.Screen
          name='Mot de passe oublié'
          component={ForgotPassword}
          options={options}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
