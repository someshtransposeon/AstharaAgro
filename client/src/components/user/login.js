import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
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

export default function Login({ navigation }) {

    const [message, setMessage] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submitForm() {
        fetch('http://localhost:5000/login_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:email,
                password:password,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            try {
                AsyncStorage.setItem('@token', data.token);
                AsyncStorage.setItem('@loginuserid', data.user_id);
                AsyncStorage.setItem('@loginemail', data.email);
            }catch (e) {
                console.log(e);
            }
            setEmail("");
            setPassword("");
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Login User"/>
                    <Card.Content>
                    <TextInput style={styles.input} label="Email" value={email} onChangeText={email => setEmail(email)} />
                    <TextInput style={styles.input} label="Password" value={password} onChangeText={password => setPassword(password)} />
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%'}} onPress={()=>submitForm()}>Login</Button>
                    </Card.Content>
                </Card>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginTop: '10%',
                width: '90%',
            },
            default: {
                marginTop: '4%',
                width: '50%',
            }
        })
    },
    input: {
        margin: '2%',
        width: '100%',
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                border: '1px solid gray',
            }
        })
    },
}); 
