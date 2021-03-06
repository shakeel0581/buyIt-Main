import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {useNavigation} from '@react-navigation/native'; 
import AsyncStorage from '@react-native-community/async-storage';


export default App = () => {
    let navigation = useNavigation();
    let [show, setShow] = useState(false);
    let [loader, setLoader] = useState(true);
    const [currentUser, setCurrentUser] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
          e.preventDefault();
          alert('Default behavior prevented');
        });
        return unsubscribe;
      }, [navigation]);
  
    return (
      <Container
        style={styles.container}>
        
        <View
          style={{
            height: '13%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{marginLeft: '4%', fontSize: 20, fontWeight: 'bold'}}>
              Dashboard
            </Text>
          </View>
            
        </View>
        
        <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <TouchableOpacity style={{width: '40%'}} 
              onPress={()=> navigation.navigate('MyProfile',{type: 'Marriage Help'})}
              >
              <Card >
              <CardItem
                  cardBody
                  style={{height: 100, flex: 1, justifyContent: 'center'}}>
                  <Image
                  source={{uri : 'https://image.flaticon.com/icons/png/512/16/16363.png'}}
                  style={{height: 80, width: 80}}
                  />
              </CardItem>
              <CardItem style={{justifyContent: 'center'}}>
                  <Text style={styles.text}>MyProfile</Text>
              </CardItem>
              </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '40%', marginLeft: '3%'}} 
              onPress={()=> navigation.navigate('Order2',{type: 'Education'})}
              >
          <Card >
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={{uri : 'https://icon-library.com/images/my-orders-icon/my-orders-icon-17.jpg'}}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>My Order</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <TouchableOpacity style={{width: '40%'}} 
              onPress={()=> navigation.navigate('ChangePassword',{type: 'Membership Community'})}
              > 
          <Card>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={{uri:'https://static.thenounproject.com/png/250130-200.png'}}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>ChangePassword</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '40%', marginLeft: '3%'}}
              onPress={()=> navigation.navigate('Cart',{type: 'Medical'})}
              > 
          <Card >
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={{uri:'https://uxwing.com/wp-content/themes/uxwing/download/19-ecommerce-shopping/shopping-cart.png'}}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Cart </Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>
       </ScrollView>
    
       </Container>
    );
  };

  const styles = StyleSheet.create({
    btns: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
      marginTop: '7%',
    },
    registerTitle: {
      color: 'red',
      textTransform: 'uppercase',
      fontSize: 18,
    },
    form: {
      height: '75%',
      width: '95%',
      marginTop: '10%',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    inputOuter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textTransform: 'uppercase',
      fontSize: 12,
      textAlign:'center',
    },
    container:{
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
      },
      inner:{
        height: '18%',
        position: 'absolute',
        zIndex: 9,
        width: '25%',
        top: '4%',
        marginLeft: '40%',
      }
  });