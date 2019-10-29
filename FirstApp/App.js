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
} from 'react-native';

class MasterView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shapes: "None"}
  }

  AppCallback = (Shape) => {
    this.setState({shapes: Shape})
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <ScrollViewButtons onChange={this.AppCallback}></ScrollViewButtons>
        <View style={styles.View}>
          <Text>
            {this.state.shapes}
          </Text>
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
    this.setState({shapes: Shape})
    alert('hello')
    this.props.onChange(this.state.shapes)
  }

  render(){
    const square = "Square";
    const circle = "Circle";
    const triangle = "Triangle";
    return(
      <ScrollView contentContainerStyle={styles.Scrollelements} style={styles.scrollView} horizontal={true} decelerationRate={0} snapToInterval={200} snapToAlignment={"center"}>
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={square}></SquareScrollButton>
        <TriangleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={triangle}></TriangleScrollButton>
        <CircleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={circle}></CircleScrollButton>
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={square}></SquareScrollButton>
      </ScrollView>
    );
  }

}

class Clock extends React.Component{
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render(){
    return(
      <Text>
        {this.state.date.toLocaleTimeString()}
      </Text> 
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
