import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Card, Provider, DefaultTheme } from 'react-native-paper';
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

export default function Profile({ navigation }) {

    const [userId, setUserId] = useState('');
    const [user, setUser] = useState();
    const [address, setAddress] = useState();
    const [bank, setBank] = useState();
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [host, setHost] = useState("");

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid) => {
                setUserId(userid);
            })
        }
        fetchData();

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        if(userId){
            if(flag1){
                fetch(`http://${host}:5000/retrive_user/${userId}`, {
                    method: 'GET'
                })
                .then(res => res.json())
                .catch(error => console.log(error))
                .then(user => {
                    setUser(user);
                    setFlag1(false);
                });
            }

            if(flag2){
                fetch(`http://${host}:5000/retrive_address_by_userId/${userId}`, {
                    method: 'GET'
                })
                .then(res => res.json())
                .catch(error => console.log(error))
                .then(address => {
                    setAddress(address);
                    setFlag2(false);
                });
            }

            if(flag3){
                fetch(`http://${host}:5000/retrive_bank_by_userId/${userId}`, {
                    method: 'GET'
                })
                .then(res => res.json())
                .catch(error => console.log(error))
                .then(bank => {
                    setBank(bank);
                    setFlag3(false);
                });
            }
        }
    }, [user, address, bank, host, userId, flag1, flag2, flag3]);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Personal Details"/>
                    <Card.Content>
                        {user && 
                            <>
                                <Text style={styles.text1}>Full Name: {user[0].full_name}</Text>
                                <Text style={styles.text1}>Email: {user[0].email}</Text>
                                <Text style={styles.text1}>Mobile No: {user[0].mobile_no}</Text>
                                <Text style={styles.text1}>Role: {user[0].role}</Text>
                            </>
                        }
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Address"/>
                    <Card.Content>
                        {address && 
                            <>
                                <Text style={styles.text2}>Address: {address[0].address}</Text>
                                <Text style={styles.text2}>Landmark: {address[0].landmark}</Text>
                                <Text style={styles.text2}>District: {address[0].district}</Text>
                                <Text style={styles.text2}>State: {address[0].state}</Text>
                                <Text style={styles.text2}>Country: {address[0].country}</Text>
                                <Text style={styles.text2}>Pin Code: {address[0].postal_code}</Text>
                            </>
                        }
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Bank Details"/>
                    <Card.Content>
                        {bank && 
                            <>
                                <Text style={styles.text3}>Bank Name: {bank[0].bank_name}</Text>
                                <Text style={styles.text3}>Branch Name: {bank[0].branch_name}</Text>
                                <Text style={styles.text3}>Account Holder Name: {bank[0].account_holder_name}</Text>
                                <Text style={styles.text3}>Account Number: {bank[0].account_number}</Text>
                                <Text style={styles.text3}>IFSC Code: {bank[0].ifsc_code}</Text>
                            </>
                        }
                    </Card.Content>
                </Card>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: '2%',
        alignSelf: 'center',
        padding: '1%',
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
                width: '50%',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                
            }
        })
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '5px',
        color: 'blue',
    },
    text2: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '5px',
        color: 'red',
    },
    text3: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '5px',
        color: 'green',
    }
}); 
