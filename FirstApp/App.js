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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.Scrollelements} style={styles.scrollView} horizontal={true} decelerationRate={0} snapToInterval={200} snapToAlignment={"center"}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.square}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.triangle}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.circle}/>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.View}>
        <Clock/>
      </View>
    </SafeAreaView>
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
