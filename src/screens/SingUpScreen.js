import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../components/context";
import { useTheme } from "react-native-paper";
import axios from "axios";
import { api } from "../config/config";
import DropDownPicker from "react-native-dropdown-picker";
const baseUrl = "http://3.231.9.74:5000/auth/register";

const SignUpScreen = ({ navigation }) => {
  const [regional, setRegional] = useState([]);
  var reg1 = RegExp(/^[a-zA-Z0-9]+@qvision+\.com+\.co$/);
  var reg2 = RegExp(/^[a-zA-Z0-9]+@qvision+\.us$/);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  let controller;

  const [data, setData] = React.useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    password: "",
    regional: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);

  useEffect(() => {
    getRegionalesFromAPI();
  }, []);

  function getRegionalesFromAPI() {
    api
      .get("/regional/regionales")
      .then(async function (response) {
        setRegional(
          response.data.map((elem) => ({
            label: elem.nombre_regional,
            value: elem.id_regional,
          }))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (!regional) {
    return null;
  }

  const textInputChangeEmail = (val) => {
    if (reg1.test(val) || reg2.test(val)) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handlePasswordChangeConfrim = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const handleValidUser = (val) => {
    if ((val.trim().length >= 4 && reg1.test(val)) || reg2.test(val)) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async (
    primer_nombre,
    primer_apellido,
    email,
    password,
    confirm_password
  ) => {
    if (
      primer_nombre === "" ||
      primer_apellido === "" ||
      password === "" ||
      confirm_password === "" ||
      email === ""
    ) {
      Alert.alert(
        "Campos vacios!",
        "Verifique que todos los campos este llenos",
        [{ text: "Ok" }]
      );
    } else if (password === confirm_password) {
      try {
        const response = await axios({
          method: "post",
          url: baseUrl,
          headers: {},
          data: {
            email: data.email,
            password: data.password,
            primer_nombre: data.primer_nombre,
            segundo_nombre: data.segundo_nombre,
            primer_apellido: data.primer_apellido,
            segundo_apellido: data.segundo_apellido,
            tipo: "empleado",
            estado: "activo",
            regional: value,
          },
        });
        const foundUser = response.data;
        signIn(foundUser);
      } catch (error) {
        Alert.alert(
          "Registro Invalido",
          "Es posible que este usuario ya este creado porfavor verifique sus datos.",
          [{ text: "Ok" }]
        );
      }
    } else {
      Alert.alert("Contraseña!", "Verifique que las contraseñas sean iguales", [
        { text: "Ok" },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset={-100}
    >
      <ImageBackground
        source={require("../assets/Imagenes/screens.jpg")}
        style={styles.image}
      >
        <View style={styles.header}>
          <ScrollView style={{ marginTop: 100 }}>
            <View style={styles.container5}>
              <Text style={styles.title}>REGISTRO</Text>
            </View>
            <View style={styles.container3}>
              <DropDownPicker
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderWidth: 2,
                  borderColor: "#003366",
                  borderRadius: 6,
                  fontSize: 30,
                  width: 310,
                  marginBottom: 6,
                }}
                placeholder={"Selecciona tu regional"}
                open={open}
                value={value}
                items={regional}
                controller={(instance) => (controller = instance)}
                onChangeList={(items, callback) => {
                  new Promise((resolve, reject) => resolve(setRegional(items)))
                    .then(() => callback())
                    .catch(() => {});
                }}
                setOpen={setOpen}
                setValue={setValue}
              />
              <Text style={styles.text_footer}>Nombres</Text>
              <View style={styles.row}>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={"#003366"} size={20} />
                  <TextInput
                    placeholder="Primer nombre"
                    style={styles.textInput2}
                    autoCapitalize="none"
                    onChangeText={(val) => (data.primer_nombre = val)}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={"#003366"} size={20} />
                  <TextInput
                    placeholder="Segundo nombre"
                    style={styles.textInput2}
                    autoCapitalize="none"
                    onChangeText={(val) => (data.segundo_nombre = val)}
                  />
                </View>
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                Apellidos
              </Text>
              <View style={styles.row}>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={"#003366"} size={20} />
                  <TextInput
                    placeholder="Primer Apellido"
                    style={styles.textInput2}
                    autoCapitalize="none"
                    onChangeText={(val) => (data.primer_apellido = val)}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={"#003366"} size={20} />
                  <TextInput
                    placeholder="Segundo Apellido"
                    style={styles.textInput2}
                    autoCapitalize="none"
                    onChangeText={(val) => (data.segundo_apellido = val)}
                  />
                </View>
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                Correo Q-Vision
              </Text>
              <View style={styles.action}>
                <FontAwesome name="envelope-o" color={"#003366"} size={20} />
                <TextInput
                  placeholder="example@qvision.com"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChangeEmail(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color={"#003366"} size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUser ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Correo Q-Vision no valido</Text>
                </Animatable.View>
              )}
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                Contraseña
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={"#003366"} size={20} />
                <TextInput
                  placeholder="●●●●●●●●●"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                Confirmar contraseña
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={"#003366"} size={20} />
                <TextInput
                  placeholder="●●●●●●●●●"
                  secureTextEntry={data.confirm_secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChangeConfrim(val)}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  Al registrarse acepta nuestros
                </Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Terminos de Servicio
                </Text>
              </View>
              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>y</Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Politica de Privacidad
                </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {
                    loginHandle(
                      data.primer_nombre,
                      data.primer_apellido,
                      data.email,
                      data.password,
                      data.confirm_password
                    );
                  }}
                >
                  <LinearGradient
                    colors={["#003366", "#003366"]}
                    style={styles.signIn}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Registrarse
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("SignInScreen")}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#003366",
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#003366",
                      },
                    ]}
                  >
                    Ingresar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.container2}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require("../assets/Logos/Logo_blanco_iccono.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <StatusBar backgroundColor="#003366" barStyle="light-content" />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const height_logo = windowHeight * 0.1;
const height_back = windowHeight * 1;
const windowlogo = windowHeight * 0.5 - 240;
const whidt_back = windowWidth * 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
  },
  container2: {
    backgroundColor: "#003366",
    padding: 10,
    position: "absolute",
    top: 30,
    left: windowlogo,
  },
  container3: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 10,
    alignItems: "flex-start",
    width: 350,
  },
  container4: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingTop: 50,
    alignItems: "center",
    width: 350,
  },
  container5: {
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    paddingBottom: 5,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(8,45,118,0.5)",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#003366",
    fontSize: 18,
  },
  row: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 15,
    width: 310,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    height: height_back,
    width: whidt_back,
    position: "absolute",
  },
  logo: {
    width: height_logo,
    height: height_logo,
    backgroundColor: "#003366",
  },
  preference: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  title: {
    color: "#003366",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput2: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    paddingRight: 10,
    width: 140,
    color: "#05375a",
  },
  textPrivate: {
    flexDirection: "row",
  },
  color_textPrivate: {
    color: "#003366",
  },
});
