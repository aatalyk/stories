import React, { Component } from 'react'
import {
    View,
    Button
} from 'react-native'
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming'
import Player from '../components/Player'

export default class PlayerScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            paused: false,
        }
    }

    play = () => {
        ReactNativeAudioStreaming.play('https://www.soundjay.com/button/button-1.mp3', {showIniOSMediaCenter: true, showInAndroidNotifications: true})
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Player style={{flex:1}} uri={'https://cdn.dribbble.com/users/1969603/screenshots/4652763/iphone_6-7-8___27.png'}/>
            </View>
        )
    }
}