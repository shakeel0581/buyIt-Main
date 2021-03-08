/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from 'react';
import tabsview from './tabsview';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Modal,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';
import { images, colors } from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { CheckBox } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import { api, sliderpic, featuredslider, slider, allproduct, Recent, shopProducts } from './constant';

import BottomAccount from './BottomAccount';

const initialLayout = { width: Dimensions.get('window').width };
const initialLayoutHeight = { width: Dimensions.get('window').height };
const uniqueId = require("react-native-unique-id");

const Header = ({coutn}) => {

  let navigation = useNavigation();
  return (
    <View style={{ height: '10%' }}>
      <View
        style={{
          width: '95%',
          height: 90,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <TouchableOpacity>
          <Entypo
            name="menu"
            size={30}
            // onPress={() => navigation.navigate('CategoriesList')}
            onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>
        <Image source={images.logo} style={{ height: 30, width: '30%' }} />
        <Text
          style={{
            position: 'absolute',
            right: '-0.5%',
            top: '20%',
            fontSize: 10,
            backgroundColor: colors.ORANGE.DEFAULT,
            borderRadius: 50,
            zIndex: 12,
            height: 18,
            width: 18,
            textAlign: 'center',
            paddingTop: 2,
            color: 'white',
          }}>
          {coutn}
        </Text>
        <TouchableOpacity
          style={{ position: 'absolute', right: '3%' }}
          onPress={() => navigation.navigate('Cart')}
        >
          <AntDesign name="shoppingcart" size={40} />
          <Text>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Allproduct = (props) => {
  const { SHOP_ID, V_Name } = props.route.params;
  const v_id = SHOP_ID ? SHOP_ID : null;

  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(false);
  const [Allproduct, setAllproduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [UserID, setUserID] = useState('');
  const [coutn, setCount] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem('userData').then((user) => {
    
        if (user) {
          const userData = JSON.parse(user);
          setUserID(userData.user_id);
        }
        if (v_id) {
          fetch(api.shopProducts + v_id)
            .then((response) => response.json())
            .then((json) => {
              setAllproduct(json);
            })
            .catch((error) => console.error(error))
        } else {
          fetch(api.allproduct)
            .then((response) => response.json())
            .then((json) => {
              setAllproduct(json);

            })
            .catch((error) => console.error(error))
        }
    });
  }, []);

  const rFResh = () => {
    setLoading(true);
    if (v_id) {
      fetch(api.shopProducts + v_id)
        .then((response) => response.json())
        .then((json) => {
          setAllproduct(json);
          setLoading(false);

        })
        .catch((error) => console.error(error))
    } else {
      fetch(api.allproduct)
        .then((response) => response.json())
        .then((json) => {
          setAllproduct(json);
          setLoading(false);

        })
        .catch((error) => console.error(error))
    }
  }


  return (
    <View>

      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          marginTop: 0,
          marginBottom:50
        }}>
        <FlatList
          refreshing={isLoading}
          onRefresh={() => rFResh()}
          key={'_'}
          numColumns={2}
          data={Allproduct.Data}
          renderItem={({ item }) => {
            const AddToCart = (e) => {
              let number = '1';

              AsyncStorage.getItem('RandomNumber').then((result) => {
                console.log('result' + result);
                let user = JSON.parse(result);
                const uri =
                  api.addcart + user +
                  '&product_id=' +
                  item.pro_id +
                  '&quantity=1&user_id=' + UserID;

                console.log(uri);
                fetch(uri)
                  .then((response) => response.json())
                  .then((json) => {
                    setCart(json);
                    props.addCount();
                    // console.log(cart);
                    ToastAndroid.show(
                      'Item Added To Cart',
                      ToastAndroid.SHORT,
                    );
                  })
                  .catch((error) => console.error(error))
                  .finally(() => setLoading(false));
              });
            };

            return (

              <View style={{  width: "50%", }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', { id: item.pro_id, pic: featuredslider + item.image_name })
                  }>
                  <Image
                    source={{ uri: featuredslider + item.image_name }}
                    style={{ width: 120, height: 120, alignSelf: 'center' }}
                    resizeMode="center"></Image>

                  <Paragraph
                    style={{
                      fontSize: 12,
                      marginLeft: 20,
                      color: colors.LIGHTGREY.DEFAULT,
                    }}>
                    {item.pro_des}

                  </Paragraph>
                  <Paragraph style={{ marginLeft: 20 }}>
                    {item.pro_name}
                  </Paragraph></TouchableOpacity>
                <Paragraph
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    color: colors.ORANGE.DEFAULT,
                  }}>
                  PKR {item.pro_price}
                </Paragraph>
                <TouchableOpacity
                  style={{
                    borderColor: colors.ORANGE.DEFAULT,
                    width: '80%',
                    borderWidth: 1,
                    marginTop: 5,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  onPress={AddToCart}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.ORANGE.DEFAULT,
                      textAlign: 'center',
                    }}>
                    Add
                      </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />


      </View>
    </View>
  );
};

const App = (props) => {
  let navigation = useNavigation();
  const { SHOP_ID, V_Name } = props.route.params;
  //const {ch} = route.params;
  const screenHeight = Dimensions.get('window').height-110;
  const [coutn, setCount] = useState(0);
  useEffect(() => {
      AsyncStorage.getItem('RandomNumber').then((result) => {
        let Rnumber = JSON.parse(result);
        const uri = api.cartshow + Rnumber
        fetch(uri)
          .then((response) => response.json())
          .then((json) => {
            if (json.Data) {
              setCount(json.Data.length);
            }
          })
          .catch((error) => console.error(error));
    });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header coutn={coutn} />
      <View style={{ height: screenHeight, alignItems: 'center'}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, marginLeft: 10, color: '#5b5e5c' }}>
          {V_Name == '' ? 'All Products' : V_Name}
        </Text>
        <Allproduct {...props}  addCount={() => setCount(coutn+1)} />

      </View>
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { marginTop: '7%' },
  text: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  font: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  login: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    marginVertical: 10,
  },
  logins: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginVertical: 10,
  },
  form: {
    flexDirection: 'column',
    margin: 20,
  },
  btns: {
    fontSize: 20,
    color: 'orange',
    marginRight: 15,
  },
  btn: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 5,
    color: '#808080',
  },
  textb: {
    width: '100%',
    height: 44,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 13,
  },
  textbb: {
    margin: 15,
  },
  chck: {
    flexDirection: 'row',
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
