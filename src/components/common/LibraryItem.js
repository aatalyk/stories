import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class LibraryItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.props.item}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                    <Icon name='navigate-next' size={30} color='#ECECEC'/>
                </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    }, 
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 15,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 25,
        color: '#9B59B6'
    },
})