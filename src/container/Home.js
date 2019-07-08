import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    DrawerLayoutAndroid,
    Image,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    Modal,
    TextInput,
    Picker,
    PermissionsAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import InputScrollView from 'react-native-input-scroll-view';
import PersianDatePicker from "rn-persian-date-picker";
import Mapir from 'mapir-react-native-sdk'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';


//components 
import NoRequest from '../components/NoRequest';
import Requestitems from '../components/RequestItems';
import GradientButton from '../components/GradientButton';
import Counter from '../components/Counter';



var moment = require('moment-jalaali')
moment().format('jYYYY/jM/jD')


export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            selectStart: false,
            selectEnd: false,
            mapFull: false,
            otherZIndex: null,
            mapIconTop: 10,
            mapIconLeft: 10,
            markers: [
                { latitude: 51.422548, longitude: 35.732573 },
            ],
            modalHeight: Dimensions.get('window').height - 50
        };
    }



    //click humberger menu to open drawer
    _openDrawer = () => {
        this.refs['DRAWER_REF'].openDrawer();
    }


    componentDidMount() {
        // for disable back btn
        


        // for map
        {
            PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
                {
                    title: 'Give Location Permission',
                    message: 'App needs location permission to find your position.'
                }
            ).then(granted => {
                // console.log(granted);
                resolve();
            }).catch(err => {
                // console.warn(err);
                reject(err);
            });
        }

       

    }



    _back = () => {
        if(this.state.modalVisible){
            alert(0)
        }
        return true
    }


    componentWillUnmount() {
        // for disable back btn
        BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
    }


    //for disable back button hardware
    _handleBackButton() {
        alert(0)
        return true
    }

    //footer actions
    _navigate = (path) => {
        if (path === 'profile') {
            Actions.Profile()
        }
        if (path === 'history') {
            return false;
        }

        this.refs['DRAWER_REF'].closeDrawer();

    }





    // log out
    _exit = () => {
        console.log(111)
        this._removeData()
        Actions.SendNumber()
    }
    _removeData = async () => {
        try {
            await AsyncStorage.removeItem('login')
            console.log(AsyncStorage.getItem('login'))
            return true;
        } catch (e) {
            return false
        }
    }





    // got to vila cases
    _showRequestsNavigate = () => {
        Actions.ResultItemsPage()
    }

    //close modal
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    // open date picker and set date
    _startDateOpen = async () => {
        this.refs['STARTPICKER'].showPicker()
        this.setState({ selectStart: true })
    }
    _endDateOpen = async () => {
        this.refs['ENDPICKER'].showPicker()
        this.setState({ selectEnd: true })
    }


    // send nes request
    _newRequest = () => {
        this.setModalVisible(false)
    }



    // change map size and arrow 
    _mapFullScreen = () => {

        // when map is small
        if (this.state.mapFull) {
            this.setState({
                otherZIndex: -10,
                mapFull: false,
                mapIconTop: 10,
                mapIconLeft: 10,
                modalHeight: Dimensions.get('window').height - 50
            });
            mapParentStyle = {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%'
            };
            mapStyle = {
                width: '48%',
                height: 200,
            };
            square = {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }

        } else {
            this.setState({
                otherZIndex: null,
                mapFull: true,
                mapIconTop: 70,
                mapIconLeft: 20,
                modalHeight: Dimensions.get('window').height
            });
            mapParentStyle = {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height + 50,
                position: "absolute",
                zIndex: 999,
                marginTop: -100

            };
            mapStyle = {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height + 50,
                position: 'absolute',
                zIndex: 999
            };
            square = {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: Dimensions.get('window').height + 50
            }

        }

    }

    // map marker select
    // select location 
    addMarker = async (coordinates) => {
        await this.setState({
            markers: [{ latitude: coordinates[0], longitude: coordinates[1] }]
        });

    }

    _personCounter =  (e) => {
         this.setState({ persons: e })
    }


    render() {
        BackHandler.addEventListener('hardwareBackPress',this._back)


        // map marker
        const mark = this.state.markers.map(markers =>
            (<Mapir.Marker
                id={'2'}
                key={markers.latitude}
                coordinate={[markers.latitude, markers.longitude]}
            >
                <View style={{ width: 100, height: 100 }}>
                    <View style={{ marginLeft: 20, width: 80, height: 80, borderRadius: 50, backgroundColor: 'rgba(165, 45, 83,.3)', borderColor: 'rgb(165, 45, 83)', borderWidth: 2 }}>

                    </View>
                </View>
            </Mapir.Marker>
            ))



        // drawer menu 
        const navigationView = (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
                {/* <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text> */}
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 20,
                    backgroundColor: '#b04267',
                    width: '100%',
                    marginBottom: 10
                }} >
                    <View style={styles.icon_parent} >
                        <View style={styles.icon_child} >
                            <Image style={styles.icon} source={require('../../Assets/Images/natalie.jpeg')} />
                        </View>
                    </View>
                    <View style={styles.person_desc} >
                        <Text style={styles.person_name} >جمیله باغی تبار</Text>
                    </View>

                </View>
                <TouchableOpacity activeOpacity={.6} style={styles.bottom_icons} onPress={(e) => this._navigate('profile')}>
                    <Text style={styles.drawer_text}>پروفایل</Text>
                    <Icon name="account-outline" size={24} color="#b04267" />
                </TouchableOpacity>

                {/* got to history */}
                <TouchableOpacity activeOpacity={.6} style={styles.bottom_icons} onPress={(e) => this._navigate('history')}>
                    <Text style={styles.drawer_text}>تاریخچه</Text>
                    <Icon name="calendar-clock" size={24} color="#b04267" />
                </TouchableOpacity>

                {/* EXIT */}
                <TouchableOpacity activeOpacity={.6} style={styles.bottom_icons} onPress={this._exit}>
                    <Text style={styles.drawer_text}>خروج</Text>
                    <Icon name="exit-to-app" size={24} color="#b04267" />
                </TouchableOpacity>
            </View>
        );

        const { startDate, endDate } = this.state

        return (
            <DrawerLayoutAndroid
                drawerWidth={250}
                ref={'DRAWER_REF'}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={() => navigationView}
                onDrawerSlide={(e) => { console.log('1') }}
                onDrawerStateChanged={(e) => { console.log('2') }}
                onDrawerClose={(e) => { console.log('close') }}
                onDrawerOpen={(e) => { this._openDrawer.bind(this) }}
            >
                <View style={styles.home_cover} >

                    {/* MENU */}
                    <View style={styles.menu} >
                        <TouchableOpacity
                            style={styles.menu_icon}
                            onPress={() => Actions.Support()}>
                            <View style={styles.notification_circle} ></View>
                            <Icon name="bell-outline" size={32} color="#B22850" />
                        </TouchableOpacity>
                        <Text style={styles.title} >درخواست های من</Text>
                        <TouchableOpacity style={styles.menu_icon} onPress={this._openDrawer}>
                            <Icon name="menu" size={32} color="#B22850" />
                        </TouchableOpacity>
                    </View>


                    {/* request box  */}
                    <View style={styles.up} >
                        <ScrollView contentContainerStyle={styles.requestBox} >
                            {/* <NoRequest /> */}
                            <Requestitems navigate={this._showRequestsNavigate} />
                            <Requestitems navigate={this._showRequestsNavigate} />
                            <Requestitems navigate={this._showRequestsNavigate} />
                            <Requestitems navigate={this._showRequestsNavigate} />
                            <Requestitems navigate={this._showRequestsNavigate} />
                            <Requestitems navigate={this._showRequestsNavigate} />
                            <Requestitems navigate={this._showRequestsNavigate} />
                        </ScrollView>
                    </View>
                    <TouchableOpacity activeOpacity={.9} style={styles.modal_button}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        <View style={styles.middleInside}>
                            <Icon name="map-search-outline" size={50} color="#C92652" />
                        </View>
                    </TouchableOpacity>



                </View>



                {/* MODAL */}


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}>
                    {
                        this.state.selectStart ?
                            <Text style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height,
                                backgroundColor: 'rgba(0,0,0,.7)', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0,
                                zIndex: 20000
                            }}
                                onPress={() => {
                                    this.setState({ selectStart: false })
                                    this.refs['STARTPICKER'].hidePicker()
                                }}
                            >
                            </Text> : null

                    }
                    {
                        this.state.selectEnd ?
                            <Text style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height,
                                backgroundColor: 'rgba(0,0,0,.7)', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0,
                                zIndex: 20000
                            }}
                                onPress={() => {
                                    this.setState({ selectEnd: false })
                                    this.refs['ENDPICKER'].hidePicker()
                                }}
                            >
                            </Text> : null

                    }
                    <InputScrollView >
                        {/* Close modal  */}
                        {
                            this.state.mapFull ? null :
                                <View
                                    style={{
                                        backgroundColor: '#f6f6f6',
                                        width: '100%',
                                        height: 50,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 10,
                                    }}>
                                    <TouchableOpacity style={{
                                        fontSize: 20,
                                        backgroundColor: '#ddd',
                                        borderWidth: 1,
                                        borderColor: '#bbb',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontSize: 20, color: '#bbb' }}>
                                            ?
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'IS', fontSize: 20, }}>
                                        درخواست ویلا
                                    </Text>
                                    {/* Close modal  */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(false);
                                        }}>
                                        <Icon size={40} name="close" color="#bbb" />

                                    </TouchableOpacity>

                                </View>

                        }

                        {/* Modal Body */}
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#f7f7f7',
                            height: this.state.modalHeight,
                            width: Dimensions.get('window').width,
                            top: 0,
                            bottom: 0,
                            flex: 1
                        }} >
                            <View style={square}>


                                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginBottom: 10 }} >


                                    {/* price */}
                                    <View style={styles.modal_price} >
                                        <View style={styles.modal_details} >
                                            <View style={styles.modal_titles}>
                                                <Text style={styles.toman} > ( تومان ) </Text>
                                                <Text style={styles.gheymat} >قیمت</Text>
                                            </View>
                                            <Icon style={{ marginLeft: 5 }} size={22} name="brightness-percent" color="#555" />
                                        </View>
                                        <View style={{
                                            flexDirection: 'column-reverse',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            alignItems: 'space-between',
                                            height: 120,
                                            padding: 10
                                        }}>
                                            <View style={{ justifyContent: 'center', width: '100%' }}>
                                                <TextInput
                                                    placeholderTextColor={'#999'}
                                                    placeholder="تا"
                                                    style={styles.price_input}
                                                    onChangeText={(price) => this.setState({ price })}
                                                    keyboardType='numeric'
                                                />
                                            </View>

                                            <View style={{ justifyContent: 'center', width: '100%' }}>
                                                <TextInput
                                                    placeholderTextColor={'#999'}
                                                    placeholder="از"
                                                    style={styles.price_input}
                                                    onChangeText={(price) => this.setState({ price })}
                                                    keyboardType='numeric'
                                                />
                                            </View>

                                        </View>


                                    </View>

                                    {/* date */}
                                    <View style={styles.start_date} >
                                        <View style={styles.modal_details} >
                                            <Text style={styles.modal_titles} >تاریخ شروع</Text>
                                            <Icon style={{ marginLeft: 5 }} size={22} name="calendar-range" color="#555" />
                                        </View>



                                        {/* date picker date picker  */}
                                        <View style={{
                                            flexDirection: 'column-reverse',
                                            justifyContent: 'space-between',
                                            zIndex: -10,
                                            width: '100%',
                                            height: 120,
                                            padding: 10
                                        }}>

                                            {/* end date */}
                                            <View style={{ width: '100%' }}>
                                                <TouchableOpacity style={styles.select_date} onPress={this._endDateOpen}>
                                                    {this.state.endDate ?
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontFamily: 'ISBold',
                                                            alignItems: 'center',
                                                            color: '#636363'
                                                        }}>{moment(endDate).format("jYYYY/jMM/jDD")}</Text> :
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontFamily: 'ISBold',
                                                            alignItems: 'center',
                                                            color: '#999'
                                                        }}> تا تاریخ </Text>
                                                    }

                                                </TouchableOpacity>


                                                <PersianDatePicker
                                                    type="Jalali"
                                                    yearCount={10}
                                                    onConfirm={date => {
                                                        this.setState({ endDate: date, selectEnd: false });
                                                    }}
                                                    pickerFontSize={24}
                                                    pickerToolBarFontSize={15}
                                                    minDate={this.state.startDate ? moment(this.state.startDate).format("jYYYY/jMM/jDD") : null}
                                                    ref={'ENDPICKER'}
                                                    pickerFontFamily="ISBold"
                                                    pickerConfirmBtnColor={[0, 123, 255, 1]}
                                                    pickerCancelBtnColor={[220, 53, 69, 1]}
                                                    pickerTitleText="تا تاریخ"
                                                    pickerTitleColor={[99, 99, 99, 1]}
                                                    onPickerCancel={() => {
                                                        this.setState({ selectEnd: false });
                                                    }}

                                                />
                                            </View>
                                            {/* start date */}
                                            <View style={{ width: '100%' }}>
                                                <TouchableOpacity style={styles.select_date} onPress={this._startDateOpen} >
                                                    {this.state.startDate ?
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontFamily: 'ISBold',
                                                            alignItems: 'center',
                                                            color: '#636363'
                                                        }}>{moment(startDate).format("jYYYY/jMM/jDD")}</Text> :
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontFamily: 'ISBold',
                                                            alignItems: 'center',
                                                            color: '#999'
                                                        }}> از تاریخ </Text>
                                                    }

                                                </TouchableOpacity>


                                                <PersianDatePicker
                                                    type="Jalali"
                                                    yearCount={10}
                                                    onConfirm={date => {
                                                        this.setState({ startDate: date, selectStart: false });
                                                    }}
                                                    ref={'STARTPICKER'}
                                                    pickerFontSize={24}
                                                    pickerToolBarFontSize={15}
                                                    pickerFontFamily="ISBold"
                                                    pickerConfirmBtnColor={[0, 123, 255, 1]}
                                                    pickerCancelBtnColor={[220, 53, 69, 1]}
                                                    pickerTitleText=" از تاریخ"
                                                    pickerTitleColor={[99, 99, 99, 1]}
                                                    onPickerCancel={() => {
                                                        this.setState({ selectStart: false });
                                                    }}
                                                />
                                            </View>



                                        </View>



                                    </View>

                                </View>
                                {/* map map map  */}
                                <View style={mapParentStyle}>
                                    <View style={{
                                        width: '48%',
                                        height: 200,
                                        zIndex: this.state.otherZIndex,
                                        justifyContent: 'space-between',
                                        borderRadius: 5,
                                        // backgroundColor: '#eee',

                                    }}>
                                        <View style={{ width: '100%', backgroundColor: '#eee', padding: 10, borderRadius: 5, marginBottom: 10 }}>
                                            <View style={styles.modal_detailsx} >
                                                <Text style={styles.modal_titles} >نوع وبلا</Text>
                                                <Icon style={{ marginLeft: 5 }} size={22} name="home" color="#555" />

                                            </View>
                                            <View style={{
                                                backgroundColor: '#fff',
                                                borderRadius: 5,

                                            }}>

                                                <Picker
                                                    textStyle={{
                                                        fontFamily: 'ISBold'
                                                    }}
                                                    itemTextStyle={{
                                                        fontFamily: 'ISBold'
                                                    }}
                                                    selectedValue={this.state.language}
                                                    style={{ height: 40, width: '100%' }}
                                                    onValueChange={(itemValue) =>
                                                        this.setState({ language: itemValue })
                                                    }>
                                                    <Picker.Item label="جنگلی" value="1" />
                                                    <Picker.Item label="ویلایی" value="2" />
                                                </Picker>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', backgroundColor: '#eee', padding: 10, borderRadius: 5 }}>
                                            <View style={styles.modal_detailsx} >
                                                <Text style={styles.modal_titles} >ظرفیت</Text>
                                                <Icon style={{ marginLeft: 5 }} size={22} name="account-group-outline" color="#555" />
                                            </View>
                                            <Counter counter={(e) => this._personCounter(e)} />
                                        </View>
                                    </View>

                                    <View style={mapStyle}>
                                        <TouchableOpacity
                                            onPress={this._mapFullScreen}
                                            style={{
                                                zIndex: 999,
                                                position: 'absolute',
                                                backgroundColor: 'rgba(255,255,255,.6)',
                                                borderRadius: 5,
                                                padding: 0,
                                                width: 40,
                                                height: 40,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                top: this.state.mapIconTop,
                                                left: this.state.mapIconLeft
                                            }} >
                                            {
                                                this.state.mapFull ?
                                                    <Icon size={40} name="fullscreen-exit" color="#A52D53" /> :
                                                    <Icon size={40} name="fullscreen" color="#A52D53" />

                                            }
                                        </TouchableOpacity>

                                        <Mapir
                                            accessToken={'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM5ZjlmMWZhNDA4YzM0ODI2ZjcxZGI5YTdlM2U2ZmVjNDEzMzNmMDU0MjVhM2MzOTM0NmMwNTlkMzBiMzcyYjA5YzU1OGZjOGU4NTJmNWJhIn0.eyJhdWQiOiJteWF3ZXNvbWVhcHAiLCJqdGkiOiIzOWY5ZjFmYTQwOGMzNDgyNmY3MWRiOWE3ZTNlNmZlYzQxMzMzZjA1NDI1YTNjMzkzNDZjMDU5ZDMwYjM3MmIwOWM1NThmYzhlODUyZjViYSIsImlhdCI6MTU1OTQ1NTIzMiwibmJmIjoxNTU5NDU1MjMyLCJleHAiOjE1NTk0NTg4MzIsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyIsImVtYWlsIl19.JNowwSPWaoVoJ1Omirk9OTtkDySsNL91nP00GcCARdM-YHoTQYw3NZy3SaVlAsbafO9oPPvlVfhNIxPIHESACZATutE3tb7RBEmQGEXX-8G7GOSu8IzyyLBmHaQe75LtisgdKi-zPTGsx8zFv0Acn6HrDDxFrKFNtmI85L3jos_GVxvYYhHWKAez8mbJRHcH1b15DrwgWAhCjO2p_HqpuGLdRF1l03J6HsOnJLMid2997g7iAVTOa8mt2oaEPvmwA_f6pwFZSURqw-RJzdN_R8IEmtqWQq5ZNTEppVaV82yuwfnSmrb0_Sak2hfBIiLwQeCMsnfhU_CvUbE_1rukmQ'}
                                            zoomLevel={13}
                                            showUserLocation={true}
                                            centerCoordinate={[51.422548, 35.732573]}
                                            onPress={e => this.addMarker(e.geometry.coordinates)}
                                            style={{ flex: 1 }}
                                        >
                                            {mark}

                                        </Mapir>

                                    </View>

                                </View>
                            </View>


                            {/* request btn */}
                            <View style={styles.new_request_box}>
                                <GradientButton
                                    width="90%"
                                    press={this._newRequest}
                                    activeOpacity={.6}
                                    color_1="#18749a"
                                    color_2="#46add8"
                                    height={50}
                                    borderRadius={50}
                                    textColor="#fff"
                                    size={16}
                                    title="درخواست جدید"
                                    top={0}
                                    bottom={0}
                                />
                            </View>
                        </View>
                    </InputScrollView>

                </Modal>

            </DrawerLayoutAndroid >


        );
    }
}
let mapParentStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
};
let mapStyle = {
    width: '48%',
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff'
}

let square = {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
}

const styles = ({

    home_cover: {
        backgroundColor: "#C92652",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        flex: 1,

    },

    menu: {
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        width: '100%',
        paddingVertical: 5,
        alignItems: 'center',
    },
    notification_circle: {
        width: 10,
        height: 10,
        borderRadius: 7,
        backgroundColor: '#B22850',
        end: 13,
        top: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    menu_icon: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    up: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#f6f6f6',
        // borderBottomRightRadius: 300,
        borderBottomLeftRadius: 0,
        overflow: 'hidden',
        zIndex: 1,

    },
    title: {
        fontSize: 14,
        fontFamily: 'ISBold',
        color: '#333',
        textAlign: 'center',
    },
    requestBox: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 200,
    },

    middleInside: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    },
    icon_parent: {
        width: 100,
        height: 100,
        backgroundColor: '#aaa',
        borderWidth: 10,
        borderColor: '#f5f5f5',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#f7f7f7",
        shadowOpacity: 1,
        elevation: 1,
    },
    icon_child: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderWidth: 10,
        borderColor: '#f8f8f8',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#f7f7f7",
        shadowOpacity: 1,
        elevation: 1,
    },

    icon: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    person_desc: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    person_name: {
        fontSize: 14,
        fontFamily: 'ISBold',
        marginTop: 10,
        color: '#fff'
    },
    bottom_icons: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: '100%'
    },
    drawer_text: {
        fontSize: 12,
        color: '#b04267',
        fontFamily: 'ISBold',
        marginRight: 10,
    },


    modal_price: {
        width: '48%',
        flexDirection: 'column',
        marginVertical: 5,
        borderRadius: 5,
        zIndex: -10,
        // height: 200,
        justifyContent: 'space-between',
        backgroundColor: '#eee',

    },
    modal_details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ddd',
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    modal_detailsx: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    modal_titles: {
        flexDirection: 'row',
        fontSize: 12,
        fontFamily: 'ISFBold',
        alignItems: 'center',
        color: '#636363',
    },
    gheymat: {
        fontSize: 12,
        fontFamily: 'ISBold',
        color: '#636363'
    },
    toman: {
        fontSize: 8,
        fontFamily: 'ISBold',
        color: '#636363'
    },

    price_input: {
        textAlign: 'center',
        borderRadius: 5,
        height: 40,
        backgroundColor: '#fff',
        color: '#636363',
        marginTop: 5,
        fontFamily: 'ISBold',
        minWidth: 50,
        fontSize: 15,
        borderRadius: 5

    },
    start_date: {
        width: '48%',
        marginVertical: 5,
        // height: 160,
        backgroundColor: '#eee',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        borderRadius: 5
    },

    new_request_box: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
    },


    select_date: {
        textAlign: 'center',
        borderRadius: 5,
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        color: '#636363',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'ISBold',
    },
    modal_button : {
        position: 'absolute', 
        bottom: 140, 
        zIndex: 10, 
        right: 20, 
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: '#C92652',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "black",
        shadowOpacity: .5,
        elevation: 10,
    }





})