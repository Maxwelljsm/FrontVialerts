import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet,Pressable,Dimensions, Text, View, TouchableOpacity ,Image} from 'react-native';
import ModalListEditReserva from '../components/listareserva/modalReserva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../config/config'
import moment from 'moment';
import { useIsFocused } from "@react-navigation/native";

const ListBookingScreen = () => {
  const [regional, setRegional] = useState([]);

  const isFocused = useIsFocused();

  const getID = () =>{
    AsyncStorage.getItem('id_usuarios')
      .then((result) => {
        getRegionalesFromAPI(result);
      }).catch((e) =>{
        console.log(e);
      });
  }

  useEffect(() => {
    getID();
  }, [isFocused])

    function getRegionalesFromAPI(id) {
      api.get(`/reserva/${id}`)
          .then(async function (response) {
            setRegional(response.data);
          })
          .catch(function (error) {
              console.log(error)
          })
    }
  
    if (!regional) {
        return null
    }
    
    if(regional.length === 0){
        return (
            <View style={styles.container}>
              <Text style={styles.modalText2}>No hay registros de reservas disponibles </Text>
            </View>
          );
    }

    return (
        <View style={styles.container}>
          <View style={styles.container1}>
              <Text style={styles.itemTextAr}>RESERVACIONES</Text>
          </View>
          <View style={styles.container2}>
            <TouchableOpacity style={styles.box2} onPress={this.onPress} >
            </TouchableOpacity>
              <Text>Activo</Text>
            <TouchableOpacity style={styles.box4} onPress={this.onPress} >
            </TouchableOpacity>
              <Text>Inactivo</Text>
          </View>
          <FlatList
            data={regional}
            scrollEnabled={true}
            renderItem={({item}) => {
                if(item.estado === 'inactivo' && item.id_tipoPuesto ===3){
                    return(
                    <View style={styles.containerItems2}>
                        <View style={styles.preference}>
                          <View style={styles.preference2}>
                            <Text style={styles.item}>Codigo de Reserva: {item.id_reserva}</Text>
                            <Text style={styles.item}>Estado: {item.estado}</Text>
                            <Text style={styles.item}>Puesto: {item.puesto_nombre}</Text>
                            <Text style={styles.itemdata}>Fecha Reserva: {moment(item.fecha_reserva).utc().format('YYYY-MM-DD')}</Text>
                            <Text style={styles.itemdata}>Hora Inicio: {moment(item.hora_incio).utc().format('LT')}</Text>
                            <Text style={styles.itemdata}>Hora Fin: {moment(item.hora_fin).utc().format('LT')}</Text>
                          </View>
                          <View style={styles.preference3}>
                            <View style={styles.item6}>
                              <Text style={styles.itemText} >{item.nombre}</Text>
                              <Image source={require('../assets/Iconosoficinas/individuali.png')} resizeMode="center" style={styles.image}/> 
                              <View style={styles.preference4}>
                                <ModalListEditReserva tipo={'eliminar'} id ={item.id_reserva}/>
                                {/*<ModalListEditReserva tipo={'editar'}/>*/}
                              </View>
                            </View>
                          </View>
                        </View>
                    </View>) 
                }
                if(item.estado === 'inactivo' && item.id_tipoPuesto ===1){
                  return(
                    
                  <View style={styles.containerItems2}>
                      <View style={styles.preference}>
                        <View style={styles.preference2}>
                          <Text style={styles.item}>Codigo de Reserva: {item.id_reserva}</Text>
                          <Text style={styles.item}>Estado: {item.estado}</Text>
                          <Text style={styles.item}>Puesto: {item.puesto_nombre}</Text>
                          <Text style={styles.itemdata}>Fecha Reserva: {moment(item.fecha_reserva).utc().format('YYYY-MM-DD')}</Text>
                          <Text style={styles.itemdata}>Hora Inicio: {moment(item.hora_incio).utc().format('LT')}</Text>
                          <Text style={styles.itemdata}>Hora Fin: {moment(item.hora_fin).utc().format('LT')}</Text>
                        </View>
                        <View style={styles.preference3}>
                          <View style={styles.item6}>
                            <Text style={styles.itemText} >{item.nombre}</Text>
                            <Image source={require('../assets/Iconosoficinas/salajuntai.png')} resizeMode="center" style={styles.image}/> 
                            <View style={styles.preference4}>
                              <ModalListEditReserva tipo={'eliminar'} id ={item.id_reserva}/>
                              {/*<ModalListEditReserva tipo={'editar'}/>*/}
                            </View>
                          </View>
                        </View>
                      </View>
                  </View>) 
              }
              if(item.estado === 'inactivo' && item.id_tipoPuesto ===2){
                return(
                <View style={styles.containerItems2}>
                    <View style={styles.preference}>
                      <View style={styles.preference2}>
                        <Text style={styles.item}>Codigo de Reserva: {item.id_reserva}</Text>
                        <Text style={styles.item}>Estado: {item.estado}</Text>
                        <Text style={styles.item}>Puesto: {item.puesto_nombre}</Text>
                        <Text style={styles.itemdata}>Fecha Reserva: {moment(item.fecha_reserva).utc().format('YYYY-MM-DD')}</Text>
                        <Text style={styles.itemdata}>Hora Inicio: {moment(item.hora_incio).utc().format('LT')}</Text>
                        <Text style={styles.itemdata}>Hora Fin: {moment(item.hora_fin).utc().format('LT')}</Text>
                      </View>
                      <View style={styles.preference3}>
                        <View style={styles.item6}>
                          <Text style={styles.itemText} >{item.nombre}</Text>
                          <Image source={require('../assets/Iconosoficinas/salagrupali.png')} resizeMode="center" style={styles.image}/> 
                          <View style={styles.preference4}>
                            <ModalListEditReserva tipo={'eliminar'} id ={item.id_reserva}/>
                            {/*<ModalListEditReserva tipo={'editar'}/>*/}
                          </View>
                        </View>
                      </View>
                    </View>
                </View>) 
            }

            if(item.estado === 'activo' && item.id_tipoPuesto ===2){
              return(<View style={styles.containerItems}>
                <View style={styles.preference}>
                  <View style={styles.preference2}>
                    <Text style={styles.item}>Codigo de Reserva: {item.id_reserva}</Text>
                    <Text style={styles.item}>Estado: {item.estado}</Text>
                    <Text style={styles.item}>Puesto: {item.puesto_nombre}</Text>
                    <Text style={styles.itemdata}>Fecha Reserva: {moment(item.fecha_reserva).utc().format('YYYY-MM-DD')}</Text>
                    <Text style={styles.itemdata}>Hora Inicio: {moment(item.hora_incio).utc().format('LT')}</Text>
                    <Text style={styles.itemdata}>Hora Fin: {moment(item.hora_fin).utc().format('LT')}</Text>
                  </View>
                  <View style={styles.preference3}>
                    <View style={styles.item5}>
                      <Text style={styles.itemText} >{item.nombre}</Text>
                      <Image source={require('../assets/Iconosoficinas/OficinaGrupal_Reserva.png')} resizeMode="center" style={styles.image}/> 
                      <View style={styles.preference4}>
                        <ModalListEditReserva tipo={'eliminar'} id ={item.id_reserva}/>
                        {/*<ModalListEditReserva tipo={'editar'}/>*/}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              )
            }
            if(item.estado === 'activo' && item.id_tipoPuesto ===1){
              return(<View style={styles.containerItems}>
                <View style={styles.preference}>
                  <View style={styles.preference2}>
                    <Text style={styles.item}>Codigo de Reserva: {item.id_reserva}</Text>
                    <Text style={styles.item}>Estado: {item.estado}</Text>
                    <Text style={styles.item}>Puesto: {item.puesto_nombre}</Text>
                    <Text style={styles.itemdata}>Fecha Reserva: {moment(item.fecha_reserva).utc().format('YYYY-MM-DD')}</Text>
                    <Text style={styles.itemdata}>Hora Inicio: {moment(item.hora_incio).utc().format('LT')}</Text>
                      <Text style={styles.itemdata}>Hora Fin: {moment(item.hora_fin).utc().format('LT')}</Text>
                  </View>
                  <View style={styles.preference3}>
                    <View style={styles.item5}>
                      <Text style={styles.itemText} >{item.nombre}</Text>
                      <Image source={require('../assets/Iconosoficinas/salajuntar.png')} resizeMode="center" style={styles.image}/> 
                      <View style={styles.preference4}>
                        <ModalListEditReserva tipo={'eliminar'} id ={item.id_reserva}/>
                        {/*<ModalListEditReserva tipo={'editar'}/>*/}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              )
            }
                return(<View style={styles.containerItems}>
                  <View style={styles.preference}>
                    <View style={styles.preference2}>
                      <Text style={styles.item}>Codigo de Reserva: {item.id_reserva}</Text>
                      <Text style={styles.item}>Estado: {item.estado}</Text>
                      <Text style={styles.item}>Puesto: {item.puesto_nombre}</Text>
                      <Text style={styles.itemdata}>Fecha Reserva: {moment(item.fecha_reserva).utc().format('YYYY-MM-DD')}</Text>
                      <Text style={styles.itemdata}>Hora Inicio: {moment(item.hora_incio).utc().format('LT')}</Text>
                      <Text style={styles.itemdata}>Hora Fin: {moment(item.hora_fin).utc().format('LT')}</Text>
                    </View>
                    <View style={styles.preference3}>
                      <View style={styles.item5}>
                        <Text style={styles.itemText} >{item.nombre}</Text>
                        <Image source={require('../assets/Iconosoficinas/individualr.png')} resizeMode="center" style={styles.image}/> 
                        <View style={styles.preference4}>
                          <ModalListEditReserva tipo={'eliminar'} id ={item.id_reserva}/>
                          {/*<ModalListEditReserva tipo={'editar'}/>*/}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                )
             }
            }
          />
        </View>
      );
};

export default ListBookingScreen;

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 10,
     alignItems:'flex-start'
    },
    image: {
      flex: 1,
      justifyContent: "flex-start",
      marginTop:10
    },
    item5: {
      backgroundColor: '#fff',
      borderColor:'#CB5720',
      borderRadius:10,
      borderWidth:2,
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      margin: 10,
      height: 150,
      width:120
    },
    item6: {
      backgroundColor: '#fff',
      borderColor:'gray',
      borderRadius:10,
      borderWidth:2,
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      margin: 10,
      height: 150,
      width:120
    },
    itemText: {
      alignContent: 'flex-start',
      color: "#003366",
      fontSize: 15,
      fontWeight:'bold'
    },
    itemTextAr: {
      alignContent: 'center',
      color: "#003366",
      fontSize: 25,
      fontWeight:'bold'
    },
    container2: {
      justifyContent:'center',
      alignItems: 'center',
      padding:15,
      flexDirection:'row',
      width:300,
      elevation:2,
      marginLeft:50,
      backgroundColor:'rgba(255,255,255,0.5)'
    },
    container1: {
      justifyContent:'flex-start',
      alignItems: 'flex-start',
      marginLeft:10,
      marginBottom:10
    },
    item: {
      padding: 1,
      fontSize: 18,
      fontWeight:'bold',
      marginLeft:10,
      color: "#003366",
    },
    itemdata: {
        padding: 10,
        fontSize: 12,
        height: 32,
        color: "#003366",
      },
    containerItems:{
        backgroundColor: "#fff",
        borderColor:"#003366",
        borderWidth:2,
        borderRadius:5,
        marginBottom: 10,
        marginTop:10,
        marginLeft:20,
        marginRight:20
    },
    containerItems2:{
        backgroundColor: "#fff",
        borderColor:"gray",
        borderWidth:2,
        borderRadius:5,
        marginBottom: 10,
        marginTop:10,
        marginLeft:20,
        marginRight:20
    },
    preference: {
        width:'90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
    preference2: {
        width:'68%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
      preference3: {
        width:'42%',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      textStyle2: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
      },
      buttonEdit: {
        backgroundColor: "#003366",
        borderRadius:10,
        margin: 10,
        width:80
      },
      buttonElim: {
        backgroundColor: "#003366",
        borderRadius:10,
        margin: 10,
        width:80,
      },
      modalText2: {
        color: "#003366",
        marginBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
        fontSize:25
      },
      box: {
        height: 10
      },
      box1: {
        backgroundColor: '#003366',
        alignItems:'center',
        padding:7,
        borderRadius:20,
        marginRight:3,
      },
      box2: {
        backgroundColor: '#CB5720',
        alignItems:'center',
        padding:7,
        borderRadius:20,
        marginLeft:10,
        marginRight:3,
      },
      box2c: {
        backgroundColor: '#CB5720',
        alignItems:'center',
        padding:7,
        height:10,
        borderRadius:20,
        marginRight:3,
        marginTop:15
      },
      box3: {
        backgroundColor: '#DB9726',
        alignItems:'center',
        padding:7,
        borderRadius:20,
        marginLeft:10,
        marginRight:3
      },
      box4: {
        backgroundColor: '#706D6C',
        alignItems:'center',
        padding:7,
        borderRadius:20,
        marginLeft:10,
        marginRight:3
      },
      preference4: {
        width:'90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingRight:10,
        paddingLeft:10,
      },
  });