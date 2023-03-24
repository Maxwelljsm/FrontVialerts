import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Button,
  Text,  
  View,
  Image,
  Alert,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { api } from "../../config/config";
import ModalReserva from "./modalReserva";
import ModalReservaInfo from "./modalReservaInfo";
import { useIsFocused } from "@react-navigation/native";

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: false });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 3;

var { height } = Dimensions.get("window");

var box_count = 3;
var box_height = height / box_count;

const WorkJobContentPuestos = ({ id_tipoPuesto, id_oficina }) => {

  const [image, setImage] = useState("");
  const isFocused = useIsFocused();
  const [oficina, setOficina] = useState([]);
  useEffect(() => {
    getAreasFromAPI();
  }, [isFocused]);

  function getAreasFromAPI() {
    api
      .get(`/puestos/puesto/${id_tipoPuesto}/${id_oficina}`)
      .then(async function (response) {
        setOficina(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (!oficina) {
    return null;
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.estado === "Disponible" && item.id_tipoPuesto === 1) {
      return (
        <View style={styles.itemInactive}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/individual.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Inactivo" && item.id_tipoPuesto === 1) {
      return (
        <View style={styles.itemInactive}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/individuali.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Inactivo" && item.id_tipoPuesto === 3) {
      return (
        <View style={styles.itemInactive}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/salagrupali.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }

    if (item.estado === "Inactivo" && item.id_tipoPuesto === 2) {
      return (
        <View style={styles.itemInactive}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/salajuntai.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Ocupado" && item.id_tipoPuesto === 1) {
      return (
        <View style={styles.itemOcuped}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/individualo.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Ocupado" && item.id_tipoPuesto === 3) {
      return (
        <View style={styles.itemOcuped}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/OficinaGrupal_Ocupado.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Ocupado" && item.id_tipoPuesto === 2) {
      return (
        <View style={styles.itemOcuped}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/salajuntao.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Reservado" && item.id_tipoPuesto === 1) {
      return (
        <View style={styles.itemReserved}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/individualr.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }

    if (item.estado === "Reservado" && item.id_tipoPuesto === 3) {
      return (
        <View style={styles.itemReserved}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/OficinaGrupal_Reserva.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Reservado" && item.id_tipoPuesto === 2) {
      return (
        <View style={styles.itemReserved}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/salajuntar.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva id_puesto={item.id_puesto} estado={item.estado} />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }

    if (item.estado === "Disponible" && item.id_tipoPuesto === 2) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/salajunta.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva
              id_tipo={item.id_tipoPuesto}
              id_puesto={item.id_puesto}
              estado={item.estado}
            />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    if (item.estado === "Disponible" && item.id_tipoPuesto === 3) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/salagrupal.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva
              id_tipo={item.id_tipoPuesto}
              id_puesto={item.id_puesto}
              estado={item.estado}
            />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }

    if (item.estado === "Disponible" && item.id_tipoPuesto === 1) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Image
            source={require("../../assets/Iconosoficinas/individual.png")}
            resizeMode="center"
            style={styles.image}
          />
          <View style={styles.preference}>
            <ModalReserva
              id_tipo={item.id_tipoPuesto}
              id_puesto={item.id_puesto}
              estado={item.estado}
            />
            <ModalReservaInfo
              nombreTipo={item.nombreTipo}
              nombre={item.nombre}
              estado={item.estado}
              cantidad={item.cantidad}
              descripcion={item.descripcion}
            />
          </View>
        </View>
      );
    }
    return <View style={styles.itemVacio}></View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.box1}
          onPress={this.onPress}
        ></TouchableOpacity>
        <Text>Disponible</Text>
        <TouchableOpacity
          style={styles.box2}
          onPress={this.onPress}
        ></TouchableOpacity>
        <Text>Ocupado</Text>
        <TouchableOpacity
          style={styles.box3}
          onPress={this.onPress}
        ></TouchableOpacity>
        <Text>Reservado</Text>
        <TouchableOpacity
          style={styles.box4}
          onPress={this.onPress}
        ></TouchableOpacity>
        <Text>Inactivo</Text>
      </View>
      <FlatList
        data={formatData(oficina, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
    </View>
  );
};

export default WorkJobContentPuestos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    flexDirection: "row",
    elevation: 3,
    backgroundColor: "#E3E3E3",
  },
  item: {
    backgroundColor: "#fff",
    borderColor: "#003366",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },

  itemReserved: {
    backgroundColor: "#fff",
    borderColor: "#DB9726",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },
  itemVacio: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },

  itemOcuped: {
    backgroundColor: "#fff",
    borderColor: "#CB5720",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },
  itemInactive: {
    backgroundColor: "#fff",
    borderColor: "#706D6C",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    alignContent: "flex-start",
    color: "#003366",
    fontSize: 15,
  },
  itemTextSub: {
    alignContent: "flex-start",
    color: "#003366",
    fontSize: 10,
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
  },
  preference: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingRight: 20,
    paddingLeft: 20,
  },
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  box: {
    height: box_height,
  },
  box1: {
    backgroundColor: "#003366",
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    marginRight: 3,
  },
  box2: {
    backgroundColor: "#CB5720",
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 3,
  },
  box3: {
    backgroundColor: "#DB9726",
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 3,
  },
  box4: {
    backgroundColor: "#706D6C",
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 3,
  },
});
