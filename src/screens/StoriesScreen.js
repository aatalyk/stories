'use strict'

import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    Animated,
    Platform,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions'

const HEADER_MAX_HEIGHT = 75
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT

class Stories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
            )
        }
    }

    componentDidMount() {
        this.props.fetchStories()
    }

    renderItem = ({item, index}) => (
        <View style={styles.row}>
            <Text style={styles.title}>
                {parseInt(index) + 1}{". "}{item.title}
            </Text>
            <Text style={styles.description}>
                {item.description}
            </Text>
        </View>
    )

    render() {

        const scrollY = Animated.add()

        return (this.props.loading ?

                (<View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>)
            
                :

                (<View style={styles.mainContainer}>
                    <FlatList
                        ref='listRef'
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}/>
                </View>)
            )
    }
}

const mapStateToProps = (state, props) => {
    return {
        data: state.stories.data,
        loading: state.stories.loading,
        error: state.stories.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStories: () => dispatch(actions.fetchStories())
    }
}

export const StoriesScreen = connect(mapStateToProps, mapDispatchToProps)(Stories)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'yellow',
        paddingTop: 20,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flex: 1,
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        justifyContent: 'center',
    },
    activityIndicatorContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    row: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: '600'
    },
    description: {
        marginTop: 5,
        fontSize: 14,
    }
})