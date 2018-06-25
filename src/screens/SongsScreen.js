'use strict'

import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Animated,
    ActivityIndicator,
    Platform,
} from 'react-native'
import { connect } from 'react-redux'

import Fonts from '../utils/Fonts'
import * as actions from '../actions'
import { AppRoutes } from '../components/navigation';

const HEADER_MAX_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = 75

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class Songs extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            )
        }
    }

    componentDidMount() {
        this.props.fetchSongs()
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
            headerStyle: {
                backgroundColor: 'white',
                borderBottomWidth: 0,
            }
        }
    }

    setTitle = event => {
        if (event.nativeEvent.contentOffset.y > 0) {
            this.props.navigation.setParams({title: AppRoutes.Songs})
        } else {
            this.props.navigation.setParams({title: ''})
        }
    }

    renderItem = ({item, index}) => (
        <View styles={styles.row}>
            <Text style={styles.title}>
                {parseInt(index) + 1}{"."}{item.title}
            </Text>
            <Text style={styles.title}>
                {item.description}
            </Text>
        </View>
    )

    render() {

        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        )

        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        })

        return (this.props.loading ?
            (<View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>)

            :

            (<View style={styles.fill}>
                <AnimatedFlatList
                    style={styles.fill}
                    scrollEventThrottle={1}
                    contentInset={{
                        top: HEADER_MAX_HEIGHT
                    }} 
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY }}}],
                        { useNativeDriver: true,
                          listener: this.setTitle
                        }
                    )}
                    ref='listRef'
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>
                <Animated.View 
                    pointerEvents="none"
                    style={[
                        styles.header,
                        {transform: [{ translateY: headerTranslate}]},
                    ]}>
                    <Text style={styles.title}>Songs</Text>
                </Animated.View>
            </View>)
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        data: state.songs.data,
        loading: state.songs.loading,
        error: state.songs.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSongs: () => dispatch(actions.fetchSongs())
    }
}

export const SongsScreen = connect(mapStateToProps, mapDispatchToProps)(Songs)

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
    row: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    title: {
        fontSize: 35,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: Fonts.LibreFranklin,
    },
    description: {
        marginTop: 5,
        fontSize: 14,
    }
})