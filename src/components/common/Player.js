import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FoundationIcon from 'react-native-vector-icons/Foundation'

class Player extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            currentSong: this.props.data[this.props.index],
            paused: false,
            played: false
        }
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
            return
        }

        this.state.paused ? ReactNativeAudioStreaming.resume() : ReactNativeAudioStreaming.pause()

    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: this.state.currentSong.image}}/>
                </View>
                <View style={styles.backgroundContainer}/>
                <View style={styles.playerContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.audioNameContainer}>{this.state.currentSong.title}</Text>
                        <Text style={styles.authorNameContainer}>{this.state.currentSong.description}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.iconsContainer}>
                            <View style={styles.icon}><FoundationIcon.Button name='previous' size={40} color='white' backgroundColor='transparent' onPress={() => console.log('prev')}/></View>
                            <View style={styles.icon}>
                                {this.state.paused ? <FoundationIcon.Button name='pause' size={50} color='white' backgroundColor='transparent' onPress={this._onPlay}/> : <EntypoIcon.Button name='controller-play' size={50} color='white' backgroundColor='transparent' onPress={this._onPlay}/>}
                            </View>
                            <View style={styles.icon}><FoundationIcon.Button name='next' size={40} color='white' backgroundColor='transparent'/></View>
                        </View>
                    </View>
                </View>
            </View>
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
    imageContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backgroundContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.5
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
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        color: 'white'
    },
    authorNameContainer: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        paddingTop: 20,
        color: 'white'
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 20,
        marginRight: 20
    },
    iconsContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})