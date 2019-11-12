/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  PanResponder,
  Animated
} from 'react-native';
import Draggable from 'react-native-draggable';

class MasterView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shapes: null}
  }

  AppCallback = (Shape) => {
    this.setState({shapes: Shape})
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <ScrollViewButtons onChange={this.AppCallback}></ScrollViewButtons>
        <View style={styles.View}>
          {this.state.shapes}
        </View>
      </SafeAreaView>
    );
  }

}

class ScrollViewButtons extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shapes: "None"}
  }

  ScrollButtonCallback = (Shape) => {
    this.props.onChange(Shape)
  }

  render(){
    const square = (<Text style={styles.square}/>);
    const circle = (<Text style={styles.circle}/>)
    return(
      <ScrollView contentContainerStyle={styles.Scrollelements} style={styles.scrollView} horizontal={true} decelerationRate={0} snapToInterval={200} snapToAlignment={"center"}>
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={square}></SquareScrollButton>
        <TriangleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={<TriangleCanvasShape/>}></TriangleScrollButton>
        <CircleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={circle}></CircleScrollButton>
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={square}></SquareScrollButton>
      </ScrollView>
    );
  }

}

class SquareScrollButton extends React.Component{
  constructor(props) {
    super(props);
  }

  ButtonPress = () => {
    this.props.onPress(this.props.renderOnPress)
  }

  render(){
    return(
      <TouchableOpacity style={styles.button} onPress={this.ButtonPress}>
          <Text style={styles.square}/>
      </TouchableOpacity>
    );
  }

}

class CircleScrollButton extends React.Component{
  constructor(props) {
    super(props);
  }

  ButtonPress = () => {
    this.props.onPress(this.props.renderOnPress)
  }

  render(){
    return(
      <TouchableOpacity style={styles.button} onPress={this.ButtonPress}>
          <Text style={styles.circle}/>
      </TouchableOpacity>
    );
  }
}

class TriangleScrollButton extends React.Component{
    constructor(props) {
      super(props);
    }
  
    ButtonPress = () => {
      this.props.onPress(this.props.renderOnPress)
    }
  
    render(){
      return(
        <TouchableOpacity style={styles.button} onPress={this.ButtonPress}>
            <Text style={styles.triangle}/>
        </TouchableOpacity>
      );
    }

}

class TriangleCanvasShape extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  render(){
    return(
      <Draggable reverse={false}>
        <Text style={styles.triangle}/>
      </Draggable>  
    );
  }

}

const App = () => {
  return (
    <MasterView/>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  Scrollelements: {
    paddingHorizontal: 10
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    margin: 3
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'blue',
    margin: 3
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    padding: 12,
    margin: 3
  },
  container: {
    height: 1000,
  },
  scrollView: {
    flex: 4,
    backgroundColor: 'lightgray',
  },
  clock: {
    backgroundColor: 'skyblue'
  },
  View: {
    flex: 7
  }
})

export default App;
