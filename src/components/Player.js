import React, { Component } from 'react'
import {
    View,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    Slider,
    Text
} from 'react-native'
import * as IconEntypo from 'react-native-vector-icons/Entypo'
import * as IconFoundation from 'react-native-vector-icons/Foundation'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/Constants'

export default class Player extends Component {
    
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        this.animation = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT - 150})

        this.panResponder = PanResponder.create({

            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: (event, gestureState) => {
                this.animation.extractOffset()
            },

            onPanResponderMove: (event, gestureState) => {
                this.animation.setValue( {x: 0, y: gestureState.dy })
            },

            onPanResponderRelease: (event, gestureState) => {
                if(gestureState.dy < 0) {
                    Animated.spring(this.animation.y, {
                        toValue: -SCREEN_HEIGHT + 150,
                        tension: 1 
                    }).start()
                } else if (gestureState.dy > 0) {
                    Animated.spring(this.animation.y, {
                        toValue: SCREEN_HEIGHT - 150,
                        tension: 1,
                    }).start()
                }
            }

        })
    }

    render() {

        const animatedHeight = {
            transform: this.animation.getTranslateTransform()
        }

        animatedImageHeight = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT-150],
            outputRange: [SCREEN_WIDTH*0.7, 50],
            extrapolate: 'clamp'
        })

        animatedImageMarginLeft = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT-150],
            outputRange: [SCREEN_WIDTH*0.15, 15],
            extrapolate: 'clamp'
        })

        animatedHeaderHeight = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT-150],
            outputRange: [SCREEN_HEIGHT/2, 80],
            extrapolate: 'clamp'
        })

        animatedElementsOpacity = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT/2, SCREEN_HEIGHT-150],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        })

        animatedDetailElementsOpacity = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT/2, SCREEN_HEIGHT-150],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        })

        return (
            <Animated.View style={styles.container}>
                <Animated.View style={[animatedHeight, styles.background]}>

                    <Animated.View {... this.panResponder.panHandlers} 
                        style={{
                            height: animatedHeaderHeight,
                            borderTopWidth: 1,
                            borderTopColor: '#ebe5e5',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View style={styles.bottomItems}>
                            <Animated.View 
                                style={{height: animatedImageHeight, 
                                         width: animatedImageHeight, 
                                    marginLeft: animatedImageMarginLeft}}>
                                <Image style={styles.bottomImage} source={{uri: this.props.uri}}/>
                            </Animated.View>
                        </View>
                        <Animated.View 
                            style={{
                                opacity: animatedElementsOpacity,
                                flex: 3,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
                            <IconEntypo.Button name="controller-play" backgroundColor='transparent' color='black' size={32}/> 
                            <IconFoundation.Button name="pause" backgroundColor='transparent' color='black' size={32}/> 
                            <IconEntypo.Button name="controller-stop" backgroundColor='transparent' color='black' size={32}/> 
                        </Animated.View>
                    </Animated.View>

                    <Animated.View style={{height: animatedHeaderHeight, opacity: animatedDetailElementsOpacity}}>

                        <View 
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                            <Text style={{ fontSize: 32}}>Ferman Akgul</Text>
                            <Text style={{ fontSize: 27, color: 'grey'}}>Ferman Akgul</Text>
                        </View>
                        <View 
                        style={{
                            flex: 2,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                            <IconFoundation.Button name="pause" backgroundColor='transparent' color='black' size={40}/> 
                            <IconEntypo.Button name="controller-play" backgroundColor='transparent' color='black' size={50}/> 
                            <IconEntypo.Button name="controller-stop" backgroundColor='transparent' color='black' size={40}/> 
                        </View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'white',
        height: SCREEN_HEIGHT,
    },
    bottom: {
        height: this.animatedHeaderHeight,
        borderTopWidth: 1,
        borderTopColor: '#ebe5e5',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomItems: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomImageContainer: {
        height: 50,
        width: 50,
    },
    bottomImage: {
        flex: 1,
        height: null,
        width: null,
    },
    elements: {
        opacity: 1,
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})
