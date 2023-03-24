import React , { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CardList } from '../components/puestos/CardList';
import {api} from '../config/config'

const ExploreScreen = ({route}) => {

  const {id_oficina} = route.params;
  
  const [tipoPuestos, setTipoPuestos] = useState([]);

    function getTipoPuestosFromAPI() {
      api.get(`/tipopuestos/tipopuesto/${id_oficina}`)
          .then(async function (response) {
            setTipoPuestos(response.data);
          })
          .catch(function (error) {
              console.log(error);
              setTipoPuestos([]);
          })
    }

    useEffect(() => {
      getTipoPuestosFromAPI()
  }, [id_oficina])
  
    if (!tipoPuestos) {
        return null
    }

    return (
      <View style={styles.container}>
        <CardList cards={tipoPuestos} />
      </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }})