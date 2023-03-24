import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React ,{useState,useEffect}from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TouchableRipple, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../config/config';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../components/context";
import moment from 'moment';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {signOut} = React.useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
    const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
    const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);
    const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);
    const [isSwitchOn3, setIsSwitchOn3] = React.useState(false);
    const onToggleSwitch3 = () => setIsSwitchOn3(!isSwitchOn3);
    const [isSwitchOn4, setIsSwitchOn4] = React.useState(false);
    const onToggleSwitch4 = () => setIsSwitchOn4(!isSwitchOn4);
    const [isSwitchOn5, setIsSwitchOn5] = React.useState(false);
    const onToggleSwitch5 = () => setIsSwitchOn5(!isSwitchOn5);
    const [stateButton, setStateButton] = React.useState(false);
    const theme = useTheme();
    const [date, setDate] = useState(new Date())
    const [id, setID] = useState();
    const [idcv, setIDCV] = useState();
    const [idf, setIDF] = useState();
    const [form, setForm] = useState();

    const getID = (navigation) =>{
        return AsyncStorage.getItem('id_usuarios')
        .then((result) => {
            setID(result)
            getCovidFromAPI(result);
        }).catch((e) =>{
            console.log(e);
        });
    }

    useEffect(() => {
        getID();
        setIsSwitchOn(false);
        setIsSwitchOn1(false);
        setIsSwitchOn2(false);
        setIsSwitchOn3(false);
        setIsSwitchOn4(false);
        setIsSwitchOn5(false);
    }, [])

    function getCovidFromAPI(id){
        api.get(`users/encuesta/${id}`)
        .then(async function (response) {
            setForm(response.data.question);
            setIDCV(response.data.id_encuesta);
            setIDF(moment(response.data.updatedAt).format('l'));
            if(response.data.question === "CVP"){
                signOut();
                Alert.alert("Q-Vision","Por tu seguridad y la de nosotros no tienes permitido reservar puestos, aun no cumples tu tiempo de aislamiento"); 
            }
          })
          .catch(function (error) {
              console.log(error)
          })
    }

    function postCovidFromAPI(){
        switch(form){
            case "CVS":
                if(idf !== moment(date).format('l')){
                    if(isSwitchOn === true || isSwitchOn1 === true || isSwitchOn2 === true || isSwitchOn3 === true || isSwitchOn4 === true){
                        if(isSwitchOn5 === true){
                            api.put(`/encuestacv/actualizar_encuesta/${idcv}`,{
                                question:  "CVP",
                                })
                                .then(function (response){
                                console.log(response)
                                });
                                Alert.alert("Q-Vision","Por tu seguridad y la de nosotros no tienes permitido reservar puestos durante 7 dias"); 
                                Alert.alert("Encuesta CV-19","Su encuesta ha sido enviada con éxito");
                                signOut();
                        }else{
                            Alert.alert("Encuesta CV-19","Por favor certifica haber contestado con honestidad.")
                        }
                    }else if(isSwitchOn !== true && isSwitchOn1 !== true && isSwitchOn2 !== true && isSwitchOn3 !== true && isSwitchOn4 !== true){
                        if(isSwitchOn5 === true){
                            api.put(`/encuestacv/actualizar_encuesta/${idcv}`,{
                                question:  "CVS",
                                })
                                .then(function (response){
                                console.log(response)
                                });
                            Alert.alert("Encuesta CV-19","Su encuesta ha sido enviada con éxito");
                            navigation.navigate("Menu");
                        }else{
                            Alert.alert("Encuesta CV-19","Por favor certifica haber contestado con honestidad.")
                        }
                    }
                }else{
                    Alert.alert("Encuesta CV-19", "Esta encuesta ya ah sido contestada");
                }
                break;
            case undefined:
                if(isSwitchOn === true || isSwitchOn1 === true || isSwitchOn2 === true || isSwitchOn3 === true || isSwitchOn4 === true){
                    if(isSwitchOn5 === true){
                        api.post('/encuestacv/registrarcv',{
                            usuario_id : id,
                            question:  "CVP",
                            })
                            .then(function (response){
                            console.log(response);
                            });
                            Alert.alert("Q-Vision","Por tu seguridad y la de nosotros no tienes permitido reservar puestos durante 7 dias"); 
                            Alert.alert("Encuesta CV-19","Su encuesta ha sido enviada con éxito");
                            signOut();
                    }else{
                        Alert.alert("Encuesta CV-19","Por favor certifica haber contestado con honestidad.")
                    }
                }else if(isSwitchOn !== true && isSwitchOn1 !== true && isSwitchOn2 !== true && isSwitchOn3 !== true && isSwitchOn4 !== true){
                    if(isSwitchOn5 === true){
                        api.post('/encuestacv/registrarcv',{
                            usuario_id : id,
                            question:  "CVS",
                            })
                            .then(function (response){
                            console.log(response);
                            });
                        Alert.alert("Encuesta CV-19","Su encuesta ah sido emviada con exito");
                        
                        navigation.navigate("Menu");
                    }else{
                        Alert.alert("Encuesta CV-19","Por favor certifica haber contestado con honestidad.")
                    }
                }
                break;
        }
        setIsSwitchOn(false);
        setIsSwitchOn1(false);
        setIsSwitchOn2(false);
        setIsSwitchOn3(false);
        setIsSwitchOn4(false);
        setIsSwitchOn5(false);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Formulario de Sinmatologia Covid-19</Text>
                    <Text style={styles.text_parr}>Por tu bienestar y el de nosotros hemos decidio hacer una encuesta corta en la que nos contaras un poco de tu estado y como te encuetras en este momento. </Text>
                </View>
                <View style={styles.preference2}>
                    <View style={styles.preference}>
                        <Text >¿Ha experimentado fiebre en los últimos 14 a 21 días?</Text>
                    </View>
                    <View style={styles.preference}>
                        <TouchableRipple onPress={() => {onToggleSwitch()}}>
                                <View pointerEvents="none">
                                    <Switch trackColor={{true: '#003366', false: 'grey'}} value={isSwitchOn} onValueChange={onToggleSwitch} />
                                </View>
                        </TouchableRipple>
                    </View>
                </View>
                <View style={styles.preference2}>
                    <View style={styles.preference}>
                    <Text >¿Ha tenido dificultad para respirar?</Text>
                    </View>
                    <View style={styles.preference}>
                        <TouchableRipple onPress={() => {onToggleSwitch1()}}>
                            <View pointerEvents="none">
                                <Switch trackColor={{true: '#003366', false: 'grey'}} value={isSwitchOn1} onValueChange={onToggleSwitch1} />
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
                <View style={styles.preference2}>
                    <View style={styles.preference}>
                        <Text >¿Ha estado experimentando síntomas como congestión nasal, dolor de garganta, dolor de cabeza, tos persistente o fatiga?</Text>
                    </View>
                    <View style={styles.preference}>
                        <TouchableRipple onPress={() => {onToggleSwitch2()}}>
                            <View pointerEvents="none">
                                <Switch trackColor={{true: '#003366', false: 'grey'}} value={isSwitchOn2} onValueChange={onToggleSwitch2} />
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
                <View style={styles.preference2}>
                    <View style={styles.preference}>
                        <Text >¿Ha estado en contacto con alguna persona que haya dado positivo al COVID-19 o que haya tenido síntomas parecidos?</Text>
                    </View>
                    <View style={styles.preference}>
                        <TouchableRipple onPress={() => {onToggleSwitch3()}}>
                            <View pointerEvents="none">
                                <Switch trackColor={{true: '#003366', false: 'grey'}} value={isSwitchOn3} onValueChange={onToggleSwitch3} />
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
                <View style={styles.preference2}>
                    <View style={styles.preference}>
                    <Text >¿Padece de alguna condición del corazón, pulmón, riñón, diabetes o autoinmune?</Text>
                    </View>
                    <View style={styles.preference}>
                        <TouchableRipple onPress={() => {onToggleSwitch4()}}>
                            <View pointerEvents="none">
                                <Switch trackColor={{true: '#003366', false: 'grey'}} value={isSwitchOn4} onValueChange={onToggleSwitch4} />
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
                <View style={styles.preference2}>
                    <View style={styles.preference}>
                    <Text >Certifico haber contestado estas preguntas honestamente y leído todo el documento</Text>
                    </View>
                    <View style={styles.preference}>
                        <TouchableRipple  onPress={() => {onToggleSwitch5()}}>
                            <View pointerEvents="none">
                                <Switch trackColor={{true: '#003366', false: 'grey'}} value={isSwitchOn5} onValueChange={onToggleSwitch5} />
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => {postCovidFromAPI()}}>
                    <LinearGradient
                        colors={['#003366', '#003366']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Enviar</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop:5,
    paddingBottom: 5
  },
  text_header: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_parr: {
    color: 'gray',
    fontSize: 15,
    paddingBottom:20
  },
  preference: {
    width:'90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight:20,
    paddingLeft:20,
  },
  preference2:{
    flexDirection:'row',
    width:'90%',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 50
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  disabledButton: {
    backgroundColor:'gray'
  }
});