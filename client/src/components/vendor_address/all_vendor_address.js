import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, Text, SafeAreaView, ScrollView} from 'react-native';
import { Card, Provider, DefaultTheme, Button, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_addresses({ navigation }) {

    const [vendorId, setVendorId] = useState('');
    const [address, setAddress] = useState();
    const [host, setHost] = useState("");

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((vendorid) => {
                setVendorId(vendorid);
            })
        }
        fetchData();

        if(Platform.OS == "android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        if(vendorId){
            fetch(`http://${host}:5000/retrieve_vendor_address_by_vendorId/${vendorId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(address => {
                setAddress(address);
            });
        }
    }, [address, host, vendorId ]);
    
    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                { address  ?
                    address.map((address)=>{
                        return(
                        <Card style={styles.card} >
                            <Card.Content style={{marginTop:"3%"}} id={address._id}>
                                <>
                                    <Text style={styles.text2}>Address: {address.address}</Text>
                                    <Text style={styles.text2}>Landmark: {address.landmark}</Text>
                                    <Text style={styles.text2}>District: {address.district}</Text>
                                    <Text style={styles.text2}>State: {address.state}</Text>
                                    <Text style={styles.text2}>Country: {address.country}</Text>
                                    <Text style={styles.text2}>Pin Code: {address.postal_code}</Text>
                                </>  
                            </Card.Content>
                        </Card>
                        )
                    })
                    :
                    <Text>No address available</Text>
                } 
            </View>
            </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: '2%',
        alignSelf: 'center',
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
                marginBottom: '4%',
                width: '30%',
            }
        })
    },
}); 
