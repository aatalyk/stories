import React from 'react'
import { 
    View, 
    Button, 
    Text, 
    FlatList, 
    Animated, 
    StyleSheet, 
    Platform, 
    TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Fonts from '../utils/Fonts'
import { AppRoutes } from '../components/navigation'

const HEADER_MAX_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = 75

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const data = ['Songs', 'Stories']

export class LibraryScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
            )
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
            headerRight: (
                <Icon.Button name="create" backgroundColor='white' color='blue'/> 
            ),
            headerStyle: {
                backgroundColor: 'white',
                borderBottomWidth: 0,
            },
        }
    }

    renderSeparator = () => (
        <View style={styles.separator}/>
    )

    setTitle = event => {
        if (event.nativeEvent.contentOffset.y > 0) {
            this.props.navigation.setParams({title: 'Library'})
          } else {
            this.props.navigation.setParams({title: ''})
          }
    }

    _onPress = (item) => {
        this.props.navigation.navigate(item)
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(item)}>
                <View style={styles.scrollViewContent}>
                    <Text style={styles.rowTitle}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
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
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index}/>
                <Animated.View 
                    pointerEvents="none" //read about it
                    style={[
                        styles.header,
                        {transform: [{ translateY: headerTranslate}]},
                    ]}
                    >
                    <Text style={styles.title}>Library</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: Fonts.LibreFranklin,
    },
    fill: {
        flex: 1,
        backgroundColor: 'white',
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
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        margin: 20,
        marginTop: 15,
        marginBottom: 15,
    }, 
    row: {
        height: 60,
        marginLeft: 5,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowTitle: {
        fontSize: 25,
        color: '#9b59b6'
    },
    separator: {
        height: 1,
        backgroundColor: '#DCDCDC',
        marginLeft: 20,
        marginRight: 20,
    }
})