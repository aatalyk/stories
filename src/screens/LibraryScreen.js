import React from 'react'
import { 
    View, 
    Button, 
    Text, 
    FlatList, 
    Animated, 
    StyleSheet, 
    Platform, 
    Alert } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Fonts from '../utils/Fonts'
import { Labels, mapper } from '../utils/Labels'

import LibraryItem from '../components/common/LibraryItem'

const HEADER_MAX_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = 75

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const data = [Labels.SongsScreen, Labels.StoriesScreen, Labels.AboutScreen]

export class LibraryScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [Labels.SongsScreen, Labels.StoriesScreen, Labels.AboutScreen],
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({showAlert: this._showAlert})
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {}} = navigation.state
        return {
            title: navigation.getParam('title', ''),
            headerRight: (
                <MaterialIcon.Button name="sort" backgroundColor='transparent' color='#9B59B6' onPress={() => params.showAlert()}/> 
            ),
            headerStyle: {
                backgroundColor: 'white',
                borderBottomWidth: 0,
            },
        }
    }

    _setTitle = event => {
        if (event.nativeEvent.contentOffset.y > 0) {
            this.props.navigation.setParams({title: Labels.LibraryScreen})
          } else {
            this.props.navigation.setParams({title: ''})
          }
    }

    _showAlert = () => {
        Alert.alert(
            Labels.LibraryScreen,
            '',
            [
              {text: Labels.Sort, onPress: this._sort},
              {text: Labels.Initial, onPress: this._shuffle},
              {text: Labels.Cancel, onPress: null, style: 'cancel'},
            ],
            { cancelable: true }
          )
    }

    _sort = () => {
        this.setState({
            data: this.state.data.sort()
        })
    }

    _shuffle = () => {
        this.setState({
            data: data
        })
    }
    
    _onPress = (item) => {
        this.props.navigation.navigate(mapper[item])
    }

    _renderItem = ({item, index}) => <LibraryItem item={item} onPress={() => this._onPress(item)}/>

    _renderSeparator = () => (
        <View style={styles.separator}/>
    )

    render() {

        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_SCROLL_DISTANCE : 0,
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
                          listener: this._setTitle
                        },
                    )}
                    onMomentumScrollEnd={() => console.log('hi')}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    keyExtractor={(item, index) => index}/>
                <Animated.View 
                    pointerEvents="none" //read about it
                    style={[
                        styles.header,
                        {transform: [{ translateY: headerTranslate}]},
                    ]}
                    >
                    <Text style={styles.title}>Кітапхана</Text>
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
        fontFamily: Fonts.MerriweatherBlack,
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
        height: 0.5,
        backgroundColor: '#DCDCDC',
        marginLeft: 20,
        marginRight: 20,
    }
})