import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper"; 
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../components/context";

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [estado, setEstado] = useState();
  const [tipo, setTipo] = useState();

  const getUserName = () => {
    AsyncStorage.getItem("name")
      .then((result) => {
        setUserName(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getUserEmail = () => {
    AsyncStorage.getItem("email")
      .then((result) => {
        setEmail(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUserTipo = () => {
    AsyncStorage.getItem("tipo")
      .then((result) => {
        setTipo(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUserEstado = () => {
    AsyncStorage.getItem("estado")
      .then((result) => {
        setEstado(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserName();
    getUserEmail();
    getUserEstado();
    getUserTipo();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image source={require("../assets/user.png")} size={50} />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{username}</Title>
                <Caption style={styles.caption}>{email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  Estado:
                </Paragraph>
                <Caption style={styles.caption}>{estado}</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  Tipo:
                </Paragraph>
                <Caption style={styles.caption}>{tipo}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Encuesta"
              onPress={() => {
                props.navigation.navigate("Encuesta");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="book-outline" color={color} size={size} />
              )}
              label="Reservaciones"
              onPress={() => {
                props.navigation.navigate("Menu");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="calendar-clock" color={color} size={size} />
              )}
              label="Lista de Reservaciones"
              onPress={() => {
                props.navigation.navigate("Lista");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Tema Oscuro</Text>
                <View pointerEvents="none">
                  <Switch trackColor={{true: '#003366', false: 'grey'}} value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Salir"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
