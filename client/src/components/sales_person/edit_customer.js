import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditCustomer(props,{route}) {

    var customerid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.customerId;
    }
    else{
        customerid = props.match.params.customerid;
    }

    const [customerId, setCustomerId] = useState("");
    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [gst, setGst] = useState("");
    const [mobile_no, setMobile_no] = useState("");
    const [host, setHost] = useState("");
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setCustomerId(id);
        }
        else{
            setHost("localhost");
            setCustomerId(customerid);
        }
        if(customerId){
            fetch(`http://${host}:5000/retrive_customer/${customerId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setFull_name(item[0].full_name);
                setEmail(item[0].email);
                setGst(item[0].gst_no);
                setMobile_no(item[0].mobile_no);
            });
        }
    }, [host,customerId,id,customerid]);

    

    function submitForm() {
        fetch(`http://${host}:5000/update_customer/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name:full_name,
                email:email,
                mobile_no:mobile_no,
                gst_no:gst,
                
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }

    return (
        <Provider theme={theme}>
            <ScrollView keyboardDismissMode="interactive" >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={styles.card}>
                        <Card.Title title="UPDATE CUSTOMER"/>
                        <Card.Content>
                            <TextInput style={styles.input} mode="outlined" type="text" label="Enter your full name" value={full_name} onChangeText={fullname=>setFull_name(fullname)} />
                            <TextInput style={styles.input} mode="outlined" type="email" label="Enter email" value={email} onChangeText={email=>setEmail(email)} />
                            <TextInput style={styles.input} mode="outlined" type="number" label="enter mobile number" value={mobile_no} onChangeText={mobile_no=>setMobile_no(mobile_no)} />
                            <TextInput style={styles.input} mode="outlined" label="enter GST number" type="text" value={gst} onChangeText={gst_no=>setGst(gst_no)} />
                            <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Customer Details</Button>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </Provider>
    );
};
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
    button: {
        marginTop: '2%',
    }
}); 
