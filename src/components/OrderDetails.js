import React, {Component, useEffect, useState} from 'react';
import {Text, View, ScrollView, TextInput, Image} from 'react-native';
import {Item, Input, Label, Picker, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images, colors} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const RenderHeader = (props) => {
  let navigation = useNavigation();
  
  return (
    <View style={{height: '10%'}}>
      <View
        style={{
          width: '95%',
          height: 90,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <TouchableOpacity>
          <Entypo name="menu" size={30} />
        </TouchableOpacity>
        <Image source={images.logo} style={{height: 30, width: '30%'}} />
        
        <TouchableOpacity
          style={{position: 'absolute', right: '3%'}}
          onPress={() => navigation.navigate('Cart')}>
          <AntDesign name="shoppingcart" size={25} />
          <Text>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
let Login = ({route}) => {
  let navigation = useNavigation();
  const data = route.params.data ? route.params.data : '' ;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <SafeAreaView />
      <RenderHeader />
      <Text
        style={{padding: 10, borderRadius: 1, elevation: 1, marginBottom: 10}}>
        Home <Feather name="chevron-right" size={15} /> Order Detail
      </Text>
      <ScrollView
        style={{
          width: '95%',
          height: '86%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{marginLeft: '5%'}}>
          <Icon
            name="camera-off"
            type="Feather"
            style={{fontSize: 35, marginLeft: '3%'}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'sans-serif',
              color: 'black',
            }}>
            {data.user_name}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '98%',
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '10%',
            }}>
            <View style={{width: '90%'}}>
              <Text style={{color: 'black', fontSize: 18, paddingTop: 15}}>
                Billing Information
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                  paddingTop: 5,
                  fontWeight: 'bold',
                }}>
                Noine
              </Text>
              {[
                `Full Name: ${data.user_name}`,
                `Email: ${data.user_email}`,
              ].map((item, key) => (
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                    marginTop: 10,
                    textTransform: 'capitalize',
                  }}
                  key={key}>
                  {item}
                </Text>
              ))}
              <Text style={{color: 'black', fontSize: 18, paddingTop: 15}}>
                Product Information
              </Text>
              {[
                `Product ID: ${data.pro_id}`,
                `Product Name: ${data.pro_name}`,
                `Product Description: ${data.pro_desc}`,
                `Unit Cost: ${data.pro_price}`,
                `Quantity: ${data.order_qty}`,
                `Payment Method: ${data.payment}`,
                `Delivery Category: ${data.delivery_cat_id}`,
                // `Delivery Charges: 20`,
              ].map((item, key) => (
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                    marginTop: 10,
                    textTransform: 'capitalize',
                  }}
                  key={key}>
                  {item}
                </Text>
              ))}
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  paddingTop: 5,
                  fontWeight: 'bold',
                }}>
                Total: {data.pro_price}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              borderRadius: 1,
              elevation: 1,
              alignItems: 'center',
              marginTop: '5%',
              marginBottom: '10%',
            }}>
            <View style={{width: '90%', marginTop: '7%'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                My Account
              </Text>
              {[
                {
                  label: 'Profile Setting',
                  function: () => navigation.navigate('MyProfile'),
                },
                {
                  label: 'My Orders',
                  function: () => navigation.navigate('CheckOrders'),
                },
                {
                  label: 'Change Password',
                  function: () => navigation.navigate('ChangePassword'),
                },
                {
                  label: 'Logout',
                  function: () => navigation.navigate('HomeScreen'),
                },
              ].map((item, key) => (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.ORANGE.DEFAULT,
                    padding: 10,
                    width: '100%',
                    marginBottom: 20,
                  }}
                  key={key}
                  onPress={item.function}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.ORANGE.DEFAULT,
                      textAlign: 'center',
                    }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
