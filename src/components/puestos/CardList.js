import React from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { ItemCard } from './ItemCard';
import WorkJobContentPuestos from './WorkJobContentPuest';
export class CardList extends React.Component {

  static propTypes = {

    itemProps: PropTypes.shape(ItemCard.propTypes),

    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      disponible: PropTypes.string,
      ocupado: PropTypes.string,
      reservado: PropTypes.string,
      inactivo: PropTypes.string,
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

  _keyExtractor = (item, index) => item.id_tipoPuesto


  _onPressItem = ({ item, index }) => {
    
    console.log(item.id_tipoPuesto);
    if (!this._flatList) {
      return;
    }

    this.setState(state => {
      
      if (state.selected.get(item.id_tipoPuesto)) {
        return state;
      }

      selected = new Map();
      selected.set(item.id_tipoPuesto, true);

      this._flatList.scrollToIndex({ animated: true, index });
      
      let windowWidth = Dimensions.get('window').width;
      let windowHeight = Dimensions.get('window').height;

      let viewWidth = this._layouts.get(item.id_tipoPuesto).width;
      let viewHeight = this._layouts.get(item.id_tipoPuesto).height;

      let scale = windowWidth / viewWidth;

      //let maxHeight = windowHeight / scale;
      let maxHeight = 1700
      Animated.timing(this.state.zoomAnim, {
        toValue: scale,
        duration: this.props.duration
      }).start();

      return ({
        ...state,
        selected: selected,
        zoomedStyle: {
          transform: [{ scale: this.state.zoomAnim }, { translateY: viewWidth * 0.5 * (scale - 1)  }]
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
      onLayout={e => this._layouts.set(item.id_tipoPuesto, e.nativeEvent.layout)}
      title={item.nombre}
      disponible={item.disponible}
      ocupado={item.ocupado}
      reservado={item.reservado}
      inactivo={item.inactivo}
      picture={item.image_tipopuesto ? {uri: item.image_tipopuesto } : null}
      onPress={() => this._onPressItem({ item, index })}
      onClose={() => this._onCloseItem({item, index})}
      maxHeight={this.state.maxHeight}
      selected={this.state.selected.get(item.id_tipoPuesto)}
      heightDuration={this.props.duration}
    >
      <WorkJobContentPuestos id_tipoPuesto={item.id_tipoPuesto} id_oficina={item.id_oficina}/>
    </ItemCard>  

  render() {
    return (
      <Animated.View style={[{ flex: 1 }, this.state.zoomedStyle]}>
        <FlatList
          ref={c => this._flatList = c}
          style={[{
            flex: 1,
          }, this.props.listStyle]}
          data={this.props.cards}
          
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />        
      </Animated.View>
    )
  }

}