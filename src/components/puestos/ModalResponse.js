import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ModalReservaResponse = ({datas,response}) => {
  const [modalVisible, setModalVisible] = useState(datas);
  
  if(response == "true"){
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
                <Text style={styles.modalText2}>Informacion Puesto</Text>
                <Image source={require('../../assets/Iconosoficinas/Error.png')} resizeMode="center" style={styles.image3}/> 
                <Text style={styles.modalText3}>La reserva no se pudo realizar.</Text>
                <Text style={styles.modalText3}>Por favor intentelo de nuevo</Text>
                <Pressable
                  style={[styles.button2, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle2}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="information-outline" color="#fff"  size={20}/>
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
            <Text style={styles.modalText2}>Informacion Puesto</Text>
            <Image source={require('../../assets/Iconosoficinas/Aprobado.png')} resizeMode="center" style={styles.image3}/> 
            <Text style={styles.modalText3}>La reserva se realizo con exito</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle2}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="information-outline" color="#fff"  size={20}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    width:30,
    marginLeft:10
  },
  button2: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width:100,
    marginBottom:10,
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
    textAlign: "center"
  },
  preference: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  image3: {
    justifyContent: "flex-start",
    margin:-160,
    width:150
  },
  modalText2: {
    color: "#003366",
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize:25
  },
  modalText3: {
    color: "#003366",
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize:15
  },
});

export default ModalReservaResponse;