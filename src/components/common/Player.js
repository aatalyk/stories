import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, DeviceEventEmitter, Animated, PanResponder, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FoundationIcon from 'react-native-vector-icons/Foundation'

import Fonts from '../../utils/Fonts'

const SCREEN_HEIGHT = Dimensions.get('window').height

class Player extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            currentSong: this.props.data[this.props.index],
            currentIndex: this.props.index,
            paused: false,
            played: false,
            pan: new Animated.ValueXY(),
            scrollEnabled: true
        }
    }

    componentWillMount() {
        
        this.scrollY = 0

        this._val = {x: 0, y: SCREEN_HEIGHT}
        this.state.pan.addListener((value) => this._val = value)

        this._panResponder = PanResponder.create({

            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if((gestureState.dy < 0 && this.scrollY === 0) || (gestureState.dy > 0 && this.scrollY === -SCREEN_HEIGHT)) {
                    return true
                }
            },

            onPanResponderGrant: (evt, gestureState) => {
                this.state.pan.extractOffset()
            },

            onPanResponderMove: (evt, gestureState) => {
                this.state.pan.setValue({x: 0, y: gestureState.dy})
            },

            onPanResponderRelease: (evt, gestureState) => {
                
                if (gestureState.dy < 0) {
                    this.scrollY = -SCREEN_HEIGHT
                    Animated.spring(this.state.pan.y, {
                      toValue: -SCREEN_HEIGHT,
                      tension: 1
                    }).start()
                  }
                  else if (gestureState.dy > 0) {
                    this.scrollY = 0
                    this.scroll.scrollTo({x: 0, y: 0, animated: true})
                    Animated.spring(this.state.pan.y, {
                      toValue: SCREEN_HEIGHT,
                      tension: 1
                    }).start()
                  }
            }

        })
    }

    componentDidMount() {

        DeviceEventEmitter.addListener(
            'DidFinishPlayingQueueItem', () => {
                this._stopPlayer()
            }
        )
    }

    _stopPlayer = () => {
        this.setState({
            paused: false,
            played: false
        })
        ReactNativeAudioStreaming.stop()
    }

    _onPlay = () => {

        this.setState({
            paused: !this.state.paused
        })

        if (!this.state.played) {
            ReactNativeAudioStreaming.play(this.state.currentSong.songUri, {showIniOSMediaCenter: true, showInAndroidNotifications: true})
            this.setState({
                played: true
            })
            return
        }

        this.state.paused ? ReactNativeAudioStreaming.resume() : ReactNativeAudioStreaming.pause()
    }

    _playPrev = () => {
        const index = this.state.currentIndex - 1
        if (index < 0) { return }
        this.setState({
            currentSong: this.props.data[index],
            currentIndex: index
        })
    }

    _playNext = () => {
        const index = this.state.currentIndex + 1
        if (index >= this.props.data.length) { return }
        this.setState({
            currentSong: this.props.data[index],
            currentIndex: index
        })
    }

    render() {

        const animatedHeight = {
            transform: this.state.pan.getTranslateTransform()
        }

        return(
            <Animated.View style={styles.container}>
                <Animated.View 
                {... this._panResponder.panHandlers}
                style={[animatedHeight, {flex: 1}]}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: this.state.currentSong.image}} blurRadius={5}/>
                    </View>
                    <Animated.View style={styles.playerContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.audioNameContainer}>{this.state.currentSong.title}</Text>
                            <Text style={styles.authorNameContainer}>{this.state.currentSong.description}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.iconsContainer}>
                                <View style={styles.icon}><FoundationIcon.Button name='previous' size={40} color='#9b59b6' backgroundColor='transparent' onPress={this._playPrev}/></View>
                                <View style={styles.icon}>
                                    {this.state.paused ? <FoundationIcon.Button name='pause' size={50} color='#9b59b6' backgroundColor='transparent' onPress={this._onPlay}/> : <EntypoIcon.Button name='controller-play' size={50} color='#9b59b6' backgroundColor='transparent' onPress={this._onPlay}/>}
                                </View>
                                <View style={styles.icon}><FoundationIcon.Button name='next' size={40} color='#9b59b6' backgroundColor='transparent' onPress={this._playNext}/></View>
                            </View>
                        </View>
                    </Animated.View>
                    <ScrollView 
                        style={styles.textContainer}
                        ref={(c) => {this.scroll = c}}>
                        <Text style={styles.lyricsContainer}>{this.state.currentSong.lyrics}</Text>
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        data: state.songs.data,
    }
}

export default connect(mapStateToProps)(Player)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'red',
    },
    imageContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT,
        backgroundColor: 'black'
    },
    textContainer: {
        flex: 1,
        position: 'absolute',
        top: SCREEN_HEIGHT,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT,
        backgroundColor: 'white',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    playerContainer: {
        paddingTop: 63,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameContainer: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    audioNameContainer: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        textAlign: 'center',
        color: '#22313F',
        fontFamily: Fonts.MerriweatherBlack
    },
    authorNameContainer: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        fontFamily: Fonts.MerriweatherRegular,
        color: '#F2F1EF'
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    iconsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    lyricsContainer: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        paddingTop: 30,
        fontFamily: Fonts.MerriweatherBlack
    }
})