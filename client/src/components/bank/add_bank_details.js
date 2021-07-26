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

export default function AddBankDetails({ navigation }) {

    const [userId, setUserId] = useState('');
    const [bankName, setBankName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [ifsccode, setIfsccode] = useState("");
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
    }, [host]);

    function submitForm() {
        fetch(`http://${host}:5000/create_bank`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                bank_name: bankName,
                branch_name: branchName,
                account_number: accountNumber,
                account_holder_name: accountHolderName,
                ifsc_code: ifsccode
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            setBankName("");
            setBranchName("");
            setAccountNumber("");
            setAccountHolderName("");
            setIfsccode("");
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Add Bank Details"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Bank Name" value={bankName} multiline onChangeText={bankName => setBankName(bankName)} />
                    <TextInput style={styles.input} mode="outlined" label="Branch Name" value={branchName} onChangeText={branchName => setBranchName(branchName)} />
                    <TextInput style={styles.input} mode="outlined" label="Account Number" value={accountNumber} onChangeText={accountNumber => setAccountNumber(accountNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Account Holder Name" value={accountHolderName} onChangeText={accountHolderName => setAccountHolderName(accountHolderName)} />
                    <TextInput style={styles.input} mode="outlined" label="Ifsc Code" value={ifsccode} onChangeText={ifsccode => setIfsccode(ifsccode)} />
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
