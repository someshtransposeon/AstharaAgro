import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faReceipt } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function View_Purchase_Order(props, {route}) {

    var id="";
    var purchaseid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseId;
    }
    else{
        purchaseid = props.match.params.purchaseid;
    }

    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPurchaseId(id);
        }
        else{
            setHost("localhost");
            setPurchaseId(purchaseid);
        }

        if(flag && purchaseId){
            fetch(`http://${host}:5000/retrive_purchase_order/${purchaseid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setOrderId(item[0].order_id)
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setStatus(item[0].status);
                setFlag(false);
                console.log(item);
            });
        }

    }, [host, purchaseId, purchaseid, id, items, order_id, vendor_id, status, flag]);

    const PriceChange = (value) => {
        const values = items;
        setItems({Grade:values.grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:values.quantity, itemPrice:value});
    };

    const QuantityChange = (value) => {
        const values = items;
        setItems({Grade:values.grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:value, itemPrice:values.finalPrice});
    };

    function submitForm() {
        fetch(`http://${host}:5000/update_purchase_order/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id, 
                status:status,          
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });   
    }
    
    // for create Purchase Receipt
    function submitForm2() {
        fetch(`http://${host}:5000/create_purchase_confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchaseId:purchaseId,
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id, 
                status:status,      
            })
        }) 
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });   
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="View Purchase Order"/>
                    <Card.Content>
                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item Name" value={items.itemName} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>QuantityChange(text)} /></DataTable.Cell>
                                    <TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} onChangeText={(text)=>PriceChange(text)} />
                                </DataTable.Row>
                            </DataTable>
                        }   
                        {/* <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} onPress={()=>submitForm()} >Update Purchase</Button>
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faReceipt } />} style={styles.button} onPress={()=>submitForm2()} >Create Purchase Confirm</Button> */}
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