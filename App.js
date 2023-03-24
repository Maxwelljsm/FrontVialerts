import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationContainer
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { AuthContext } from './src/components/context';
import BookmarkScreen from './src/screens/BookMarkScreen';
import { DrawerContent } from './src/screens/DrawerContent';
import ExploreScreen from './src/screens/ExploreScreen';
import HomeScreen from './src/screens/HomeScreen';
import ListBookingScreen from './src/screens/ListBookingScreen';
import RootStackScreen from './src/screens/RootStackScreen';

const Drawer = createDrawerNavigator();
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser.token);
      const userName = `${foundUser.primer_nombre} ${foundUser.segundo_nombre} ${foundUser.primer_apellido} `;
      const email = String(foundUser.email);
      const id_usuarios =String (foundUser.id_usuarios)
      const estado =String (foundUser.estado)
      const tipo =String (foundUser.tipo)

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('name',userName);
        await AsyncStorage.setItem('email',email);
        await AsyncStorage.setItem('id_usuarios',id_usuarios);
        await AsyncStorage.setItem('estado',estado);
        await AsyncStorage.setItem('tipo',tipo);
      } catch(e) {
        console.log(e);
      }
      //console.log('user token: ', userName);
      dispatch({ type: 'LOGIN', id: userName, token: userToken, name:userName, email:email, id_usuarios:id_usuarios });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });


    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <StatusBar backgroundColor='#003366' barStyle="light-content"/>
          <NavigationContainer theme={theme}  >
            { loginState.userToken !== null ? (
              <Drawer.Navigator 
              drawerContent={props => <DrawerContent {...props} />} 
              screenOptions={{
                headerStyle: {
                backgroundColor: '#003366',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold'
                }
            }} >
                <Drawer.Screen name="Encuesta" component={HomeScreen}  />
                <Drawer.Screen name="Menu" component={BookmarkScreen}/>
                <Drawer.Screen name="Lista" component={ListBookingScreen}/>
                <Drawer.Screen name="Reserva" component={ExploreScreen}/>
              </Drawer.Navigator>
            )
          :
            <RootStackScreen/>
          }
          </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;