import React from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { ItemCard } from './ItemCard';
import WorkJobContent from './WorkJobContent';

export class CardList extends React.Component {

  static propTypes = {

    itemProps: PropTypes.shape(ItemCard.propTypes),

    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      disponible: PropTypes.string,
      inactivo: PropTypes.string,
      ocupado: PropTypes.string,
      reservado: PropTypes.string,
      subtitle: PropTypes.string,
      picture: PropTypes.any,
      content: PropTypes.element
    })),

    selected: PropTypes.string,

    listStyle: PropTypes.any,

    duration: PropTypes.number


  }

  static defaultProps = {
    duration: 600
  }

  _layouts = new Map()  

  constructor(props) {
    super(props);

    this.state = {            
      selected: new Map(),
      zoomedStyle: {},
      maxHeight: 400,
      zoomAnim: new Animated.Value(1)
    }    
  }

  _keyExtractor = (item, index) => item.id_regional

  _onPressItem = ({ item, index }) => {
    
    if (!this._flatList) {
      return;
    }

    this.setState(state => {
      
      if (state.selected.get(item.id_regional)) {
        return state;
      }

      selected = new Map();
      selected.set(item.id_regional, true);

      this._flatList.scrollToIndex({ animated: true, index });
      
      let windowWidth = Dimensions.get('window').width;
      let windowHeight = Dimensions.get('window').height;

      let viewWidth = this._layouts.get(item.id_regional).width;
      let viewHeight = this._layouts.get(item.id_regional).height;

      let scale = windowWidth / viewWidth;

      //let maxHeight = windowHeight / scale;
      let maxHeight = 350
      Animated.timing(this.state.zoomAnim, {
        toValue: scale,
        duration: this.props.duration
      }).start();

      return ({
        ...state,
        selected: selected,
        zoomedStyle: {
          transform: [{ scale: this.state.zoomAnim }, { translateY: viewWidth * -1.6 * (scale - 1)  }]
        },
        maxHeight: maxHeight
      });

    });

  }

  _onCloseItem = ({ item, index }) => {
    this.setState(state => {

      Animated.timing(this.state.zoomAnim, {
        toValue: 1,
        duration: this.props.duration
      }).start();

      return ({
        ...state,
        selected: new Map(),
        zoomedStyle: {
          transform: [{ scale: this.state.zoomAnim }, { translateY: 0 }]
        },
      });

    });
  }

  _renderItem = ({ item, index }) =>
    <ItemCard
      onLayout={e => this._layouts.set(item.id_regional, e.nativeEvent.layout)}
      title={item.nombre_regional}
      subtitle={item.nombre_regional}
      disponible={item.disponibles}
      ocupado={item.ocupados}
      reservado={item.reservados}
      inactivo={item.inactivos}
      picture={item.image_regional ? {uri: item.image_regional } : null}
      onPress={() => this._onPressItem({ item, index })}
      onClose={() => this._onCloseItem({item, index})}
      maxHeight={this.state.maxHeight}
      selected={this.state.selected.get(item.id_regional)}
      heightDuration={this.props.duration}
    >
      <WorkJobContent id_regional={item.id_regional} descripcion={item.descripcion}/>
    </ItemCard>  

  render() {
    return (
      <Animated.View style={[{ flex: 1 }, this.state.zoomedStyle]}>
        <Text style={styles.itemTextTitle}>RESERVA TU PUESTO DE TRABAJO</Text>
        <Text style={styles.itemTextSub}>Regionales</Text>
        <FlatList
          ref={c => this._flatList = c}
          style={[{
            flex: 1,
            backgroundColor: '#fff',
          }, this.props.listStyle]}
          data={this.props.cards}
          scrollEnabled={true}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />        
      </Animated.View>
    )
  }

}
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
    paddingLeft:15,
    paddingBottom:10
  },
  itemTextTitle: {
    alignContent: 'flex-start',
    color: "#003366",
    fontSize: 30,
    fontWeight:'bold',
    paddingLeft:15,
    paddingTop:10
  },
})