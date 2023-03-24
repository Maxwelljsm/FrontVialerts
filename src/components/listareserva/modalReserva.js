import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View , Image} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {api} from '../../config/config'
const ModalListEditReserva = ({tipo,id}) => {
  const [modalVisible, setModalVisible] = useState(false);

  function putUpdateReservaFromAPI(){
    api.put(`/reserva/actualizar_reservastatus/${id}`,{
      estado: "inactivo"
    })
    .then(function (response){
      console.log(response.data); 
    })
}

  if(tipo === 'eliminar'){
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
              <Text style={styles.modalText}>Eliminar</Text>
              <Image source={require('../../assets/Iconosoficinas/trash-bin.png')} resizeMode="center" style={styles.image2}/>
              <Text style={styles.modalText}>Esta seguro de que desea eliminar esta reserva</Text>
              <View style={styles.preference}> 
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => {setModalVisible(!modalVisible); putUpdateReservaFromAPI()}}
              >
                <Text style={styles.textStyle2}>Confirmar</Text>
              </Pressable>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle2}>Cancelar</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpenOcuped]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="delete-alert-outline" color="#fff"  size={20}/>
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
            <Text style={styles.modalText}>Reserva</Text>
            <Text style={styles.modalText}>Por favor complete la siguiente informacion para hacer efectiva su edicion</Text>
            <View style={styles.preference}> 
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle2}>Confirmar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle2}>Cancelar</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="delete-alert-outline" color="#fff"  size={20}/>
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
    backgroundColor: "white",
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
    marginTop: 2,
    width:30, 
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    marginTop:-10
  },
  button2: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    marginTop: 2,
    width:100, 
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    marginTop:-10
  },
  buttonOpen: {
    backgroundColor: "#CB5720",
  },
  buttonOpenOcuped: {
    backgroundColor: "#CB5720",
  },
  buttonOpenReserved: {
    backgroundColor: "#CB5720",
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
    textAlign: "center"
  },
  textStyle2: {
    color: "#003366",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#003366",
    fontWeight: "bold",
    fontSize:20
  },
  preference: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image2: {
    justifyContent: "flex-start",
    margin:-170,
    width:100
  },
});

export default ModalListEditReserva;