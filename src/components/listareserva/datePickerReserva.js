import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import { useFonts, OpenSans_300Light } from '@expo-google-fonts/open-sans';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateReserva = () => {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light
  });
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textDate, setTextDate] = useState('Fecha de Reserva');
    const [textTime, setTextTime] = useState('Hora');
    const [textTimeEnd, setTextTimeEnd] = useState('Hora');
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      let fTime = "";
      let fTimeEnd = "";
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate()+ '/' + (tempDate.getMonth() + 1 ) + '/' + tempDate.getFullYear();
        if(fTime === 'Hora'){
            fTime= 'Hora: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
            setTextTime(fTime)
        }else{
            fTimeEnd= 'Hora: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
            setTextTimeEnd(fTimeEnd)
        }
         
        setTextDate(fDate)
        
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <View>
          <Text>{textDate}</Text>
        <View>
          <Button onPress={showDatepicker} title="Selecciona la fecha de reserva" />
        </View>
        <Text>{textTime}</Text>
        <View>
          <Button onPress={showTimepicker} title="Seleciona la hora inicio" />
        </View>
        <Text>{textTimeEnd}</Text>
        <View>
          <Button style={styles.button} onPress={showTimepicker} title="Seleciona la hora fin" />
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

// Kindacode.com
// just add some styles to make our app look more beautiful
// This is not the focus of this article
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  pickedDateContainer: {
    padding: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'OpenSans_300Light'
  },
  btnContainer: {
    padding: 30,
  },
  button: {
    backgroundColor: "#fff",
    borderColor:"#003366",
    borderWidth:5,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default DateReserva;