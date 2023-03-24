import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
          <ImageBackground source={require('../assets/Imagenes/screens.jpg')} style={styles.image}> 
            <View style={styles.header}>
                <Animatable.Image 
                    animation="bounceIn"
                    duraton="1500"
                source={require('../assets/Logos/Logo_blanco_iccono.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
                <Text style={styles.title}>BIENVENIDO A</Text>
                <Text style={styles.title}>COWORK Q-VISION</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                        <LinearGradient 
                            colors={['#003366', '#003366']}
                            style={styles.signIn}>
                                <Text style={styles.textSign}>Iniciar Sesión</Text>
                            <MaterialIcons 
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                            </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}>
                        <LinearGradient 
                            colors={['#003366', '#003366']}
                            style={styles.signIn}>
                                <Text style={styles.textSign}>Registrate</Text>
                            <MaterialIcons 
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                            </LinearGradient>
                    </TouchableOpacity>
                </View>

            </View>
          
            <StatusBar backgroundColor='#003366' barStyle="light-content"/>
            
        </ImageBackground>
      </View>
    );
};

export default SplashScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const height_logo = windowHeight * 0.1;
const height_back = windowHeight * 1;
const whidt_back = windowWidth * 1;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#003366'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgba(8,45,118,0.5)'
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: '#fff',
      marginTop:5
  },
  button: {
      marginTop: 20
  },
  signIn: {
      width: 200,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#003366',
      flexDirection: 'row'
  },
  textSign: {
      color: '#fff',
      fontWeight: 'bold'
  },
  image: {
    height: height_back,
    width: whidt_back,
    position:'absolute'
  },
});