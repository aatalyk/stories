'use strict'

import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/index'

class SongsScreen extends Component {

    state = {}

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
        return (this.props.loading ?

                (<View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>)
            
                :

                (<View style={styles.fill}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SongsScreen)

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: 'yellow',
        paddingTop: 20,
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