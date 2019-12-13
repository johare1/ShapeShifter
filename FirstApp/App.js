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
  Animated,
  Image
} from 'react-native';
import Draggable from './CustomModules/react-native-draggable/Draggable';
import MenuDrawer from './CustomModules/react-native-side-drawer'

let canvasShapes = [];

class MasterView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shapes: null,viewHome:true}
  }

  AppCallback = (Shape) => {
    this.setState({shapes: Shape})
    if(Shape == "triangle"){
      var canvShape = {
        key: getID(),
        type: Shape,
        height: 100,
        width: 50,
        zind: 0
      }
    }else{
      var canvShape = {
        key: getID(),
        type: Shape,
        height: 100,
        width: 100,
        zind: 0
      }
    }
    canvasShapes.push(canvShape);
  }
    
  getInitialState(){
    return{
      viewHome:true
    }
  }

  changeView(){
    this.setState({
      viewHome: !this.state.viewHome
    })
    this.AppCallback;
  }

  render() {
    if(!this.state.viewHome)return(
    <SafeAreaView style={styles.container}>
      <ScrollViewButtons onChange={this.AppCallback} onCanvasPress={this.props.onCanvasPress}/>
      <View style={styles.View}>
          {canvasShapes.map(shape => (
            <CanvasShape zind={shape.zind} usekey={shape.key} key={shape.key} currwidth={shape.width} currheight={shape.height} renderShape={shape.type} onPress={this.props.onCanvasPress}/>
          ))}
      </View>
    </SafeAreaView>
    )
     return (
       <View style={styles.homeStyle}>
         <Text style={{fontSize:40,textAlign:"center",marginBottom:25}}> ShapeShifter</Text>
         <TouchableOpacity style={styles.homeBtn} onPress={() => this.changeView()}>
             <Text style={styles.homeBtnTxt}>Create a Shape</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.homeBtn} onPress={() => this.changeView()}>
             <Text style={styles.homeBtnTxt}>View My Shapes</Text>
         </TouchableOpacity>
         <Image
          style={styles.logo}
          source={require('./icon.png')}
        />
       </View>
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
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={"square"}></SquareScrollButton>
        <TriangleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={"triangle"}></TriangleScrollButton>
        <CircleScrollButton onPress={this.ScrollButtonCallback} renderOnPress={"circle"}></CircleScrollButton>
        <SquareScrollButton onPress={this.ScrollButtonCallback} renderOnPress={"square"}></SquareScrollButton>
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
      open: false,
      currshapeID: 0
    };
  }

  toggleOpen = (sentID) => {
    this.setState({ open: !this.state.open, currshapeID: sentID});
    alert(sentID);
  };
  // search array for shape with currshapeID, then change its CSS
  drawerContent = () => {
    return (
      <View style={{backgroundColor:"red", flex:1}}>
        <TouchableOpacity onPress={this.toggleOpen} style={{backgroundColor:"blue", maxWidth: 50}}>
          <Text>Close</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 100, marginLeft:10}}>Height:</Text>
        <TextInput
          style={styles.TextInputShape}
          onSubmitEditing = {(event) => {
            for(i=0;i<canvasShapes.length;i++){
              let changeHeight = canvasShapes.find(shape => shape.key == this.state.currshapeID);
              changeHeight.height = parseInt(event.nativeEvent.text);
            }
          }}
        />
        <Text style={{marginTop: 100, marginLeft:10}}>Width:</Text>
        <TextInput
          style={styles.TextInputShape}
          onSubmitEditing = {(event) => {
            for(i=0;i<canvasShapes.length;i++){
              let changeWidth = canvasShapes.find(shape => shape.key == this.state.currshapeID);
              changeWidth.width = parseInt(event.nativeEvent.text);
            }
          }}
        />
         <Text style={{marginTop: 100, marginLeft:10}}>Layer:</Text>
        <TextInput
          style={styles.TextInputShape}
          onSubmitEditing = {(event) => {
            for(i=0;i<canvasShapes.length;i++){
              let changeLayer = canvasShapes.find(shape => shape.key == this.state.currshapeID);
              changeLayer.zind = parseInt(event.nativeEvent.text);
            }
          }}
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
// CANVAS SHAPE
class CanvasShape extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
  }

  getShape = () => {
  if(this.props.renderShape == 'circle') {
    return{
      position: "absolute",
      width: this.props.currwidth,
      height: this.props.currheight,
      borderRadius: 100/2,
      backgroundColor: 'blue',
      margin: 3,
      zIndex: this.props.zind
    };
  }else if(this.props.renderShape == 'square') {
    return{
      position: "absolute",
      width: this.props.currwidth,
      height: this.props.currheight,
      backgroundColor: 'green',
      padding: 12,
      margin: 3,
      zIndex: this.props.zind
    };
  }else if(this.props.renderShape == 'triangle') {
    return{
      position: "absolute",
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: this.props.currwidth,
      borderRightWidth: this.props.currwidth,
      borderBottomWidth: this.props.currheight,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'red',
      margin: 3,
      zIndex: this.props.zind
    };
  }
}

  render(){
    return(
      <Draggable pressDrag={() => {this.props.onPress(this.props.usekey)}} reverse={false} renderShape={'button'}>
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

var IDnum = 0;

const getID = () => {
  var ID = IDnum;
  IDnum++;
  return ID;
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  Scrollelements: {
    paddingHorizontal: 1
  },
  homeStyle:{
    margin:40,
    marginTop:200,
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
  homeBtn:{
    backgroundColor:"blue",
    width:130,
    height:30,
    alignSelf:"center",
    borderRadius:10,
    marginTop:10
  },
  homeBtnTxt:{
    color:"white",
    textAlign:"center",
    fontWeight:"bold",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    margin:5
  },
  logo:{
      width: 100,
      height: 100,
      resizeMode: 'stretch',
      marginTop:70,
      marginLeft:95,
      justifyContent: 'center',
      alignItems: 'center'
  },
  TextInputShape: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    backgroundColor: "grey", 
    maxWidth: 160, 
    marginTop: 5, 
    marginLeft:10, 
    marginRight:10 
  }
})

export default App;
