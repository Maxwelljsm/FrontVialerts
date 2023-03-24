import React from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../components/context";
import { useTheme } from "react-native-paper";
import axios from "axios";
const baseUrl = "http://3.231.9.74:5000/auth/login";
const SignInScreen = ({ navigation }) => {
  var reg1 = RegExp(/^[a-zA-Z0-9]+@qvision+\.com+\.co$/);
  var reg2 = RegExp(/^[a-zA-Z0-9]+@qvision+\.us$/);

  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (reg1.test(val) || reg2.test(val)) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
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

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
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

  const loginHandle = async (userName, password) => {
    if (userName === "" || password === "") {
      Alert.alert(
        "Campos vacios!",
        "El campo de correo o contraseña se encuetra vacio.",
        [{ text: "Ok" }]
      );
    } else {
      try {
        const response = await axios({
          method: "post",
          url: baseUrl,
          headers: {},
          data: { email: userName, password: password },
        });
        const foundUser = response.data;
        signIn(foundUser);
      } catch (error) {
        Alert.alert(
          "Autenticacion invalida",
          "El correo o contraseña es incorrecto",
          [{ text: "Ok" }]
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset={-200}
    >
      <ImageBackground
        source={require("../assets/Imagenes/screens.jpg")}
        style={styles.image}
      >
        <View style={styles.header}>
          <View style={styles.container4}>
            <Text style={styles.title}>INICIAR SESIÓN</Text>
          </View>
          <View style={styles.container3}>
            <Text style={[styles.text_footer, { color: colors.text }]}>
              Correo Q-Vision
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={"#003366"} size={20} />
              <TextInput
                placeholder="example@qvision.com"
                placeholderTextColor="#003366"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
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
                  color: colors.text,
                  marginTop: 20,
                },
              ]}
            >
              Contraseña
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={"#003366"} size={20} />
              <TextInput
                placeholder="●●●●●●●●●"
                placeholderTextColor="#003366"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
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
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}
          </View>
          <View style={styles.preference}>
            <Text style={{ color: "#003366", marginTop: 15 }}>
              ¿Olvidaste tu contraseña?
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#F18C27",
                  fontWeight: "bold",
                  marginTop: 15,
                  marginLeft: 2,
                }}
              >
                Recuerdala Aqui
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container5}>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  loginHandle(data.username, data.password);
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
                    Ingresar
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpScreen")}
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
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>
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
        </View>

        <StatusBar backgroundColor="#003366" barStyle="light-content" />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const whidt_back = windowWidth * 1;
const height_logo = windowHeight * 0.1;
const height_back = windowHeight * 1;
const windowlogo = windowHeight * 0.5 - 270;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
  },
  container2: {
    backgroundColor: "#003366",
    padding: 10,
    position: "absolute",
    top: windowlogo,
  },
  container3: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 20,
    alignItems: "flex-start",
    width: 350,
  },
  container4: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingTop: 50,
    alignItems: "center",
    width: 350,
    marginTop: 100,
  },
  container5: {
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    width: 350,
    paddingBottom: 50,
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
  action: {
    flexDirection: "row",
    marginTop: 10,
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
    width: 200,
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
    width: 350,
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
  },
});
