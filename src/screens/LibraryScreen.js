import React from 'react'
import { View, Button, Text, FlatList, Animated, StyleSheet, ScrollView, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26]

export default class LibraryScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [1, 2, 3, 4, 5],
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
            )
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
            headerRight: (
                <Icon.Button name="ios-alarm"/> 
            )
        }
    }

    renderScrollViewContent = ({ item }) => {
        return (
            <View style={styles.scrollViewContent}>
                <Text>{item}</Text>
            </View>
        )
    }

    setTitle = event => {
        if (event.nativeEvent.contentOffset.y > 0) {
            this.props.navigation.setParams({title: 'Library'})
          } else {
            this.props.navigation.setParams({title: ''})
          }
    }

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
        
        return (
            <View style={styles.fill}>
                <AnimatedFlatList
                    style={styles.fill}
                    scrollEventThrottle={1}
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true,
                          listener: this.setTitle
                        },
                    )}
                    onMomentumScrollEnd={() => console.log('hi')}
                    data={data}
                    renderItem={this.renderScrollViewContent}/>
                <Animated.View 
                    pointerEvents="none" //read about it
                    style={[
                        styles.header,
                        {transform: [{ translateY: headerTranslate}]},
                    ]}
                    >
                    <Text style={styles.title}>Library</Text>
                </Animated.View>
                <Button title="test" onPress={() => console.log('test')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        fontSize: 45,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fill: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        justifyContent: 'center',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        backgroundColor: 'red',
		margin: 8,
    }, 
    row: {
        height: 60,
        margin: 16,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    }
})