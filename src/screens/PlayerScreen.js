import React, { Component } from 'react'
import {
    View,
    Button
} from 'react-native'
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming'
import Player from '../components/common/Player'

export class PlayerScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            paused: false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: '',
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                height: 50,
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0,
            }
        }
    }

    play = () => {
        ReactNativeAudioStreaming.play('https://www.soundjay.com/button/button-1.mp3', {showIniOSMediaCenter: true, showInAndroidNotifications: true})
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Player style={{flex:1}} index={this.props.navigation.state.params.index}/>
            </View>
        )
    }
}