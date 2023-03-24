import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { api } from "../../config/config";

const WorkJobContent = ({ id_regional }) => {
  const navigation = useNavigation();
  const [oficina, setOficina] = useState([]);

  useEffect(() => {
    getAreasFromAPI();
  }, []);

  function getAreasFromAPI() {
    api
      .get(`/oficina/oficinas/${id_regional}`)
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
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Reserva", { id_oficina: item.id_oficina })
          }
        >
          <LinearGradient colors={["#003366", "#003366"]} style={styles.signIn}>
            <Image
              source={require("../../assets/Iconosoficinas/toficina.png")}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.itemText}>{item.nombre}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.itemTextAr}>Areas de Trabajo</Text>
      </View>
      <FlatList
        horizontal={true}
        data={oficina}
        style={styles.container}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Reserva", {
                    id_oficina: item.id_oficina,
                  })
                }
              >
                <LinearGradient
                  colors={["#003366", "#003366"]}
                  style={styles.signIn}
                >
                  <Image
                    source={require("../../assets/Iconosoficinas/toficina.png")}
                    resizeMode="contain"
                    style={styles.image}
                  />
                  <Text style={styles.itemText}>{item.nombre}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id_oficina}
      />
    </View>
  );
};

export default WorkJobContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "flex-start",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  item: {
    width: 320,
    height: 40,
    backgroundColor: "#003366",
    borderColor: "#003366",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row", // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemTextAr: {
    alignContent: "center",
    color: "#003366",
    fontSize: 25,
    fontWeight: "bold",
  },
  itemTextSub: {
    alignContent: "flex-start",
    color: "#003366",
    fontSize: 10,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  signIn: {
    width: "100%",
    height: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#003366",
    flexDirection: "row",
    marginLeft: 20,
  },
});
