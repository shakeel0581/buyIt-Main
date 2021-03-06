import React, { useEffect } from 'react';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    Text,
    Icon,
    View,
    Item,
    Input,
    Button,
} from 'native-base';
import { TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";

const Events = () => {
    const [date, setDate] = React.useState([]);
    let navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('userData').
            then(val => {
                const userData = JSON.parse(val);
                console.log('USER ID IN CHECK OUT', userData.user_id);
                fetch('https://thecodeditors.com/test/buy_it/api-get-orders.php?user_id='+userData.user_id)
                    .then((response) => response.json())
                    .then((json) => {
                        setDate(json.Data); 
                        console.log(json)
                    })
                    .catch((error) => console.error(error));
            })
    }, []);

    return (
        <Container>
            <Header
                style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2',
                }}>
                <Left>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon active name="arrowleft" type="AntDesign" />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Text>Orders</Text>
                </Body>
            </Header>
            <FlatList
                style={{ flex: 1 }}
                data={date}
                renderItem={({ item }) =>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('CheckStatus',{data: item}) }
                    style={styles.container}>
                        <View style={{ width: '90%' }}>
                            <Text style={styles.title}> {item.pro_name}</Text> 
                            <Text style={styles.desc}> {item.pro_desc}</Text>
                            <Text style={styles.date}> {item.pro_price}</Text>
                            <Text style={[styles.date,{color:'green',fontWeight:'bold'}]}> {item.order_status}</Text>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={({item,index}) => Math.random()}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray'
    },
    desc: {
        fontSize: 14,
        // fontWeight:'bold',
        color: 'gray'
    },
    date: {
        fontSize: 12,
        // fontWeight:'bold',
        color: 'gray'
    },
    date: {
        fontSize: 12,
        // fontWeight:'bold',
        color: 'gray'
    },
    modalBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    modalContainer: {
        height: 500,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btns: {
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        marginTop: '4%',
    },

    modalContainerDel: {
        height: 150,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
});

export default Events;
