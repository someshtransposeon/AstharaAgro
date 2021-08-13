import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, Text, SafeAreaView, ScrollView} from 'react-native';
import { Card, Provider, DefaultTheme, Button, Paragraph } from 'react-native-paper';
import { Link } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

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

    function deleteaddress(id){
        fetch(`http://${host}:5000/delete_address/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            setAddress("");
        });  
    }

    function deletebank(id){
        fetch(`http://${host}:5000/delete_bank/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            setBank("");
        });  
    }

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
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
                        {(address && address.length) ?
                            <>
                                <Text style={styles.text2}>Address: {address[0].address}</Text>
                                <Text style={styles.text2}>Landmark: {address[0].landmark}</Text>
                                <Text style={styles.text2}>District: {address[0].district}</Text>
                                <Text style={styles.text2}>State: {address[0].state}</Text>
                                <Text style={styles.text2}>Country: {address[0].country}</Text>
                                <Text style={styles.text2}>Pin Code: {address[0].postal_code}</Text>
                                <Paragraph >
                                {Platform.OS=='android' ?
                                    <FontAwesomeIcon icon={ faTrash }color="red" size={25} onPress={()=>deleteaddress(address[0]._id)} />
                                    :
                                    <Button onPress={()=>deleteaddress(address[0]._id)} >
                                        <FontAwesomeIcon icon={ faTrash }color="red" size={25} />
                                    </Button>
                                }
                                {Platform.OS=='android' ?
                                    <FontAwesomeIcon  icon={ faEdit } color="blue" size={25} onPress={() => {navigation.navigate('EditAddress', {addressId: address[0]._id})}} />
                                    :
                                    <Button>
                                        <Link to={"/editaddress/"+address[0]._id}>
                                            <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                        </Link>
                                    </Button>
                                }
                                </Paragraph>
                            </>
                            :
                            <>
                            {Platform.OS=='android' ?
                                <Button mode="contained" style={{padding: '1%', marginTop: '2%'}} onPress={() => {navigation.navigate('AddAddress')}}>Add Address</Button>
                                :
                                <Button mode="contained" style={{padding: '1%', marginTop: '2%'}}><Link to="/addaddress">Add Address</Link></Button>
                            }
                            </>
                        }
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Bank Details"/>
                    <Card.Content>
                        {(bank && bank.length) ?
                            <>
                                <Text style={styles.text3}>Bank Name: {bank[0].bank_name}</Text>
                                <Text style={styles.text3}>Branch Name: {bank[0].branch_name}</Text>
                                <Text style={styles.text3}>Account Holder Name: {bank[0].account_holder_name}</Text>
                                <Text style={styles.text3}>Account Number: {bank[0].account_number}</Text>
                                <Text style={styles.text3}>IFSC Code: {bank[0].ifsc_code}</Text>
                                <Paragraph >
                                {Platform.OS=='android' ?
                                    <FontAwesomeIcon icon={ faTrash }color="red" size={25} onPress={()=>deletebank(bank[0]._id)} />
                                    :
                                    <Button onPress={()=>deletebank(bank[0]._id)} >
                                        <FontAwesomeIcon icon={ faTrash }color="red" size={25} />
                                    </Button>
                                }
                                {Platform.OS=='android' ?
                                    <FontAwesomeIcon  icon={ faEdit } color="blue" size={25} onPress={() => {navigation.navigate('EditBankDetails', {bankId: bank[0]._id})}} />
                                    :
                                    <Button>
                                        <Link to={"/editbankdetails/"+bank[0]._id}>
                                            <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                        </Link>
                                    </Button>
                                }
                                </Paragraph>
                            </>
                            :
                            <>
                            {Platform.OS=='android' ?
                                <Button mode="contained" style={{padding: '1%', marginTop: '2%'}} onPress={() => {navigation.navigate('AddBankDetails')}}>Add Bank Details</Button>
                                :
                                <Button mode="contained" style={{padding: '1%', marginTop: '2%'}}><Link to="/addbankdetails">Add Bank Details</Link></Button>
                            }
                            </>
                        }
                    </Card.Content>
                </Card>
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
        fontSize: 20,
        marginTop: '5px',
        color: 'blue',
    },
    text2: {
        fontSize: 20,
        marginTop: '5px',
        color: 'red',
    },
    text3: {
        fontSize: 20,
        marginTop: '5px',
        color: 'green',
    }
}); 
