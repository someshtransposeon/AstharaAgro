import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';
import { item_unit_by_unitid } from '../../services/item_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditItemUnit(props,{route}) {

    var itemUnitid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.itemUnitId;
    }
    else{
        itemUnitid = props.match.params.itemUnitid;
    }

    const [itemUnitId, setItemUnitId] = useState("");
    const [itemUnitName, setItemUnitName] = useState("");
    const [host, setHost] = useState("");

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setItemUnitId(id);
        }
        else{
            setHost("localhost");
            setItemUnitId(itemUnitid);
        }

        if(itemUnitId){
            //Retrieve item Unit by itemUnitId
            item_unit_by_unitid(host, itemUnitId)
            .then(function(result) {
                setItemUnitName(result[0].unit_name);
            })
        }

    }, [host,itemUnitId,id,itemUnitid]);

    function submitForm() {
        fetch(`http://${host}:5000/update_item_unit/${itemUnitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                unit_name: itemUnitName,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        }); 
    }
    
    const StatusChange = (s) => {
        fetch(`http://${host}:5000/disabled_item_unit/${itemUnitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });
    }; 

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {itemUnitName ?
                <Card style={styles.card}>
                    <Card.Title title="EDIT ITEM UNIT"/>
                    <Card.Content>
                        <TextInput style={styles.input} mode="outlined" label="Item Unit Name" value={itemUnitName} onChangeText={itemUnitName => setItemUnitName(itemUnitName)} />
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item Unit </Button>
                        <Button mode="contained" style={styles.button} color='red' onPress={()=>StatusChange("disabled")}>Disable Item Unit</Button>
                    </Card.Content>
                </Card>
                :
                <ActivityIndicator size={50}/>
                }
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
                //to be updated for IOS
                marginTop: '10%',
                width: '90%',
            },
            android: {
                marginTop: '10%',
                width: '90%',
            },
            default: {
                marginTop: '4%',
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        backgroundColor: 'white',
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
