import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddItemGrade({ navigation }) {

    const [itemGradeName, setItemGradeName] = useState("");
    const [host, setHost] = useState("");

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        
    }, [host]);

    function submitForm() {
        fetch(`http://${host}:5000/create_item_grade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grade_name: itemGradeName,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            setItemGradeName("");
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="ADD ITEM GRADE"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Item Grade Name" value={itemGradeName} onChangeText={itemGradeName => setItemGradeName(itemGradeName)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Item Grade</Button>
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
