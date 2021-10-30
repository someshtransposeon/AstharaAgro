import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
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

export default function DisabledEditItemUnit(props,{route}) {

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
            fetch(`http://${host}:5000/retrive_item_unit/${itemUnitId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setItemUnitName(item[0].unit_name);
            });
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
            console.log(data);
        }); 
    }
      const StatusChange = (s) => {
        fetch(`http://${host}:5000/enabled_item_unit/${itemUnitId}`, {
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
            console.log(data);
        });
        // closeMenu(index);
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
                    <Button mode="contained" style={styles.button} color='red'                    
                    onPress={()=>StatusChange("enabled")}
                    >Enable Item Unit</Button>
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
                width: '50%',
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
