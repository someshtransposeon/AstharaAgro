import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';
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

export default function AddAddress({ navigation }) {

    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [host, setHost] = useState('');

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid) => {
                setUserId(userid);
            })
        }
        fetchData();
        if (Platform.OS === 'android'){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
    }, [host, userId]);

    function submitForm() {
        fetch(`http://${host}:5000/create_address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                address: address,
                landmark: landmark,
                district: district,
                state: state,
                country: country,
                postal_code: pincode,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            setAddress("");
            setLandmark("");
            setDistrict("");
            setState("");
            setCountry("");
            setPincode("");
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Add Address"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                    <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                    <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                    <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                    <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />
                    <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%'}} onPress={()=>submitForm()}>Add User Category</Button>
                    </Card.Content>
                </Card>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginTop: '10%',
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
                marginTop: '4%',
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
}); 
