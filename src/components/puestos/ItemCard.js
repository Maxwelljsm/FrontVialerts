import React from 'react';
import {
  Animated,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export class ItemCard extends React.Component {


  static propTypes = {
    title: PropTypes.string.isRequired,
    disponible: PropTypes.string.isRequired,
    ocupado: PropTypes.string.isRequired,
    reservado: PropTypes.string.isRequired,
    inactivo: PropTypes.string.isRequired,
    picture: PropTypes.any.isRequired,
    selected: PropTypes.bool,
    height: PropTypes.number,
    maxHeight: PropTypes.number,
    onPress: PropTypes.func,
    onLayout: PropTypes.func,
    onClose: PropTypes.func,

    activeOpacity: PropTypes.number,

    shrinkTo: PropTypes.number,
    shrinkDuration: PropTypes.number,
    heightDuration: PropTypes.number,

    borderRadius: PropTypes.number,

    textStyle: PropTypes.any,

    closeIcon: PropTypes.element,

    content: PropTypes.element
  }

  constructor(props) {
    super(props);

    this.state = {
      heightAnim: new Animated.Value(this.props.height || 200),
      scaleAnim: new Animated.Value(1),
      selected: this.props.selected
    }    

  }

  _onPresIn = () => {

    if (this.props.selected) {
      return;
    }

    Animated.timing(this.state.scaleAnim, {
      toValue: this.props.shrinkTo || 0.96,
      duration: this.props.shrinkDuration || 200,
    }).start()
  }

  _onPressOut = () => {

    if (this.props.selected) {
      return;
    }

    Animated.timing(this.state.scaleAnim, {
      toValue: 1,
      duration: this.props.shrinkDuration || 200,
    }).start()
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.selected && !this.props.selected) {
      Animated.timing(this.state.heightAnim, {
        toValue: nextProps.maxHeight || 400,
        duration: nextProps.heightDuration || 260
      }).start()
    }

    if (!nextProps.selected && this.props.selected) {
      Animated.timing(this.state.heightAnim, {
        toValue: nextProps.height || 200,
        duration: nextProps.heightDuration || 260
      }).start()
    }

  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity || 0.8}
        onPressIn={this._onPresIn}
        onPressOut={this._onPressOut}
        onPress={this.props.onPress}
      >

        <Animated.View
          style={[
            styles.container,
            this.props.style,
            this.props.borderRadius ? { borderRadius: this.props.borderRadius } : {},
            {
              transform: [{ scale: this.state.scaleAnim }],
              height: this.state.heightAnim,
              width: 350,
            }
          ]}>

          <ImageBackground
            onLayout={this.props.onLayout}
            borderRadius={this.props.selected ? 0 : (this.props.borderRadius || 10)}
            source={this.props.picture}
            style={[
              styles.image,
              { height: this.props.height || 200 }
            ]}
          >
            <View style={styles.header}>
              <View style={styles.preference}>
                <Text style={[styles.text, this.props.textStyle]}>
                  {this.props.title}
                </Text>
                <Text style={[styles.text2, this.props.textStyle]}>
                  Puestos Disponibles: {this.props.disponible}  Ocupados: {this.props.ocupado}
                </Text>
                <Text style={[styles.text2, this.props.textStyle]}>
                  Puestos Reservados: {this.props.reservado}  Inactivos: {this.props.inactivo}
                </Text>
              </View>
              </View>
              {
                this.props.selected ?
                  <TouchableWithoutFeedback onPress={this.props.onClose} >
                    <View style={{
                      position: 'absolute',
                      top: 20,
                      right: 10
                    }}>
                      {this.props.closeIcon || <Icon name="close-circle-outline" style={[styles.textIcon, this.props.textStyle]} />}
                    </View>  
                  </TouchableWithoutFeedback> : null
              }
          </ImageBackground>

          {
            this.props.selected ?
              <View style={{flex: 1, paddingLeft: 10, paddingRight:10}}>
                {this.props.children || <Text>COntent!</Text>}
              </View> : null
          }
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    borderRadius: 10,
    borderColor:'#003366',
    borderWidth:2,
    margin: 10,
    padding: 0
  },
  image: {
    width: undefined,
    height: 200,
    padding: 20,
    margin: 0,
    flexDirection: 'row',
    alignItems: 'flex-end', 
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '700',
    fontSize: 44,
  },
  textIcon:{
    color: '#fff',
    fontWeight: '100',
    fontSize: 30,
  },
  preference: {
    width:'100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text2: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  header: {
    flex: 1,
    backgroundColor: "rgba(8,45,118,0.7)",
    paddingLeft:10,
    borderRadius:10
  },
});