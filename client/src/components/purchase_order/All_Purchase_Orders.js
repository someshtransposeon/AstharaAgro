import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme,Card, DataTable, Button } from 'react-native-paper';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

const optionsPerPage = [2, 3, 4];

export default function All_Purchase_Orders({ navigation }) {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [allPurchaseOrders, setAllPurchaseOrders] = useState();
    const [host, setHost] = useState("");

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch(`http://${host}:5000/retrive_all_purchase_order`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allPurchaseOrders => setAllPurchaseOrders(allPurchaseOrders));
    }, [allPurchaseOrders, host]);


    // React.useEffect(() => {
    //     setPage(0);
    // }, [itemsPerPage]);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                {allPurchaseOrders ?
                    allPurchaseOrders.map((purchaseOrder)=>{
                        return (
                            <Card style={styles.card}>
                                <Card.Title title={purchaseOrder._id} subtitle={purchaseOrder._id}/>
                             
                             
                                <Card.Actions>
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('Edit_Purchase_Order', {purchaseId: purchaseOrder._id})}}>View</Button>
                                        :
                                        <Button mode="contained" style={{width: '100%'}}><Link to={"/Edit_Purchase_Order/"+purchaseOrder._id}>View</Link></Button>
                                    }
                                </Card.Actions>
                            </Card>
                        )
                    })
                    :
                    <ActivityIndicator color="#794BC4" size={60}/>
                }
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    view: {
        ...Platform.select({
            ios: {
                
            },
            android: {
            },
            default: {
                
            }
        })
    },
    card: {
        margin: '2%',
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                
            },
            android: {
                width: '90%',
            },
            default: {
                width: '20%',
            }
        })
    },
}); 