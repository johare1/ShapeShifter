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
  TextInput,
  Animated
} from 'react-native';
import Draggable from './CustomModules/react-native-draggable/Draggable';
import MenuDrawer from './CustomModules/react-native-side-drawer'

let canvasShapes = [];

class MasterView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shapes: null}
  }

  AppCallback = (Shape) => {
    this.setState({shapes: Shape})
    canvasShapes.push(Shape);
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <ScrollViewButtons onChange={this.AppCallback} onCanvasPress={this.props.onCanvasPress}></ScrollViewButtons>
        <View style={styles.View}>
          {canvasShapes}
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
    return(
      <ScrollView contentContainerStyle={styles.Scrollelements} style={styles.scrollView} horizontal={true} decelerationRate={0} snapToInterval={200} snapToAlignment={"center"}>
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={<CanvasShape renderShape={"square"} onPress={this.props.onCanvasPress}/>}></SquareScrollButton>
        <TriangleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={<CanvasShape renderShape={"triangle"} onPress={this.props.onCanvasPress}/>}></TriangleScrollButton>
        <CircleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={<CanvasShape renderShape={"circle"} onPress={this.props.onCanvasPress}/>}></CircleScrollButton>
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={<CanvasShape renderShape={"square"} onPress={this.props.onCanvasPress}/>}></SquareScrollButton>
      </ScrollView>
    );
  }

}
//SCROLL BUTTONS
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

class SettingsSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
    alert("pressed");
  };

  drawerContent = () => {
    return (
      <View>
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText()}
      value={'hello'}
      />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container2}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
         <MasterView onCanvasPress={this.toggleOpen}/>
       
        </MenuDrawer>
      </View>
    );
  }
}
<<<<<<< HEAD

=======
>>>>>>> 8e8325123514a235a75cc733778667f063a901fb
// CANVAS SHAPE
class CanvasShape extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  getShape = () => {
  if(this.props.renderShape == 'circle') {
    return{
      width: 100,
      height: 100,
      borderRadius: 100/2,
      backgroundColor: 'blue',
      margin: 3
    };
  }else if(this.props.renderShape == 'square') {
    return{
      width: 100,
      height: 100,
      backgroundColor: 'green',
      padding: 12,
      margin: 3 
    };
  }else if(this.props.renderShape == 'triangle') {
    return{
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
    };
  }
}

  render(){
    return(
      <Draggable pressDrag={this.props.onPress} reverse={false} renderShape={'button'}>
        <Text style={this.getShape()}/>
      </Draggable>  
    );
  }
}


const App = () => {
  return (
    <SettingsSideBar/>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  Scrollelements: {
    paddingHorizontal: 1
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
  container2: {
    zIndex: 0,
    flex: 1
  },
  scrollView: {
    flex: 4,
    backgroundColor: 'lightgray',
  },
  clock: {
    backgroundColor: 'skyblue'
  },
  View: {
    flex: 7,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
  },
})

export default App;
