/**
 *	* https://github.com/tongyy/react-native-draggable
 * 
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	Text,
	Image,
	PanResponder,
	Animated,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';


export default class Draggable extends Component {
	static propTypes = {
		renderText:PropTypes.string,
		renderShape:PropTypes.string,
		renderChildren:PropTypes.any,
		renderSize:PropTypes.number,
		imageSource:PropTypes.oneOfType([
			PropTypes.shape({
				uri: PropTypes.string,
			}),
			PropTypes.number
		]), 
		offsetX:PropTypes.number,
		offsetY:PropTypes.number,
		renderColor:PropTypes.string,
		reverse:PropTypes.bool,
		pressDrag:PropTypes.func,
		onMove:PropTypes.func,
		pressDragRelease:PropTypes.func,
		longPressDrag:PropTypes.func,
		pressInDrag:PropTypes.func,
		pressOutDrag:PropTypes.func,
		z:PropTypes.number,
		x:PropTypes.number,
		y:PropTypes.number
		
	};
	static defaultProps = {
		offsetX : 100,
		renderShape : 'none',
		renderColor : 'yellowgreen',
		renderText : '＋',
		renderSize : 50,
		offsetY : 100,
		reverse : true
	}

	componentDidMount() {
		if(this.props.reverse == false)
			this.state.pan.addListener((c) => this.state._value = c);
	}
	componentWillUnmount() {
		this.state.pan.removeAllListeners();
	}
	constructor(props, defaultProps) {
		super(props, defaultProps);
		const { pressDragRelease, reverse, onMove } = props;
		this.state = {
			pan:new Animated.ValueXY(), 
			_value:{
				x: 0, 
				y: 0
			}
		};

		this.panResponder = PanResponder.create({		
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (e, gestureState) => {
				if(reverse == false) {
					this.state.pan.setOffset({x: this.state._value.x, y: this.state._value.y});
					this.state.pan.setValue({x: 0, y: 0});
				}
			},
			onPanResponderMove: Animated.event([null,{ 
				dx:this.state.pan.x,
				dy:this.state.pan.y
			}], {listener: onMove}),
			onPanResponderRelease: (e, gestureState) => {
				if(this.state._value.y < -395){
					this.putInBounds(this.state._value.x);
				}
				if(pressDragRelease)
					pressDragRelease(e, gestureState);
				if(reverse == false)
					this.state.pan.flattenOffset();
				else 
					this.reversePosition();
			} 
		});
	}
	
	_positionCss = () => {
		let Window = Dimensions.get('window');
		const { renderSize, offsetX, offsetY, x, y, z } = this.props;
		return Platform.select({
			ios: {
				zIndex: z != null ? z : 999,
				position: 'absolute',
				top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
				left: x !=null ? x : (Window.width / 2 - renderSize + offsetX)
			},
			android: {
				position: 'absolute',
				width:Window.width,
				height:Window.height,
				top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
				left: x !=null ? x : (Window.width / 2 - renderSize + offsetX)
			},
		});
	}

	_dragItemCss = () => {
		const { renderShape, renderSize, renderColor } = this.props;
		if(renderShape == 'circle') {
			return{
				backgroundColor: renderColor,
				width: renderSize * 2,
				height: renderSize * 2,
				borderRadius: renderSize 
			};
		}else if(renderShape == 'button') {
			return{
				width: renderSize * 2,
				height: renderSize * 2,
				borderRadius: renderSize,
			};
		}else if(renderShape == 'image') {
			return{
				width: renderSize,
				height: renderSize 
			};
		}
	}
	_dragItemTextCss = () => {
		const { renderSize } = this.props;
		return {
			marginTop: renderSize-10,
			marginLeft: 5,
			marginRight: 5,
			textAlign: 'center',
			color: '#fff'
		};
	}
	_getTouchableContent = () => {
		const { renderSize, renderShape, renderText, imageSource, children } = this.props;
		if(children) 
			return children;
		else if(renderShape == 'image')
			return(<Image style={this._dragItemCss(renderSize, null, 'image')} source={imageSource}/>);
		else
			return (<Text style={this._dragItemTextCss(renderSize)}>{renderText}</Text>);

	}

	reversePosition = () => {
		Animated.spring(						
			this.state.pan,				 
			{toValue:{x:0,y:0}}		 
		).start();
	}

	putInBounds = (xcoord) => {
		Animated.spring(						
			this.state.pan,				 
			{toValue:{x:xcoord,y:-395}}		 
		).start();
	}

	getPosition = () => {
		return { 
			offsetX: this.state._value.x,
			offsetY: this.state._value.y,
			x: this.state._value.x + this.props.x,
			y: this.state._value.y + this.props.y 
		};
	}

	render() {
		const { pressDrag, longPressDrag, pressInDrag, pressOutDrag } = this.props;

		return (
			<View style={this._positionCss()}>
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[this.state.pan.getLayout()]}>
					<TouchableOpacity 
						style={this._dragItemCss()}
						onPress={pressDrag}
						onLongPress={longPressDrag}
						onPressIn={pressInDrag}
						onPressOut={pressOutDrag}
					>
						{this._getTouchableContent()}	
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}


