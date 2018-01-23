import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  Sound,
  Scene
} from 'react-vr';
import Button from './components/button.js';

class EarthMoonVR extends React.Component {
  constructor() {
    super();
    this.state = {
      rotation: 130,
      zoom: -70
    };
    this.lastUpdate = Date.now();
    this.spaceSkymap = [
      '../static_assets/skybox/space_right.png',
      '../static_assets/skybox/space_left.png',
      '../static_assets/skybox/space_up.png',
      '../static_assets/skybox/space_down.png',
      '../static_assets/skybox/space_back.png',
      '../static_assets/skybox/space_front.png'
    ];
    this.styles = StyleSheet.create({
      menu: {
        flex: 1,
        flexDirection: 'column',
        width: 1,
        alignItems: 'stretch',
        transform: [
          {
            translate: [2, 2, -5]
          }
        ]
      }
    });

    this.rotate = this.rotate.bind(this);
  }

  handleInput(e) {
    console.log(e.nativeEvent.inputEvent.type);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta / 150
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  render() {
    return (
      <Scene>
        <Pano source={{
          uri: this.spaceSkymap
        }}/>

        <AmbientLight intensity={1.2}/>

        <View style={this.styles.menu}>
          <Button text='+' callback={() => this.setState((prevState) => ({
            zoom: prevState.zoom + 10
          }))}/>
          <Button text='-' callback={() => this.setState((prevState) => ({
            zoom: prevState.zoom - 10
          }))}/>
        </View>

        <Model style={{
          transform: [
            {
              translate: [-25, 0, this.state.zoom]
            }, {
              scale: 0.07
            }, {
              rotateY: this.state.rotation
            }, {
              rotateX: 20
            }, {
              rotateZ: -10
            }
          ]
        }} source={{
          obj: asset('mars/mars.obj'),
          mtl: asset('mars/mars.mtl')
        }} lit={true}>
          <Sound source={{
            ogg: asset('music/Mars.ogg'),
            mp3: asset('music/Mars.mp3'),
            }}
          />
        </Model>

        <Model style={{
          transform: [
            {
              translate: [
                -100, 20, this.state.zoom - 10
              ]
            }, {
              scale: 0.05
            }, {
              rotateY: this.state.rotation / 3
            }
          ]
        }} source={{
          obj: asset('mars/deimos.obj'),
          mtl: asset('mars/deimos.mtl')
        }} lit={true}/>
        <Model style={{
          transform: [
            {
              translate: [
                -80, 5, this.state.zoom - 10
              ]
            }, {
              scale: 0.042
            }, {
              rotateY: this.state.rotation / 3
            }
          ]
        }} source={{
          obj: asset('mars/phobos.obj'),
          mtl: asset('mars/phobos.mtl')
        }} lit={true}/>
      </Scene>
    );
  }
};

AppRegistry.registerComponent('ThePlanets', () => EarthMoonVR);
