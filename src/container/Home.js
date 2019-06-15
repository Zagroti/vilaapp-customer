import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    DrawerLayoutAndroid,
    Image,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    Modal,
    TextInput,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import InputScrollView from 'react-native-input-scroll-view';
import PersianDatePicker from "rn-persian-date-picker";



//components 
import NoRequest from '../components/NoRequest';
import Requestitems from '../components/RequestItems';
import GradientButton from '../components/GradientButton';


var moment = require('moment-jalaali')
moment().format('jYYYY/jM/jD')



export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            date: false
        };
    }

    //click humberger menu to open drawer
    _openDrawer = () => {
        this.refs['DRAWER_REF'].openDrawer();
    }


    componentDidMount() {
        // for disable back btn
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this._dateOpen()

    }

    
    componentWillUnmount() {
        // for disable back btn
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    //for disable back button haedware
    handleBackButton() {
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }


    // if(this.refs['PICKER'].isOpen()){
    //     this.setState({date:true})
    //     alert(1)
    // }else{
    //     this.setState({date:false})
    //     alert(0)
    // }




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

    // got to vila cases
    _showRequestsNavigate = () => {
        Actions.ResultItemsPage()
    }

    //close modal
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    // open date picker and set date
    _dateOpen = async () => {
        this.refs['PICKER'].showPicker()
        this.setState({ date: true })

        console.log(this.state.date)
    }


    // send nes request
    _newRequest = () => {
        this.setModalVisible(false)
    }





    render() {




        const navigationView = (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
                {/* <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text> */}
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 20,
                    backgroundColor: '#b04267',
                    width: '100%'
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
                <TouchableOpacity activeOpacity={.6} style={styles.bottomIcons} onPress={(e) => this._navigate('profile')}>
                    <Text style={styles.drawer_text}>پروفایل</Text>
                    <Image style={styles.bottomIcon} source={require('../../Assets/Images/userq.png')} />
                </TouchableOpacity>

                {/* got to history */}
                <TouchableOpacity activeOpacity={.6} style={styles.bottomIcons} onPress={(e) => this._navigate('history')}>
                    <Text style={styles.drawer_text}>تاریخچه</Text>
                    <Image style={styles.bottomIcon} source={require('../../Assets/Images/userq.png')} />
                </TouchableOpacity>
            </View>
        );

        const { selectedDate } = this.state


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
                            style={styles.humberger}
                            onPress={() => alert('توجهات')}
                        >
                            <ImageBackground
                                style={styles.bell}
                                source={require('./../../Assets/Images/bell.png')}
                            >
                                <View style={styles.notification} >
                                    <Text style={styles.notification_text} >3</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.humberger} onPress={this._openDrawer}>
                            <Image style={styles.humberger_icon} source={require('../../Assets/Images/menu.png')} />
                        </TouchableOpacity>
                    </View>


                    {/* request box  */}
                    <View style={styles.up} >
                        <Text style={styles.title} >درخواست های من</Text>
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
                    <TouchableOpacity activeOpacity={.9} style={{
                        position: 'absolute', bottom: 140, zIndex: 10, right: 20, width: 90,
                        height: 90,
                        borderRadius: 50,
                        backgroundColor: '#C92652',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: "black",
                        shadowOpacity: .5,
                        elevation: 10,
                    }}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        <View style={styles.middleInside}>
                            <Image style={styles.middleIcon} source={require('../../Assets/Images/bluemarker.png')} />
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
                    }}

                >
                    {/* {
                        this.state.date ?
                            <View style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height,
                                backgroundColor: 'rgba(0,0,0,.3)', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0,
                                zIndex: 1
                            }} >
                            </View> :
                            <View style={{
                                width: 0,
                                height: 0,
                            }} >
                            </View>

                    } */}
                    <KeyboardAvoidingView behavior="position" >
                        {/* Close modal  */}
                        <View
                            style={{
                                backgroundColor: '#f6f6f6',
                                width: '100%',
                                height: 50,
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}>
                            {/* Close modal  */}
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(false);
                                }}>
                                <Image style={styles.modal_close}
                                    source={require('../../Assets/Images/close.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Modal Body */}
                        <View style={styles.Modal} >
                            <View style={styles.modal_description} >
                                <View style={styles.modal_description_left}>
                                    <Text style={styles.modal_description_text}>
                                        برای پیدا کردن بهترین مکان دلخواه هرچه سریعتر اقدام کنید !
                                        </Text>
                                    <Text style={styles.modal_description_title}>
                                        ما اینجاییم تا بهترین مکان را برای شما پیدا کنیم
                                        </Text>
                                </View>
                                <Image style={styles.home_icon_marker} source={require('../../Assets/Images/homemarker.png')} />
                            </View>

                            {/* price */}
                            <View style={styles.modal_price} >
                                <View style={styles.modal_details} >
                                    <View style={styles.modal_titles}>
                                        <Text style={styles.toman} > ( تومان ) </Text>
                                        <Text style={styles.gheymat} >قیمت</Text>
                                    </View>
                                    <Image style={styles.modal_icons} source={require('../../Assets/Images/percent.png')} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <TextInput
                                        placeholderTextColor={'#999'}
                                        placeholder="100,000"
                                        style={styles.price_input}
                                        onChangeText={(price) => this.setState({ price })}
                                        keyboardType='numeric'
                                    />
                                </View>

                            </View>

                            {/* date */}
                            <View style={styles.start_date} >
                                <View style={styles.modal_details} >
                                    <Text style={styles.modal_titles} onPress={() => console.log(this.refs['PICKER'])}>تاریخ شروع</Text>
                                    <Image style={styles.modal_icons} source={require('../../Assets/Images/calendergrey.png')} />
                                </View>


                                <TouchableOpacity onPress={this._dateOpen}
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: 5,
                                        shadowColor: "#f7f7f7",
                                        shadowOpacity: .3,
                                        elevation: 1,
                                        width: '100%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        color: '#636363',
                                        marginTop: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontFamily: 'ISBold',
                                    }}
                                >
                                    {this.state.selectedDate ?
                                        <Text style={{
                                            fontSize: 15,
                                            fontFamily: 'ISBold',
                                            alignItems: 'center',
                                            color: '#636363'
                                        }}>{moment(selectedDate).format("jYYYY/jMM/jDD")}</Text> :
                                        <Text style={{
                                            fontSize: 15,
                                            fontFamily: 'ISBold',
                                            alignItems: 'center',
                                            color: '#999'
                                        }}> تاریخ مورد نظر خود را انتخاب کن </Text>
                                    }

                                </TouchableOpacity>


                                <PersianDatePicker
                                    type="Jalali"
                                    yearCount={10}
                                    onConfirm={date => {
                                        this.setState({ selectedDate: date, date: false });
                                        console.log(this.refs['PICKER'].isOpen());
                                    }}
                                    ref={'PICKER'}
                                    pickerFontFamily="ISBold"
                                    pickerConfirmBtnColor={[0, 123, 255, 1]}
                                    pickerCancelBtnColor={[220, 53, 69, 1]}
                                    pickerTitleText="تاریخ مورد نظر خود را انتخاب کن"
                                    pickerTitleColor={[99, 99, 99, 1]}
                                    onPicker={() => {
                                        this.setState({ date: false })
                                        console.log(this.refs['PICKER'].isOpen())
                                    }}

                                />
                            </View>

                            {/* nights */}
                            <View style={styles.nights} >
                                <View style={styles.modal_details} >
                                    <Text style={styles.modal_titles}>تعداد شبها</Text>
                                    <Image style={styles.modal_icons} source={require('../../Assets/Images/moon.png')} />
                                </View>
                                <View style={{justifyContent:'center'}}>
                                    <TextInput
                                        placeholderTextColor={'#999'}
                                        placeholder="2"
                                        style={styles.price_input}
                                        onChangeText={(price) => this.setState({ price })}
                                        keyboardType='numeric'
                                    />
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
                    </KeyboardAvoidingView>



                </Modal>





            </DrawerLayoutAndroid >


        );
    }
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
        padding: 20
    },
    bell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#B22850',
        start: 10,
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification_text: {
        color: '#fff',
        fontSize: 9,
        fontFamily: 'ISFMedium',
    },
    humberger: {
        width: 50,
        height: 50,
        alignItems: 'center',
    },
    humberger_icon: {
        width: 30,
        height: 30,
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
        fontSize: 22,
        fontFamily: 'ISBold',
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7',
        paddingBottom: 10,
        marginTop: 20,
        width: Dimensions.get('window').width - 50,


    },
    requestBox: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 200,
    },

    footer: {
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor: "#C92652",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 20
    },
    middleBtn: {
        bottom: 50,
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: '#C92652',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,

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
    middleIcon: {
        width: 40,
        height: 50,
        zIndex: 20
    },

    icon_parent: {
        width: 120,
        height: 120,
        backgroundColor: '#aaa',
        borderWidth: 10,
        borderColor: '#f5f5f5',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#f7f7f7",
        shadowOpacity: 1,
        elevation: 1,
    },
    icon_child: {
        width: 100,
        height: 100,
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

    icon_cover: {
        width: 80,
        height: 80,
        backgroundColor: '#C92652',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 18,
        fontFamily: 'ISBold',
        marginTop: 10,
        color: '#fff'
    },
    bottomIcons: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        width: '100%'
    },
    drawer_text: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'ISBold',
        marginRight: 10,
    },
    bottomIcon: {
        width: 30,
        height: 30
    },
    Modal: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        height: Dimensions.get('window').height - 50,
        width: Dimensions.get('window').width,
    },
    modal_description: {
        backgroundColor: '#eee',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 20,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#f7f7f7",
        shadowOpacity: 1,
        elevation: 1,
        height: 100,
        padding: 10,
        marginTop: 50,
    },

    home_icon_marker: {
        width: 50,
        resizeMode: "contain",
        top: -40,
    },

    modal_description_left: {
        flex: 1
    },
    modal_description_text: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'ISBold',
    },
    modal_description_title: {
        fontSize: 10,
        color: '#aaa',
        fontFamily: 'IS',
    },
    modal_price: {
        width: '90%',
        flexDirection: 'column',
        marginVertical: 5,
        borderRadius: 5
    },
    modal_details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modal_titles: {
        flexDirection: 'row',
        fontSize: 12,
        fontFamily: 'ISFBold',
        alignItems: 'center',
        color: '#636363'
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
    modal_icons: {
        width: 20,
        resizeMode: "contain",
        marginLeft: 10,
    },

    price_input: {
        textAlign: 'center',
        borderRadius: 5,
        shadowColor: "#f7f7f7",
        shadowOpacity: .3,
        elevation: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#636363',
        marginTop: 5,
        fontFamily: 'ISBold',
        minWidth: 50,
        fontSize:15

    },
    start_date: {
        width: '90%',
        marginVertical: 5
    },
    select_time: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'ISFBold',
        borderRadius: 5,
        shadowColor: "#f7f7f7",
        shadowOpacity: .3,
        elevation: 1,
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        color: '#636363',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nights: {
        width: '90%',
        marginVertical: 5
    },
    select_nights: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'ISFBold',
        borderRadius: 5,
        shadowColor: "#f7f7f7",
        shadowOpacity: .3,
        elevation: 1,
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        color: '#636363',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    new_request_box: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ebebeb',
        marginTop: 10,
        marginBottom: 30,
    },


    modal_close: {
        width: 25,
        height: 25,
        margin: 20
    }







})