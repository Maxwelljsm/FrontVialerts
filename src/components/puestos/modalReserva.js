import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,Image,Platform } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import {api} from '../../config/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

const ModalReserva = ({id_tipo, id_puesto , estado}) => {
  
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRes, setModalVisibleRes] = useState(false);
  const [modalVisibleResT, setModalVisibleResT] = useState(false);
  const [modalVisibleResCheck, setModalVisibleResChek] = useState(false);

  const [id, setID] = useState();
  const getID = () =>{
    return AsyncStorage.getItem('id_usuarios')
      .then((result) => {
        console.log(result);
        setID(result);
      }).catch((e) =>{
        console.log(e);
      });
  }
  function getCovidFromAPI(){
    api.get(`users/encuesta/${id}`)
    .then(async function (response) {
        if(response.data.question ==="CVS"){
          postReservaFromAPI();
        }else{
          setModalVisibleResT(true);
        }
      })
      .catch(function (error) {
          console.log(error)
      })
}

  useEffect(() => {
      getID();
      setDateInit("");
      setTimeEnd("");
      setTimeInit("");
  }, [])

  function postReservaFromAPI(){
    console.log(dateInit, timeEnd, timeInit)
    if(timeEnd !=="" && timeInit !== "" && dateInit !=="" ){
      api.post('/reserva/crear_reserva',{
        hora_incio:  timeInit,
        hora_fin : timeEnd,
        fecha_reserva : dateInit,
        usuario_id : id,
        puesto_id : id_puesto,
        estado : "activo"
      })
      .then(function (response){
        console.log(response)
        if(response.status == 200){
          putUpdatePuestoFromAPI();
          setModalVisibleResChek(true);
          setDateInit("");
          setTimeEnd("");
          setTimeInit("");
        }else{
          setModalVisibleRes(true); 
        }
      }) 
    }else{
      Alert.alert("Reserva", "Verifica que todos los campos esten llenos")
    }
  }

  function putUpdatePuestoFromAPI(){
      api.put(`/puestos/editar_puesto/${id_puesto}`,{
        estado: "Reservado"
      })
      .then(function (response){
        console.log(response.data); 
      })
  }

  const [date, setDate] = useState(new Date());
  const [dateInit, setDateInit] = useState("");
  const [timeInit, setTimeInit] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState("Fecha de Reserva");
  const [textTime, setTextTime] = useState("Hora Inicio");
  const [textTimeEnd, setTextTimeEnd] = useState("Hora Fin");
  const [typeField, setTypeField] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (currentDate !== undefined) setDate(currentDate);
    const tempDate = new Date(currentDate);
    let date = "";

    if (currentDate !== undefined && currentDate !== null) {
      if (mode === "time"){
        date = `Hora: ${moment(tempDate).format('hh:mm a')}`;}
      else
        date = `${moment(tempDate).format('LL')}`;
    }
    if (date !== "")
     { switch (typeField) {
        case "time":
          var horas = selectedDate.getHours();
          if(horas >= 8 && horas <=17){
            setTextTime(date);
            setTimeInit(selectedDate);
          }else{
            Alert.alert("Reserva","La hora minima de inicio reserva son las 8:00 AM o 5:00 PM")
            setTextTime("Hora inicio");
          }
          
          break;
        case "timeEnd":
          var horas = selectedDate.getHours();
          if(horas>8 && horas<=18){
            setTextTimeEnd(date);
            setTimeEnd(selectedDate);
          }else{
            Alert.alert("Reserva","La hora maxima de finalizacion reserva son las 6:00 PM y depues de las 8:00 AM")
            setTextTimeEnd("Hora fin");
          }
          break;
        case "date":
          setTextDate(date);
          setDateInit(selectedDate);
          break;
        default:
          break;
      }
    }
  };

  const showMode = (currentMode, time) => {
    setShow(true);
    setTypeField(time);
    setMode(currentMode);
  };

  if(estado === 'Ocupado'){
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Ocupado</Text>
              <Image source={require('../../assets/Iconosoficinas/ocupado.png')} resizeMode="center" style={styles.image2}/>
              <Text style={styles.modalText}>Este puesto se encuentra ocupado</Text>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle2}>Confirmar</Text>
            </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button2, styles.buttonOpenOcuped]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="calendar-plus" color="#fff"  size={20}/>
        </Pressable>
        
      </View>
    );
  }
  if(estado === 'Reservado'){
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Reservado</Text>
              <Image source={require('../../assets/Iconosoficinas/reservation.png')} resizeMode="center" style={styles.image2}/>
              <Text style={styles.modalText}>Este puesto se encuentra reservado</Text>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle2}>Confirmar</Text>
            </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button2, styles.buttonOpenReserved]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="calendar-plus" color="#fff"  size={20}/>
        </Pressable>
      </View>
    );
  }
  if(estado === 'Inactivo'){
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Matenimiento</Text>
              <Image source={require('../../assets/Iconosoficinas/time.png')} resizeMode="center" style={styles.image2}/>
              <Text style={styles.modalText}>Este puesto se encuentra inactivo</Text>
              <Text style={styles.modalText}>o en mantenimiento</Text>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle2}>Confirmar</Text>
            </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button2, styles.buttonOpenInactive]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="calendar-plus" color="#fff"  size={20}/>
        </Pressable>
      </View>
    );
  }

  if(id_tipo === 1){
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Reserva</Text>
              <Image source={require('../../assets/Iconosoficinas/salajunta.png')} resizeMode="center" style={styles.image3}/> 
              <Text style={styles.modalText}>Por favor complete la siguiente informacion para hacer efectiva su reserva</Text>
              <View>
              <Text style={styles.textStyle4}>{textDate}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  onPress={() => showMode("date", "date")}
                  title="Selecciona la fecha de reserva">
                  <Text style={styles.textStyle3}>Seleccionar Fecha de Reserva</Text>
                </Pressable>
              </View>
              <Text style={styles.textStyle4}>{textTime}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  onPress={() => showMode("time", "time")}
                  name="time"
                  >
                  <Text style={styles.textStyle3}>Seleccionar Hora de Inicio</Text>
                </Pressable>
              </View>
              <Text style={styles.textStyle4}>{textTimeEnd}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  name="timeEnd"
                  onPress={() => showMode("time", "timeEnd")}
                >
                  <Text style={styles.textStyle3}>Seleccionar Hora de Finalizacion</Text>
                </Pressable>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
              <View style={styles.preference}> 
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(false);getCovidFromAPI()}}
              >
                <Text style={styles.textStyle2}>Confirmar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle2}>Cancelar</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleRes}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleRes(!modalVisibleRes);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Reserva</Text>
              <Image source={require('../../assets/Iconosoficinas/Error.png')} resizeMode="center" style={styles.image3}/> 
              <Text style={styles.modalText3}>La reserva no se pudo realizar.</Text>
              <Text style={styles.modalText3}>Por favor intentelo de nuevo</Text>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => setModalVisibleRes(!modalVisibleRes)}
              >
                <Text style={styles.textStyle2}>Ok</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleResT}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleResT(!modalVisibleResT);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Reserva</Text>
              <Image source={require('../../assets/Iconosoficinas/termometro.png')} resizeMode="center" style={styles.image3}/> 
              <Text style={styles.modalText3}>Por tu salud y la de nosostros</Text>
              <Text style={styles.modalText3}>Aun no es posible reservar</Text>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => setModalVisibleResT(!modalVisibleResT)}
              >
                <Text style={styles.textStyle2}>Ok</Text>
              </Pressable>
            </View>
          </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleResCheck}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleResChek(!modalVisibleResCheck);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Reserva</Text>
            <Image source={require('../../assets/Iconosoficinas/Aprobado.png')} resizeMode="center" style={styles.image3}/> 
            <Text style={styles.modalText3}>La reserva se realizo con exito.</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => {setModalVisibleResChek(!modalVisibleResCheck); navigation.navigate("Lista")}}
            >
              <Text style={styles.textStyle2}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <Pressable
          style={[styles.button2, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="calendar-plus" color="#fff"  size={20}/>
        </Pressable>
        
      </View>
    );
  }
  if(id_tipo === 2){
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Reserva</Text>
              <Image source={require('../../assets/Iconosoficinas/salagrupal.png')} resizeMode="center" style={styles.image3}/> 
              <Text style={styles.modalText}>Por favor complete la siguiente informacion para hacer efectiva su reserva</Text>
              <View>
              <Text style={styles.textStyle4}>{textDate}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  onPress={() => showMode("date", "date")}
                  title="Selecciona la fecha de reserva">
                  <Text style={styles.textStyle3}>Seleccionar Fecha de Reserva</Text>
                </Pressable>
              </View>
              <Text style={styles.textStyle4}>{textTime}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  onPress={() => showMode("time", "time")}
                  name="time"
                  >
                  <Text style={styles.textStyle3}>Seleccionar Hora de Inicio</Text>
                </Pressable>
              </View>
              <Text style={styles.textStyle4}>{textTimeEnd}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  name="timeEnd"
                  onPress={() => showMode("time", "timeEnd")}
                >
                  <Text style={styles.textStyle3}>Seleccionar Hora de Finalizacion</Text>
                </Pressable>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
              <View style={styles.preference}> 
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(false);getCovidFromAPI()}}
              >
                <Text style={styles.textStyle2}>Confirmar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(false)}}
              >
                <Text style={styles.textStyle2}>Cancelar</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleRes}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleRes(!modalVisibleRes);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Reserva</Text>
            <Image source={require('../../assets/Iconosoficinas/Error.png')} resizeMode="center" style={styles.image3}/> 
            <Text style={styles.modalText3}>La reserva no se pudo realizar.</Text>
            <Text style={styles.modalText3}>Por favor intentelo de nuevo</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setModalVisibleRes(!modalVisibleRes)}
            >
              <Text style={styles.textStyle2}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleResT}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleResT(!modalVisibleResT);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Reserva</Text>
              <Image source={require('../../assets/Iconosoficinas/termometro.png')} resizeMode="center" style={styles.image3}/> 
              <Text style={styles.modalText3}>Por tu salud y la de nosostros</Text>
              <Text style={styles.modalText3}>Aun no es posible reservar</Text>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => setModalVisibleResT(!modalVisibleResT)}
              >
                <Text style={styles.textStyle2}>Ok</Text>
              </Pressable>
            </View>
          </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleResCheck}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleResChek(!modalVisibleResCheck);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Reserva</Text>
            <Image source={require('../../assets/Iconosoficinas/Aprobado.png')} resizeMode="center" style={styles.image3}/> 
            <Text style={styles.modalText3}>La reserva se realizo con exito.</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => {setModalVisibleResChek(!modalVisibleResCheck); navigation.navigate("Lista")}}
            >
              <Text style={styles.textStyle2}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <Pressable
          style={[styles.button2, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="calendar-plus" color="#fff"  size={20}/>
        </Pressable>
        
      </View>
    );
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Reserva</Text>
            <Image source={require('../../assets/Iconosoficinas/individual.png')} resizeMode="center" style={styles.image}/> 
            <Text style={styles.modalText}>Por favor complete la siguiente informacion para hacer efectiva su reserva</Text>
            <View>
              <Text style={styles.textStyle4}>{textDate}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  onPress={() => showMode("date", "date")}
                  title="Selecciona la fecha de reserva">
                  <Text style={styles.textStyle3}>Seleccionar Fecha de Reserva</Text>
                </Pressable>
              </View>
              <Text style={styles.textStyle4}>{textTime}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  onPress={() => showMode("time", "time")}
                  name="time"
                  >
                  <Text style={styles.textStyle3}>Seleccionar Hora de Inicio</Text>
                </Pressable>
              </View>
              <Text style={styles.textStyle4}>{textTimeEnd}</Text>
              <View>
                <Pressable
                  style={styles.buttonTime}
                  name="timeEnd"
                  onPress={() => showMode("time", "timeEnd")}
                >
                  <Text style={styles.textStyle3}>Seleccionar Hora de Finalizacion</Text>
                </Pressable>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  locale="es-ES"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
            <View style={styles.preference}> 
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(false);getCovidFromAPI()}}
            >
              <Text style={styles.textStyle2}>Confirmar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle2}>Cancelar</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleRes}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleRes(!modalVisibleRes);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Reserva</Text>
            <Image source={require('../../assets/Iconosoficinas/Error.png')} resizeMode="center" style={styles.image3}/> 
            <Text style={styles.modalText3}>La reserva no se pudo realizar.</Text>
            <Text style={styles.modalText3}>Por favor intentelo de nuevo</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setModalVisibleRes(!modalVisibleRes)}
            >
              <Text style={styles.textStyle2}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleResT}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleResT(!modalVisibleResT);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Reserva</Text>
              <Image source={require('../../assets/Iconosoficinas/termometro.png')} resizeMode="center" style={styles.image3}/> 
              <Text style={styles.modalText3}>Por tu salud y la de nosostros</Text>
              <Text style={styles.modalText3}>Aun no es posible reservar</Text>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => setModalVisibleResT(!modalVisibleResT)}
              >
                <Text style={styles.textStyle2}>Ok</Text>
              </Pressable>
            </View>
          </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleResCheck}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleResChek(!modalVisibleResCheck);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Reserva</Text>
            <Image source={require('../../assets/Iconosoficinas/Aprobado.png')} resizeMode="center" style={styles.image3}/> 
            <Text style={styles.modalText3}>La reserva se realizo con exito.</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => {setModalVisibleResChek(!modalVisibleResCheck); navigation.navigate("Lista")}}
            >
              <Text style={styles.textStyle2}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button2, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="calendar-plus" color="#fff"  size={20}/>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width:100,
    marginBottom:10
  },
  button2: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width:30,
    marginBottom:10
  },
  buttonOpen: {
    backgroundColor: "#003366",
  },
  buttonOpenOcuped: {
    backgroundColor: "#CB5720",
  },
  buttonOpenReserved: {
    backgroundColor: "#DB9726",
  },
  buttonOpenInactive: {
    backgroundColor: "#706D6C",
  },
  buttonClose: {
    backgroundColor: "#fff",
    borderColor:"#003366",
    borderWidth:2,
    margin: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'OpenSans_300Light'
  },
  textStyle2: {
    color: "#003366",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'OpenSans_300Light'
  },
  modalText: {
    color: "#003366",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'OpenSans_300Light'
  },
  modalText2: {
    color: "#003366",
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize:25,
    fontFamily: 'OpenSans_300Light'
  },
  preference: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  image: {
    justifyContent: "flex-start",
    margin:-40
  },
  image2: {
    justifyContent: "flex-start",
    margin:-170,
    width:100
  },
  image3: {
    justifyContent: "flex-start",
    margin:-100,
    width:150
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  pickedDateContainer: {
    padding: 5,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },
  btnContainer: {
    padding: 30,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textStyle3: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'OpenSans_300Light'
  },
  textStyle4: {
    color: "#CB5720",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'OpenSans_300Light'
  },
  buttonTime: {
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    backgroundColor:"#003366",
    width:270,
    justifyContent:"center",
    height:40,
    marginBottom:10
  },
  modalText3: {
    color: "#003366",
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize:15
  },
});

export default ModalReserva;