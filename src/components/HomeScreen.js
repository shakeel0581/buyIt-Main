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
import { api, sliderpic, featuredslider, slider, allproduct, Recent, shop } from './constant';

import BottomAccount from './BottomAccount';

const initialLayout = { width: Dimensions.get('window').width };
const initialLayoutHeight = { width: Dimensions.get('window').height };


console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

const Header = ({ count }) => {
  const refRBSheetBottom = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  let navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refRBSheet, setrefRBSheet] = useState(refRBSheetBottom);
  const [tex, setText] = useState('username');
  const [pwd, setPwd] = useState(' ');
  // const tex = 'username';
  // const pwd = 'password';
  useEffect(() => {
    fetch(
      'https://thecodeditors.com/test/buy_it/api-user-login.php?email=' +
      tex +
      '&password=' +
      pwd,
      //'http://thecodeditors.com/test/buy_it/api-user-login.php?email=sameershk819@gmail.com&password=passcode1212',
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [tex, pwd]);
  useEffect(() => {

    AsyncStorage.getItem('RandomNumber').then((result) => console.log("our main randum number.........................." + result));
    // async () => {
    //   const userData = await AsyncStorage.getItem('userData');
    //   console.log('data', JSON.parse(userData));
    // };
  }, []);
  //AsyncStorage.getItem('userId').then((result) => console.log(result));

  //console.log(tex);
  //console.log(pwd);
  //console.log(data.Data);

  return (
    <View style={{ height: '10%' }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 400,
                height: Dimensions.get('window').height * 0.98,
              }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#469FA6' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </Modal>

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
          {count}
        </Text>
        <TouchableOpacity
          style={{ position: 'absolute', right: '3%' }}
          onPress={() => navigation.navigate('Cart')}
        >
          <BottomAccount refRBSheet={refRBSheet} />

          <AntDesign name="shoppingcart" size={40} />
          <Text>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const Shops = () => {
  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(true);
  const [shop, setShop] = useState([]);

  useEffect(() => {

    fetch(api.shop)
      .then((response) => response.json())
      .then((json) => {
        setShop(json);
        console.log("shop................s", shop[1])

      })
      .catch((error) => console.error(error))

  }, []);


  return (
    <View>
      <View
        style={{
          justifyContent: 'center',

          flex: 1,

          marginTop: 0,
        }}>

        <FlatList
          data={shop.Data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ vendor_id }, val) => Math.floor(Math.random() * 10000000) + vendor_id}
          renderItem={({ item }) => (

            <TouchableOpacity
              onPress={() => navigation.navigate('Allproduct', { SHOP_ID: item.vendor_id, V_Name: item.vendor_company_name })}
              style={{
                paddingLeft: 25,
                height: 70, alignItems: 'center',
              }}>

              <Image
                source={{ uri: "https://thecodeditors.com/test/multi_vendor/vendor_images/" + item.vendor_logo }}
                style={{ height: 50, width: 50 }}
                resizeMode="center"></Image>
              <Text style={{ color: colors.ORANGE.DEFAULT, fontSize: 14 }}>
                {item.vendor_company_name}
              </Text>

            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
const Recents = ({ countPrss, userID }) => {
  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(true);
  const [Recent, setRecent] = useState([]);
  const [ID, setID] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {

    fetch(api.Recent)
      .then((response) => response.json())
      .then((json) => {
        setRecent(json);

      })
      .catch((error) => console.error(error))

  }, []);
  ;


  return (
    <View>
      <View
        style={{
          justifyContent: 'center',

          flex: 1,

          marginTop: 0,
        }}>


        <FlatList
          horizontal
          keyExtractor={({ pro_id }, val) => Math.floor(Math.random() * 10000000) + pro_id}
          data={Recent.Data}
          renderItem={({ item }) => {
            const AddToCart = (e) => {

              AsyncStorage.getItem('RandomNumber').then((result) => {
                let user = JSON.parse(result);
                const uri =
                  api.addcart + user +
                  '&product_id=' +
                  item.pro_id +
                  '&quantity=1&user_id=' + userID;
                console.log(uri);
                fetch(uri)
                  .then((response) => response.json())
                  .then((json) => {
                    setCart(json);
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
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', { id: item.pro_id, pic: featuredslider + item.image_name })
                  }>

                  <Image
                    source={{ uri: featuredslider + item.image_name }}
                    style={styles.img}
                    resizeMode="center"></Image>

                  <Paragraph
                    style={{
                      fontSize: 12,
                      marginLeft: 20,
                      color: colors.LIGHTGREY.DEFAULT,
                    }}>
                    Heavy
                  </Paragraph>
                  <Paragraph style={{ marginLeft: 20 }}>
                    {item.pro_name}
                  </Paragraph>
                </TouchableOpacity>
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
                  onPress={() => { AddToCart(); countPrss(); }}>
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

const Slider = () => {
  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(true);
  const [slide, setData] = useState([]);
  const [ifLoading, setIsLoading] = useState(true);
  // const pic = sliderpic;
  //console.log(slide.Data);

  useEffect(() => {
    setIsLoading(true);
    fetch(api.slider)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log("json", slide)
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <View>
      <SwiperFlatList
        autoplay
        autoplayDelay={5}
        showPagination={true}
        autoplayLoop
        disableGesture={true}
        autoplayLoopKeepAnimation={true}
        paginationActiveColor={colors.LIGHTGREY.DEFAULT}
        paginationDefaultColor={colors.TRANSPARENT}
        data={slide.Data}
        keyExtractor={({ slider_id }, index) => slider_id}
        renderItem={({ item }) => (
          <View>
            <ImageBackground
              source={{ uri: sliderpic + item.slider_image }}
              resizeMode="stretch"
              style={{
                width: screenWidth,
                height: screenHeight / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Text style={{ fontSize: 18, color: 'black' }}>New Arrivals</Text>
                <Text style={styles.text}>This is my First Slider image</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WishList')}
                  style={{
                    backgroundColor: colors.ORANGE.DEFAULT,
                    width: '45%',
                    padding: 10,
                    marginTop: 10,
                  }}>
                  <Text style={{ fontSize: 18, color: 'black' }}>
                    {item.slider_title}
                    <AntDesign name="arrowright" size={20} />
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

const FeaturedSlider = ({ countPrss, userID }) => {
  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const [ifLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const pic = featuredslider;
  // console.log('featured Slider', featured.Data);

  useEffect(() => {
    setIsLoading(true);
    fetch(api.featuredslider)
      .then((response) => response.json())
      .then((json) => {
        setFeatured(json);
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  if (ifLoading) {
    return (
      <View style={{ paddingTop: 100 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',

          flex: 1,

          marginTop: 0,
        }}>
        {/* <ScrollView
          style={{width: '100%'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}> */}
        <FlatList
          horizontal
          data={featured.Data}
          keyExtractor={({ pro_id }, val) => Math.floor(Math.random() * 10000000) + pro_id}
          renderItem={({ item }) => {
            const AddToCart = (e) => {


              AsyncStorage.getItem('RandomNumber').then((result) => {
                let user = JSON.parse(result);
                const uri =
                  api.addcart + user +
                  '&product_id=' +
                  item.pro_id +
                  '&quantity=1&user_id=' + userID;
                fetch(uri)
                  .then((response) => response.json())
                  .then((json) => {
                    setCart(json);
                    countPrss();
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
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', { id: item.pro_id, pic: featuredslider + item.image_name })
                  }>
                  <Image
                    source={{ uri: featuredslider + item.image_name }}
                    style={styles.img}
                    resizeMode="center"></Image>

                  <Paragraph
                    style={{
                      fontSize: 12,
                      marginLeft: 20,
                      color: colors.LIGHTGREY.DEFAULT,
                    }}>
                    heavy
                  </Paragraph>
                  <Paragraph style={{ marginLeft: 20 }}>
                    {item.pro_name}
                  </Paragraph>
                </TouchableOpacity>
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
        {/* </ScrollView> */}
      </View>
    </View>
  );
};
const BestSeller = ({ countPrss, userID }) => {
  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const [ifLoading, setIsLoading] = useState(true);
  const pic = sliderpic;
  const [cart, setCart] = useState([]);
  //console.log(featured.Data);

  useEffect(() => {
    setIsLoading(true);
    fetch(api.BestSeller)
      .then((response) => response.json())
      .then((json) => {
        setFeatured(json);
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  if (ifLoading) {
    return (
      <View style={{ paddingTop: 100 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',

          flex: 1,

          marginTop: 0,
        }}>
        {/* <ScrollView
          style={{width: '100%'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}> */}
        <FlatList
          horizontal
          keyExtractor={({ pro_id }, val) => Math.floor(Math.random() * 10000000) + pro_id}
          data={featured.Data}
          renderItem={({ item }) => {
            const AddToCart = (e) => {



              AsyncStorage.getItem('RandomNumber').then((result) => {
                console.log('result' + result);
                let user = JSON.parse(result);
                const uri =
                  api.addcart + user +
                  '&product_id=' +
                  item.pro_id +
                  '&quantity=1&user_id=' + userID;;
                console.log(uri);
                fetch(uri)
                  .then((response) => response.json())
                  .then((json) => {
                    setCart(json);
                    countPrss();
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
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', { id: item.pro_id, pic: featuredslider + item.image_name })
                  }>
                  <Image
                    source={{ uri: featuredslider + item.image_name }}
                    style={styles.img}
                    resizeMode="center"></Image>

                  <Paragraph
                    style={{
                      fontSize: 12,
                      marginLeft: 20,
                      color: colors.LIGHTGREY.DEFAULT,
                    }}>
                    Heavy
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
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const RecommenderSlider = ({ countPrss, userID }) => {
  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const [ifLoading, setIsLoading] = useState(true);
  const pic = sliderpic;
  const [cart, setCart] = useState([]);
  //console.log(featured.Data);

  useEffect(() => {
    setIsLoading(true);
    fetch(api.recommendslider)
      .then((response) => response.json())
      .then((json) => {
        setFeatured(json);
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  if (ifLoading) {
    return (
      <View style={{ paddingTop: 100 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',

          flex: 1,

          marginTop: 0,
        }}>
        {/* <ScrollView
          style={{width: '100%'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}> */}
        <FlatList
          horizontal
          keyExtractor={({ pro_id }, val) => pro_id}
          data={featured.Data}
          renderItem={({ item }) => {
            const AddToCart = (e) => {
              AsyncStorage.getItem('RandomNumber').then((result) => {
                console.log('result' + result);
                let user = JSON.parse(result);
                const uri =
                  api.addcart + user +
                  '&product_id=' +
                  item.pro_id +
                  '&quantity=1&user_id=' + userID;;
                console.log(uri);
                fetch(uri)
                  .then((response) => response.json())
                  .then((json) => {
                    setCart(json);
                    countPrss();
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
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', { id: item.pro_id, pic: featuredslider + item.image_name })
                  }>
                  <Image
                    source={{ uri: featuredslider + item.image_name }}
                    style={styles.img}
                    resizeMode="center"></Image>

                  <Paragraph
                    style={{
                      fontSize: 12,
                      marginLeft: 20,
                      color: colors.LIGHTGREY.DEFAULT,
                    }}>
                    Heavy
                  </Paragraph>
                  <Paragraph style={{ marginLeft: 20 }}>
                    {item.pro_name}
                  </Paragraph>
                </TouchableOpacity>
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
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const App = () => {
  let navigation = useNavigation();
  //const {ch} = route.params;
  const [coutn, setCount] = useState(0);
  const [UserID, setUserID] = useState('');
  const screenHeight = Dimensions.get('window').height;
  useEffect(() => {
    AsyncStorage.getItem('RandomNumber').then((result) => {
      AsyncStorage.getItem('userData').then((user) => {
        if (user) {
          const userData = JSON.parse(user);
          setUserID(userData.user_id);
        }
        let Rnumber = JSON.parse(result);
        const uri = api.cartshow + Rnumber
        fetch(uri)
          .then((response) => response.json())
          .then((json) => {
            if (json.Data) {
              setCount(json.Data.length);
            }
          })
          .catch((error) => console.error(error))
      });
    });

    navigation.addListener('focus', () => {
      AsyncStorage.getItem('RandomNumber').then((result) => {
        AsyncStorage.getItem('userData').then((user) => {
          if (user) {
            const userData = JSON.parse(user);
            setUserID(userData.user_id);
          }
          let Rnumber = JSON.parse(result);
          const uri = api.cartshow + Rnumber
          fetch(uri)
            .then((response) => response.json())
            .then((json) => {
              if (json.Data) {
                setCount(json.Data.length);
              }
            })
            .catch((error) => console.error(error))
        });
      });
    })
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header count={coutn} />
      <View style={{ height: screenHeight }}>
        <ScrollView style={{ marginTop: 20, marginBottom: 100 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <Slider />
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, marginLeft: 10, color: '#5b5e5c' }}>
              Shops
          </Text>
            <Shops />
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, marginLeft: 10, color: '#5b5e5c' }}>
              Special offer
          </Text>
            <FeaturedSlider countPrss={() => setCount(coutn + 1)} userID={UserID} />

            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, marginLeft: 10, color: '#5b5e5c' }}>
              Recommended Products
          </Text>
            <RecommenderSlider countPrss={() => setCount(coutn + 1)} userID={UserID} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, marginLeft: 10, color: '#5b5e5c' }}>
              Best Seller
          </Text>
            <BestSeller countPrss={() => setCount(coutn + 1)} userID={UserID} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, marginLeft: 10, color: '#5b5e5c' }}>
              Recents Products
          </Text>
            <Recents countPrss={() => setCount(coutn + 1)} userID={UserID} />

            <TouchableOpacity
              style={{
                borderColor: colors.ORANGE.DEFAULT,
                width: '90%',
                padding: 10,
                borderWidth: 1,
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
              }}
              onPress={() => navigation.navigate('Allproduct', { SHOP_ID: null, V_Name: '' })}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.ORANGE.DEFAULT,
                  textAlign: 'center',
                }}>
                Shop more
                    </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
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
  img: {
    height: 150,
    width: (Dimensions.get('window').width / 2)
  }
});

export default App;
