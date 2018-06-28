import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class ListItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.listItemContainer}>
                    <View style={styles.iconContainer}>
                        <Image source={{uri: this.props.item.image}} style={styles.initStyle} resizeMode='contain'/>
                    </View>
                    <View style={styles.itemDetailContainer}>
                        <View style={styles.itemDetailContainerWrap}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.text}>{this.props.item.title}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Icon name='navigate-next' size={30} color='#ECECEC'/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 15,
    },
    itemDetailContainer: {
        flex: 4,
        justifyContent: 'center',
    },
    nextIconContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemDetailContainerWrap: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleContainer: {
        alignItems: 'flex-start',
        flex: 1,
    },
    initStyle: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    text: {
        fontSize: 18,
    }
})