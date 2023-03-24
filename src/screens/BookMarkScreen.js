import React , { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { CardList } from '../components/regionales/CardList';

import {api} from '../config/config'

const BookmarkScreen = () => {

  const [regional, setRegional] = useState([]);

    useEffect(() => {
        getRegionalesFromAPI();
    }, [])

    function getRegionalesFromAPI() {
      api.get('/regional/regionales/rp')
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

    return (
      <View style={styles.container2}>
        <CardList cards={regional} />
      </View>
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemTextSub: {
    alignContent: 'flex-start',
    color: "#003366",
    fontSize: 20,
    paddingLeft:20,
    paddingBottom:20
  },
  itemTextTitle: {
    alignContent: 'flex-start',
    color: "#003366",
    fontSize: 30,
    fontWeight:'bold',
    paddingLeft:20,
    paddingTop:10
  },
})