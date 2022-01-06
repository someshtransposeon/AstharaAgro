import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory, Link } from 'react-router-dom';

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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [host, setHost] = useState("");

    let history = useHistory();

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
    }, [host]);

    function submitForm() {
        fetch(`http://${host}:5000/login_user`, {
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
        .catch(error =>{
            alert(error);
            console.log(error);
        })
        .then(data => {
            console.log(data);
            alert(data.message);
            if(data.token){
                AsyncStorage.setItem('token', data.token);
                AsyncStorage.setItem('loginuserid', data.user_id);
                AsyncStorage.setItem('loginemail', data.email);
                AsyncStorage.setItem('nick_name', data.nick_name);
                AsyncStorage.setItem('role', data.role);
                setEmail("");
                setPassword("");
                if(Platform.OS=='android'){
                    navigation.navigate('Home');
                    window.location.reload(false);
                }
                else{
                    
                    history.push('/');
                    window.location.reload(false);
                }
            }
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Login User"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Email" value={email} onChangeText={email => setEmail(email)} />
                    <TextInput style={styles.input} mode="outlined" label="Password" value={password} onChangeText={password => setPassword(password)} secureTextEntry={true}/>
                    {Platform.OS=='android' ? 
                    <Button style={{padding: '1%', marginTop: '2%'}} onPress={() => {navigation.navigate('Forgotpassword')}}>Forgot Password</Button>
                    :
                    <Link to="/forgotpassword">Forgot password?</Link>
                    }
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Login</Button>
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
                width: '75%',
            }
        })
    },
    input: {
        margin: '2%',
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
    button: {
        marginTop: '2%',
    }
}); 
