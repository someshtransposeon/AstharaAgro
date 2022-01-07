import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';
import { item_category_by_id } from '../../services/item_api';
import axios from 'axios';
import {url} from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function DisabledEditItemCategory(props,{route}) {

    var itemCategoryid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.itemCategoryId;
    }
    else{
        itemCategoryid = props.match.params.itemCategoryid;
    }

    const [itemCategoryId, setItemCategoryId] = useState("");
    const [itemCategoryName, setItemCategoryName] = useState("");
    const [host, setHost] = useState("");

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setItemCategoryId(id);
        }
        else{
            setHost("localhost");
            setItemCategoryId(itemCategoryid);
        }
        if(itemCategoryId && host){
            //Retrieve item_category by itemCategoryId
            item_category_by_id(host, itemCategoryId)
            .then(function(result) {
                 setItemCategoryName(result[0].category_name);
            })
        }
        
    }, [host,itemCategoryId,id,itemCategoryid, props.host]);

    function submitForm() {

        axios.put(url + '/update_item_category/'+itemCategoryId, {
            category_name: itemCategoryName,
          })
          .then(function (response) {
              console.log(response);
            alert(response.data.message);
          })
          .catch(function (error) {
            console.log(error);
          });
        // fetch(`http://${host}:5000/update_item_category/${itemCategoryId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         category_name: itemCategoryName,
        //     })
        // })
        // .then(res => res.json())
        // .catch(error => console.log(error))
        // .then(data => {
        //     alert(data.message);
        // }); 
    }

    // function submitForm2() {
    const StatusChange = (s) => {
        axios.put(url + '/disabled_item_category/'+itemCategoryId, {
            status: s,
          })
          .then(function (response) {
            alert(response.data.message);
          })
          .catch(function (error) {
            console.log(error);
          });
        // fetch(`http://${host}:5000/enabled_item_category/${itemCategoryId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         status: s,
        //     })
        // })
        // .then(res => res.json())
        // .catch(error => console.log(error))
        // .then(data => {
        //     alert(data.message);
        // });
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {itemCategoryName ?
                <Card style={styles.card}>
                    <Card.Title title="EDIT ITEM CATEGORY"/>
                    <Card.Content>
                        <TextInput style={styles.input} mode="outlined" label="Item Category Name" value={itemCategoryName} onChangeText={itemCategoryName => setItemCategoryName(itemCategoryName)} />
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item Category </Button>
                        <Button mode="contained" style={styles.button} color='red' onPress={()=>StatusChange("enabled")}>Enable Category</Button>
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
