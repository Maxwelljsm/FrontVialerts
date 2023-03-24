import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Platform,Pressable } from "react-native";
import { useFonts, OpenSans_300Light } from '@expo-google-fonts/open-sans';
import DateTimePicker from "@react-native-community/datetimepicker";

const DateReserva = (props) => {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light
  });

  const [data, setData] = React.useState({
    fecha_reserva: "",
    hora_inicio: "",
    horafin: ""
  });

  const [date, setDate] = useState(new Date(1598051730000));
  const [dateInit, setDateInit] = useState();
  const [timeInit, setTimeInit] = useState();
  const [timeEnd, setTimeEnd] = useState();
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
      if (mode === "time")
        date = `Hora: ${tempDate.getHours()} | Minutos: ${tempDate.getMinutes()}`;
      else
        date = `${tempDate.getDate()}/${
          tempDate.getMonth() + 1
        }/${tempDate.getFullYear()}`;
    }
    if (date !== "")
     { switch (typeField) {
        case "time":
          setTextTime(date);
          setTimeInit(selectedDate);
          break;
        case "timeEnd":
          setTextTimeEnd(date);
          setTimeEnd(selectedDate);
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

  const datas = async (time1,time2,fecha) =>{
    if(time1 !== undefined && time2 !== undefined && fecha !== undefined){
      setData(data.fecha_reserva=dateInit,data.horafin= timeEnd,data.hora_inicio= timeInit)
   }
  }

  const showMode = (currentMode, time) => {
    setShow(true);
    setTypeField(time);
    setMode(currentMode);
  };
  
  return (
    <View>
      <Text style={styles.textStyle4}>{textDate}</Text>
      <View>
        <Pressable
          style={styles.buttonTime}
          onPress={() => showMode("date", "date")}
          title="Selecciona la fecha de reserva"
          >
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  preference: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  buttonClose: {
    backgroundColor: "#fff",
    borderColor:"#003366",
    borderWidth:2,
    margin: 10,
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width:80,
    marginBottom:10
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
  textStyle2: {
    color: "#003366",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'OpenSans_300Light'
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
});

export default DateReserva;
