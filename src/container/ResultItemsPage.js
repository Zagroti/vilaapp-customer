import React from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Animated,
    ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//components
import ResultItems from '../components/ResultItems';
import Header from '../components/Header';


const IMAGE_HEIGHT = 100;
const SCROLL_HEIGHT = 50;
const THEME_COLOR = "#A52D53";
const TEXT_COLOR = "#fff";

class ResultItemsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '#C72652',
            inactive: '#555',
            invisible: '#fafafa',
            tab: [true, false, false],

            markers: [
                { latitude: 51.422548, longitude: 35.732573 },
            ],
        };
        // scroll animation 
        this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    }

    // scroll animation 
    nScroll = new Animated.Value(0);
    scroll = new Animated.Value(0);

    tabY = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
        outputRange: [0, 0, 1]
    });

    imgScale = this.nScroll.interpolate({
        inputRange: [-25, 0],
        outputRange: [1.1, 1],
        extrapolateRight: "clamp"
    });

    imgOpacity = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: [1, 0],
    });

    summaryBg = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: ["transparent", THEME_COLOR],
        extrapolate: "clamp"
    });

    summaryColor = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: ["transparent", TEXT_COLOR],
        extrapolate: "clamp"
    });

    summaryOpacity = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: [0, 1],
    });

    sortBg = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: ["rgba(165, 45, 83,.6)", THEME_COLOR],
        extrapolate: "clamp"
    });



    //sort tab 
    _changeTab = (tab) => {
        this.setState({
            tab: tab
        })
    }


    _showDetail = () => {
        Actions.Details()
    }



    render() {

        return (
            <View style={{ backgroundColor: '#fff', flex: 1, position: 'relative' }}>
                <Header title="نتایج جستجو - 218#"
                    leftIcon="bell-outline"
                    leftPress={() => Actions.Support()}
                    rightIcon="arrow-right"
                    rightPress={() => Actions.pop()}
                    iconColor="#B22850"
                    notification={true}
                />

                {/* summary result */}
                <Animated.View style={{
                    backgroundColor: this.summaryBg,
                    height: 50,
                    right: 0,
                    left: 0,
                    position: 'absolute',
                    top: 50,
                    zIndex: 200,
                    paddingHorizontal: 15,
                    justifyContent: 'center'

                }} >
                    <Animated.View style={{
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: this.summaryOpacity,
                        height: 40,
                        borderRadius: 40
                    }}>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={styles.summary_Text} >محمودآباد</Text>
                            <Icon style={{ marginLeft: 5 }} name="map-marker" size={15} color="#fff" />
                        </View>
                        <Text style={styles.seprator} >|</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.summary_Text}>31 اردیبهشت</Text>
                            <Text style={styles.summary_Text}> - </Text>
                            <Text style={styles.summary_Text}>28 اردیبهشت</Text>
                        </View>
                        <Text style={styles.seprator} >|</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.summary_Text}>800,000</Text>
                            <Text style={styles.summary_Text}> - </Text>
                            <Text style={styles.summary_Text}>400,000</Text>
                        </View>
                        <Text style={styles.seprator} >|</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.summary_Text}>2 شب</Text>
                        </View>
                    </Animated.View>
                </Animated.View>


                <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { y: this.nScroll } } }
                    ],
                        { useNativeDriver: true },
                    )}
                    style={{ position: 'relative', zIndex: 1 }}>

                    <ImageBackground
                        style={{ width: '100%', height: 185, backgroundColor: 'green', }}
                        imageStyle={{ resizeMode: 'cover' }}
                        source={require('./../../Assets/Images/amol.jpg')}
                    >

                        {/* result description */}
                        <Animated.View style={{
                            transform: [{ translateY: Animated.multiply(this.nScroll, .5) }, { scale: this.imgScale }],
                            height: IMAGE_HEIGHT,
                            backgroundColor: 'rgba(165, 45, 83,.6)',
                            zIndex: 998

                        }}>
                            <View style={styles.details} >
                                <View style={{
                                    width: '100%',
                                    height: IMAGE_HEIGHT,
                                }}>
                                    <Animated.View style={{
                                        width: '100%',
                                        height: IMAGE_HEIGHT,
                                        justifyContent: 'flex-start',
                                        opacity: this.imgOpacity,

                                    }}>
                                        <Animated.View style={{
                                            backgroundColor: 'transparent',
                                            height: IMAGE_HEIGHT,
                                            paddingHorizontal: 20,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            opacity: this.imgOpacity,

                                        }}>
                                            <View style={{
                                                alignItems: 'flex-end',
                                                borderRightWidth: 1,
                                                borderRightColor: "#fff",
                                                paddingRight: 5,
                                            }}>
                                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                                    <Text style={styles.detail_view}>ورود : 1398/02/28 </Text>
                                                    <Icon name="calendar-range" style={{ marginLeft: 10 }} size={15} color="#fff" />
                                                </View>
                                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                                    <Text style={styles.detail_view}>خروج : 1398/02/31</Text>
                                                    <Icon name="calendar-range" style={{ marginLeft: 10 }} size={15} color="#fff" />
                                                </View>

                                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                                    <Text style={styles.detail_view}>مدت اقامت : 2 شب</Text>
                                                    <Icon style={{ marginLeft: 10 }} name="weather-night" size={15} color="#fff" />
                                                </View>
                                            </View>
                                            <View style={{
                                                fontFamily: 'IYB',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 50,
                                            }}>
                                                <Icon name="map-marker" size={15} color="#fff" />
                                                <Text style={{
                                                    color: '#fff',
                                                    fontFamily: 'IYB',
                                                    textAlign: 'center',
                                                    fontSize: 16,
                                                }} >
                                                    محمودآباد
                                            </Text>
                                            </View>



                                            <View style={{
                                                alignItems: 'flex-start',
                                                borderLeftWidth: 1,
                                                borderLeftColor: "#fff",
                                                paddingLeft: 5
                                            }}>
                                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                                    <Icon style={{ marginRight: 10 }} name="cash" size={15} color="#fff" />
                                                    <Text style={styles.detail_view}> از 400,000 ت / شب</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                                    <Icon style={{ marginRight: 10 }} name="cash" size={15} color="#fff" />
                                                    <Text style={styles.detail_view}> تا 800,000 ت / شب</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                                    <Icon style={{ marginRight: 10 }} name="account-multiple-outline" size={15} color="#fff" />
                                                    <Text style={styles.detail_view}>  تعداد : 5  نفر </Text>
                                                </View>
                                            </View>

                                        </Animated.View>


                                    </Animated.View>
                                </View>
                            </View>

                        </Animated.View>


                        {/* sort buttons */}
                        <Animated.View
                            style={{
                                transform: [{ translateY: this.tabY }],
                                width: "100%",
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 999,
                                height: 90,
                            }}>
                            <Animated.View
                                style={{
                                    justifyContent: 'center',
                                    width: "100%",
                                    alignItems: 'center',
                                    backgroundColor: this.sortBg,
                                    height: 90
                                }}>
                                <View style={{
                                    justifyContent: 'center',
                                    width: "100%",
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderTopRightRadius: 40,
                                    borderTopLeftRadius: 40,
                                    zIndex: 999,
                                    height: 90
                                }} >
                                    <View style={styles.tab}  >
                                        <Text style={{
                                            width: '30%',
                                            fontSize: 12,
                                            fontFamily: 'IYB',
                                            paddingRight: 8
                                        }}>
                                            ترتیب بر اساس:
                                        </Text>
                                        <View style={{
                                            width: '70%',
                                            height: 36,
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>

                                            <TouchableOpacity style={[styles.tab_box]} onPress={() => this._changeTab([true, false, false])}>
                                                <Text style={[styles.tab_text, { color: this.state.tab[0] ? this.state.active : this.state.inactive }]}>  امتیاز </Text>
                                                {
                                                    this.state.tab[0] ?
                                                        <Icon name="sort-descending"
                                                            style={{ marginLeft: 2 }}
                                                            size={15}
                                                            color={this.state.tab[0] ? this.state.active : this.state.invisible} />
                                                        : null}
                                            </TouchableOpacity>

                                            <TouchableOpacity style={[styles.tab_box]} onPress={() => this._changeTab([false, true, false])}>
                                                <Text style={[styles.tab_text, { color: this.state.tab[1] ? this.state.active : this.state.inactive }]}>  قیمت</Text>
                                                {
                                                    this.state.tab[1] ?
                                                        <Icon name="sort-ascending"
                                                            style={{ marginLeft: 2 }}
                                                            size={15}
                                                            color={this.state.tab[1] ? this.state.active : this.state.invisible} />
                                                        : null}
                                            </TouchableOpacity>

                                            <TouchableOpacity style={[styles.tab_box]} onPress={() => this._changeTab([false, false, true])}>
                                                <Text style={[styles.tab_text, { color: this.state.tab[2] ? this.state.active : this.state.inactive }]}>  تخفیف %</Text>
                                                {
                                                    this.state.tab[2] ?
                                                        <Icon name="sort-descending"
                                                            style={{ marginLeft: 2 }}
                                                            size={15}
                                                            color={this.state.tab[2] ? this.state.active : this.state.invisible} />
                                                        : null
                                                }

                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </Animated.View>

                        </Animated.View>

                    </ImageBackground>


                    <View style={{
                        paddingBottom: 200,
                        backgroundColor: '#fff',
                        zIndex: -90000,
                    }}>

                        {this.state.tab[0] ?

                            <View style={{ width: '100%', alignItems: 'center', zIndex: -99999 }}>
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                            </View>
                            : null

                        }

                        {this.state.tab[1] ?

                            <View style={{ width: '100%', alignItems: 'center', zIndex: -99999 }}>
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                            </View>
                            : null

                        }

                        {this.state.tab[2] ?

                            <View style={{ width: '100%', alignItems: 'center', zIndex: -99999 }}>
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                                <ResultItems navigate={this._showDetail} />
                            </View>
                            : null

                        }


                    </View>


                </Animated.ScrollView>

            </View>


        )
    }
}


export default ResultItemsPage;

const styles = ({
    ResultItemsPage: {
        width: Dimensions.get('window').width,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 200,
        position: 'relative'

    },
    tab: {
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 60,
        backgroundColor: '#f3f3f3',
        borderRadius: 50,
        zIndex: 9,
        paddingVertical: 15
    },

    summary_Text: {
        fontFamily: 'ISBold',
        fontSize: 10,
        color: '#fff'
    },
    seprator: {
        marginHorizontal: 5,
        color: '#fff'
    },
    tab_box: {
        width: '31%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        backgroundColor: '#fafafa',
        borderRadius: 50

    },

    tab_text: {
        fontSize: 10,
        fontFamily: 'ISBold',
        marginLeft: 5,
    },
    line: {
        width: 1,
        height: '80%',
        backgroundColor: '#ddd'
    },
    details: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
    details_right_image: {
        width: '100%',
        height: IMAGE_HEIGHT,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(165, 45, 83,1)',


    },

    detail_view: {
        fontFamily: 'ISFBold',
        fontSize: 10,
        color: '#fff'
    }



})